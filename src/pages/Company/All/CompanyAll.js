import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import LayoutContent from '@iso/components/utility/layoutContent';
import DashboardLayout from '../../../containers/Dashboard/Dashboard';
import Datatable from '../../../ui/Datatable';
import Loader from '../../../ui/Loader/Loader.Component';
import {FaPlus} from 'react-icons/fa';

class CompanyAll extends Component {
    render() {
        return (
            <DashboardLayout>
            <Loader>
                <LayoutContentWrapper>
                    <LayoutContent>
                        
                        <div className="row">
                            <div className="col-md-6">
                                <h4>Companies</h4>
                            </div>
                            <div className="col-md-6 text-right">
                                <Link to="/dashboard/company_add">
                                    <button type="button" className="btn btn-sm btn-success">
                                        <FaPlus />{" "}
                                        Create Company
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
                                            dataIndex: 'name',
                                            searchable: true,
                                            key: 'name',
                                            title: 'Name',
                                            search_key: 'name',
                                            sorter: (a,b) => a.name.length - b.name.length,
                                        },
                                        {
                                            cell: 'Default',
                                            searchable: false,
                                            key: 'no_of_policies',
                                            dataIndex: 'no_of_policies',
                                            title: 'No. Of Policy',
                                        },
                                        {
                                            cell: 'Default',
                                            searchable: false,
                                            key: 'owner_email',
                                            dataIndex: 'owner_email',
                                            title: 'Email',
                                            sorter: (a,b) => a.owner_email.length - b.owner_email.length,
                                        },
                                        {
                                            cell: 'Default',
                                            searchable: false,
                                            key: 'owner_phone_number',
                                            title: 'Phone',
                                            dataIndex: 'owner_phone_number'
                                        },
                                        {
                                            key: 'is_active',
                                            title: 'Status',
                                            cell: 'Default',
                                            dataIndex: 'is_active',
                                            searchable: false,
                                        },
                                    ]}
                                    url={`organization_profile/index/3`}
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
                                            title: 'VIEW ENROLLEES',
                                            url: '/dashboard/company_all-beneficiary_'
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

export default CompanyAll;