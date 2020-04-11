import React, { Component } from 'react';
import swal from 'sweetalert';
import {Card} from 'antd';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import { reset } from 'redux-form';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import LayoutContent from '@iso/components/utility/layoutContent';
import DashboardLayout from '../../../containers/Dashboard/Dashboard';
import BeneficiaryStepOneFormNew from '../../../ui/forms/BeneficiaryStepOneFormNew';

import BeneficiaryStepTwoForm from '../../../ui/forms/BeneficiaryStepTwoForm';
import BeneficiaryStepSixFormNew from '../../../ui/forms/BeneficiaryStepSixFormNew';
import BeneficiaryStepFiveFormNew from '../../../ui/forms/BeneficiaryStepFiveFormNew';
import BeneficiaryStepFourFormNew from '../../../ui/forms/BeneficiaryStepFourFormNew';
import BeneficiaryStepSevenFormNew from '../../../ui/forms/BeneficiaryStepSevenFormNew';
import BeneficiaryStepThreeFormNew from '../../../ui/forms/BeneficiaryStepThreeFormNew';
import BeneficiaryCard from '../../../ui/BeneficiaryCard';
import BeneficiaryBatchForm from '../../../ui/forms/BeneficiaryBatchForm';
import { local_governments } from '../../../shared/utils/local_government';
import { storeBeneficiary, storeBatchBeneficiary, resetStoreBeneficiary, beneficiaryCreateDependency } from '../../../shared/actions/Beneficiary.action';
import { setStorage, getStorage, removeStorage } from '../../../shared/utils/storage';
import { model } from '../../../shared/models/beneficiary';
import Loader from '../../../ui/Loader/Loader.Component';

