import React, { Component } from 'react';
import swal from 'sweetalert';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import Spinner from '../../../ui/Spinner';
import LayoutContent from '@iso/components/utility/layoutContent';
import DashboardLayout from '../../../containers/Dashboard/Dashboard';
import Breadcrumb from "../../../ui/Breadcrumb";
import Loader from '../../../ui/Loader/Loader.Component';
import PolicyForm from '../../../ui/forms/PolicyForm';
import { getPlans } from '../../../shared/actions/Plan.action';
import { getAllType } from '../../../shared/actions/OrganizationProfile.action';
import { getPolicy, updatePolicy, resetUpdatePolicy } from '../../../shared/actions/Policy.action';

class PolicyAdd extends Component {

    state = {
        submittingForm: false,
    }

    componentDidMount() {
        this.props.getPlans();
        this.props.getAllType(3);
        this.props.getPolicy(this.props.match.params.slug);
    }

    handleSubmit = formData => {
        this.setState({
            submittingForm: true
        }, () => {
            formData['slug'] = this.props.match.params.slug;
            this.props.updatePolicy(formData);
        });
    }

    showNotification = async props => {
        if (props.status === 200) {
            this.setState({
                submittingForm: false
            });

            let alert = await swal({
                title: "Good job!",
                text: `${props.policy.name} was updated successfully!`,
                icon: "success",
                closeOnClickOutside: false
            });

            if (alert) {
                this.props.resetUpdatePolicy();
                this.props.history.push('/policy_all');
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        this.showNotification(nextProps);
    }

    componentWillUnmount() {
        this.props.resetUpdatePolicy();
    }

    render() {

        let formContainer = <Spinner />

        if (this.props.get_plan_status === 200 && this.props.get_organization_profiles_status === 200 && this.props.get_policy_status === 200) {

            let policy = this.props.policy;
            policy['is_active'] = this.props.policy.is_active_unformatted;

            formContainer = (
                <React.Fragment>
                    <div className="row">
                        <div className="col-md-12"> 
                            <PolicyForm
                                btnText="Update"
                                plans={this.props.plans}
                                onSubmit={this.handleSubmit}
                                initialValues={policy}
                                submittingForm={this.state.submittingForm}
                            />  
                        </div>
                    </div>
                </React.Fragment>
            );
        }

        return (
            <DashboardLayout>
                <Loader>
                    <LayoutContentWrapper>
                        <LayoutContent>  
                            <React.Fragment>
                                <div className="row">
                                    <div className="col-md-6">
                                        <h4>Create a Policy</h4>
                                    </div>
                                    <div className="col-md-6 text-right">
                                        <Link className="" to="/dashboard/policy_all">
                                            <button className="btn btn-sm btn-success" type="button">All Policies</button>
                                        </Link>
                                    </div> 
                                </div><hr/>
                                {formContainer}
                            </React.Fragment>
                        </LayoutContent>
                    </LayoutContentWrapper>
                </Loader>
            </DashboardLayout>
        );
    }
}

const mapStateToProps = state => ({
    plans: state.PlanReducer.plans,
    get_plan_status: state.PlanReducer.get_plans_status,
    get_plan_message: state.PlanReducer.get_plans_message,
    organization_profiles: state.OrganizationProfileReducer.organization_profiles,
    get_organization_profiles_status: state.OrganizationProfileReducer.get_organization_profiles_status,
    policy: state.PolicyReducer.policy,
    status: state.PolicyReducer.update_policy_status,
    get_policy_status: state.PolicyReducer.get_policy_status
});

const mapDispatchToProps = dispatch => ({
    getPlans: () => dispatch( getPlans() ),
    getAllType: payload => dispatch( getAllType(payload) ),
    resetUpdatePolicy: () => dispatch( resetUpdatePolicy() ),
    updatePolicy: payload => dispatch( updatePolicy(payload) ),
    getPolicy: payload => dispatch( getPolicy(payload) )
});

export default connect(mapStateToProps, mapDispatchToProps)(PolicyAdd);