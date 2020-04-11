import React, { Component } from 'react';
import { connect } from 'react-redux';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import LayoutContent from '@iso/components/utility/layoutContent';
import DashboardLayout from '../../containers/Dashboard/Dashboard';
import Datatable from '../../ui/Datatable';
import Loader from '../../ui/Loader/Loader.Component';

class ProviderMyBeneficiary extends Component {
    render() {
        return (
            <DashboardLayout>
                <Loader>
                    <LayoutContentWrapper>
                        <LayoutContent>  
                            <div className="row">
                                <div className="col-md-6">
                                    <h4>Employee List</h4>
                                </div>
                                <div className="col-md-6 text-right"></div>
                            </div><hr/>
                            <div className="row">
                                <div className="col-md-12">
                                    <Datatable
                                        columns={[
                                            {
                                                key: "id",
                                                title: "ID",
                                                dataIndex: 'id',
                                                cell: "Default",
                                                searchable: false
                                            },
                                            {
                                                cell: "Default",
                                                searchable: true,
                                                key: "enrollee_id",
                                                dataIndex: 'enrollee_id',
                                                title: "Enrollee ID",
                                                search_key: "user.enrollee_id"
                                            },
                                            {
                                                cell: "Default",
                                                searchable: true,
                                                key: "surname",
                                                dataIndex: 'surname',
                                                title: "Surname",
                                                search_key: "user.surname",
                                                sorter: (a,b) => a.surname.length - b.surname.length
                                            },
                                            {
                                                cell: "Default",
                                                searchable: true,
                                                key: "first_name",
                                                dataIndex: 'first_name',
                                                title: "Firstname",
                                                search_key: "user.first_name",
                                                sorter: (a,b) => a.first_name.length - b.first_name.length
                                            },
                                            {
                                                cell: "Default",
                                                searchable: false,
                                                dataIndex: 'provider_name',
                                                key: "provider_name",
                                                title: "Provider",
                                                search_key: "organization_profile.name",
                                                sorter: (a,b) => a.provider_name.length - b.provider_name.length
                                            },
                                            {
                                                cell: "Default",
                                                searchable: false,
                                                dataIndex: 'gender',
                                                key: "gender",
                                                title: "Gender"
                                            },

                                            {
                                                cell: "Default",
                                                key: "policy_name",
                                                dataIndex: 'policy_name',
                                                searchable: false,
                                                title: "Policy"
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
                                                title: "Enrolee Type",
                                                dataIndex: 'is_dependent',
                                                cell: "Default",
                                                searchable: false
                                            },
                                            {
                                                key: "is_active",
                                                title: "Status",
                                                cell: "Default",
                                                searchable: false
                                            }
                                        ]}
                                        url={`provider-beneficiary/${this.props.active.organization_profile.slug}`}
                                        actions={[
                                            // {
                                            //     key: "enrollee_id",
                                            //     type: "view",
                                            //     title: "Generate Claim",
                                            //     url: "encounter_add_"
                                            // },
                                            // {
                                            //     key: "enrollee_id",
                                            //     type: "view",
                                            //     title: "Refer",
                                            //     url: "refer_add_"
                                            // },
                                            {
                                                key: "id",
                                                type: "view",
                                                title: "Start Encounter",
                                                url: "/dashboard/visitation_add_"
                                            }
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
    active: state.ChoseRoleReducer.role
});

export default connect(mapStateToProps, null)(ProviderMyBeneficiary);