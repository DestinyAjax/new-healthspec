import React, { Component } from 'react';
import {connect} from 'react-redux';
import swal from 'sweetalert';
import { reset } from 'redux-form';
import {Card} from 'antd';
import classnames from 'classnames';
import ReactToPrint from 'react-to-print';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import LayoutContent from '@iso/components/utility/layoutContent';
import DashboardLayout from '../../.containers/Dashboard/Dashboard';
import Loader from '../../ui/Loader/Loader.Component';
import ReferAddForm from '../../ui/forms/ReferAddForm';
import Breadcrumb from '../../ui/Breadcrumb';
import DiagnosisForm from '../../ui/forms/DiagnosisForm';
import { getTreatment  } from "../../shared/actions/TreatmentCase.action";
import CustomButton from '../../ui/CustomButton';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap'
import { getQuery, resetGetQuery, storeRefer, resetStore } from '../../shared/actions/Refer.action';

class ReferAdd extends Component {

    state = {
        formData: null,
        role_user: null,
        showSummary: false,
        showPrint: false,
        submittingForm: false,
        requestingForm: false,
        selectedArray: [],
        diagnosisArray: [],
        provider_id: null,
        provider_name: '',
        treatmentcase_id: null,
        activeTab: "diagnosis",
        setActiveTab: "diagnosis",
    }

    componentDidMount() {
        this.setState({
            treatmentcase_id: this.props.match.params.treatmentcase_id
        });
        this.props.getTreatment(this.props.match.params.treatmentcase_id);
    }

    setActiveTab = tab => {
        this.setState({
          activeTab: tab
        });
    };

