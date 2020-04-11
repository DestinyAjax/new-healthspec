import React, { Component } from 'react';
import swal from 'sweetalert';
import moment from 'moment';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap'
import { reset } from 'redux-form';
import {Card} from 'antd';
import { connect } from 'react-redux';
import ReactToPrint from 'react-to-print';
import classnames from 'classnames';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import LayoutContent from '@iso/components/utility/layoutContent';
import DashboardLayout from '../../../containers/Dashboard/Dashboard';
import Breadcrumb from "../../../ui/Breadcrumb";
import Loader from '../../../ui/Loader/Loader.Component';
import NoteForm from '../../../ui/forms/NoteForm';
import PreAuthAddForm from '../../../ui/forms/PreAuthAddForm';
import DiagnosisForm from '../../../ui/forms/DiagnosisForm';
import ReferAddForm from '../../../ui/forms/ReferAddForm';
import CustomButton from '../../../ui/CustomButton';
import { getQuery, resetGetQuery, storeRefer, resetStore } from '../../../shared/actions/Refer.action';
import { getEnrollee } from "../../../shared/actions/Enrollee.action";

class PreAuthAdd extends Component {

    state = {
        note: '',
        showSummary: false,
        showPrint: false,
        submittingForm: false,
        requestingForm: false,
        selectedPreAuthArray: [],
        selectedReferArray: [],
        selectedReferOutOfStationArray: [],
        diagnosisArray: [],
        beneficiary_id: null,
        activeTab: "diagnosis",
        setActiveTab: "diagnosis",
        tab: "preauth",
        setTab: "preauth",
        provider_id: null,
        provider_name: '',
        preauth_services: [],
        refer_services: [],
        show_refer_and_out_of_station: true,
        visit_date: moment(new Date()).format('DD/MM/YYYY'),
    }

    componentDidMount() {
        this.setState({
            beneficiary_id: this.props.match.params.slug
        });
        this.props.getEnrollee(this.props.match.params.slug);
    }

    setActiveTab = tab => {
        this.setState({
          activeTab: tab
        });
    };

    switchActiveTab = tab => {
        this.setState({
          tab: tab
        });
    };

    showNotification = async props => {
        if (props.store_refer_status && props.store_refer_status === 200) {
            this.props.reset('PreAuthAddForm');
            let alert = await swal({
                title: "Good job!",
                text: `Please wait for authorization code!`,
                icon: "success",
                closeOnClickOutside: false
            });

            if (alert) {
                this.setState({
                    showPrint: true
                });
                this.props.resetStore();
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
                this.setState({
                    selectedPreAuthArray: [],
                    selectedReferOutOfStationArray: [],
                    diagnosisArray: [],
                    preauth_services: [],
                    refer_services: []
                });
                let quantity = document.getElementsByName('quantity[]')
                let refer_quantity = document.getElementsByName('refer_quantity[]')

                quantity.forEach((q, index) => {
                    q.value = ''
                    refer_quantity[index].value = ''
                })
                this.props.resetStore();
            }
        }
        this.setState({
            requestingForm: false
        })
    }

    componentWillReceiveProps(nextProps) {
        this.showNotification(nextProps);
    }

    handleSubmit = () => {
        this.setState({
            showSummary: true
        });
    }

    appendOutOfStationReferServices = e => {
        if (Array.isArray(e)){
            this.setState({
                requestingForm: false,
                showPrint: false,
                selectedReferOutOfStationArray: e,
                showSummary: true,
                show_refer_and_out_of_station: false
            });
        }
        if(e.length < 1) {
            this.setState({
                requestingForm: false,
                showPrint: false,
                showSummary: false,
                show_refer_and_out_of_station: true
            });
            return false;
        }
    }

