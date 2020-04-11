import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import FooterComponent from '../../../Home/components/Footer/FooterComponent';
import HeaderComponent from '../../../Home/components/Header/HeaderComponent';
import PolicyStyleWrapper from './PolicyAddStyle';
import { local_governments } from '../../../../../shared/utils/local_government';
import { getStorage, removeStorage } from '../../../../../shared/utils/storage';
import BeneficiaryPlanDetail from '../../../../../ui/BeneficiaryPlanDetail';
import BeneficiaryStepTwoForm from '../../../../../ui/forms/BeneficiaryStepTwoForm';
import BeneficiaryStepOneForm from '../../../../../ui/forms/BeneficiaryStepOneForm';
import BeneficiaryStepSixFormNew from '../../../../../ui/forms/BeneficiaryStepSixFormNew';
import BeneficiaryStepFiveFormNew from '../../../../../ui/forms/BeneficiaryStepFiveFormNew';
import BeneficiaryStepFourFormNew from '../../../../../ui/forms/BeneficiaryStepFourFormNew';
import BeneficiaryStepSevenFormNew from '../../../../../ui/forms/BeneficiaryStepSevenFormNew';
import BeneficiaryStepThreeFormNew from '../../../../../ui/forms/BeneficiaryStepThreeFormNew';
import BeneficiaryCard from '../../../../../ui/BeneficiaryCard';
import { beneficiaryModel } from './PolicyModel';
import { getDefaultData } from '../../../../../shared/actions/Guest.action';
import { storeBeneficiary, resetStoreBeneficiary } from '../../../../../shared/actions/Beneficiary.action';
import '../../../Home/style.css';

class PolicyAdd extends React.Component {

    state = {
        activeStep: 1,
        steps: {
            0: {
                percentage: '12.5%',
                description: 'Personal Info. You are required to provide accurate personal infomation and that of Next of Kin'
            },
            1: {
                percentage: '25%',
                description: 'Personal Info. You are required to provide accurate personal infomation and that of Next of Kin'
            },
            2: {
                percentage: '37.5%',
                description: 'Personal Info. You are required to provide accurate personal infomation and that of Next of Kin'
            },
            3: {
                percentage: '50%',
                description: 'Personal Info. You are required to provide accurate personal infomation and that of Next of Kin'
            },
            4: {
                percentage: '62.5%',
                description: 'Personal Info. You are required to provide accurate personal infomation and that of Next of Kin'
            },
            5: {
                percentage: '75%',
                description: 'Personal Info. You are required to provide accurate personal infomation and that of Next of Kin'
            },
            6: {
                percentage: '87.5%',
                description: 'Personal Info. You are required to provide accurate personal infomation and that of Next of Kin'
            },
            7: {
                percentage: '100%',
                description: 'Personal Info. You are required to provide accurate personal infomation and that of Next of Kin'
            },
            8: {
                percentage: '100%',
                description: 'Personal Info. You are required to provide accurate personal infomation and that of Next of Kin'
            },
        },
        policyName: 'Policy',
        formData: beneficiaryModel,
        policy: null,
        submittingForm: false,
        picture: null,
        image_string: null
    }


