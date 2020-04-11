import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import LayoutContent from '@iso/components/utility/layoutContent';
import DashboardLayout from '../../../containers/Dashboard/Dashboard';
import Datatable from '../../../ui/Datatable';
import Loader from '../../../ui/Loader/Loader.Component';
import {FaPlus} from 'react-icons/fa';

class BeneficiaryAll extends Component {
    render() {
        return (
            <DashboardLayout>
            <Loader>
                <LayoutContentWrapper>
                    <LayoutContent>
                        
                        <div className="row">
                            <div className="col-md-6">
                                <h4>All Beneficiaries</h4>
                            </div>
                            <div className="col-md-6 text-right">
                                <Link to="/dashboard/beneficiary_add">
                                    <button type="button" className="btn btn-sm btn-success">
                                        <FaPlus />{" "}
                                        Create Enrollee
                                    </button>
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
                                            dataIndex: "id",
                                            searchable: false
                                        },
                                        {
                                            cell: "Default",
                                            searchable: true,
                                            key: "enrollee_id",
                                            dataIndex: "enrollee_id",
                                            title: "Enrollee ID",
                                            search_key: "user.enrollee_id"
                                        },
                                        {
                                            cell: "Default",
                                            searchable: true,
                                            dataIndex: "surname",
                                            key: "surname",
                                            title: "Surname",
                                            search_key: "user.surname",
                                            sorter: (a, b) => a.surname.length - b.surname.length,
                                        },
                                        {
                                            cell: "Default",
                                            searchable: true,
                                            key: "first_name",
                                            dataIndex: "first_name",
                                            title: "Firstname",
                                            search_key: "user.first_name",
                                            sorter: (a, b) => a.first_name.length - b.first_name.length,
                                        },
                                        {
                                            cell: "Default",
                                            searchable: false,
                                            key: "provider_name",
                                            title: "Provider",
                                            dataIndex: "provider_name",
                                            search_key: "organization_profile.name"
                                        },
                                        {
                                            cell: "Default",
                                            searchable: false,
                                            key: "gender",
                                            dataIndex: "gender",
                                            title: "Gender",
                                            sorter: (a, b) => a.gender.length - b.gender.length,
                                        },

                                        {
                                            cell: "Default",
                                            key: "policy_name",
                                            dataIndex: "policy_name",
                                            searchable: false,
                                            title: "Policy",
                                            sorter: (a, b) => a.policy_name.length - b.policy_name.length,
                                        },
                                        {
                                            cell: "Default",
                                            searchable: false,
                                            key: "agent_company",
                                            dataIndex: 'agent_company',
                                            title: "Agent Company"
                                        },
                                        {
                                            key: "is_dependant",
                                            dataIndex: 'is_dependant',
                                            title: "Enrolee Type",
                                            cell: "Default",
                                            searchable: false
                                        },
                                        {
                                            key: "is_active",
                                            dataIndex: 'is_active',
                                            title: "Status",
                                            cell: "Default",
                                            searchable: false
                                        }
                                    ]}
                                    url={`beneficiary/index`}
                                    actions={[
                                        {
                                            key: "id",
                                            type: "view",
                                            title: "VIEW",
                                            url: "/dashboard/enrollee_view_"
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

export default BeneficiaryAll;