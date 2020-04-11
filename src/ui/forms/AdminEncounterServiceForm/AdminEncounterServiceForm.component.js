import React from 'react';
import { Card } from 'antd';
import CustomInput from '../../CustomInput';
import CustomSelect from '../../CustomSelect';
import CustomButton from '../../CustomButton';
import { Field, reduxForm } from 'redux-form';
import styles from './AdminEncounterServiceForm.component.module.css';
import { requiredValidator } from '../../../shared/utils/validation';

const AdminEncounterServiceForm = ({ handleSubmit, pristine, invalid, submittingForm}) => {

    return (
        <form onSubmit={handleSubmit}>
            <Card style={{width: '100%'}}>
                <div className="row">
                    <div className="col-md-6 col-lg-6 col-xs-12">
                        <Field
                            name="service"
                            component={CustomInput}
                            type="text"
                            label="Service"
                            readOnly
                        />
                    </div>

                    <div className="col-md-6 col-lg-6 col-xs-12">
                        <Field
                            name="quantity"
                            component={CustomInput}
                            type="number"
                            label="Quantity"
                        />
                    </div>

                    <div className="col-md-6 col-lg-6 col-xs-12">
                        <Field
                            name="admin_passed"
                            component={CustomSelect}
                            label="Admin status"
                            validate={[requiredValidator]}
                            options={[
                                {
                                    displayValue: 'Pass',
                                    value: 1
                                },
                                {
                                    displayValue: 'Reject',
                                    value: 0
                                }
                            ]}
                        />
                    </div>
                </div>
            </Card>
            <div className={styles.buttonContainer}>
                <div className={styles.button}>
                    <CustomButton disabled={invalid || pristine} submittingForm={submittingForm}>Update</CustomButton>
                </div>
            </div>
        </form>
    )

}

export default reduxForm({
    form: 'AdminEncounterServiceForm'
})(AdminEncounterServiceForm);