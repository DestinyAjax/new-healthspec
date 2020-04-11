import React, { Component } from 'react';
import swal from 'sweetalert';
import { reset } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import Spinner from '../../../ui/Spinner';
import LayoutContent from '@iso/components/utility/layoutContent';
import DashboardLayout from '../../../containers/Dashboard/Dashboard';
import Breadcrumb from "../../../ui/Breadcrumb";
import Loader from '../../../ui/Loader/Loader.Component';
import PolicyForm from '../../../ui/forms/PolicyForm';
import { policyCreateDependency, storePolicy, resetStorePolicy } from '../../../shared/actions/Policy.action';

class PolicyAdd extends Component {

    state = {
        submittingForm: false,
    }

    componentDidMount() {
        this.props.policyCreateDependency();
    }

    handleSubmit = formData => {
        this.setState({
            submittingForm: true
        }, () => {
            this.props.storePolicy(formData);
        });
    }

    showNotification = async props => {
        if (props.status === 200) {
            this.props.reset('PolicyForm');
            this.setState({
                submittingForm: false
            });

            let alert = await swal({
                title: "Good job!",
                text: `${props.policy.name} was created successfully!`,
                icon: "success",
                closeOnClickOutside: false
            });

            if (alert) {
                this.setState({
                    submittingForm: false
                });
                this.props.resetStorePolicy();
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
                            {this.props.dependency_status === 200 && (
                                <React.Fragment>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <h4>Policy Upload</h4>
                                        </div>
                                        <div className="col-md-6 text-right">
                                            <Link className="" to="/dashboard/policy_all">
                                                <button className="btn btn-sm btn-success" type="button">All Policies</button>
                                            </Link>
                                        </div> 
                                    </div><hr/>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <PolicyForm
                                                plans={this.props.plans}
                                                companies={this.props.organization_profiles}
                                                onSubmit={this.handleSubmit}
                                                submittingForm={this.state.submittingForm}
                                                btnText="Submit"
                                            />
                                        </div>
                                    </div>
                                </React.Fragment>
                            )}
                            {!this.props.dependency_status === 200 && (
                                <Spinner />
                            )}
                            
                        </LayoutContent>
                    </LayoutContentWrapper>
                </Loader>
            </DashboardLayout>
        );
    }
}

const mapStateToProps = state => ({
    plans: state.PolicyReducer.dependency_plans,
    organization_profiles: state.PolicyReducer.dependency_organization_profiles,
    dependency_status: state.PolicyReducer.get_dependency_status,
    policy: state.PolicyReducer.policy,
    status: state.PolicyReducer.store_policy_status,
    message: state.PolicyReducer.store_policy_message,
});

const mapDispatchToProps = dispatch => ({
    reset: payload => dispatch( reset(payload) ),
    resetStorePolicy: () => dispatch( resetStorePolicy() ),
    storePolicy: payload => dispatch( storePolicy(payload) ),
    policyCreateDependency: () => dispatch(policyCreateDependency()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PolicyAdd);