import React, { Component } from 'react';
import swal from 'sweetalert';
import {Card} from 'antd';
import { reset } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import LayoutContent from '@iso/components/utility/layoutContent';
import DashboardLayout from '../../../containers/Dashboard/Dashboard';
import Breadcrumb from "../../../ui/Breadcrumb";
import Loader from '../../../ui/Loader/Loader.Component';
import OrganizationBatchForm from '../../../ui/forms/OrganizationBatchForm';
import { storeOrganizationProfile, resetStoreOrganizationProfile, storeBatchOrganizationProfile }
    from '../../../shared/actions/OrganizationProfileAdd.action';
import AgentBankForm from '../../../ui/forms/AgentBankForm';

class BankAdd extends Component {

    state = {
        submittingForm: false,
        submittingBatchForm: false,
        organization_type_id: 5,
    }

    handleStepSubmit = formData => {
        formData['role_id'] = 13;
        formData['policy_ids'] = [];
        formData['is_active'] = true;
        formData['organization_type_id'] = this.state.organization_type_id;

        return this.setState({
            submittingForm: true,
        }, () => {
            return this.props.storeOrganizationProfile(formData);
        });
    }


    handleBatchSubmit = formData => {
        this.setState({
            submittingBatchForm: true
        }, () => {
            return this.props.storeBatchOrganizationProfile({
                data: {
                    sector_id: '',
                    organization_type_id: this.state.organization_type_id,
                },
                picture: formData.organization_profiles
            });
        });
    }

    showNotification = async props => {
        if (props.status === 200) {
            let alert = await swal({
                title: "Good job!",
                text: `${props.organizationProfile.name} was created successfully!`,
                icon: "success",
                closeOnClickOutside: false
            });

            if (alert) {
                this.props.reset('AgentBankForm');
                this.props.resetStoreOrganizationProfile();
                this.setState({
                    submittingForm: false
                });
                return this.setState({
                    activeStep: 0
                });
            }
        }

        if (props.store_batch_organization_profile_status === 200) {
            this.props.reset('OrganizationBatchForm');
            this.setState({
                submittingBatchForm: false
            });

            let alert = await swal({
                title: "Good job!",
                text: `Bank were created successfully!`,
                icon: "success",
                closeOnClickOutside: false
            });

            if (alert) {
                this.props.resetStoreOrganizationProfile();
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        this.showNotification(nextProps);
    }

    render() {

        return (
            <DashboardLayout>
                <Loader>
                    <LayoutContentWrapper>
                        <LayoutContent>  
                            <div className="row">
                                <div className="col-md-6">
                                    <h4>Create Bank</h4>
                                </div>
                                <div className="col-md-6 text-right">
                                    <Link className="" to="/dashboard/bank_all">
                                        <button className="btn btn-sm btn-success" type="button">All Banks</button>
                                    </Link>
                                </div> 
                            </div><hr/>
                            <div className="row">
                                <div className="col-md-6">
                                    <Card title="Bank Upload" style={{width: '100%'}}>
                                        <AgentBankForm 
                                            onSubmit={this.handleStepSubmit} 
                                            submittingForm={this.state.submittingForm} 
                                        />
                                    </Card>
                                </div>
                                <div className="col-md-6">
                                    <Card title="Bank Upload (Batch)" style={{width: '100%'}}> 
                                        <OrganizationBatchForm
                                            onSubmit={this.handleBatchSubmit}
                                            submittingForm={this.state.submittingBatchForm}
                                        />
                                    </Card>
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
    organizationProfile: state.OrganizationProfileReducer.organization_profile,
    status: state.OrganizationProfileReducer.store_organization_profile_status,
    message: state.OrganizationProfileReducer.store_organization_profile_message,
    store_batch_organization_profile_status: state.OrganizationProfileReducer.store_batch_organization_profile_status
});

const mapDispatchToProps = dispatch => ({
    reset: payload => dispatch(reset(payload)),
    resetStoreOrganizationProfile: () => dispatch(resetStoreOrganizationProfile()),
    storeOrganizationProfile: payload => dispatch(storeOrganizationProfile(payload)),
    storeBatchOrganizationProfile: payload => dispatch(storeBatchOrganizationProfile(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(BankAdd);