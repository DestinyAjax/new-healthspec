import React from 'react';
import CustomInput from '../../CustomInput';
import CustomSelect from '../../CustomSelect';
import CustomButton from '../../CustomButton';
import { Field, reduxForm } from 'redux-form';
import ImageUploader from '../../ImageUploader';
import CustomReactSelect from '../../CustomReactSelect';
import styles from './CompanyQuickForm.component.module.css';
import { requiredValidator, emailValidator, minLength10, maxLength11 } from '../../../shared/utils/validation';

class CompanyQuickForm extends React.Component {

    state = {
        file: null,
        image_string: null,
    }

    handleSubmit = formData => {
        this.props.onSubmit(formData);
    }

    render() {
        return (
            <form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
                <div className="row">
                    <div className="col-md-6">
                        <Field
                            label="Sector"
                            name="sector_id"
                            component={CustomSelect}
                            validate={[requiredValidator]}
                            options={this.props.sectors.map(sector => {
                                return {
                                    displayValue: sector.name,
                                    value: sector.id
                                }
                            })}
                        />
                    </div>
                    <div className="col-md-6">
                        <Field
                            isMulti
                            name="policy_id"
                            component={CustomReactSelect}
                            label="Policies"
                            validate={[requiredValidator]}
                            options={this.props.policies.map(policy => {
                                return {
                                    value: policy.id,
                                    label: policy.name,
                                }
                            })}
                        />
                    </div>
                    <div className="col-md-6">
                        <Field
                            name="name"
                            component={CustomInput}
                            type="text"
                            label="Organisation name"
                            validate={[requiredValidator]}
                        />
                    </div>
                    <div className="col-md-6">
                        <Field
                            name="email"
                            component={CustomInput}
                            type="email"
                            label="Email"
                            validate={[requiredValidator, emailValidator]}
                        />
                    </div>
                    <div className="col-md-6">
                        <Field
                            name="primary_phone_number"
                            component={CustomInput}
                            type="text"
                            label="Phone number"
                            validate={[requiredValidator, minLength10, maxLength11]}

                        />
                    </div>
                </div><hr/>

                <div className={styles.organizationFooter}>
                    <div className={styles.buttonContainer}>
                        <div className={styles.button}>
                            <CustomButton disabled={this.props.invalid || this.props.pristine} submittingForm={this.props.submittingForm}>Submit</CustomButton>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}

export default reduxForm({
    form: 'CompanyQuickForm'
})(CompanyQuickForm);