    showNotification = async props => {
        if (props.store_refer_status && props.store_refer_status === 200) {
            this.props.reset('ReferAddForm');
            let alert = await swal({
                title: "Good job!",
                text: `Please wait for authorization code!`,
                icon: "success",
                closeOnClickOutside: false
            });

            if (alert) {
                this.props.resetStore();
                this.setState({
                    showPrint: true
                })
            }
        }
        else if(props.store_refer_status && props.store_refer_status !== 200){
            let alert = await swal({
                title: "An Error Occured!",
                text: `${props.msg}`,
                icon: "warning",
                closeOnClickOutside: false
            });

            if(alert) {
                this.props.resetStore();
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        this.showNotification(nextProps);
    }

    select = role_user => {
        this.setState({
            role_user: role_user
        });
    }

    handleSubmit = formData => {
        this.setState({
            formData: formData,
            showSummary: true
        });
    }

    appendServices = e => {
        if (Array.isArray(e)){
            this.setState({
                requestingForm: false,
                showPrint: false,
                selectedArray: e,
                showSummary: true
            });
        }
        else {
            this.setState({
                provider_id: e.value,
                provider_name: e.label
            });
        }
        if(e.length < 1) {
            this.setState({
                requestingForm: false,
                showPrint: false,
                showSummary: false
            });
            return false;
        }
    }

    appendDiagnosis = e => {
        if (Array.isArray(e)){ 
            this.setState({
                requestingForm: false,
                showPrint: false,
                diagnosisArray: e,
                showSummary: true
            });
        }
        if(e.length < 1) {
            this.setState({
                requestingForm: false,
                showPrint: false,
                showSummary: false
            });
            return false;
        }
    }

    submitRefererHandler = () => {
        let quantity = document.getElementsByName('quantity[]');
        let services = this.state.selectedArray.map((selected_service, index) => {
            return {
                id: selected_service.value,
                quantity: parseInt(quantity[index].value) || 1
            }
        })

        let data = {
            plan_service_id: JSON.stringify(services),
            provider_id: this.state.provider_id,
            treatment_case_id: this.state.treatmentcase_id,
            type: "REFER"
        }

        this.setState({
            requestingForm: true
        }, () => {
            this.props.storeRefer(data);
        });
    }
    render() {
 
        let container, print, button, selectedServices, selectedDiagnosis;
        let { treatment, get_treatment_status } = this.props;
        const toggle = tab => {
            if (this.state.activeTab !== tab) this.setActiveTab(tab);
        };

        if (!this.state.showSummary) {
            container = (
                <Card style={{width: '100%'}}>
                    <div style={{marginBottom: '20px'}}>
                        <div className="row">
                            <div className="col-md-6">
                                <h4>Treatment Case <small>1022020200202 { get_treatment_status === 200 && treatment.date}</small></h4>
                            </div>
                            <div className="col-md-6 text-right">Osun Health Insurance Scheme</div>
                        </div>
                    </div>
                    <div>
                        {get_treatment_status === 200 && (
                            <div className="row">
                                <div className="col-md-6">
                                    <img style={{width: 130}} alt={treatment.beneficiary_first_name} src={treatment.beneficiary_picture} />
                                </div>
                                <div className="col-md-6" style={{display: 'flex'}}>
                                    <div>Name:{treatment.beneficiary_surname} {treatment.beneficiary_first_name}</div>
                                    <div>Age: {treatment.beneficiary_age}</div>
                                </div>
                            </div>
                        )}
                        <div className="row">
                            <div className="col-md-12">
                                <Nav tabs>
                                    <NavItem>
                                        <NavLink
                                            className={classnames({active: this.state.activeTab === "diagnosis"})}
                                            onClick={() => {toggle("diagnosis")}}>
                                            Diagnosis
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            className={classnames({active: this.state.activeTab === "services"})}
                                            onClick={() => {toggle("services")}}>
                                            Order & Procedure
                                        </NavLink>
                                    </NavItem>
                                </Nav>
                                <TabContent activeTab={this.state.activeTab}>
                                    <TabPane tabId="diagnosis">
                                        <br />
                                        <DiagnosisForm onSubmit={this.handleSubmit}  appendDiagnosis={this.appendDiagnosis}/>
                                        <h4>Diagnosis</h4>
                                        <ol><li>{get_treatment_status === 200 && treatment.case}</li></ol>
                                    </TabPane>
                                    <TabPane tabId="services">
                                        <br />
                                        <ReferAddForm 
                                            onSubmit={this.handleSubmit} 
                                            submittingForm={this.state.requestingForm} 
                                            appendServices={this.appendServices} 
                                            treatmentcase_id={this.props.match.params.treatmentcase_id} 
                                            role_user_id={this.props.active.id}  />
                                    </TabPane>
                                </TabContent>
                            </div>
                        </div>
                    </div>
                </Card>
            );
        }

        if (this.state.selectedArray) {
            let services = this.state.selectedArray.map((selected_service, index) => {
                return (
                    <tr>
                        <td>{index+1}</td>
                        <td>{selected_service.label}</td>
                        <td>{ selected_service.type === 'P' ? 'Primary' : (selected_service.type === 'S' ? 'Secondary' : 'Tertiary' ) }</td>
                        <td><input type="number" name="quantity[]" min="1" placeholder="1" /></td>
                        <td>{ selected_service.type === 'P' ? 'Capitation' : 'PA Code' }</td>
                    </tr>
                );
            });

            selectedServices = (
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>S/N</th>
                            <th>Service</th>
                            <th>Category</th>
                            <th>Quantity</th>
                            <th>Payment Type</th>
                        </tr>
                    </thead>
                    <tbody>{services}</tbody>
                </table>
            );
        }

        if (this.state.diagnosisArray) {
            let diagnosis = this.state.diagnosisArray.map((selected_service, index) => {
                return (
                    <li>{selected_service.label}</li>
                );
            });

            selectedDiagnosis = (
                <div>
                    <h4>Diagnosis</h4>
                    <ol>
                        <li>{get_treatment_status === 200 && treatment.case}</li>
                        { diagnosis }
                    </ol>
                </div>
            );
        }

        if (this.state.showSummary) {
            container = (
                <Card style={{width: '100%'}}>
                    <div style={{marginBottom: '20px'}}>
                        <div className="row">
                            <div className="col-md-6">
                                <h4>Treatment Case <small>1022020200202 {get_treatment_status === 200 && treatment.date}</small></h4>
                            </div>
                            <div className="col-md-6 text-right">Osun Health Insurance Scheme</div>
                        </div>
                    </div>
                    <div>
                        {get_treatment_status === 200 && (
                            <div className="row">
                                <div className="col-md-6">
                                    <img style={{width: 130}} alt={treatment.beneficiary_first_name} src={treatment.beneficiary_picture} />
                                </div>
                                <div className="col-md-6" style={{display: 'flex'}}>
                                    <div>Name: {treatment.beneficiary_surname} {treatment.beneficiary_first_name}</div>
                                    <div>Age: {treatment.beneficiary_age}</div>
                                </div>
                            </div>
                        )}
                   
                        <div className="row">
                            <div className="col-md-12">
                                <Nav tabs>
                                    <NavItem>
                                        <NavLink
                                            className={classnames({active: this.state.activeTab === "diagnosis"})}
                                            onClick={() => {toggle("diagnosis")}}>
                                            Diagnosis
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            className={classnames({active: this.state.activeTab === "services"})}
                                            onClick={() => {toggle("services")}}>
                                            Order & Procedure
                                        </NavLink>
                                    </NavItem>
                                </Nav>
                                <TabContent activeTab={this.state.activeTab}>
                                    <TabPane tabId="diagnosis">
                                        <br />
                                        <DiagnosisForm onSubmit={this.handleSubmit} appendDiagnosis={this.appendDiagnosis}/>
                                        <div>{selectedDiagnosis}</div>
                                    </TabPane>
                                    <TabPane tabId="services">
                                        <br />
                                        <ReferAddForm 
                                            onSubmit={this.handleSubmit} 
                                            submittingForm={this.state.requestingForm} 
                                            appendServices={this.appendServices} 
                                            treatmentcase_id={this.props.match.params.treatmentcase_id}  
                                        />
                                        <div>{selectedServices}</div>
                                    </TabPane>
                                </TabContent>
                            </div>
                        </div>
                    </div>
                </Card>
            );

            button = (
                <div className="col-md-12">
                    <CustomButton 
                        onClick={this.submitRefererHandler} 
                        submittingForm={this.state.requestingForm}
                    >Submit</CustomButton> 
                </div>
            )

            print = (<React.Fragment></React.Fragment>);
        }

        if(this.state.showPrint) {
            let quantity = document.getElementsByName('quantity[]');
            let services = this.state.selectedArray.map((selected_service, index) => {
                return (
                    <tr>
                        <td>{index+1}</td>
                        <td>{selected_service.label}</td>
                        <td>{ selected_service.type === 'P' ? 'Primary' : (selected_service.type === 'S' ? 'Secondary' : 'Tertiary' ) }</td>
                        <td>{quantity[index].value || 1}</td>
                        <td>{ selected_service.type === 'P' ? 'Capitated' : 'PA Code' }</td>
                    </tr>
                );
            });


            selectedServices = (
                <div className="table-responsive-sm">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>S/N</th>
                                <th>Service</th>
                                <th>Category</th>
                                <th>quantity</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>{services}</tbody>
                    </table>
                </div>
            );

            button = (
                <div className={styles.actions}></div>
            )

            container = (
                <React.Fragment>
                    <Card style={{width: '100%'}}>
                        <div style={{marginBottom: '20px'}}>
                            <div className="row">
                                <div className="col-md-6">
                                    <h4>Encounter <small>1022020200202 {get_treatment_status === 200 && treatment.date}</small></h4>
                                </div>
                                <div className="col-md-6 text-right">Osun Health Insurance Scheme</div>
                            </div>
                        </div>
                        <div>
                            <div className="row">
                                <div className="col-md-9">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <h5>PATIENT</h5>
                                            <table className="table table-striped">
                                                <tr><th>Name:</th><td>{this.props.refer.beneficiary_surname} {this.props.refer.beneficiary_first_name} {this.props.refer.beneficiary_other_name}</td></tr>
                                                <tr><th>ID:</th><td>{this.props.refer.beneficiary_enrollee_id}</td></tr>
                                                <tr><th>Age: { this.props.refer.beneficiary_age && (<div>Age - {this.props.refer.beneficiary_age}</div>)}</th></tr>
                                            </table>
                                        </div>
                                        <div className="col-md-6">
                                            <h5>PROVIDER</h5>
                                            <table className="table table-striped">
                                                <tr><th>Provider Referred To: </th><td>{this.props.refer.provider_name}</td></tr>
                                                <tr><th>Provider Referred From: </th><td>{this.props.active.organization_profile.name}</td></tr>
                                                <tr><th>Referred Date: </th><td>{moment().format('MMMM Do YYYY, h:mm:ss a') }</td></tr>
                                                <tr><th>Status: </th><td>Pending</td></tr>
                                                { this.props.refer.status !== "NOT_PROCESSED" && (
                                                    <tr>
                                                        <th>Referred Code:</th>
                                                        <td>{this.props.refer.referral_code}</td>
                                                    </tr>      
                                                )}
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    {this.props.refer.beneficiary_picture && (
                                        <div className="pull-right">
                                            <img src={this.props.refer.beneficiary_picture} alt="pics" />
                                        </div>
                                    )}
                                </div>  
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    { selectedServices }
                                </div>
                            </div>
                        </div>
                    </Card>
                </React.Fragment>
            );

            print = (
                <ReactToPrint
                    trigger={() => <div><CustomButton>Print Out</CustomButton></div>}
                    content={() => this.componentRef}
                />
            );
        }


        return (
            <DashboardLayout>
                <Loader>
                    <LayoutContentWrapper>
                        <LayoutContent>
                            <div className="row">
                                <div className="col-md-6">
                                    <Breadcrumb links={[
                                        {
                                            url: '/dashboard/referral_all',
                                            name: 'Add Referral'
                                        },
                                    ]} />
                                </div>
                            </div><hr/>
                            <React.Fragment>
                                <div ref={el => (this.componentRef = el)}>
                                    {container}
                                    {button}
                                </div>
                                {print}
                            </React.Fragment>
                        </LayoutContent>
                    </LayoutContentWrapper>
                </Loader>
            </DashboardLayout>
        );
    }
}

const mapStateToProps = state => ({
    active: state.ChoseRoleReducer.role,
    referrer_id: state.AuthReducer.id,
    referrer_name: state.AuthReducer.name,
    user: state.ReferReducer.user,
    role_users: state.ReferReducer.role_users,
    get_refer_query_status: state.ReferReducer.get_refer_query_status,
    refer: state.ReferReducer.refer,
    store_refer_status: state.ReferReducer.store_refer_status,
    msg: state.ReferReducer.refer_msg,
    treatment: state.TreatmentCaseReducer.treatment,
    get_treatment_status: state.TreatmentCaseReducer.get_treatment_status,
});

const mapDispatchToProps = dispatch => ({
    resetStore: () => dispatch(resetStore()),
    reset: payload => dispatch(reset(payload)),
    resetGetQuery: () => dispatch(resetGetQuery()),
    getQuery: payload => dispatch(getQuery(payload)),
    storeRefer: payload => dispatch(storeRefer(payload)),
    getTreatment: payload => dispatch(getTreatment(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReferAdd);