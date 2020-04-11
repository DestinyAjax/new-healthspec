import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import LayoutContent from '@iso/components/utility/layoutContent';
import DashboardLayout from '../../../containers/Dashboard/Dashboard';
import Datatable from '../../../ui/Datatable';
import Loader from '../../../ui/Loader/Loader.Component';
import {FaPlus} from 'react-icons/fa';

class ProviderAll extends Component {
    render() {
        return (
            <DashboardLayout>
                <Loader>
                    <LayoutContentWrapper>
                        <LayoutContent>
                            <div className="row">
                                <div className="col-md-6">
                                    <h4>Providers</h4>
                                </div>
                                <div className="col-md-6 text-right">
                                    <Link to="/dashboard/provider_add">
                                        <button type="button" className="btn btn-sm btn-success">
                                            <FaPlus />{" "}
                                            Add Provider
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
                                                sorter: (a,b) => a.name.length - b.name.length
                                            },
                                            {
                                                cell: 'Default',
                                                key: 'code',
                                                dataIndex: 'code',
                                                searchable: false,
                                                title: 'Code',
                                            },
                                            {
                                                cell: 'Default',
                                                searchable: false,
                                                key: 'category',
                                                title: 'Category',
                                                dataIndex: 'category'
                                            },
                                            {
                                                cell: 'Default',
                                                searchable: false,
                                                key: 'company_type',
                                                title: 'Type',
                                                dataIndex: 'company_type'
                                            },
                                            {
                                                cell: 'Default',
                                                searchable: true,
                                                key: 'warden',
                                                title: 'Ward',
                                                search_key: 'warden',
                                                dataIndex: 'warden'
                                            },
                                            {
                                                cell: 'Default',
                                                searchable: true,
                                                key: 'local_government',
                                                title: 'LGA',
                                                search_key: 'local_government',
                                                dataIndex: 'local_government'
                                            },
                                            {
                                                cell: 'Default',
                                                searchable: false,
                                                key: 'owner_email',
                                                dataIndex: 'owner_email',
                                                title: 'Email',
                                                sorter: (a,b) => a.owner_email.length - b.owner_email.length
                                            },
                                            {
                                                cell: 'Default',
                                                searchable: false,
                                                key: 'owner_phone_number',
                                                dataIndex: 'owner_phone_number',
                                                title: 'Phone',
                                            },
                                            {
                                                key: 'is_active',
                                                dataIndex: 'is_active',
                                                title: 'Status',
                                                cell: 'Default',
                                                searchable: false,
                                            },
                                        ]}
                                        url={`organization_profile/index/2`}
                                        actions={[
                                            // {
                                            //     key: 'slug',
                                            //     type: 'delete',
                                            //     title: 'Delete',
                                            //     url: 'organization_profile/delete/'
                                            // },
                                            // {
                                            //     key: 'slug',
                                            //     type: 'view',
                                            //     title: 'VIEW ENROLLEES',
                                            //     url: '/provider_all-beneficiary_'
                                            // },

                                            {
                                                key: 'slug',
                                                type: 'view',
                                                title: 'VIEW',
                                                url: '/dashboard/provider_view/'
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

export default connect(null)(ProviderAll);