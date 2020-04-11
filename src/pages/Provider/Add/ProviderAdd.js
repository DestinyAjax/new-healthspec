import React, { Component } from 'react';
import swal from 'sweetalert';
import {connect} from 'react-redux';
import {Card} from 'antd';
import { reset } from 'redux-form';
import { Link } from 'react-router-dom';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import LayoutContent from '@iso/components/utility/layoutContent';
import DashboardLayout from '../../../containers/Dashboard/Dashboard';
import Loader from '../../../ui/Loader/Loader.Component';
import OrganizationBatchForm from '../../../ui/forms/OrganizationBatchForm';
import { storeOrganizationProfile, resetStoreOrganizationProfile, storeBatchOrganizationProfile } from '../../../shared/actions/OrganizationProfileAdd.action';
import { local_governments } from '../../../shared/utils/local_government';
import BeneficiaryStepTwoForm from '../../../ui/forms/BeneficiaryStepTwoForm';
import ServiceProviderStepOneForm from '../../../ui/forms/ServiceProviderStepOneForm';
import ServiceProviderStepTwoForm from '../../../ui/forms/ServiceProviderStepTwoForm';
import ServiceProviderStepThreeForm from '../../../ui/forms/ServiceProviderStepThreeForm';
import { model } from '../../../shared/models/organization_profile';
import { setStorage, getStorage, removeStorage } from '../../../shared/utils/storage';

class ProviderAdd extends Component {

    state = {
        activeStep: 0,
        steps: {
            0: {
                percentage: '25%',
                description: 'Personal Info. You are required to provide accurate personal infomation and that of Next of Kin'
            },
            1: {
                percentage: '50%',
                description: 'Personal Info. You are required to provide accurate personal infomation and that of Next of Kin'
            },
            2: {
                percentage: '75%',
                description: 'Personal Info. You are required to provide accurate personal infomation and that of Next of Kin'
            },
            3: {
                percentage: '100%',
                description: 'Personal Info. You are required to provide accurate personal infomation and that of Next of Kin'
            },
            4: {
                percentage: '100%',
                description: 'Personal Info. You are required to provide accurate personal infomation and that of Next of Kin'
            },
        },
        formData: model,
        picture: null,
        submittingForm: false,
        submittingBatchForm: false,
        organization_type_id: 2,
        image_string: null,
    }

    previousStep = () => {
        if (this.state.activeStep === 0) {
            return this.state.activeStep;
        }

        this.setState({
            activeStep: this.state.activeStep - 1
        });
    }

    nextStep = () => {
        this.setState({
            activeStep: this.state.activeStep + 1
        });
    }

    handleStepTwoForm = (file, image_string) => {
        this.setState({
            picture: file,
            image_string: image_string
        });
        return this.nextStep();
    }

    handleStepSubmit = async formData => {

        let form = { ...this.state.formData, ...formData }

        try {
            await setStorage('ohis:beneficiary_form_data', form);
        } catch (error) {
            console.dir('Error storing in storage');
        }

        this.setState({
            formData: form
        }, () => {
            if (this.state.activeStep === 3) {
                let form = {};
                form['role_id'] = 4;
                form['policy_ids'] = [];
                form['is_active'] = true;
                form['picture'] = this.state.image_string;
                form['code'] = this.state.formData.primary_phone_number;
                form['organization_type_id'] = this.state.organization_type_id;


                return this.setState({
                    submittingForm: true,
                    formData: { ...this.state.formData, ...form }
                }, () => {
                    return this.props.storeOrganizationProfile(this.state.formData);
                });
            }

            return this.nextStep();
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
                this.props.resetStoreOrganizationProfile();
                removeStorage('ohis:beneficiary_form_data');
                this.setState({
                    formData: model,
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

    componentWillUnmount() {
        removeStorage('ohis:beneficiary_form_data');
    }
    render() {

        let currentForm, batchFormContainer;

        let introductoryHeader = (
            <div className="row">
                <div className="col-md-6">
                    <h4>Provider Upload (single)</h4>
                </div>
                <div className="col-md-6 text-right">
                    <Link to="/dashboard/provider_all">
                        <button type="button" className="btn btn-sm btn-success">
                            View Providers
                        </button>
                    </Link>
                </div>
                <div className="col-md-12">
                    <div className="subTitle">
                        {this.state.steps[this.state.activeStep].description}
                    </div>
                </div>
            </div>  
        );

        let percentageCounter = (
            <div className='card-body'>
                <div className="slider" style={{ width: `${this.state.steps[this.state.activeStep].percentage}` }}></div>
            </div>
        );

        if (this.state.activeStep == 0) {
            currentForm = <ServiceProviderStepOneForm onSubmit={this.handleStepSubmit} previousStep={this.previousStep} initialValues={this.state.formData} />
        }
        if (this.state.activeStep == 1) {
            currentForm = <ServiceProviderStepTwoForm onSubmit={this.handleStepSubmit} previousStep={this.previousStep} local_governments={local_governments} initialValues={this.state.formData} />
        }
        if (this.state.activeStep == 2) {
            currentForm = <BeneficiaryStepTwoForm onSubmit={this.handleStepTwoForm} previousStep={this.previousStep} initialValues={this.state.formData} />
        }
        if (this.state.activeStep == 3) {
            currentForm = <ServiceProviderStepThreeForm
                is_provider
                onSubmit={this.handleStepSubmit}
                previousStep={this.previousStep}
                submittingForm={this.state.submittingForm}
                initialValues={this.state.formData}
            />
        }
        if (this.state.activeStep == 4) {
            currentForm = <ServiceProviderStepOneForm onSubmit={this.handleStepSubmit} previousStep={this.previousStep} />
        }


        if (this.state.activeStep === 0) {
            batchFormContainer = (
                <Card style={{width: '100%'}}>
                    <div style={{marginBottom: '20px'}}>
                        Provider Upload (Batch)<br/>
                        <a className="downloadLink" href={require('../../../assets/files/organization_profile.xlsx')} download>Download format</a>
                    </div>
                    <OrganizationBatchForm
                        onSubmit={this.handleBatchSubmit}
                        submittingForm={this.state.submittingBatchForm}
                    />
                </Card>
            )
        }

        return (
            <DashboardLayout>
                <Loader>
                    <LayoutContentWrapper>
                        <LayoutContent>
                            {introductoryHeader}
                            {percentageCounter}

                            <div className="row">
                                <div className="col-md-8">
                                    <Card style={{width: '100%'}}>
                                        {currentForm}
                                    </Card>
                                </div>
                                <div className="col-md-4">
                                    {batchFormContainer}
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

export default connect(mapStateToProps, mapDispatchToProps)(ProviderAdd);