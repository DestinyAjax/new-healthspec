import React, { Component } from 'react';
import { connect } from 'react-redux';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import LayoutContent from '@iso/components/utility/layoutContent';
import DashboardLayout from '../../../containers/Dashboard/Dashboard';
import Breadcrumb from "../../../ui/Breadcrumb";
import Datatable from '../../../ui/Datatable';
import Loader from '../../../ui/Loader/Loader.Component';

class BankMyBeneficiary extends Component {
    
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
                                            },
                                            {
                                                cell: 'Default',
                                                searchable: true,
                                                key: 'beneficiary_surname',
                                                title: 'First Name',
                                                search_key: 'beneficiary.surname',
                                            },
                                            {
                                                cell: 'Default',
                                                searchable: true,
                                                key: 'beneficiary_first_name',
                                                title: 'Middle Name',
                                                search_key: 'beneficiary.first_name',
                                            },
                                            {
                                                cell: 'Default',
                                                searchable: true,
                                                key: 'beneficiary_enrollee_id',
                                                title: 'Enrollee ID',
                                                search_key: 'beneficiary.enrollee_id',
                                            },


                                            {
                                                cell: 'Default',
                                                key: 'policy_name',
                                                searchable: false,
                                                title: 'Policy',
                                            },
                                            {
                                                cell: 'Default',
                                                searchable: false,
                                                key: 'transaction_date',
                                                title: 'Date Approved',
                                            },
                                        ]}
                                        url={`bank-my-beneficiary/${this.props.active.organization_profile.slug}`}
                                        actions={[]}
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

export default connect(mapStateToProps)(BankMyBeneficiary);