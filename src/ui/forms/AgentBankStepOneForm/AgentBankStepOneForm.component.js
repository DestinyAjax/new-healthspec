import React from 'react';
import CustomInput from '../../CustomInput';
import { Field, reduxForm } from 'redux-form';
import CustomReactSelect from '../../CustomReactSelect';
import { states_and_locals } from '../../../shared/utils/state_lga';

class AgentBankStepOneForm extends React.Component {

    componentDidMount() {
        console.dir(this.props.organization_profiles);
    }

    render() {
        return (
            <form onSubmit={this.props.handleSubmit}>
                <div className='row'>
                <div className="col-md-6 col-lg-6 col-xs-12">
                    <Field
                        name="organization_name"
                        component={CustomInput}
                        type="text"
                        label="Organisation name"
                        validate={[requiredValidator]}
                    />
                </div>

                <div className="col-md-6 col-lg-6 col-xs-12">
                    <Field
                        name="office_address"
                        component={CustomInput}
                        type="text"
                        label="Office address"
                        validate={[requiredValidator]}
                    />
                </div>

                <div className="col-md-6 col-lg-6 col-xs-12">
                    <Field
                        name="website"
                        component={CustomInput}
                        type="text"
                        label="Website"
                        validate={[]}
                    />
                </div>

                <div className="col-md-6 col-lg-6 col-xs-12">
                    <Field
                        name="surname"
                        component={CustomInput}
                        type="text"
                        label="Surname"
                        validate={[requiredValidator]}
                    />
                </div>

                <div className="col-md-6 col-lg-6 col-xs-12">
                    <Field
                        name="first_name"
                        component={CustomInput}
                        type="text"
                        label="First name"
                        validate={[requiredValidator]}
                    />
                </div>


                <div className="col-md-6 col-lg-6 col-xs-12">
                    <Field
                        name="middle_name"
                        component={CustomInput}
                        type="text"
                        label="Middle name"
                        validate={[]}
                    />
                </div>

                <div className="col-md-6 col-lg-6 col-xs-12">
                    <Field
                        name="email"
                        component={CustomInput}
                        type="email"
                        label="email"
                        validate={[requiredValidator, emailValidator]}
                    />
                </div>

                <div className="col-md-6 col-lg-6 col-xs-12">
                    <Field
                        name="primary_phone_number"
                        component={CustomInput}
                        type="text"
                        label="Phone number"
                        validate={[requiredValidator]}
                    />
                </div>

                <div className={styles.organizationFooter}>
                    <div className={styles.buttonContainer}>
                        <div className={styles.button}>
                            <CustomButton disabled={this.props.invalid || this.props.pristine}>Next</CustomButton>
                        </div>
                    </div>
                </div>
                </div>
            </form>
        );
    }
}

export default reduxForm({
    form: 'AgentBankStepOneForm'
})(AgentBankStepOneForm);