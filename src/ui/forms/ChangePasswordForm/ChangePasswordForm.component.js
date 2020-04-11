import React from 'react';
import CustomInput from '../../CustomInput';
import { Field, reduxForm } from 'redux-form';
import CustomButton from '../../CustomButton';
import styles from './ChangePasswordForm.component.module.css';
import { requiredValidator, matchesPassword } from '../../../shared/utils/validation';

const ChangePasswordForm = ({ handleSubmit, pristine, invalid, submittingForm }) => {
     
    return (
        
        <form onSubmit={handleSubmit}>
            <div  className={'card-body'}>
                <Field
                    name="password"
                    component={CustomInput}
                    label="Password"
                    type="password"
                    validate={[requiredValidator]}
                />

                <Field
                    name="password_confirmation"
                    component={CustomInput}
                    label="Confirm Password"
                    type="password"
                    validate={[matchesPassword]}
                />
                
            </div>
            <div className={styles.buttonContainer}>
                {/* <div className={styles.button}> */}
                    <CustomButton disabled={invalid || pristine} submittingForm={submittingForm}>Change Password</CustomButton>
                {/* </div> */}
            </div>
        </form>
    )

}

export default reduxForm({
    form: 'ChangePasswordForm'
})(ChangePasswordForm);