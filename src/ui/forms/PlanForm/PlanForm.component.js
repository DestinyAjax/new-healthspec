import React from 'react';
import CustomInput from '../../CustomInput';
import CustomSelect from '../../CustomSelect';
import CustomButton from '../../CustomButton';
import { Field, reduxForm } from 'redux-form';
import styles from './PlanForm.component.module.css';
import { requiredValidator } from '../../../shared/utils/validation';

const PlanForm = ({handleSubmit, pristine, invalid, btnText, submittingForm}) => {

    return (
        <form onSubmit={handleSubmit}>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <Field
                            name="name"
                            component={CustomInput}
                            compulsory={true}
                            type="text"
                            label="Name"
                            validate={[requiredValidator]}
                        />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <Field
                            name="code"
                            component={CustomInput}
                            compulsory={true}
                            type="text"
                            label="Code"
                            validate={[requiredValidator]}
                        />
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="form-group">
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
            </div><hr/>

            <div className={styles.buttonContainer}>
                <div className={styles.button}>
                    <CustomButton submittingForm={submittingForm} disabled={invalid || pristine}>{btnText}</CustomButton>
                </div>
            </div>
        </form>
    );
}

export default reduxForm({
    form: 'PlanForm'
})(PlanForm);