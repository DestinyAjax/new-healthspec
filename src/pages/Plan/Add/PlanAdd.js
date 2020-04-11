import React, { Component } from 'react';
import swal from 'sweetalert';
import {Card} from 'antd';
import { reset } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import LayoutContent from '@iso/components/utility/layoutContent';
import DashboardLayout from '../../../containers/Dashboard/Dashboard';
import Breadcrumb from "../../../ui/Breadcrumb";
import PlanForm from '../../../ui/forms/PlanForm';
import Loader from '../../../ui/Loader/Loader.Component';
import { storePlan, resetStorePlan } from '../../../shared/actions/Plan.action';

class PlanAdd extends Component {

    state = {
        submittingForm: false,
    }

    handleSubmit = formData => {
        this.setState({
            submittingForm: true
        });
        this.props.storePlan(formData);
    }

    showNotification = async props => {
        if (props.status === 200) {
            this.props.reset('PlanForm');
            let alert = await swal({
                title: "Good job!",
                text: `${props.plan.name} was created successfully!`,
                icon: "success",
                closeOnClickOutside: false
            });

            if (alert) {
                this.setState({
                    submittingForm: false
                });
                this.props.resetStorePlan();
            }
        }

        if (props.status === 522) {
            // this.props.reset('PlanForm');
            let alert = await swal({
                title: "Not created!",
                text: `No internet connection!`,
                icon: "error",
                closeOnClickOutside: false
            });

            if (alert) {
                this.setState({
                    submittingForm: false
                });
                this.props.resetStorePlan();
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        this.showNotification(nextProps);
    }

    render() {

        return (
            <DashboardLayout>
                <Loader>
                    <LayoutContentWrapper>
                        <LayoutContent>  
                            <div className="row">
                                <div className="col-md-6">
                                    <h4>Plan Upload</h4>
                                </div>
                                <div className="col-md-6 text-right">
                                    <Link className="" to="/dashboard/plan_all">
                                        <button className="btn btn-sm btn-success" type="button">All Plan</button>
                                    </Link>
                                </div> 
                            </div><hr/>
                            <div className="row">
                                <div className="col-md-6">
                                    <Card style={{width: '100%'}}>
                                        <PlanForm 
                                            onSubmit={this.handleSubmit} 
                                            submittingForm={this.state.submittingForm} 
                                            btnText="Submit"
                                        />
                                    </Card>
                                </div>
                            </div>
                        </LayoutContent>
                    </LayoutContentWrapper>
                </Loader>
            </DashboardLayout>
        );
    }
}

const mapStateToProps = state => ({
    plan: state.PlanReducer.plan,
    status: state.PlanReducer.store_plan_status,
    message: state.PlanReducer.store_plan_message,
});

const mapDispatchToProps = dispatch => ({
    reset: payload => dispatch( reset(payload) ),
    resetStorePlan: () => dispatch( resetStorePlan() ),
    storePlan: payload => dispatch( storePlan(payload) ),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlanAdd);