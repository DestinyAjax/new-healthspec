import React, { Component } from 'react';
import swal from 'sweetalert';
import { reset } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import LayoutContent from '@iso/components/utility/layoutContent';
import DashboardLayout from '../../../containers/Dashboard/Dashboard';
import Breadcrumb from "../../../ui/Breadcrumb";
import PlanForm from '../../../ui/forms/PlanForm';
import Loader from '../../../ui/Loader/Loader.Component';
import { updatePlan, resetStorePlan, getPlan, resetUpdatePlan } from '../../../shared/actions/Plan.action';

class PlanEdit extends Component {

    state = {
        submittingForm: false,
    }

    handleSubmit = formData => {
        // this.setState({
        //     submittingForm: true
        // });
        formData['slug'] = this.props.match.params.slug;
        this.props.updatePlan(formData);
    }

    showNotification = async props => {
        if (props.update_plan_status === 200) {
            let alert = await swal({
                title: "Good job!",
                text: `${props.plan.name} was updated successfully!`,
                icon: "success",
                closeOnClickOutside: false
            });

            if (alert) {
                this.props.resetUpdatePlan();
                this.props.history.push('/dashboard/plan_all');
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        this.showNotification(nextProps);
    }

    componentDidMount() {
        this.props.getPlan(this.props.match.params.slug);
    }


    componentWillUnmount() {
        this.props.resetStorePlan();
    }

    render() {

        let container;

        if (this.props.status === 200) {

            let plan = this.props.plan;
            plan['is_active'] = this.props.plan.is_active_unformatted;

            container = (
                <div className="row">
                    <div className="col-md-6">
                        <div className="card card-body">
                            <PlanForm onSubmit={this.handleSubmit}
                                submittingForm={this.state.submittingForm}
                                btnText="Update"
                                initialValues={plan}
                            />
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <DashboardLayout>
                <Loader>
                    <LayoutContentWrapper>
                        <LayoutContent>  
                            <div className="row">
                                <div className="col-md-6">
                                    <h4>Create a plan</h4>
                                </div>
                                <div className="col-md-6 text-right">
                                    <Link className="" to="/dashboard/plan_all">
                                        <button className="btn btn-sm btn-success" type="button">All Plan</button>
                                    </Link>
                                </div> 
                            </div><hr/>
                            {container}
                        </LayoutContent>
                    </LayoutContentWrapper>
                </Loader>
            </DashboardLayout>
        );
    }
}

const mapStateToProps = state => ({
    plan: state.PlanReducer.plan,
    status: state.PlanReducer.get_plan_status,
    update_plan_status: state.PlanReducer.update_plan_status,
});

const mapDispatchToProps = dispatch => ({
    getPlan: payload => dispatch(getPlan(payload)),
    resetStorePlan: () => dispatch( resetStorePlan() ),
    updatePlan: payload => dispatch( updatePlan(payload) ),
    resetUpdatePlan: () => dispatch( resetUpdatePlan() )
});

export default connect(mapStateToProps, mapDispatchToProps)(PlanEdit);