    appendServices = e => {
        if (Array.isArray(e)){
            this.setState({
                requestingForm: false,
                showPrint: false,
                selectedPreAuthArray: e,
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
    onChange = e => {
        this.setState({
            visit_date : e.visit_date || this.state.visit_date,
            provider_id: e.value || this.state.provider_id,
            provider_name: e.label || this.state.provider_name
        })
    }

    notification = async(title = '', text, icon='info') => {
        swal({
            title: title,
            text: text,
            icon: icon,
            closeOnClickOutside: false
        });
    }

    submitRefererHandler = () => {
        let quantity = document.getElementsByName('quantity[]');
        let refer_quantity = document.getElementsByName('refer_quantity[]');
        let services = this.state.selectedPreAuthArray.map((selected_service, index) => {
            return {
                mode: this.state.tab,
                id: selected_service.value,
                quantity: parseInt(quantity[index].value) || 1
            }
        })
        let services_refer = this.state.selectedReferOutOfStationArray.map((selected_service, index) => {
            return {
                mode: this.state.tab,
                id: selected_service.value,
                quantity: parseInt(refer_quantity[index].value) || 1
            }
        })
        let diagnosis = this.state.diagnosisArray.map((selected_service, index) => {
            return  selected_service.value
        })
        this.setState({
            preauth_services: services,
            refer_services: services_refer,
        });

        let data = {
            visit_date: moment(this.state.visit_date).format('DD/MM/YYYY'),
            provider_id: this.props.active.organization_profile_id,
            refer_plan_service_id: JSON.stringify(services_refer), //
            beneficiary_role_user_id: this.state.beneficiary_id,
            plan_service_id: JSON.stringify(services),
            refer_provider_id: this.state.provider_id,
            diagnosis: JSON.stringify(diagnosis),
            note: this.state.note,
        }


        if((diagnosis.length < 1)){
            this.notification("an error occured","diagnosis can not be empty",'warning');
            return false;
        }
        if ((this.state.tab === "refer_out_of_station" || this.state.tab === "refer") && (this.state.provider_id === null)) {
            this.notification("an error occured","you must pick a provider to refer to",'warning');
            return false;            
        }


        this.setState({
            requestingForm: true
        }, () => {
            return this.props.storeRefer(data);
        });
    }

    getNote = value => {
        return this.setState({
            note: value
        });
    }

    render() {

        let container, button, print, selectedPreAuthServices, selectedReferServices, selectedReferOutOfStationServices,selectedDiagnosis;
        let { enrollee, status, store_refer_status } = this.props;

        const toggle = tab => {
            if (this.state.activeTab !== tab) this.setActiveTab(tab);
        };

        const toggles = tab => {
            if (this.state.tab !== tab) this.switchActiveTab(tab);
        };

        if (this.state.selectedPreAuthArray && this.state.selectedPreAuthArray.length > 0) {
            let services = this.state.selectedPreAuthArray.map((selected_service, index) => {
                return (
                    <tr>
                        <td>{index+1}</td>
                        <td>{selected_service.label}</td>
                        <td>{ selected_service.type === 'P' ? 'Primary' : (selected_service.type === 'S' ? 'Secondary' : 'Tertiary' ) }</td>
                        <td><input type="number" name="quantity[]" min="1" placeholder="1" /></td>
                        <td>{ selected_service.price }</td>
                        <td>{ selected_service.type === 'P' ? 'Capitation' : 'PA Code' }</td>
                    </tr>
                );
            });

            selectedPreAuthServices = (
                <div className="table-responsive-sm">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th className={'text-center'}>S/N</th>
                                <th>Service</th>
                                <th>Category</th>
                                <th className={'text-center'}>quantity</th>
                                <th className={'text-right'}>Price</th>
                                <th>Payment Type</th>
                            </tr>
                        </thead>
                        <tbody>{services}</tbody>
                    </table>
                </div>
            );
        }


        if (this.state.selectedReferOutOfStationArray && this.state.selectedReferOutOfStationArray.length > 0) {
            let service_refer = this.state.selectedReferOutOfStationArray.map((selected_service, index) => {
                let payment_status = selected_service.type === 'P' ? 'Capitation' : 'PA Code';

                if (this.state.tab === 'refer_out_of_station') {
                    payment_status = 'PA Code';
                }

                return (
                    <tr>
                        <td className={'text-center'}>{index+1}</td>
                        <td>{selected_service.label}</td>
                        <td>{ selected_service.type === 'P' ? 'Primary' : (selected_service.type === 'S' ? 'Secondary' : 'Tertiary' ) }</td>
                        <td className={'text-center'}><input type="number" name="refer_quantity[]" min="1" placeholder="1" /></td>
                        <td className={'text-right'}>{ selected_service.price }</td>
                        <td>{ payment_status }</td>
                    </tr>
                );
            });


            selectedReferOutOfStationServices = (
                <div className="table-responsive-sm">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th className={'text-center'}>S/N</th>
                                <th>Service</th>
                                <th>Category</th>
                                <th className={'text-center'}>quantity</th>
                                <th className={'text-right'}>Price</th>
                                <th>Payment Type</th>
                            </tr>
                        </thead>
                        <tbody>{service_refer}</tbody>
                    </table>
                </div>
            );
        }

        if (this.state.diagnosisArray && this.state.diagnosisArray.length > 0) {
            let diagnosis = this.state.diagnosisArray.map((selected_service, index) => {
                return (
                    <li>{selected_service.label}</li>
                );
            });

            selectedDiagnosis = (
                <div>
                    <h4>Diagnosis</h4>
                    <ol>{ diagnosis }</ol>
                </div>
            );
        }


        let refer_and_out_of_station_header = (
            <React.Fragment>
                <NavItem>
                    <NavLink
                        className={classnames({active: this.state.tab === "refer"})}
                        onClick={() => { toggles("refer")}}>
                        Refer Out (Secondary Service)
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({active: this.state.tab === "refer_out_of_station"})}
                        onClick={() => {toggles("refer_out_of_station")}}>
                        Out of Station
                    </NavLink>
                </NavItem>
            </React.Fragment>
        );

        let refer_and_out_of_station_body_one = (
            <React.Fragment>
                <TabPane tabId="refer">
                    <br />
                    <Card style={{width: '100%'}}>
                        <ReferAddForm 
                            onSubmit={this.handleSubmit} 
                            onChange={this.onChange} 
                            appendReferServices={this.appendOutOfStationReferServices} 
                            beneficiary_role_user_id={this.props.match.params.slug} 
                            role_user_id={this.props.active.id} allow_out_of_station={false} 
                        />
                    </Card>
                </TabPane>
                <TabPane tabId="refer_out_of_station">
                    <br />
                    <Card style={{width: '100%'}}>
                        <ReferAddForm 
                            onSubmit={this.handleSubmit} 
                            onChange={this.onChange} 
                            appendReferServices={this.appendOutOfStationReferServices} 
                            beneficiary_role_user_id={this.props.match.params.slug} 
                            role_user_id={this.props.active.id} allow_out_of_station={true} 
                        />
                    </Card> 
                </TabPane>
            </React.Fragment>
        );

        let refer_and_out_of_station_body_two = (
            <React.Fragment>
                <TabPane tabId="refer">
                    <br />
                    <Card style={{width: '100%'}}>
                        <ReferAddForm 
                            onSubmit={this.handleSubmit} 
                            onChange={this.onChange} 
                            appendReferServices={this.appendOutOfStationReferServices} 
                            beneficiary_role_user_id={this.props.match.params.slug} 
                            role_user_id={this.props.active.id} allow_out_of_station={false}   
                        />
                        { selectedReferOutOfStationServices }
                    </Card>
                </TabPane>
                <TabPane tabId="refer_out_of_station">
                    <br />
                    <Card style={{width: '100%'}}>
                        <ReferAddForm 
                            onSubmit={this.handleSubmit} 
                            onChange={this.onChange} 
                            appendReferServices={this.appendOutOfStationReferServices} 
                            beneficiary_role_user_id={this.props.match.params.slug} 
                            role_user_id={this.props.active.id} allow_out_of_station={true} 
                        />
                        { selectedReferOutOfStationServices }
                    </Card>
                </TabPane>
            </React.Fragment>
        );

        if (!this.state.show_refer_and_out_of_station) {
            let active_refer_out_of_station_header = (
                <NavItem>
                    <NavLink
                        className={classnames({ active: this.state.tab === "refer_out_of_station" })}
                        onClick={() => {toggles("refer_out_of_station")}}>
                        Out of Station
                    </NavLink>
                </NavItem>
            );

            let active_refer_and_out_of_station_body_one = (
                <TabPane tabId="refer_out_of_station">
                    <br />
                    <Card style={{width: '100%'}}>
                        <ReferAddForm 
                            onSubmit={this.handleSubmit} 
                            onChange={this.onChange} 
                            appendReferServices={this.appendOutOfStationReferServices} 
                            beneficiary_role_user_id={this.props.match.params.slug} 
                            role_user_id={this.props.active.id} allow_out_of_station={true} 
                        />
                    </Card>
                </TabPane>
            );

            let active_refer_and_out_of_station_body_two = (
                <TabPane tabId="refer_out_of_station">
                    <br />
                    <Card style={{width: '100%'}}>
                        <ReferAddForm 
                            onSubmit={this.handleSubmit} 
                            onChange={this.onChange} 
                            appendReferServices={this.appendOutOfStationReferServices} 
                            beneficiary_role_user_id={this.props.match.params.slug} 
                            role_user_id={this.props.active.id} 
                            allow_out_of_station={true} 
                        />
                        { selectedReferOutOfStationServices }
                    </Card>
                </TabPane>
            );

            if (this.state.tab === 'refer') {
                active_refer_out_of_station_header = (
                    <NavItem>
                        <NavLink
                            className={classnames({active: this.state.tab === "refer"})}
                            onClick={() => {toggles("refer")}}>
                            Refer Out (Secondary Service)
                        </NavLink>
                    </NavItem>
                );

                active_refer_and_out_of_station_body_one = (
                    <TabPane tabId="refer">
                        <br />
                        <Card style={{width: '100%'}}>
                            <ReferAddForm 
                                onSubmit={this.handleSubmit} 
                                onChange={this.onChange} 
                                appendReferServices={this.appendOutOfStationReferServices} 
                                beneficiary_role_user_id={this.props.match.params.slug} 
                                role_user_id={this.props.active.id} allow_out_of_station={false} 
                            />
                        </Card>
                    </TabPane>
                );

                active_refer_and_out_of_station_body_two = (
                    <TabPane tabId="refer">
                        <br />
                        <Card style={{width: '100%'}}>
                            <ReferAddForm 
                                onSubmit={this.handleSubmit} 
                                onChange={this.onChange} 
                                appendReferServices={this.appendOutOfStationReferServices} 
                                beneficiary_role_user_id={this.props.match.params.slug} 
                                role_user_id={this.props.active.id} 
                                allow_out_of_station={false} 
                            />
                            { selectedReferOutOfStationServices }
                        </Card>
                    </TabPane>
                );
            }


            refer_and_out_of_station_header = (
                <React.Fragment>
                    { active_refer_out_of_station_header }
                </React.Fragment>
            );

            refer_and_out_of_station_body_one = (
                <React.Fragment>
                    { active_refer_and_out_of_station_body_one }
                </React.Fragment>
            );

            refer_and_out_of_station_body_two = (
                <React.Fragment>
                    { active_refer_and_out_of_station_body_two }
                </React.Fragment>
            );
        }

        if (!this.state.showSummary) {
            container = (
                <Card style={{width: '100%'}}>
                    <div style={{marginBottom: '30px'}}>
                        <h4>New Encounter <small>Ref ID <strong> :{Math.random()} </strong></small></h4>
                        <span className="pull-right"> <strong>Status:</strong> Osun Health Insurance Scheme</span>
                    </div>
                    <Card style={{width: '100%',marginBottom: '30px'}}>
                        {status === 200 && (
                            <div className="row mb-4">
                                <div className="col-md-3 col-sm-12 col-xs-12">
                                    <img alt={enrollee.name} className="rounded img-thumbnail" src={enrollee.picture} />
                                </div>
                                <div className="col-md-5 col-xs-12 col-sm-12">
                                    <h6 className="mb-3">Personal Details:</h6>
                                    <table className="table-striped">
                                        <tr><th>Name: </th><td>{enrollee.title}. {enrollee.surname} {enrollee.first_name} {enrollee.other_name}</td></tr>
                                        <tr><th>Age: </th><td>{enrollee.age} year(s) old,  ({enrollee.gender})</td></tr>
                                        <tr><th>Address: </th><td>{enrollee.address_of_residence}, {enrollee.city_of_residence}</td></tr>
                                        <tr><th>Group: </th><td>{enrollee.company_name}</td></tr>
                                        <tr><th>Email: </th><td>{enrollee.email}</td></tr>
                                        <tr><th>Phone: </th><td>{enrollee.primary_phone_number}</td></tr>
                                    </table>
                                </div>
                                <div className="col-sm-4">
                                    <h6 className="mb-3">Policy:</h6>
                                    <table className="table-striped">
                                        <tr><th>Name: </th><td>enrollee.policy_name} ({enrollee.is_dependant})</td></tr>
                                        <tr><th>Role: </th><td>{enrollee.role_name}</td></tr>
                                        <tr><th>Dependant Enrolled: </th><td>{enrollee.no_of_dependent}</td></tr>
                                        <tr><th>Dependant Allowed: </th><td>{enrollee.maximum_no_of_beneficiary_dependant}</td></tr>
                                        <tr><th>Policy Duration: </th><td>Active for {enrollee.policy_duration} months</td></tr>
                                        <tr><th>Expires On: </th><td>{enrollee.expires_at}</td></tr>
                                    </table>
                                </div>
                            </div>
                        )}
                    </Card>
                    <Card style={{width: '100%'}}>
                        <Nav tabs>
                            <NavItem>
                                <NavLink
                                    className={classnames({active: this.state.activeTab === "diagnosis"})}
                                    onClick={() => {toggle("diagnosis");}}>
                                    Diagnosis
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classnames({active: this.state.activeTab === "services"})}
                                    onClick={() => {toggle("services")}} >
                                    Order & Procedure
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent activeTab={this.state.activeTab}>
                            <TabPane tabId="diagnosis">
                                <br />
                                <DiagnosisForm 
                                    onSubmit={this.handleSubmit}  
                                    appendDiagnosis={this.appendDiagnosis} 
                                    onChange={this.onChange}/>
                            </TabPane>
                            <TabPane tabId="services">
                                <br />
                                <Nav tabs>
                                    <NavItem>
                                        <NavLink
                                            className={classnames({active: this.state.tab === "preauth"})}
                                            onClick={() => {toggles("preauth")}}>
                                            Treat Within (Primary Service)
                                        </NavLink>
                                    </NavItem>
                                    { refer_and_out_of_station_header }
                                </Nav>

                                <TabContent activeTab={this.state.tab}>
                                    <TabPane tabId="preauth">
                                        <br />
                                        <PreAuthAddForm 
                                            onSubmit={this.handleSubmit} 
                                            appendServices={this.appendServices} 
                                            beneficiary_role_user_id={this.props.match.params.slug}  
                                        />
                                    </TabPane>
                                    { refer_and_out_of_station_body_one }
                                </TabContent>
                            </TabPane>
                        </TabContent>
                    </Card>
                </Card>
            );
        }


        if (this.state.showSummary) {
            button = (
                <div className="row col-md-12">
                    <CustomButton onClick={this.submitRefererHandler} submittingForm={this.state.requestingForm}>Submit</CustomButton>
                </div>
            )

            container = (
                <Card style={{width: '100%'}}>
                    <div style={{marginBottom: '30px'}}>
                        <h4>Encounter Summary <small>Ref ID <strong> :{Math.random()} </strong></small></h4>
                        <span className="pull-right"> <strong>Status:</strong> Osun Health Insurance Scheme</span>
                    </div>
                    <Card style={{width: '100%'}}>
                        {status === 200 && (
                            <div className="row mb-4">
                                <div className="col-md-3 col-sm-12 col-xs-12">
                                    <img alt={enrollee.name} className="rounded img-thumbnail" src={enrollee.picture} />
                                </div>
                                <div className="col-md-5 col-sm-12 col-xs-12">
                                    <h6>Personal Details:</h6>
                                    <table className="table-striped">
                                        <tr><th>Name: </th><td>{enrollee.title}. {enrollee.surname} {enrollee.first_name} {enrollee.other_name}</td></tr>
                                        <tr><th>Age: </th><td>{enrollee.age} year(s) old,  ({enrollee.gender})</td></tr>
                                        <tr><th>Address: </th><td>{enrollee.address_of_residence}, {enrollee.city_of_residence}</td></tr>
                                        <tr><th>Group: </th><td>{enrollee.company_name}</td></tr>
                                        <tr><th>Email: </th><td>{enrollee.email}</td></tr>
                                        <tr><th>Phone: </th><td>{enrollee.primary_phone_number}</td></tr>
                                    </table>
                                </div>
                                <div className="col-sm-12 col-md-4 col-xs-12">
                                    <h6 className="mb-3">Policy:</h6>
                                    <table className="table-striped">
                                        <tr><th>Name: </th><td>enrollee.policy_name} ({enrollee.is_dependant})</td></tr>
                                        <tr><th>Role: </th><td>{enrollee.role_name}</td></tr>
                                        <tr><th>Dependant Enrolled: </th><td>{enrollee.no_of_dependent}</td></tr>
                                        <tr><th>Dependant Allowed: </th><td>{enrollee.maximum_no_of_beneficiary_dependant}</td></tr>
                                        <tr><th>Policy Duration: </th><td>Active for {enrollee.policy_duration} months</td></tr>
                                        <tr><th>Expires On: </th><td>{enrollee.expires_at}</td></tr>
                                    </table>
                                </div>
                            </div>
                        )}
                    </Card><br/>
                    <Card style={{width: '100%'}}>
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
                            <NavItem>
                                <NavLink
                                    className={classnames({active: this.state.activeTab === "note"})}
                                    onClick={() => {toggle("note")}}>
                                    Note
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent activeTab={this.state.activeTab}>
                            <TabPane tabId="diagnosis">
                                <br />
                                <DiagnosisForm 
                                    onSubmit={this.handleSubmit}  
                                    appendDiagnosis={this.appendDiagnosis} 
                                    onChange={this.onChange}/>
                                <div>{selectedDiagnosis}</div>
                            </TabPane>
                            <TabPane tabId="services">
                                <br />
                                <Nav tabs>
                                <NavItem>
                                    <NavLink
                                        className={classnames({active: this.state.tab === "preauth"})}
                                        onClick={() => {toggles("preauth")}}>
                                        Treat Within (Primary Service)
                                        </NavLink>
                                    </NavItem>
                                    { refer_and_out_of_station_header }
                                </Nav>
                                <TabContent activeTab={this.state.tab}>
                                    <TabPane tabId="preauth">
                                        <br />
                                        <PreAuthAddForm 
                                            onSubmit={this.handleSubmit} 
                                            submittingForm={this.state.requestingForm} 
                                            appendServices={this.appendServices} 
                                            beneficiary_role_user_id={this.props.match.params.slug}  />
                                        { selectedPreAuthServices }
                                    </TabPane>
                                    { refer_and_out_of_station_body_two}
                                </TabContent>
                            </TabPane>
                            <TabPane tabId="note">
                                <br />
                                <NoteForm getNote={this.getNote} />
                            </TabPane>
                        </TabContent>
                        {button}
                    </Card>
                </Card>
            );

            print = (
                <React.Fragment></React.Fragment>
            )
        }

        if(this.state.showPrint) {
            console.log(this.state.preauth_services)
            let services_preauth = this.state.selectedPreAuthArray.map((selected_service, index) => {
                return (
                    <tr>
                        <td>{index+1}</td>
                        <td>{selected_service.label}</td>
                        <td>{ selected_service.type === 'P' ? 'Primary' : (selected_service.type === 'S' ? 'Secondary' : 'Tertiary' ) }</td>
                        <td>{this.state.preauth_services[index].quantity || 1}</td>
                        <td>{ selected_service.price }</td>
                        <td>{ selected_service.type === 'P' ? 'Capitation' : 'PA Code' }</td>
                    </tr>
                );
            });

            let services_refer = this.state.selectedReferOutOfStationArray.map((selected_service, index) => {
                let payment_status = selected_service.type === 'P' ? 'Capitation' : 'PA Code';

                if (this.state.tab === 'refer_out_of_station') {
                    payment_status = 'PA Code';
                }

                return (
                    <tr>
                        <td>{index+1}</td>
                        <td>{selected_service.label}</td>
                        <td>{ selected_service.type === 'P' ? 'Primary' : (selected_service.type === 'S' ? 'Secondary' : 'Tertiary' ) }</td>
                        <td>{this.state.refer_services[index].quantity || 1}</td>
                        <td>{ selected_service.price }</td>
                        <td>{ payment_status }</td>
                    </tr>
                );
            });


            selectedPreAuthServices = (
                <Card style={{width: '100%'}}>
                    <h3>Treat Within</h3>
                    <table className={"table table-striped"}>
                        <thead>
                            <tr>
                                <th>S/N</th>
                                <th>Service</th>
                                <th>Category</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Payment Type</th>
                            </tr>
                        </thead>
                        <tbody>{services_preauth}</tbody>
                    </table>
                </Card>
            );

            selectedReferOutOfStationServices = (
                <Card style={{width: '100%'}}>
                    <h3> Referrals </h3>
                    <table className={"table table-striped"}>
                        <thead>
                            <tr>
                                <th>S/N</th>
                                <th>Service</th>
                                <th>Category</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Payment Type</th>
                            </tr>
                        </thead>
                        <tbody>{ services_refer }</tbody>
                    </table>
                </Card>
            );

            button = (<div className="actions"></div>);

            container = (
                <React.Fragment>
                    <Card style={{width: '100%'}}>
                        <div style={{marginBottom: '30px'}}>
                            <h4>Treatment Case <small>1022020200202 { status === 200 && enrollee.date}</small></h4>
                            <div className="pull-right">
                                Osun Health Insurance Scheme
                            </div>
                        </div>
                        <Card style={{width: '100%'}}>
                            <div className="row">
                                {store_refer_status === 200 && (
                                    <React.Fragment>
                                        <div className="col-md-5 col-xs-12 col-sm-12">
                                            <table className="table-striped">
                                                <tr><th>Patient Name: </th><td>{this.props.refer.beneficiary_surname} {this.props.refer.beneficiary_first_name} {this.props.refer.beneficiary_other_name}</td></tr>
                                                <tr><th>Patient's ID: </th><td>{this.props.refer.beneficiary_enrollee_id}</td></tr>
                                                <tr><th>Age: </th><td>{ this.props.refer.beneficiary_age && (<div>Age - {this.props.refer.beneficiary_age}</div>) }</td></tr>
                                                <tr><th>Dependant Allowed: </th><td>{enrollee.maximum_no_of_beneficiary_dependant}</td></tr>
                                                <tr><th>Policy Duration: </th><td>Active for {enrollee.policy_duration} months</td></tr>
                                                <tr><th>Expires On: </th><td>{enrollee.expires_at}</td></tr>
                                            </table>  
                                        </div>
                                        <div className="col-md-5 col-xs-12 col-sm-12">
                                            <table className="table-striped">
                                                <tr><th>Provider Name: </th><td>{this.props.refer.provider_name}</td></tr>
                                                {this.props.refer.provider_name !== this.props.active.organization_profile.name && (
                                                    <tr><th>Provider Referral Form: </th><td>{this.props.active.organization_profile.name}</td></tr>
                                                )}
                                                <tr><th>{this.state.tab === 'preauth' ? 'Treated Date' : 'Referred Date'}: </th><td>{moment().format('MMMM Do YYYY, h:mm:ss a') }</td></tr>
                                                <tr><th>Status: </th><td><div>Pending</div></td></tr>
                                                {this.props.refer.status !== "NOT_PROCESSED" &&(
                                                    <tr><th>Referred Code: </th><td>{this.props.refer.referral_code}</td></tr>
                                                )}
                                            </table> 
                                        </div>
                                        <div className="col-md-2 col-xs-12 col-sm-12">
                                            {this.props.refer.beneficiary_picture && (
                                                <div><img src={this.props.refer.beneficiary_picture} alt="pics" /></div>
                                            )}
                                        </div>
                                    </React.Fragment>
                                )}
                            </div><br/>
                            { selectedPreAuthServices }
                            { selectedReferOutOfStationServices }   
                        </Card>
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
                            {this.props.dependency_status === 200 && (
                                <React.Fragment>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <Breadcrumb links={[
                                                {
                                                    url: '/dashboard/preauth_all',
                                                    name: 'Add PreAuth'
                                                },
                                            ]} />
                                        </div>
                                    </div><hr/>
                                    <React.Fragment>
                                        <div ref={el => (this.componentRef = el)}>{container}</div>
                                        {print}
                                    </React.Fragment>
                                </React.Fragment>
                            )}
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
    enrollee: state.EnrolleeReducer.enrollee,
    status: state.EnrolleeReducer.get_enrollee_status
});

const mapDispatchToProps = dispatch => ({
    resetStore: () => dispatch(resetStore()),
    reset: payload => dispatch(reset(payload)),
    resetGetQuery: () => dispatch(resetGetQuery()),
    getQuery: payload => dispatch(getQuery(payload)),
    storeRefer: payload => dispatch(storeRefer(payload)),
    getEnrollee: payload => dispatch(getEnrollee(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PreAuthAdd);