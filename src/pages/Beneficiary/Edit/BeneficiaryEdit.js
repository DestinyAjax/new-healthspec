import React, { Component } from 'react';
import swal from 'sweetalert';
import {connect} from 'react-redux';
import { reset } from 'redux-form';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import LayoutContent from '@iso/components/utility/layoutContent';
import DashboardLayout from '../../../containers/Dashboard/Dashboard';
import BeneficiaryStepTwoForm from '../../../ui/forms/BeneficiaryStepTwoForm';
import BeneficiaryStepSixFormNew from '../../../ui/forms/BeneficiaryStepSixFormNew';
import BeneficiaryStepOneFormNew from '../../../ui/forms/BeneficiaryStepOneFormNew';
import BeneficiaryStepFiveFormNew from '../../../ui/forms/BeneficiaryStepFiveFormNew';
import BeneficiaryStepFourFormNew from '../../../ui/forms/BeneficiaryStepFourFormNew';
import BeneficiaryStepSevenFormNew from '../../../ui/forms/BeneficiaryStepSevenFormNew';
import BeneficiaryStepThreeFormNew from '../../../ui/forms/BeneficiaryStepThreeFormNew';
import { local_governments } from '../../../shared/utils/local_government';
import { getBeneficiary, updateBeneficiary, resetStoreBeneficiary } from '../../../shared/actions/Beneficiary.action';
import { getStorage, removeStorage } from '../../../shared/utils/storage';
import { model } from '../../../shared/models/beneficiary';
import Loader from '../../../ui/Loader/Loader.Component';
import Breadcrumb from '../../../ui/Breadcrumb';

class BeneficiaryEdit extends Component {

    state = {
        activeStep: 0,
        steps: {
            0: {
                percentage: '12.5%',
                description: 'Personal Info. You are required to provide accurate personal infomation and that of Next of Kin'
            },
            1: {
                percentage: '14.5%',
                description: 'Personal Info. You are required to provide accurate personal infomation and that of Next of Kin'
            },
            2: {
                percentage: '27%',
                description: 'Personal Info. You are required to provide accurate personal infomation and that of Next of Kin'
            },
            3: {
                percentage: '39.5%',
                description: 'Personal Info. You are required to provide accurate personal infomation and that of Next of Kin'
            },
            4: {
                percentage: '52%',
                description: 'Personal Info. You are required to provide accurate personal infomation and that of Next of Kin'
            },
            5: {
                percentage: '64.5%',
                description: 'Personal Info. You are required to provide accurate personal infomation and that of Next of Kin'
            },
            6: {
                percentage: '77%',
                description: 'Personal Info. You are required to provide accurate personal infomation and that of Next of Kin'
            },
            7: {
                percentage: '89.5%',
                description: 'Personal Info. You are required to provide accurate personal infomation and that of Next of Kin'
            }
        },
        policyName: 'Policy',
        formData: model,
        submittingForm: false,
        picture: null,
        image_string: null
    }

    async componentDidMount() {
        this.props.getBeneficiary({
            slug: this.props.match.params.slug
        });
    }

