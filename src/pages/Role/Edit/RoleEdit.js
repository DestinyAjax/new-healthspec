import React, { Component } from 'react';
import swal from 'sweetalert';
import { connect } from 'react-redux';
import {Card} from 'antd';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import LayoutContent from '@iso/components/utility/layoutContent';
import DashboardLayout from '../../../containers/Dashboard/Dashboard';
import Breadcrumb from "../../../ui/Breadcrumb";
import Loader from '../../../ui/Loader/Loader.Component';
import RoleForm from '../../../ui/forms/RoleForm';
import { updateRole, resetStoreRole, getRole, resetUpdateRole } from '../../../shared/actions/Role.action';

class RoleEdit extends Component {

    state = {
        submittingForm: false,
    }

    handleSubmit = formData => {
        this.setState({
            submittingForm: true
        });
        formData['slug'] = this.props.match.params.slug;

        this.props.updateRole(formData);
    }

    showNotification = async props => {
        if (props.update_role_status === 200) {
            let alert = await swal({
                title: "Good job!",
                text: `${props.role.name} was updated successfully!`,
                icon: "success",
                closeOnClickOutside: false
            });

            if (alert) {
                this.props.resetUpdateRole();
                this.props.history.push('/dashboard/role_all');
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        this.showNotification(nextProps);
    }

    componentDidMount() {
        this.props.getRole(this.props.match.params.slug);
    }

    componentWillUnmount() {
        this.props.resetStoreRole();
    }

    render() {

        return (
            <DashboardLayout>
                <Loader>
                    <LayoutContentWrapper>
                        <LayoutContent>  
                            <div className="row">
                                <div className="col-md-6">
                                    <h4>Role Update</h4>
                                </div>
                            </div><hr/>
                            <div className="row">
                                <div className="col-md-12">
                                   <Card style={{width: '100%'}}>
                                        <RoleForm onSubmit={this.handleSubmit}
                                            initialValues={this.props.role}
                                            permissions={this.props.permissions}
                                            role_permissions={this.props.role.permission_roles}
                                            submittingForm={this.state.submittingForm}
                                            btnText="Update"
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
    role: state.RoleReducer.role,
    status: state.RoleReducer.get_role_status,
    permissions: state.RoleReducer.permissions,
    update_role_status: state.RoleReducer.update_role_status,
});

const mapDispatchToProps = dispatch => ({
    getRole: payload => dispatch(getRole(payload)),
    resetStoreRole: () => dispatch(resetStoreRole()),
    resetUpdateRole: () => dispatch(resetUpdateRole()),
    updateRole: payload => dispatch(updateRole(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RoleEdit);