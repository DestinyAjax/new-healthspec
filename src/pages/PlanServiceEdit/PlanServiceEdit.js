import React, { Component } from 'react';
import swal from 'sweetalert';
import { reset } from 'redux-form';
import {Card} from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import LayoutContent from '@iso/components/utility/layoutContent';
import DashboardLayout from '../../containers/Dashboard/Dashboard';
import Breadcrumb from "../../ui/Breadcrumb";
import Loader from '../../ui/Loader/Loader.Component';
import PlanServiceForm from '../../ui/forms/PlanServiceForm';
import { getPlanService, resetGetPlanService, updatePlanService, resetUpdatePlanService } from '../../shared/actions/PlanService.action';

class PlanServiceEdit extends Component {

    state = {
        submittingForm: false,
        planService: null,
        questions: [],
    }

    componentDidMount() {
        this.props.getPlanService(this.props.match.params.slug);
    }

    handleSubmit = formData => {
        this.setState({
            submittingForm: true,
        }, () => {
            formData['slug'] = this.props.plan_service.slug;
            formData['plan_id'] = this.props.plan_service.plan.id;
            formData['service_id'] = this.props.plan_service.service.id;

            return this.props.updatePlanService(formData);
        });
    }

    async componentDidUpdate(prevProps, prevState) {
        if ((prevProps.get_plan_service_status !== this.props.get_plan_service_status) && (this.props.get_plan_service_status === 200)) {

            return this.setState({
                planService: {
                    limit: parseFloat(this.props.plan_service.limit),
                    price: parseFloat(this.props.plan_service.price),

                    payment_type: this.props.plan_service.payment_type,
                    payment_percentage: this.props.plan_service.payment_percentage,

                    limit_type: this.props.plan_service.limit_type,
                    limit_allowed: this.props.plan_service.limit_allowed,

                    
                    plan_id: this.props.plan_service.plan.name,
                    service_id: this.props.plan_service.service.name,
                }
            });

        }


        if ( (this.props.update_plan_service_status === 200) && (this.props.update_plan_service_status !== prevProps.update_plan_service_status) ) {
            this.setState({
                submittingForm: false
            });

            let alert = await swal({
                title: "Good job!",
                text: `Benefit and Tariff was updated successfully!`,
                icon: "success",
                closeOnClickOutside: false
            });

            if (alert) {
                this.props.resetUpdatePlanService();
                this.props.history.push('/dashboard/plan_service_all');
            }
        }

    }

    componentWillUnmount() {
        this.props.resetGetPlanService();
        this.props.resetUpdatePlanService();
    }

    render() {

        return (
            <DashboardLayout>
                <Loader>
                    <LayoutContentWrapper>
                        <LayoutContent>  
                            <div className="row">
                                <div className="col-md-6">
                                    <h4>Update Plan Service</h4>
                                </div>
                                <div className="col-md-6 text-right">
                                    <Link className="" to="/dashboard/plan_service_all">
                                        <button className="btn btn-sm btn-success" type="button">All Plan Services</button>
                                    </Link>
                                </div> 
                            </div><hr/>
                            {this.props.get_plan_service_status === 200 && (
                                <React.Fragment>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <Card style={{width: '100%'}}>
                                                <PlanServiceForm
                                                    btnText="Update"
                                                    onSubmit={this.handleSubmit}
                                                    initialValues={this.state.planService}
                                                    submittingForm={this.state.submittingForm}
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
    questions: state.PlanServiceReducer.plan_service_questions,
    get_plan_service_status: state.PlanServiceReducer.get_plan_service_status,
    update_plan_service_status: state.PlanServiceReducer.update_plan_service_status
});

const mapDispatchToProps = dispatch => ({
    resetGetPlanService: () => dispatch(resetGetPlanService()),
    getPlanService: payload => dispatch(getPlanService(payload)),
    resetUpdatePlanService: () => dispatch(resetUpdatePlanService()),
    updatePlanService: payload => dispatch(updatePlanService(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlanServiceEdit);