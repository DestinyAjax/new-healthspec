import React, { Component } from 'react';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import { reset } from 'redux-form';
import { Link } from 'react-router-dom';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import LayoutContent from '@iso/components/utility/layoutContent';
import DashboardLayout from '../../../containers/Dashboard/Dashboard';
import OrganizationBatchForm from '../../../ui/forms/OrganizationBatchForm';
import { storeOrganizationProfile, resetStoreOrganizationProfile, storeBatchOrganizationProfile,getDependency } from '../../../shared/actions/OrganizationProfileAdd.action';
import CompanyQuickForm from '../../../ui/forms/CompanyQuickForm';
import Loader from '../../../ui/Loader/Loader.Component';

class CompanyAdd extends Component {

    state = {
        submittingForm: false,
        submittingBatchForm: false,
    }

    handleStepSubmit = formData => {
        formData['role_id'] = 6;
        formData['is_active'] = true;
        formData['organization_type_id'] = 3;
        formData['code'] = formData.primary_phone_number;

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
            // console.dir(formData.policy_ids);
            return this.props.storeBatchOrganizationProfile({
                data: {
                    organization_type_id: 3,
                    sector_id: formData.sector_id,
                    policy_ids: formData.policy_ids
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
                this.props.reset('CompanyQuickForm');
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
                text: `Company was created successfully!`,
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

    componentDidMount() {
        this.props.getDependency();
    }

    render() {
        let container;

        if (this.props.get_dependency_status === 200) {
            container = (
                <div className="row">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <CompanyQuickForm 
                                    onSubmit={this.handleStepSubmit} 
                                    submittingForm={this.state.submittingForm} 
                                    sectors={this.props.sectors} 
                                    policies={this.props.policies} 
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <OrganizationBatchForm
                                    isCompany={true}
                                    sectors={this.props.sectors}
                                    policies={this.props.policies}
                                    onSubmit={this.handleBatchSubmit}
                                    submittingForm={this.state.submittingBatchForm}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <DashboardLayout>
                <LayoutContentWrapper>
                    <LayoutContent>
                        <div className="row">
                            <div className="col-md-6">
                                <h4>Company Add</h4>
                            </div>
                            <div className="col-md-6 text-right">
                                <Link to="/dashboard/company_all">
                                    <button type="button" className="btn btn-sm btn-primary">All Company</button>
                                </Link>
                            </div>
                        </div><hr/>
                    
                        {container}
                    </LayoutContent>
                </LayoutContentWrapper>
            </DashboardLayout>
        );
    }
}

const mapStateToProps = state => ({
    sectors: state.OrganizationProfileReducer.sectors,
    policies: state.OrganizationProfileReducer.policies,
    get_dependency_status: state.OrganizationProfileReducer.get_dependency_status,
    organizationProfile: state.OrganizationProfileReducer.organization_profile,
    status: state.OrganizationProfileReducer.store_organization_profile_status,
    message: state.OrganizationProfileReducer.store_organization_profile_message,
    store_batch_organization_profile_status: state.OrganizationProfileReducer.store_batch_organization_profile_status
});

const mapDispatchToProps = dispatch => ({
    reset: payload => dispatch(reset(payload)),
    getDependency: () => dispatch(getDependency()),
    resetStoreOrganizationProfile: () => dispatch(resetStoreOrganizationProfile()),
    storeOrganizationProfile: payload => dispatch(storeOrganizationProfile(payload)),
    storeBatchOrganizationProfile: payload => dispatch(storeBatchOrganizationProfile(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(CompanyAdd);
