import React from 'react';
import CustomInput from '../../CustomInput';
import CustomSelect from '../../CustomSelect';
import CustomButton from '../../CustomButton';
import { Field, reduxForm } from 'redux-form';
import styles from './ProfileBasicInfoForm.component.module.css';
import { requiredValidator } from '../../../shared/utils/validation';

const ProfileBasicInfoForm = props => {

    const { handleSubmit, pristine, invalid } = props;

    return (
        <form onSubmit={handleSubmit}>
            <div className="row">
                <div className="col-md-6 col-sm-12 col-xs-12">
                    <Field
                        name="religion"
                        component={CustomSelect}
                        label="Religion"
                        validate={[requiredValidator]}
                        options={[
                            {
                                displayValue: 'Christianity',
                                value: 'Christianity'
                            },
                            {
                                displayValue: 'Islam',
                                value: 'Islam'
                            },
                            {
                                displayValue: 'Others',
                                value: 'Others'
                            },
                        ]}
                    />
                </div>
                <div className="col-md-6 col-sm-12 col-xs-12">
                    <Field
                        name="highest_education_level"
                        component={CustomSelect}
                        label="Highest Education Level"
                        validate={[requiredValidator]}
                        options={[
                            {
                                displayValue: 'First Secondary School',
                                value: 'First Secondary School'
                            },
                            {
                                displayValue: 'Secondary School',
                                value: 'Secondary School'
                            },
                            {
                                displayValue: 'Bsc',
                                value: 'Bsc'
                            },
                            {
                                displayValue: 'Masters',
                                value: 'Masters'
                            },
                            {
                                displayValue: 'Phd',
                                value: 'Phd'
                            },
                        ]}
                    />
                </div>
                <div className="col-md-6 col-sm-12 col-xs-12">
                    <Field
                        name="job_name"
                        component={CustomInput}
                        type="text"
                        label="Occupation"
                        validate={[requiredValidator]}
                    />
                </div>
                <div className="col-md-6 col-sm-12 col-xs-12">
                    <Field
                        name="marital_status"
                        component={CustomSelect}
                        label="Marital Status"
                        validate={[requiredValidator]}
                        options={[
                            {
                                displayValue: 'Married',
                                value: 'married'
                            },
                            {
                                displayValue: 'Single',
                                value: 'Single'
                            },
                            {
                                displayValue: 'Divorce',
                                value: 'Divorce'
                            },
                        ]}
                    />
                </div>
                <div className="col-md-6 col-sm-12 col-xs-12">
                    <Field
                        name="whatsapp_number"
                        component={CustomInput}
                        type="number"
                        label="Whatsapp Number"
                        validate={[requiredValidator]}
                    />
                </div>
                <div className="col-md-6 col-sm-12 col-xs-12">
                    <Field
                        name="physical_challenge"
                        component={CustomSelect}
                        label="Physical Challenge"
                        validate={[requiredValidator]}
                        options={[
                            {
                                displayValue: 'None',
                                value: 'None'
                            },
                            {
                                displayValue: 'Blind',
                                value: 'Blind'
                            },
                            {
                                displayValue: 'Deaf',
                                value: 'Deaf'
                            },
                            {
                                displayValue: 'Dumb',
                                value: 'Dumb'
                            },
                            {
                                displayValue: 'Paralyze',
                                value: 'Paralyze'
                            },
                            {
                                displayValue: 'Others',
                                value: 'Others'
                            }
                        ]}
                    />
                </div>
            </div><hr/>

            <div className={styles.buttonContainer}>
                <div className={styles.button}>
                    <CustomButton disabled={invalid || pristine}>Update</CustomButton>
                </div>
            </div>
        </form>
    )

}

export default reduxForm({
    form: 'ProfileBasicInfoForm'
})(ProfileBasicInfoForm);