import React, { Component } from 'react';
import swal from 'sweetalert';
import { reset } from 'redux-form';
import { connect } from 'react-redux';
import {Card} from 'antd';
import { Link } from 'react-router-dom';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import LayoutContent from '@iso/components/utility/layoutContent';
import DashboardLayout from '../../../containers/Dashboard/Dashboard';
import Breadcrumb from "../../../ui/Breadcrumb";
import Loader from '../../../ui/Loader/Loader.Component';
import RoleForm from '../../../ui/forms/RoleForm';
import { getAllPermissions } from '../../../shared/actions/Permission.action';
import { storeRole, resetStoreRole } from '../../../shared/actions/Role.action';

class RoleAdd extends Component {

    state = {
        submittingForm: false,
    }

    handleSubmit = formData => {
        this.setState({
            submittingForm: true
        });
        this.props.storeRole(formData);
    }

    showNotification = async props => {
        if (props.status === 200) {
            this.props.reset('RoleForm');
            let alert = await swal({
                title: "Good job!",
                text: `${props.role.name} was created successfully!`,
                icon: "success",
                closeOnClickOutside: false
            });

            if (alert) {
                this.props.resetStoreRole();
            }
        }

    }

    componentWillReceiveProps(nextProps) {
        this.showNotification(nextProps);
    }

    componentDidMount() {
        this.props.getAllPermissions();
    }

    render() {

        return (
            <DashboardLayout>
                <Loader>
                    <LayoutContentWrapper>
                        <LayoutContent>  
                            <div className="row">
                                <div className="col-md-6">
                                    <h4>Role Upload</h4>
                                </div>
                                {this.props.get_permissions_status === 200 && (
                                    <div className="col-md-6 text-right">
                                        <Link className="" to="/dashboard/role_all">
                                            <button className="btn btn-sm btn-success" type="button">All Role</button>
                                        </Link>
                                    </div> 
                                )}
                            </div><hr/>
                            <div className="row">
                                {this.props.get_permissions_status === 200 && (
                                    <div className="col-md-12">
                                        <Card style={{width: '100%'}}>
                                            <RoleForm onSubmit={this.handleSubmit}
                                                permissions={this.props.permissions}
                                                role_permissions={[]}
                                                submittingForm={this.state.submittingForm}
                                                btnText="Add"
                                            />
                                        </Card>
                                    </div>
                                )}
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
    status: state.RoleReducer.store_role_status,
    message: state.RoleReducer.store_role_message,
    permissions: state.PermissionReducer.permissions,
    get_permissions_status: state.PermissionReducer.get_permissions_status
});

const mapDispatchToProps = dispatch => ({
    reset: payload => dispatch( reset(payload) ),
    resetStoreRole: () => dispatch( resetStoreRole() ),
    storeRole: payload => dispatch( storeRole(payload) ),
    getAllPermissions: () => dispatch( getAllPermissions() )
});

export default connect(mapStateToProps, mapDispatchToProps)(RoleAdd);