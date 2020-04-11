import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import LayoutContent from '@iso/components/utility/layoutContent';
import DashboardLayout from '../../containers/Dashboard/Dashboard';
import Breadcrumb from "../../ui/Breadcrumb";
import Datatable from '../../ui/Datatable';
import Loader from '../../ui/Loader/Loader.Component';

class PlanServiceAll extends Component {
    
    render() {

        return (
            <DashboardLayout>
                <Loader>
                    <LayoutContentWrapper>
                        <LayoutContent>  
                            <div className="row">
                                <div className="col-md-6">
                                    <h4>All Plan Service</h4>
                                </div>
                                <div className="col-md-6 text-right">
                                    <Link className="" to="/dashboard/plan_service_add">
                                        <button className="btn btn-sm btn-success" type="button">Add Plan Service</button>
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
                                                key: 'service_name',
                                                dataIndex: 'service_name',
                                                title: 'Service',
                                                search_key: 'service.name',
                                                sorter: (a,b) => a.service_name.length - b.service_name.length,
                                            },
                                            {
                                                cell: 'Default',
                                                key: 'plan_name',
                                                dataIndex: 'plan_name',
                                                searchable: true,
                                                title: 'Plan',
                                                search_key: 'plan.name',
                                            },
                                            {
                                                cell: 'Default',
                                                key: 'price',
                                                searchable: true,
                                                dataIndex: 'price',
                                                title: 'Price',
                                                search_key: 'price',
                                                sorter: (a,b) => a.price - b.price,
                                            },
                                            {
                                                cell: 'Default',
                                                key: 'limit_type',
                                                dataIndex: 'limit_type',
                                                searchable: true,
                                                title: 'Limit',
                                                search_key: 'limit_type',
                                            },
                                            {
                                                cell: 'Default',
                                                key: 'limit',
                                                dataIndex: 'limit',
                                                searchable: true,
                                                title: 'Limit No.',
                                                search_key: 'limit',
                                            },
                                            {
                                                cell: 'Default',
                                                key: 'payment_type',
                                                dataIndex: 'payment_type',
                                                searchable: true,
                                                title: 'Payment Type',
                                                search_key: 'payment_type',
                                            },
                                            {
                                                cell: 'Default',
                                                key: 'payment_percentage',
                                                dataIndex: 'payment_percentage',
                                                searchable: true,
                                                title: 'Percentage',
                                                search_key: 'payment_percentage',
                                            },
                                            {
                                                key: 'is_active',
                                                dataIndex: 'is_active',
                                                title: 'Status',
                                                cell: 'Default',
                                                searchable: false,
                                            },
                                        ]}
                                        url={'plan_service/index'}
                                        actions={[
                                            {
                                                key: 'slug',
                                                type: 'edit',
                                                title: 'Edit',
                                                url: 'dashboard/plan_service_edit_'
                                            },
                                            {
                                                key: 'id',
                                                type: 'delete',
                                                title: 'Delete',
                                                url: 'dashboard/plan_service/delete/'
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

export default connect(null)(PlanServiceAll);