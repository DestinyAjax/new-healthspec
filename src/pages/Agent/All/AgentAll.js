import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import LayoutContent from '@iso/components/utility/layoutContent';
import DashboardLayout from '../../../containers/Dashboard/Dashboard';
import Datatable from '../../../ui/Datatable';
import Loader from '../../../ui/Loader/Loader.Component';
import {FaPlus} from 'react-icons/fa';

class AgentAll extends Component {
    render() {
        return (
            <DashboardLayout>
            <Loader>
                <LayoutContentWrapper>
                    <LayoutContent>
                        
                        <div className="row">
                            <div className="col-md-6">
                                <h4>Agents</h4>
                            </div>
                            <div className="col-md-6 text-right">
                                <Link to="/dashboard/agent_add">
                                    <button type="button" className="btn btn-sm btn-success">
                                        <FaPlus />{" "}
                                        Create Agent
                                    </button>
                                </Link>
                            </div>
                        </div><hr/>
                        <div className="row">
                            <div className="col-md-12">
                                <Datatable
                                    columns={[
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
                                            key: 'name',
                                            title: 'Name',
                                            dataIndex: 'name',
                                            search_key: 'name',
                                            sorter: (a, b) => a.name.length - b.name.length,
                                        },
                                        {
                                            cell: 'Default',
                                            searchable: true,
                                            key: 'owner_email',
                                            dataIndex: 'owner_email',
                                            title: 'Email',
                                            search_key: 'email',
                                            sorter: (a, b) => a.owner_email.length - b.owner_email.length,
                                        },
                                        {
                                            cell: 'Default',
                                            searchable: false,
                                            dataIndex: 'owner_phone_number',
                                            key: 'owner_phone_number',
                                            dataIndex: 'owner_phone_number',
                                            title: 'Contact',
                                        },
                                        {
                                            key: 'is_active',
                                            title: 'Status',
                                            cell: 'Default',
                                            dataIndex: 'is_active',
                                            searchable: false,
                                        },
                                        {
                                            key: 'no_of_enrolled_beneficiaries',
                                            title: 'No. Of Enrollees enrolled',
                                            cell: 'Default',
                                            dataIndex: 'no_of_enrolled_beneficiaries',
                                            searchable: false,
                                        },
                                    ]}
                                    url={`organization_profile/index/4`}
                                    actions={[
                                        {
                                            key: 'slug',
                                            type: 'delete',
                                            title: 'Delete',
                                            url: '/dashboard/organization_profile/delete/'
                                        },
                                        {
                                            key: 'slug',
                                            type: 'view',
                                            title: 'VIEW',
                                            url: '/dashboard/agent_view/'
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

export default AgentAll;