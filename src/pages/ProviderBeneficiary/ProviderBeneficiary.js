import React, { Component } from 'react';
import { connect } from 'react-redux';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import LayoutContent from '@iso/components/utility/layoutContent';
import DashboardLayout from '../../containers/Dashboard/Dashboard';
import Datatable from '../../ui/Datatable';
import Loader from '../../ui/Loader/Loader.Component';

class ProviderBeneficiary extends Component {
    render() {
        return (
            <DashboardLayout>
                <Loader>
                    <LayoutContentWrapper>
                        <LayoutContent>  
                            <div className="row">
                                <div className="col-md-6">
                                    <h4>Enrollee List</h4>
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
                                                title: "Enrollee ID",
                                                search_key: "user.enrollee_id",
                                                dataIndex: 'enrollee_id'
                                            },
                                            {
                                                cell: "Default",
                                                searchable: true,
                                                key: "surname",
                                                title: "Surname",
                                                dataIndex: 'surname',
                                                search_key: "user.surname",
                                                sorter: (a,b) => a.surname.length - b.surname.length
                                            },
                                            {
                                                cell: "Default",
                                                searchable: true,
                                                key: "first_name",
                                                title: "Firstname",
                                                dataIndex: 'first_name',
                                                search_key: "user.first_name",
                                                sorter: (a,b) => a.first_name.length - b.first_name.length
                                            },
                                            {
                                                cell: "Default",
                                                searchable: false,
                                                key: "provider_name",
                                                title: "Provider",
                                                dataIndex: 'provider_name',
                                                search_key: "organization_profile.name"
                                            },
                                            {
                                                cell: "Default",
                                                searchable: false,
                                                key: "gender",
                                                dataIndex: "gender",
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
                                                dataIndex: "agent_company",
                                                title: "Agent Company"
                                            },
                                            {
                                                key: "is_dependant",
                                                title: "Enrolee Type",
                                                dataIndex: "is_dependant",
                                                cell: "Default",
                                                searchable: false
                                            },
                                            {
                                                key: "is_active",
                                                title: "Status",
                                                cell: "Default",
                                                dataIndex: "is_active",
                                                searchable: false
                                            }
                                        ]}
                                        url={`provider-beneficiary/${this.props.active.organization_profile.slug}`}
                                        actions={[
                                            {
                                                key: "id",
                                                type: "view",
                                                title: "Start Encounter",
                                                url: "dashboard/visitation_add_"
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

export default connect(mapStateToProps)(ProviderBeneficiary);