class BeneficiaryAdd extends Component {

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
        this.props.beneficiaryCreateDependency();
        this.setState({
            formData: await getStorage('ohis:beneficiary_form_data') || model
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

    handleStepTwoForm = (file, image_string) => {
        this.setState({
            picture: file,
            image_string: image_string
        });
        return this.nextStep();
    }

    handleStepSubmit = async formData => {
        let form = { ...this.state.formData, ...formData };

        try {
            await setStorage('ohis:beneficiary_form_data', form);
        } catch (error) {
            console.dir('Error storing in storage');
        }

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
        form['agent_id'] = this.props.agent_id;
        form['picture'] = this.state.image_string;
        form['agent_role_user_id'] = this.props.active.id;
        form['code'] = this.state.formData.primary_phone_number;

        return this.setState({
            submittingForm: true,
            formData: { ...this.state.formData, ...form, ...formData }
        }, () => {
            return this.props.storeBeneficiary(this.state.formData);
        });
    }

    handleBatchSubmit = formData => {
        this.setState({
            submittingBatchForm: true
        }, () => {
            return this.props.storeBatchBeneficiary({
                data: {
                    sector_id: formData.sector_id,
                    policy_id: formData.policy_id,
                    company_id: formData.company_id,
                    provider_id: formData.provider_id,
                    agent_role_user_id: this.props.active.id
                },
                picture: formData.beneficiaries
            });
        });
    }

    showNotification = (prevProps, prevState) => {
        if ((this.props.store_beneficiary_status === 200) && (prevProps.store_beneficiary_message !== this.props.store_beneficiary_message)) {

            return this.setState({
                submittingForm: false
            }, () => {
                this.props.resetStoreBeneficiary();
                removeStorage('ohis:beneficiary_form_data');
                this.props.history.push(`beneficiary_card_${this.props.transaction.id}`);
            });
        }

        if ((this.props.store_beneficiary_status === 422) && (prevProps.store_beneficiary_message !== this.props.store_beneficiary_message)) {
            return this.setState({
                submittingForm: false
            }, async () => {
                let alert = await swal({
                    title: "Opps!",
                    text: `Beneficiary with same firstname and phone number already exists!`,
                    icon: "error",
                    closeOnClickOutside: false
                });
    
                if (alert) {
                    this.props.resetStoreBeneficiary();
                }
            });
        }

        if (this.props.store_batch_beneficiary_status === 200 && (prevProps.store_batch_beneficiary_message !== this.props.store_batch_beneficiary_message)) {
            this.props.reset('BeneficiaryBatchForm');
            this.setState({
                submittingBatchForm: false
            }, async () => {
                let alert = await swal({
                    title: "Good job!",
                    text: `Beneficiaries were created successfully!`,
                    icon: "success",
                    closeOnClickOutside: false
                });
    
                if (alert) {
                    this.props.resetStoreBeneficiary();
                }
            });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        this.showNotification(prevProps, prevState);
    }

    componentWillUnmount() {
        removeStorage('ohis:beneficiary_form_data');
    }
    
    render() {
        let currentForm, formContainer;

        let addBeneficiary = (
            <div className="row">
                <div className="col-md-6"><h4>Beneficiary Upload (Single)</h4></div>
                <div className="col-md-6 text-right">
                    <Link to="/dashboard/beneficiary_all">
                        <button type="button" className="btn btn-sm btn-primary">All Enrollee</button>
                    </Link>
                </div>
            </div>
        );

        if (this.props.active.role.name === 'AGENT_ADMIN' || this.props.active.role.name === 'AGENT_MODERATOR') {
            addBeneficiary = (
                <div className="row">
                    <div className="col-md-6"><h4>All Beneficiaries</h4></div>
                    <div className="col-md-6 text-right">
                        <Link to="/dashboard/agent_my_beneficiary">
                            <button type="button" className="btn btn-sm btn-primary">Beneficiary Upload (Single)</button>
                        </Link>
                    </div>
                </div>
            );
        }

        let introductoryHeader = (
            <div className="" style={{marginBottom: '20px'}}>
                <div className="subTitle">
                    {this.state.steps[this.state.activeStep].description}
                </div>
            </div>
        );

        let percentageCounter = (
            <div style={{marginBottom: '20px'}}>
                <div className="slider" style={{ width: `${this.state.steps[this.state.activeStep].percentage}` }}></div>
            </div>
        );

        if (this.props.get_policies_status === 200) {
            if (this.state.activeStep == 0) {
                currentForm = <BeneficiaryStepOneFormNew onSubmit={this.handleStepSubmit}
                    sectors={this.props.sectors}
                    policies={this.props.policies}
                    organization_profiles={this.props.organization_profiles}
                    local_governments={local_governments}
                    initialValues={this.state.formData}
                />
            }
            if (this.state.activeStep == 1) {
                currentForm = <BeneficiaryStepTwoForm onSubmit={this.handleStepTwoForm} previousStep={this.previousStep} />
            }
            if (this.state.activeStep == 2) {
                currentForm = <BeneficiaryStepThreeFormNew onSubmit={this.handleStepSubmit} previousStep={this.previousStep} initialValues={this.state.formData} />
            }
            if (this.state.activeStep == 3) {
                currentForm = <BeneficiaryStepFourFormNew onSubmit={this.handleStepSubmit} previousStep={this.previousStep} initialValues={this.state.formData} />
            }
            if (this.state.activeStep == 4) {
                currentForm = <BeneficiaryStepFiveFormNew onSubmit={this.handleStepSubmit} previousStep={this.previousStep} initialValues={this.state.formData} />
            }
            if (this.state.activeStep == 5) {
                currentForm = <BeneficiaryStepSixFormNew onSubmit={this.handleStepSubmit} previousStep={this.previousStep} initialValues={this.state.formData} />
            }
            if (this.state.activeStep == 6) {
                currentForm = <BeneficiaryStepSevenFormNew onSubmit={this.handleFinalSubmit} previousStep={this.previousStep} submittingForm={this.state.submittingForm} initialValues={this.state.formData} />
            }
            if (this.state.activeStep == 7) {
                currentForm = <BeneficiaryCard nextStep={this.nextStep} transaction={this.props.transaction} />
            }

            let batchFormContainer;

            if (this.state.activeStep === 0) {
                batchFormContainer = (
                    <Card title="Beneficiary Upload (Batch)" style={{width:'100%'}}>
                        <a className="downloadLink" href={require('../../../assets/files/beneficiary.csv')} download>Download format</a>
                        <BeneficiaryBatchForm
                            sectors={this.props.sectors}
                            policies={this.props.policies}
                            onSubmit={this.handleBatchSubmit}
                            submittingForm={this.state.submittingBatchForm}
                            organization_profiles={this.props.organization_profiles}
                        />
                    </Card> 
                )
            }

            formContainer = (
                <React.Fragment>
                    <Card style={{width:'100%'}}>
                        {introductoryHeader}
                        {percentageCounter}
                        <div >
                            {currentForm}
                        </div>
                    </Card>
                    {batchFormContainer}
                </React.Fragment>
            )
        }

        return (
            <DashboardLayout>
                <Loader>
                    <LayoutContentWrapper>
                        <LayoutContent>
                            {addBeneficiary}
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
    agent_id: state.AuthReducer.id,
    active: state.ChoseRoleReducer.role,
    sectors: state.BeneficiaryReducer.sectors,
    policies: state.BeneficiaryReducer.dependency_policies,
    get_policies_status: state.BeneficiaryReducer.get_dependency_status,
    organization_profiles: state.BeneficiaryReducer.dependency_organization_profiles,
    beneficiary: state.BeneficiaryReducer.beneficiary,
    transaction: state.BeneficiaryReducer.transaction,
    store_beneficiary_status: state.BeneficiaryReducer.store_beneficiary_status,
    store_beneficiary_message: state.BeneficiaryReducer.store_beneficiary_message,
    store_batch_beneficiary_status: state.BeneficiaryReducer.store_batch_beneficiary_status,
    store_batch_beneficiary_message: state.BeneficiaryReducer.store_batch_beneficiary_message,
});

const mapDispatchToProps = dispatch => ({
    reset: payload => dispatch(reset(payload)),
    resetStoreBeneficiary: () => dispatch(resetStoreBeneficiary()),
    storeBeneficiary: payload => dispatch(storeBeneficiary(payload)),
    storeBatchBeneficiary: payload => dispatch(storeBatchBeneficiary(payload)),
    beneficiaryCreateDependency: () => dispatch(beneficiaryCreateDependency()),
});

export default connect(mapStateToProps, mapDispatchToProps)(BeneficiaryAdd);
