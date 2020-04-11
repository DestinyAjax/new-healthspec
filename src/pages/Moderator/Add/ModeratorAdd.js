import React, { Component } from 'react';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import { reset } from 'redux-form';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import LayoutContent from '@iso/components/utility/layoutContent';
import DashboardLayout from '../../../containers/Dashboard/Dashboard';
import ModeratorForm from '../../../ui/forms/ModeratorForm';
import { storeUser, resetStoreUser } from '../../../shared/actions/User.action';
import Loader from '../../../ui/Loader/Loader.Component';

class ModeratorAdd extends Component {

    state = {
        submittingForm: false,
    }

    handleSubmit = async formData => {
        const roles = {
            'HMO': 7,
            'PROVIDER': 8,
            'COMPANY': 9,
            'AGENT': 10,
            'BANK': 14,
        };

        formData['organization_profile_id'] = this.props.role.organization_profile.id;
        formData['role_id'] = roles[this.props.role.organization_profile.organization.name];


        if (formData.picture == null) {
            return await swal({
                text: `You must pick an image`,
                icon: "error",
                closeOnClickOutside: true
            });
        }


        this.setState({
            submittingForm: true
        }, () => {
            return this.props.storeUser(formData);
        });
    }

    showNotification = async props => {
        if (props.store_user_status === 200) {
            this.props.reset('ModeratorForm');
            this.setState({
                activeStep: 0,
                submittingForm: false
            });

            let alert = await swal({
                title: "Good job!",
                text: `Moderator was created successfully!`,
                icon: "success",
                closeOnClickOutside: false
            });

            if (alert) {
                this.props.resetStoreUser();
            }
        }

        if (props.store_agent_status == 422) {
            let alert = await swal({
                title: "Opps",
                text: `Phone number already exists successfully!`,
                icon: "error",
                closeOnClickOutside: false
            });

            if (alert) {
                this.props.resetStoreUser();
                this.setState({
                    submittingForm: false
                });
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
                                <div className="col-md-6"><h4>Create New Moderator</h4></div>
                                <div className="col-md-6 text-right">
                                    <Link to="/dashboard/moderator_all">
                                        <button type="button" className="btn btn-sm btn-primary">All Moderators</button>
                                    </Link>
                                </div>
                            </div>
                            <hr/>
                            <div className="row">
                                <div className="col-md-12">
                                    <ModeratorForm onSubmit={this.handleSubmit} submittingForm={this.state.submittingForm} />
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
    role: state.ChoseRoleReducer.role,
    store_user_status: state.UserReducer.store_user_status
});

const mapDispatchToProps = dispatch => ({
    reset: payload => dispatch(reset(payload)),
    resetStoreUser: () => dispatch(resetStoreUser()),
    storeUser: payload => dispatch(storeUser(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModeratorAdd);
