import React, { Component } from 'react';
import swal from 'sweetalert';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {Card} from 'antd';
import Spinner from '../../../ui/Spinner';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import LayoutContent from '@iso/components/utility/layoutContent';
import DashboardLayout from '../../../containers/Dashboard/Dashboard';
import Breadcrumb from "../../../ui/Breadcrumb";
import Datatable from '../../../ui/Datatable';
import Loader from '../../../ui/Loader/Loader.Component';
import { getRoles, resetStoreRole, deleteRole } from '../../../shared/actions/Role.action';

class PlanAll extends Component {

    state = {
        meta: {},
        current_page: 1,
    }

    componentDidMount() {
        this.props.getRoles(1);
    }

    showNotificationFrom = async nextProps => {
        if (nextProps.delete_role_status === 200) {
            let alert = await swal({
                title: "Good job!",
                text: `Role was deleted successfully!`,
                icon: "success",
                closeOnClickOutside: false
            });


            if (alert) {
                this.props.resetStoreRole();
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        this.showNotificationFrom(nextProps);
        this.setState({
            meta: nextProps.meta,
            current_page: nextProps.meta.current_page
        });
    }


    getNewRolesWith = page_number => {
        this.props.getRoles(page_number);
    }

    delete = async role => {
        if (role.user_count > 0) return;

        let alert = await swal({
            title: `Are you sure you want to delete [${role.name}]`,
            type: 'warning',
            buttons: [
                'No',
                'Yes, I am sure!'
            ],
            dangerMode: true,
        });

        if (alert) {
            this.props.deleteRole({
                slug: role.slug,
            });
        }
    }

    edit = role => {
        this.props.history.push(`/role_edit_${role.slug}`);
    }

    render() {
        
        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(this.state.meta.total / this.state.meta.per_page); i++) {
            pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
            let classes = this.state.current_page === number ? 'active' : '';

            if (number == 1 || number == this.state.meta.total || (number >= this.state.current_page - 2 && number <= this.state.current_page + 2)) {
                return (
                    <span key={number} className={classes} onClick={() => this.getNewRolesWith(number)}>{number}</span>
                );
            }
        });

        return (
            <DashboardLayout>
                <Loader>
                    <LayoutContentWrapper>
                        <LayoutContent>  
                            <div className="row">
                                <div className="col-md-6">
                                    <h4>All Roles</h4>
                                </div>
                                <div className="col-md-6 text-right">
                                    {this.props.status === 200 && !this.props.roles.length && (
                                        <Link className="" to="/dashboard/plan_add">
                                            <button className="btn btn-sm btn-success" type="button">Create Role</button>
                                        </Link>
                                    )}
                                </div> 
                            </div><hr/>
                            <div className="row">
                                <div className="col-md-12">
                                    <Card style={{width: '100%'}}>
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th>S/N</th>
                                                    <th>Name</th>
                                                    <th>Permissions Count</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.props.status === 200 && this.props.roles.length && (
                                                    this.props.roles.map(role => (
                                                        <tr key={role.id}>
                                                            <td>{ role.id }</td>
                                                            <td>
                                                                <div className="tTitle">
                                                                    <div className="head">{role.name}</div>
                                                                    <div className="sub">{role.user_count} user(s)</div>
                                                                </div>
                                                            </td>
                                                            <td>{role.permission_roles.length}</td>
                                                            <td>
                                                                <span className="action" onClick={() => this.delete(role)}><i className="fa fa-trash"></i></span>
                                                                <span className="action" onClick={() => this.edit(role)}><i className="fa fa-edit"></i></span>
                                                            </td>
                                                        </tr>
                                                    ))
                                                )}
                                            </tbody>
                                        </table>
                                        <div className="pagination">
                                            <span onClick={() => this.getNewRolesWith(1)}>&laquo;</span>
                                            {renderPageNumbers}
                                            <span onClick={() => this.getNewRolesWith(this.props.meta.last_page)}>&raquo;</span>
                                        </div>
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
    meta: state.PlanReducer.meta,
    plans: state.PlanReducer.plans,
    status: state.PlanReducer.get_plans_status,
    delete_plan_status: state.PlanReducer.delete_plan_status,
});

const mapDispatchToProps = dispatch => ({
    getRoles: payload => dispatch( getRoles(payload) ),
    resetStoreRole: () => dispatch( resetStoreRole() ),
    deleteRole: payload => dispatch( deleteRole(payload) )
});

export default connect(mapStateToProps, mapDispatchToProps)(PlanAll);