    nextStep = () => {
        let nextStep = this.state.activeStep + 1;

        if (this.state.activeStep == 6) {
            nextStep = 0;
        }

        this.setState({
            activeStep: nextStep
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

    start = () => {
        return this.nextStep();
    }

    handleStepTwoForm = file => {
        this.setState({
            picture: file
        });

        return this.nextStep();
    }

    handleStepSubmit = async formData => {
        let form = { ...this.state.formData, ...formData };

        this.setState({
            formData: form
        }, async () => {
            let beneficiary_form_data = await getStorage('ohis:beneficiary_form_data');

            return this.nextStep();
        });
    }

    handleFinalSubmit = formData => {
        let form = {};

        form['client'] = 'web';
        form['picture'] = this.state.image_string;
        form['enrol_id'] = this.props.beneficiary.enrol_id;
        form['role_user_slug'] = this.props.match.params.slug;

        return this.setState({
            submittingForm: true,
            formData: { ...this.state.formData, ...form, ...formData }
        }, () => {
            return this.props.updateBeneficiary(this.state.formData);
        });
    }

    showNotification = async props => {
        if (props.status === 200) {
            this.setState({
                submittingForm: false
            });

            let alert = await swal({
                title: "Good job!",
                text: `Beneficiary was updated successfully!`,
                icon: "success",
                closeOnClickOutside: false
            });

            if (alert) {
                this.props.resetStoreBeneficiary();
                removeStorage('ohis:beneficiary_form_data');
                return this.props.history.push('/beneficiary_all');
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        this.showNotification(nextProps);
    }
    
    render() {
        let currentForm, formContainer;

        let introductoryHeader = (
            <div className="subTitle">
                {this.state.steps[this.state.activeStep].description}
            </div>
        );

        let percentageCounter = (
            <div className="slider" style={{ width: `${this.state.steps[this.state.activeStep].percentage}` }}></div>
        );

        if (this.props.get_beneficiary_status === 200) {
            if (this.state.activeStep === 0) {
                currentForm = (
                    <BeneficiaryStepOneFormNew onSubmit={this.handleStepSubmit}
                        sectors={this.props.sectors}
                        policies={this.props.policies}
                        local_governments={local_governments}
                        initialValues={this.props.beneficiary}
                        organization_profiles={this.props.organization_profiles}
                    />
                );
            }

            if (this.state.activeStep === 1) {
                currentForm = (
                    <BeneficiaryStepTwoForm 
                        onSubmit={this.handleStepTwoForm} 
                        previousStep={this.previousStep} />
                );
            }

            if (this.state.activeStep === 2) {
                currentForm = (
                    <BeneficiaryStepThreeFormNew 
                        onSubmit={this.handleStepSubmit} 
                        previousStep={this.previousStep} 
                        initialValues={this.props.beneficiary} />
                );
            }

            if (this.state.activeStep === 3) {
                currentForm = (
                    <BeneficiaryStepFourFormNew 
                        onSubmit={this.handleStepSubmit} 
                        previousStep={this.previousStep} 
                        initialValues={this.props.beneficiary} />
                );
            }

            if (this.state.activeStep === 4) {
                currentForm = (
                    <BeneficiaryStepFiveFormNew 
                        onSubmit={this.handleStepSubmit} 
                        previousStep={this.previousStep} 
                        initialValues={this.props.beneficiary} />
                );
            }

            if (this.state.activeStep === 5) {
                currentForm = (
                    <BeneficiaryStepSixFormNew 
                        onSubmit={this.handleStepSubmit} 
                        previousStep={this.previousStep} 
                        initialValues={this.props.beneficiary} />
                );
            }

            if (this.state.activeStep === 6) {
                currentForm = (
                    <BeneficiaryStepSevenFormNew 
                        onSubmit={this.handleFinalSubmit} 
                        previousStep={this.previousStep} 
                        submittingForm={this.state.submittingForm} 
                        initialValues={this.props.beneficiary} />
                )
            }

            formContainer = (
                <div className='card card-body'>
                    {introductoryHeader}<hr/>
                    {percentageCounter}<hr/>
                    {currentForm} 
                </div>
            );
        }

        return (
            <DashboardLayout>
                <Loader>
                    <LayoutContentWrapper>
                        <LayoutContent>
                            <div className="row">
                                <div className="col-md-12">
                                    <Breadcrumb links={[
                                        {
                                            url: '/dashboard/beneficiary_all',
                                            name: 'All Enrollees'
                                        },
                                        {
                                            url: `/dashboard/enrollee_view_${this.props.match.params.slug}`,
                                            name: "Enrollee"
                                        },
                                        {
                                            url: `/dashboard/beneficiary_edit_${this.props.match.params.slug}`,
                                            name: "Edit"
                                        },
                                    ]} />
                                </div>
                            </div>
                            <hr/>
                            <div className="row">
                                <div className="col-md-12">
                                    {formContainer}
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
    beneficiary: state.BeneficiaryReducer.beneficiary,
    status: state.BeneficiaryReducer.update_beneficiary_status,
    sectors: state.BeneficiaryReducer.sectors,
    policies: state.BeneficiaryReducer.dependency_policies,
    get_beneficiary_status: state.BeneficiaryReducer.get_beneficiary_status,
    organization_profiles: state.BeneficiaryReducer.dependency_organization_profiles,
});

const mapDispatchToProps = dispatch => ({
    reset: payload => dispatch(reset(payload)),
    getBeneficiary: payload => dispatch(getBeneficiary(payload)),
    resetStoreBeneficiary: () => dispatch(resetStoreBeneficiary()),
    updateBeneficiary: payload => dispatch(updateBeneficiary(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BeneficiaryEdit);
