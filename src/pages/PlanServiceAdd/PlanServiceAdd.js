import React, { Component } from 'react';
import swal from 'sweetalert';
import {Card} from 'antd';
import { reset } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import LayoutContent from '@iso/components/utility/layoutContent';
import DashboardLayout from '../../containers/Dashboard/Dashboard';
import Breadcrumb from "../../ui/Breadcrumb";
import Loader from '../../ui/Loader/Loader.Component';
import AddPlanServiceForm from '../../ui/forms/AddPlanServiceForm';
import PlanServiceBatchForm from '../../ui/forms/PlanServiceBatchForm';
import { resetStorePlanService, storePlanService, storeBatchPlanService, getDependencies } from '../../shared/actions/PlanService.action';

class PlanServiceAdd extends Component {

    state = {
        submittingForm: false,
        submittingBatchForm: false
    }

    handleBatchSubmit = formData => {
        this.setState({
            submittingBatchForm: true
        }, () => {
            return this.props.storeBatchPlanService({
                data: {
                    plan_id: formData.plan_id
                },
                picture: formData.services
            });
        });
    }

    handleSubmit = formData => {
        formData['service_id'] = formData['service_id'].value;
        this.setState({
            submittingForm: true
        }, () => {
            return this.props.storePlanService(formData);
        });
    }

    showNotification = async props => {
        if (props.status === 200) {
            this.props.reset('PlanServiceBatchForm');
            this.setState({
                submittingBatchForm: false
            });

            let alert = await swal({
                title: "Good job!",
                text: `plan services was uploaded successfully!`,
                icon: "success",
                closeOnClickOutside: false
            });

            if (alert) {
                this.props.resetStorePlanService();
            }
        }

        if (props.store_plan_service_status === 200) {
            this.props.reset('AddPlanServiceForm');
            this.setState({
                submittingForm: false
            });

            let alert = await swal({
                title: "Good job!",
                text: `Benefit and Tariff was uploaded successfully!`,
                icon: "success",
                closeOnClickOutside: false
            });

            if (alert) {
                this.props.resetStorePlanService();
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        this.showNotification(nextProps);
    }

    componentDidMount() {
        this.props.getDependencies();
    }

    render() {

        return (
            <DashboardLayout>
                <Loader>
                    <LayoutContentWrapper>
                        <LayoutContent>  
                            <div className="row">
                                <div className="col-md-6">
                                    <h4>Create Benefit & Tariff</h4>
                                </div>
                                <div className="col-md-6 text-right">
                                    <Link className="" to="/dashboard/plan_service_all">
                                        <button className="btn btn-sm btn-success" type="button">All Plan Services</button>
                                    </Link>
                                </div> 
                            </div><hr/>
                            {this.props.dependency_status === 200 && (
                                <React.Fragment>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <Card title="Add Benefit and Tariff" style={{width: '100%'}}>
                                                <AddPlanServiceForm
                                                    plans={this.props.plans}
                                                    onSubmit={this.handleSubmit}
                                                    services={this.props.services}
                                                    questions={this.props.questions}
                                                    submittingForm={this.state.submittingForm}
                                                />
                                            </Card>
                                        </div>
                                        <div className="col-md-6">
                                            <Card title="Add Services to Plan (Batch)" style={{width: '100%'}}> 
                                                <div className="row" style={{marginBottom: '20px'}}>
                                                    <div className="col-md-6"></div>
                                                    <div className="col-md-6 text-right">
                                                        <a className="downloadLink" href={require('../../assets/files/plan-service-new-format-upload.csv')} download>Download format</a>
                                                    </div>
                                                </div>
                                                <PlanServiceBatchForm 
                                                    plans={this.props.plans} 
                                                    onSubmit={this.handleBatchSubmit} 
                                                    submittingForm={this.state.submittingBatchForm} 
                                                />
                                            </Card>
                                        </div>
                                    </div>
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
    plan_service: state.PlanServiceReducer.plan_service,
    status: state.PlanServiceReducer.store_batch_plan_service_status,
    message: state.PlanServiceReducer.store_batch_plan_service_message,
    store_plan_service_status: state.PlanServiceReducer.store_plan_service_status,
    plans: state.PlanServiceReducer.plans,
    services: state.PlanServiceReducer.services,
    questions: state.PlanServiceReducer.questions,
    dependency_status: state.PlanServiceReducer.dependency_status,
});

const mapDispatchToProps = dispatch => ({
    reset: payload => dispatch(reset(payload)),
    getDependencies: () => dispatch(getDependencies()),
    resetStorePlanService: () => dispatch(resetStorePlanService()),
    storePlanService: payload => dispatch(storePlanService(payload)),
    storeBatchPlanService: payload => dispatch( storeBatchPlanService(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(PlanServiceAdd);