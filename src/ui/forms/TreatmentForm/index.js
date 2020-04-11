import React from 'react';
import {Card} from 'antd';
import CustomInput from '../../CustomInput';
import CustomSelect from '../../CustomSelect';
import CustomButton from '../../CustomButton';
import { Field, reduxForm } from 'redux-form';
import styles from './TreatmentForm.component.module.css';
import { url } from '../../../config';
import { requiredValidator } from '../../../shared/utils/validation';

const TreatmentForm = ({handleSubmit, pristine, invalid, btnText,appendServices}) => {
    return (
        <form onSubmit={handleSubmit}>
            <Card style={{width:'100%'}}>
                <div className="row">
                    <div className="col-md-12">
                        <Field
                            name="case"
                            component={CustomInput}
                            label="Reason"
                            validate={[requiredValidator]}
                        />
                    </div>
                    <div className="col-md-12">
                        <Field
                            name="note"
                            component={CustomInput}
                            type="text"
                            label="Note (if any)"
                            validate={[requiredValidator]}
                        />
                    </div>
                </div>
            </Card>

            <div className={styles.buttonContainer}>
                <div className={styles.button}>
                    <CustomButton disabled={invalid || pristine}>{btnText}</CustomButton>
                </div>
            </div>
        </form>
    )

}

export default reduxForm({
    form: 'TreatmentForm'
})(TreatmentForm);