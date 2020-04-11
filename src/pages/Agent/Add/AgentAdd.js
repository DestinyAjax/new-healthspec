import React, { Component } from 'react';
import {Card} from 'antd';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import { reset } from 'redux-form';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import LayoutContent from '@iso/components/utility/layoutContent';
import DashboardLayout from '../../../containers/Dashboard/Dashboard';
import PageHeader from '@iso/components/utility/pageHeader';
import AgentBankForm from '../../../ui/forms/AgentBankForm';
import OrganizationBatchForm from '../../../ui/forms/OrganizationBatchForm';
import { storeOrganizationProfile, resetStoreOrganizationProfile, storeBatchOrganizationProfile } from '../../../shared/actions/OrganizationProfileAdd.action';
import Loader from '../../../ui/Loader/Loader.Component';

class AgentAdd extends Component {

    state = {
        submittingForm: false,
        submittingBatchForm: false,
    }

    handleStepSubmit = formData => {
        formData['role_id'] = 6;
        formData['policy_ids'] = [];
        formData['is_active'] = true;
        formData['organization_type_id'] = 4;

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
                    organization_type_id: 4,
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
                text: `Providers were created successfully!`,
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
                    <LayoutContentWrapper style={{ height: '100vh' }}>
                            <PageHeader>
                                <div className="col-md-6"><h3>Agent Upload</h3></div>
                            </PageHeader>
                        <LayoutContent>
                            <div className="row">
                                <div className="col-md-12 text-right">
                                    <Link to="/dashboard/agent_all">
                                        <button type="button" className="btn btn-sm btn-primary">All Agents</button>
                                    </Link>
                                </div>
                            </div>
                            <hr/>
                            <div className="row">
                                <div className="col-md-6">
                                    <Card title="Agent Upload" style={{width:'100%'}}>
                                        <AgentBankForm onSubmit={this.handleStepSubmit} submittingForm={this.state.submittingForm} />
                                    </Card>
                                </div>
                                <div className="col-md-6">
                                    <Card title="Agent Upload (Batch)" style={{width:'100%'}}>
                                        <OrganizationBatchForm onSubmit={this.handleBatchSubmit} submittingForm={this.state.submittingBatchForm}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(AgentAdd);