    nextStep = () => {
        let nextStep = this.state.activeStep + 1;

        if (this.state.activeStep === 8) {
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

    handleStepSubmit = formData => {

        this.setState({
            formData: { ...this.state.formData, ...formData }
        }, () => {

            if (this.state.activeStep === 7) {
                let form = {};

                form['client'] = 'web';
                form['sector_id'] = '2';
                form['code'] = this.props.company.id;
                form['picture'] = this.state.image_string;
                form['company_id'] = this.props.company.id;
                form['agent_id'] = this.props.company.owner_id;
                form['policy_id'] = this.props.match.params.policyId;
                form['agent_role_user_id'] = this.props.agent_role_user_id;

                return this.setState({
                    submittingForm: true,
                    formData: { ...this.state.formData, ...form }
                }, () => {
                    return this.props.storeBeneficiary(this.state.formData);
                });
            }

            return this.nextStep();
        });
    }

    handleStepTwoForm = (file, image_string) => {
        this.setState({
            picture: file,
            image_string: image_string
        });

        return this.nextStep();
    }

    navigateOnSuccessWith = props => {
        if (props.store_beneficiary_status === 200) {
            removeStorage('ohis:beneficiary_form_data');
            this.nextStep();
        }
    }

    async componentDidMount() {
        this.props.getDefaultData();

        this.setState({
            formData: await getStorage('ohis:beneficiary_form_data') || beneficiaryModel
        });
    }

    componentWillReceiveProps(nextProps) {
        this.navigateOnSuccessWith(nextProps);
    }

    componentWillUnmount() {
        this.setState({
            policy: []
        });
    }

    render() {
        let currentForm;

        let percentageCounter = (
            <Fragment>
                <div className={'card card-body'}>
                    <div className="slider" style={{ width: `${this.state.steps[this.state.activeStep].percentage}` }}></div>
                </div><br/>
            </Fragment>
        );

        if (this.props.status === 200) {
            if (this.state.activeStep === 0) {
                currentForm = <BeneficiaryPlanDetail 
                    onSubmit={this.start} 
                    policies={this.props.policies} 
                />
            }

            if (this.state.activeStep === 1) {
                currentForm = (
                    <BeneficiaryStepOneForm
                        onSubmit={this.handleStepSubmit}
                        previousStep={this.previousStep}
                        providers={this.props.providers}
                        local_governments={local_governments}
                        initialValues={this.state.formData}
                    />
                );
            }

            if (this.state.activeStep === 2) {
                currentForm = (
                    <BeneficiaryStepTwoForm 
                        onSubmit={this.handleStepTwoForm} 
                        previousStep={this.previousStep} 
                    />
                );
            }

            if (this.state.activeStep === 3) {
                currentForm = (
                    <BeneficiaryStepThreeFormNew 
                        onSubmit={this.handleStepSubmit} 
                        previousStep={this.previousStep} 
                        initialValues={this.state.formData} 
                    />
                );
            }

            if (this.state.activeStep === 4) {
                currentForm = (
                    <BeneficiaryStepFourFormNew 
                        onSubmit={this.handleStepSubmit} 
                        previousStep={this.previousStep} 
                        initialValues={this.state.formData} 
                    />
                )
            }

            if (this.state.activeStep === 5) {
                currentForm = (
                    <BeneficiaryStepFiveFormNew 
                        onSubmit={this.handleStepSubmit} 
                        previousStep={this.previousStep} 
                        initialValues={this.state.formData} 
                    />
                );
            }

            if (this.state.activeStep === 6) {
                currentForm = (
                    <BeneficiaryStepSixFormNew 
                        onSubmit={this.handleStepSubmit} 
                        previousStep={this.previousStep} 
                        initialValues={this.state.formData} 
                    />
                );
            }

            if (this.state.activeStep === 7) {
                currentForm = (
                    <BeneficiaryStepSevenFormNew 
                        onSubmit={this.handleStepSubmit} 
                        previousStep={this.previousStep} 
                        submittingForm={this.state.submittingForm} 
                        initialValues={this.state.formData} 
                    />
                );
            }

            if (this.state.activeStep === 8) {
                currentForm = <BeneficiaryCard nextStep={this.nextStep} transaction={this.props.transaction} />
            }
        }

        return (
            <Fragment>
                <HeaderComponent />
                <PolicyStyleWrapper className="isoBenefitPageWrapper">
                    <section className="second-section" style={{marginBottom: '20px'}}>
                        <div className="row text-center">
                            <div className="col-md-12">
                                <h2 className="mb-3">Register for {this.state.policyName}</h2>
                                <p className="text-center">{this.state.steps[this.state.activeStep].description}</p>
                            </div>
                        </div>
                    </section> 
                    
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
                                { percentageCounter }
                                <div>
                                    { currentForm }
                                </div>
                            </div>
                        </div>
                    </div>
                </PolicyStyleWrapper>
                <FooterComponent bottomFooter={false}/>
            </Fragment>  
        );
    }
};

const mapStateToProps = state => ({
    company: state.GuestReducer.company,
    policies: state.GuestReducer.policies,
    providers: state.GuestReducer.providers,
    status: state.GuestReducer.get_default_data_status,
    agent_role_user_id: state.GuestReducer.agent_role_user_id,
    beneficiary: state.BeneficiaryReducer.beneficiary,
    transaction: state.BeneficiaryReducer.transaction,
    store_beneficiary_status: state.BeneficiaryReducer.store_beneficiary_status,
});

const mapDispatchToProps = dispatch => ({
    getDefaultData: () => dispatch(getDefaultData()),
    resetStoreBeneficiary: () => dispatch(resetStoreBeneficiary()),
    storeBeneficiary: payload => dispatch(storeBeneficiary(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PolicyAdd);