import React, { Component } from 'react';
import { connect } from 'react-redux';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import LayoutContent from '@iso/components/utility/layoutContent';
import DashboardLayout from '../../containers/Dashboard/Dashboard';
import Breadcrumb from "../../ui/Breadcrumb";
import Datatable from "../../ui/Datatable";
import Loader from '../../ui/Loader/Loader.Component';

class TreatmentCase extends Component {

    render() {

        let addNew = "";
        let actions = [];
        const { role } = this.props;

        if (role.role.name === "PROVIDER_ADMIN" || role.role.name === "PROVIDER_MODERATOR") {
            actions = [
                {
                    key: "id",
                    type: "view",
                    title: "Refer",
                    url: "dashboard/refer_add_"
                },
                {
                    key: "id",
                    type: "view",
                    title: "Treat Here",
                    url: "dashboard/preauth_add_"
                },
                {
                    key: "id",
                    type: "view",
                    title: "View",
                    url: "dashboard/treatmentcase_"
                }
            ];
        }

        if (role.role.name === "HMO_ADMIN" || role.role.name === "HMO_MODERATOR" || role.role.name === "AGENT_ADMIN" || role.role.name === "AGENT_MODERATOR") {
            actions = [
                {
                    key: "id",
                    type: "view",
                    title: "View",
                    url: "dashboard/treatmentcase_"
                }
            ];
        }

        return (
            <DashboardLayout>
                <Loader>
                    <LayoutContentWrapper>
                        <LayoutContent>
                            <div className="row">
                                <div className="col-md-12">
                                    <Breadcrumb
                                        links={[
                                            {
                                                url: "/dashboard/treatmentcases",
                                                name: "Encounter"
                                            }
                                        ]}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="card">
                                        <div className="card-body">
                                            <Datatable
                                                columns={[
                                                    {
                                                        key: "id",
                                                        title: "ID",
                                                        cell: "Default",
                                                        searchable: false
                                                    },
                                                    {
                                                        cell: "Default",
                                                        searchable: true,
                                                        key: "beneficiary_surname",
                                                        title: "Surname",
                                                        search_key: "beneficiary.surname"
                                                    },
                                                    {
                                                        cell: "Default",
                                                        searchable: true,
                                                        key: "beneficiary_first_name",
                                                        title: "First Name",
                                                        search_key: "beneficiary.first_name"
                                                    },
                                                    {
                                                        cell: "Default",
                                                        searchable: true,
                                                        key: "beneficiay_other_name",
                                                        title: "Other Name",
                                                        search_key: "beneficiary.other_name"
                                                    },
                                                    {
                                                        cell: "Default",
                                                        searchable: false,
                                                        key: "case",
                                                        title: "Case"
                                                    },
                                                    {
                                                        cell: "Default",
                                                        searchable: false,
                                                        key: "date",
                                                        title: "Date"
                                                    },
                                                    {
                                                        cell: "Default",
                                                        searchable: false,
                                                        key: "status",
                                                        title: "Status"
                                                    }
                                                ]}
                                                url={`treatmentcase/index/${role.id}`}
                                                actions={actions}
                                            />
				                        </div>
                                    </div>
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
    role: state.ChoseRoleReducer.role
});

export default connect(mapStateToProps, null)(TreatmentCase);