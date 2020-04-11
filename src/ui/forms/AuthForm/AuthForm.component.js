import React from 'react';
import CustomInput from '../../CustomInput';
import CustomButton from '../../CustomButton';
import { Field, reduxForm } from 'redux-form';
import styles from './AuthForm.component.module.css';
import { requiredValidator } from '../../../shared/utils/validation';

const AuthForm = props => {

    const { handleSubmit, pristine, invalid } = props

    return (
        <form onSubmit={handleSubmit}>
            <div className={'card-body'}>
                <Field
                    name="value"
                    component={CustomInput}
                    type="text"
                    label="Email or Enrollee Id"
                    validate={[requiredValidator]}
                />
                <Field
                    name="password"
                    component={CustomInput}
                    type="password"
                    label="Password"
                    validate={[requiredValidator]}
                /><hr/>
                <CustomButton style={{width: '100%'}} disabled={invalid || pristine} submittingForm={props.submittingForm}>Login</CustomButton>
            </div>
        </form>
    );
}

export default reduxForm({
    form: 'AuthForm'
})(AuthForm);