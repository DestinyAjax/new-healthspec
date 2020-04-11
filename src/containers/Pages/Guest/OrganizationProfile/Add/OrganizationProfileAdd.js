import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import { reset } from 'redux-form';
import FooterComponent from '../../../Home/components/Footer/FooterComponent';
import HeaderComponent from '../../../Home/components/Header/HeaderComponent';
import OrganisationStyleWrapper from './Style';
import { local_governments } from '../../../../../shared/utils/local_government';
import BeneficiaryStepTwoForm from '../../../../../ui/forms/BeneficiaryStepTwoForm';
import ServiceProviderStepOneForm from '../../../../../ui/forms/ServiceProviderStepOneForm';
import ServiceProviderStepTwoForm from '../../../../../ui/forms/ServiceProviderStepTwoForm';
import ServiceProviderStepThreeForm from '../../../../../ui/forms/ServiceProviderStepThreeForm';
import SuccessCard from '../../../../../ui/SuccessCard';
import {
    storeOrganizationProfile, resetStoreOrganizationProfile, getDependency
} from '../../../../../shared/actions/OrganizationProfileAdd.action';
import { model } from '../../../../../shared/models/organization_profile';
import { setStorage, } from '../../../../../shared/utils/storage';
import '../../../Home/style.css';

class OrganizationProfileAdd extends React.Component {

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
        role_id: '',
        picture: null,
        image_string: null,
        organizationName: '',
        submittingForm: false,
        organization_type_id: null
    }

    nextStep = () => {
        this.setState({
            activeStep: this.state.activeStep + 1
        });
    }

    previousStep = () => {
        if (this.state.activeStep === 0) {
            return this.state.activeStep;
        }

        this.setState({
            activeStep: this.state.activeStep - 1
        });
    }

    checkSlug = slug => {
        if ((slug != 'new-hmo') && (slug !== 'new-company') && (slug !== 'new-hospital') && (slug !== 'new-agent')) {
            return this.props.history.push('/');
        }
    }


    navigateOnSuccessWith = props => {
        if (props.status === 200) {
            this.nextStep();
        }
    }

    async componentDidMount() {
        this.checkSlug(this.props.match.params.slug);
        if (this.getNameFrom(this.props.match.params.slug) === 'Company') {
            this.props.getDependency();
        }
    }

    componentWillReceiveProps(nextProps) {
        this.navigateOnSuccessWith(nextProps);
    }

    getNameFrom = slug => {
        if (slug === 'new-hmo') {
            this.setState({
                organizationName: 'HMO',
                organization_type_id: 1,
                role_id: 3,
                activeStep: 0
            });
            return 'HMO';
        }
        if (slug === 'new-hospital') {
            this.setState({
                organizationName: 'Provider',
                organization_type_id: 2,
                activeStep: 0,
                role_id: 4
            });
            return 'Provider';
        }
        if (slug === 'new-company') {
            this.setState({
                organizationName: 'Company',
                organization_type_id: 3,
                activeStep: 0,
                role_id: 5
            });
            return 'Company';
        }
        if (slug === 'new-agent') {
            this.setState({
                organizationName: 'Agent',
                organization_type_id: 4,
                activeStep: 0,
                role_id: 6
            });
            return 'Agent';
        }
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
                form['policy_ids'] = [];
                form['is_active'] = false;
                form['role_id'] = this.state.role_id;
                form['organization_type_id'] = this.state.organization_type_id;

                if (this.state.organization_type_id === 3) {
                    form['policy_ids'] = this.state.formData.policy_id.map(policy_id => policy_id.value);
                }

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

    render() {

        let currentForm;

        let percentageCounter = (
            <div className={'card card-body'}>
                <div className="slider" style={{ width: `${this.state.steps[this.state.activeStep].percentage}` }}></div>
            </div>
        );

        if (this.state.organizationName === 'Company' && this.props.get_dependency_status === 200) {
            if (this.state.activeStep === 0) {
                currentForm = <ServiceProviderStepOneForm onSubmit={this.handleStepSubmit} previousStep={this.previousStep} isCompany policies={this.props.policies} initialValues={this.state.formData} />
            }
            if (this.state.activeStep === 1) {
                currentForm = <ServiceProviderStepTwoForm onSubmit={this.handleStepSubmit} previousStep={this.previousStep} local_governments={local_governments} initialValues={this.state.formData} />
            }
            if (this.state.activeStep === 2) {
                currentForm = <BeneficiaryStepTwoForm onSubmit={this.handleStepTwoForm} previousStep={this.previousStep} initialValues={this.state.formData} />
            }
            if (this.state.activeStep === 3) {
                currentForm = <ServiceProviderStepThreeForm
                    onSubmit={this.handleStepSubmit}
                    previousStep={this.previousStep}
                    initialValues={this.state.formData}
                    submittingForm={this.state.submittingForm}
                    is_provider={this.state.organization_type_id === 2 ? true : false}
                />
            }
        } else {
            if (this.state.activeStep === 0) {
                currentForm = <ServiceProviderStepOneForm onSubmit={this.handleStepSubmit} previousStep={this.previousStep} initialValues={this.state.formData} />
            }
            if (this.state.activeStep === 1) {
                currentForm = <ServiceProviderStepTwoForm onSubmit={this.handleStepSubmit} previousStep={this.previousStep} local_governments={local_governments} initialValues={this.state.formData} />
            }
            if (this.state.activeStep === 2) {
                currentForm = <BeneficiaryStepTwoForm onSubmit={this.handleStepTwoForm} previousStep={this.previousStep} initialValues={this.state.formData} />
            }
            if (this.state.activeStep === 3) {
                currentForm = <ServiceProviderStepThreeForm
                    onSubmit={this.handleStepSubmit}
                    previousStep={this.previousStep}
                    submittingForm={this.state.submittingForm}
                    initialValues={this.state.formData}
                    is_provider={this.state.organization_type_id === 2 ? true : false}
                />
            }
        }


        if (this.state.activeStep === 4) {
            percentageCounter = null;
            currentForm = <SuccessCard />
        }

        return (
            <Fragment>
                <HeaderComponent />
                <OrganisationStyleWrapper className="isoBenefitPageWrapper">
                    
                    <section className="second-section">
                        <div className="row mb-4 text-center">
                            <div className="col-md-12">
                                <h3 className="mb-3">Register {this.state.organizationName}</h3>
                                <p className="text-center">{this.state.steps[this.state.activeStep].description}</p>
                            </div>
                        </div>
                    </section> 

                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
                                {percentageCounter}
                                <div  className={'card card-body'}>
                                    {currentForm}
                                </div>
                            </div>
                        </div>
                    </div>
                </OrganisationStyleWrapper>
                <FooterComponent bottomFooter={false}/>
            </Fragment>  
        );
    }
};

const mapStateToProps = state => ({
    policies: state.OrganizationProfileReducer.policies,
    organizationProfile: state.OrganizationProfileReducer.organization_profile,
    status: state.OrganizationProfileReducer.store_organization_profile_status,
    message: state.OrganizationProfileReducer.store_organization_profile_message,
    get_dependency_status: state.OrganizationProfileReducer.get_dependency_status
});

const mapDispatchToProps = dispatch => ({
    reset: payload => dispatch(reset(payload)),
    getDependency: () => dispatch(getDependency()),
    resetStoreOrganizationProfile: () => dispatch(resetStoreOrganizationProfile()),
    storeOrganizationProfile: payload => dispatch(storeOrganizationProfile(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationProfileAdd);