import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import LayoutContent from '@iso/components/utility/layoutContent';
import DashboardLayout from '../../../containers/Dashboard/Dashboard';
import Breadcrumb from "../../../ui/Breadcrumb";
import Datatable from '../../../ui/Datatable';
import Loader from '../../../ui/Loader/Loader.Component';

class PolicyAll extends Component {
    
    render() {

        return (
            <DashboardLayout>
                <Loader>
                    <LayoutContentWrapper>
                        <LayoutContent>  
                            <div className="row">
                                <div className="col-md-6">
                                    <h4>All Policies</h4>
                                </div>
                                <div className="col-md-6 text-right">
                                    <Link className="" to="/dashboard/policy_add">
                                        <button className="btn btn-sm btn-success" type="button">Add Policy</button>
                                    </Link>
                                </div> 
                            </div><hr/>
                            <div className="row">
                                <div className="col-md-12">
                                    <Datatable
                                        columns={[
                                            {
                                                key: "id",
                                                title: "ID",
                                                cell: "Default",
                                                dataIndex: 'id',
                                                searchable: false
                                            },
                                            {
                                                cell: "Default",
                                                searchable: true,
                                                key: "name",
                                                title: "Name",
                                                dataIndex: 'name',
                                                search_key: "name",
                                                sorter: (a, b) => a.name.length - b.name.length,
                                            },
                                            {
                                                cell: "Default",
                                                searchable: false,
                                                key: "plan_name",
                                                title: "Plan Name",
                                                dataIndex: 'plan_name',
                                            },
                                            {
                                                cell: "Default",
                                                searchable: false,
                                                key: "maximum_no_of_beneficiary",
                                                title: "Maximum Beneficiary",
                                                dataIndex: 'maximum_no_of_beneficiary',
                                            },
                                            {
                                                cell: "Default",
                                                searchable: false,
                                                key: "maximum_no_of_beneficiary_dependant",
                                                title: "Maximum Beneficiary Dependant",
                                                dataIndex: 'maximum_no_of_beneficiary_dependant',
                                            },
                                            {
                                                key: "is_active",
                                                title: "Status",
                                                cell: "Default",
                                                searchable: false,
                                                dataIndex: 'is_active',
                                            }
                                        ]}
                                        url={`policy/index`}
                                        actions={[
                                            {
                                                key: "slug",
                                                type: "delete",
                                                title: "Delete",
                                                url: "/dashboard/policy/delete/"
                                            },
                                            {
                                                key: "slug",
                                                type: "edit",
                                                title: "Edit",
                                                url: "/dashboard/policy_edit_"
                                            },
                                            // {
                                            //     key: "slug",
                                            //     type: "view",
                                            //     title: "View",
                                            //     url: "policy_view_"
                                            // }
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

export default connect(null)(PolicyAll);