import React, { Component } from 'react';
import { connect } from 'react-redux';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import LayoutContent from '@iso/components/utility/layoutContent';
import DashboardLayout from '../../../containers/Dashboard/Dashboard';
import Breadcrumb from "../../../ui/Breadcrumb";
import Datatable from '../../../ui/Datatable';
import { getBeneficiaries } from '../../../shared/actions/Agent.action';
import Loader from '../../../ui/Loader/Loader.Component';

class AgentMyBeneficiary extends Component {
    
    render() {

        return (
            <DashboardLayout>
                <Loader>
                    <LayoutContentWrapper>
                        <LayoutContent>  
                            <div className="row">
                                <div className="col-md-6">
                                    <h4>All Enrollees</h4>
                                </div>
                                <div className="col-md-6 text-right">
                                    <Breadcrumb />
                                </div> 
                            </div><hr/>
                            <div className="row">
                                <div className="col-md-12">
                                    <Datatable
                                        columns={[
                                            {
                                                key: 'id',
                                                title: 'ID',
                                                cell: 'Default',
                                                searchable: false,
                                                dataIndex: 'id'
                                            },
                                            {
                                                cell: 'Default',
                                                searchable: true,
                                                key: 'beneficiary_surname',
                                                dataIndex: "beneficiary_surname",
                                                title: 'Surname',
                                                search_key: 'beneficiary.surname',
                                                sorter: (a,b) => a.beneficiary_surname.length - b.beneficiary_surname.length
                                            },
                                            {
                                                cell: 'Default',
                                                searchable: true,
                                                dataIndex: 'beneficiary_first_name',
                                                key: 'beneficiary_first_name',
                                                title: 'Firstname',
                                                search_key: 'beneficiary.first_name',
                                                sorter: (a,b) => a.beneficiary_first_name.length - b.beneficiary_first_name.length
                                            },
                                            {
                                                cell: 'Default',
                                                dataIndex: 'beneficiary_other_name',
                                                searchable: true,
                                                key: 'beneficiary_other_name',
                                                title: 'Othername',
                                                search_key: 'beneficiary.other_name',
                                                sorter: (a,b) => a.beneficiary_other_name.length - b.beneficiary_other_name.length
                                            },
                                            {
                                                cell: 'Default',
                                                searchable: true,
                                                key: 'beneficiary_enrollee_id',
                                                dataIndex: 'beneficiary_enrollee_id',
                                                title: 'Enrollee ID',
                                                search_key: 'beneficiary.enrollee_id',
                                            },
                                            {
                                                cell: 'Default',
                                                key: 'policy_name',
                                                searchable: false,
                                                title: 'Policy',
                                                dataIndex: 'policy_name'
                                            },
                                            {
                                                cell: 'Default',
                                                searchable: false,
                                                key: 'expires_at',
                                                title: 'Expires',
                                                dataIndex: 'expires_at'
                                            },

                                            {
                                                key: 'is_active',
                                                title: 'Status',
                                                cell: 'Default',
                                                searchable: false,
                                                dataIndex: 'is_active'
                                            },
                                        ]}
                                        url={`agent-my-beneficiary/${this.props.agent_id}`}
                                        actions={[
                                            {
                                                key: 'beneficiary_role_user_slug',
                                                type: 'view',
                                                title: 'VIEW DEPENDENT',
                                                url: '/dashboard/dependant_add_'
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

const mapStateToProps = state => ({
    meta: state.AgentReducer.meta,
    agent_id: state.AuthReducer.id,
    status: state.AgentReducer.get_beneficiaries_status,
    agent_beneficiaries: state.AgentReducer.agent_beneficiaries,
});

const mapDispatchToProps = dispatch => ({
    getBeneficiaries: payload => dispatch(getBeneficiaries(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AgentMyBeneficiary);