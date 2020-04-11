import React from 'react';
import {Card} from 'antd';
import CustomInput from '../../CustomInput';
import CustomSelect from '../../CustomSelect';
import CustomButton from '../../CustomButton';
import { Field, reduxForm } from 'redux-form';
import styles from './PolicyForm.component.module.css';
import { requiredValidator } from '../../../shared/utils/validation';

const PolicyForm = ({ handleSubmit, pristine, invalid, btnText, companies, plans, submittingForm}) => {

    return (

        <form onSubmit={handleSubmit}>
            <Card style={{width: '100%'}}>
                <div className="row">
                    <div className="col-md-6">
                        <Field
                            name="name"
                            component={CustomInput}
                            compulsory={true}
                            type="text"
                            label="Name"
                            validate={[requiredValidator]}
                        />
                    </div>
                    <div className="col-md-6">
                        <Field
                            name="price"
                            component={CustomInput}
                            compulsory={true}
                            type="number"
                            label="Price"
                            validate={[requiredValidator]}
                        />
                    </div>
                    <div className="col-md-6">
                        <Field
                            name="maximum_no_of_beneficiary"
                            component={CustomInput}
                            compulsory={true}
                            type="number"
                            label="Maximum number of enrollee"
                            validate={[requiredValidator]}
                        />
                    </div>
                    <div className="col-md-6">
                        <Field
                            name="maximum_no_of_beneficiary_dependant"
                            component={CustomInput}
                            compulsory={true}
                            type="number"
                            label="Maximum number of enrollee dependant"
                            validate={[requiredValidator]}
                        />
                    </div>
                    <div className="col-md-6">
                        <Field
                            name="plan_id"
                            component={CustomSelect}
                            compulsory={true}
                            label="Plan"
                            validate={[requiredValidator]}
                            options={plans.map(plan => {
                                return {
                                    value: plan.id,
                                    displayValue: plan.name
                                }
                            })}
                        />
                    </div>
                    <div className="col-md-6">
                        <Field
                            name="duration"
                            component={CustomSelect}
                            compulsory={true}
                            label="Duration"
                            validate={[requiredValidator]}
                            options={[
                                {
                                    displayValue: '6 Months',
                                    value: '6'
                                },
                                {
                                    displayValue: '12 Months',
                                    value: '12'
                                },
                            ]}
                        />
                    </div>
                    <div className="col-md-6">
                        <Field
                            name="is_active"
                            component={CustomSelect}
                            compulsory={true}
                            label="Status"
                            validate={[requiredValidator]}
                            options={[
                                {
                                    displayValue: 'Active',
                                    value: 1
                                },
                                {
                                    displayValue: 'Inactive',
                                    value: 0
                                },
                            ]}
                        />
                    </div>
                </div>
            </Card><br/>
            <div className="row col-md-12">
                <div className={styles.buttonContainer}>
                    <div className={styles.button}>
                        <CustomButton disabled={invalid || pristine} submittingForm={submittingForm}>{btnText}</CustomButton>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default reduxForm({
    form: 'PolicyForm'
})(PolicyForm);