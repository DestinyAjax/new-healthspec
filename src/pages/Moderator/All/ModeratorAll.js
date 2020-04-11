import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import LayoutContent from '@iso/components/utility/layoutContent';
import DashboardLayout from '../../../containers/Dashboard/Dashboard';
import Datatable from '../../../ui/Datatable';
import Loader from '../../../ui/Loader/Loader.Component';
import {FaPlus} from 'react-icons/fa';

class ModeratorAll extends Component {
    render() {
        let datatable = [
            {
                key: 'id',
                title: 'ID',
                dataIndex: 'id',
                cell: 'Default',
                searchable: false,
            },
            {
                cell: 'Default',
                searchable: true,
                key: 'surname',
                title: 'Surname',
                dataIndex: 'surname',
                search_key: 'user.surname',
                sorter: (a,b) => a.surname.length - b.surname.length,
            },
            {
                cell: 'Default',
                key: 'first_name',
                dataIndex: 'first_name',
                searchable: true,
                title: 'Firstname',
                search_key: 'user.first_name',
                sorter: (a,b) => a.first_name.length - b.first_name.length,
            },
            {
                cell: 'Default',
                searchable: true,
                key: 'other_name',
                dataIndex: 'other_name',
                title: 'Othernames',
                search_key: 'user.other_name',
                sorter: (a,b) => a.other_name.length - b.other_name.length
            },
            {
                key: 'status',
                title: 'Status',
                cell: 'Default',
                searchable: false,
                dataIndex: 'status'
            },
        ];

        if (this.props.role.role.name == 'AGENT_ADMIN') {
            datatable.push({
                key: 'number_of_enrollee',
                title: 'No. Enrolled',
                dataIndex: 'number_of_enrollee',
                cell: 'Default',
                searchable: false,
            });
        }

        return (
            <DashboardLayout>
                <Loader>
                    <LayoutContentWrapper>
                        <LayoutContent>
                            <div className="row">
                                <div className="col-md-6">
                                    <h4>All Moderators</h4>
                                </div>
                                <div className="col-md-6 text-right">
                                    <Link to="/dashboard/moderator_add">
                                        <button type="button" className="btn btn-sm btn-success">
                                            <FaPlus />{" "}
                                            Add Moderator
                                        </button>
                                    </Link>
                                </div>
                            </div><hr/>
                            <div className="row">
                                <div className="col-md-12">
                                    <Datatable
                                        columns={datatable}
                                        url={`moderator/index/${this.props.role.organization_profile.id}`}
                                        actions={[
                                            {
                                                key: 'slug',
                                                type: 'delete',
                                                title: 'Delete',
                                                url: '/dashboard/moderator/delete/'
                                            },
                                        ]}
                                    />
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
});

export default connect(mapStateToProps, null)(ModeratorAll);