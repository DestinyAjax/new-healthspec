import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import LayoutContent from '@iso/components/utility/layoutContent';
import DashboardLayout from '../../../containers/Dashboard/Dashboard';
import Breadcrumb from "../../../ui/Breadcrumb";
import Datatable from '../../../ui/Datatable';
import Loader from '../../../ui/Loader/Loader.Component';

class BankAll extends Component {
    
    render() {

        return (
            <DashboardLayout>
                <Loader>
                    <LayoutContentWrapper>
                        <LayoutContent>  
                            <div className="row">
                                <div className="col-md-6">
                                    <h4>All Banks</h4>
                                </div>
                                <div className="col-md-6 text-right">
                                    <Link className="" to="/dashboard/bank_add">
                                        <button className="btn btn-sm btn-success" type="button">Create Bank</button>
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
                                                searchable: false,
                                                key: 'owner_phone_number',
                                                title: 'Contact',
                                                dataIndex: 'owner_phone_number',
                                                sorter: (a, b) => a.owner_phone_number.length - b.owner_phone_number.length,
                                            },
                                            {
                                                cell: 'Default',
                                                searchable: false,
                                                key: 'owner_email',
                                                dataIndex: 'owner_email',
                                                title: 'Contact-Email',
                                                sorter: (a, b) => a.owner_email.length - b.owner_email.length,
                                            },
                                            {
                                                key: 'is_active',
                                                title: 'Status',
                                                dataIndex: 'is_active',
                                                cell: 'Default',
                                                searchable: false,
                                            },
                                        ]}
                                        url={`organization_profile/index/5`}
                                        actions={[
                                            {
                                                key: 'slug',
                                                type: 'delete',
                                                title: 'Delete',
                                                url: 'dashboard/organization_profile/delete/'
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

export default connect(null)(BankAll);