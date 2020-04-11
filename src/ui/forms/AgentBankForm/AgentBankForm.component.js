import React from 'react';
import CustomInput from '../../CustomInput';
import CustomSelect from '../../CustomSelect';
import CustomButton from '../../CustomButton';
import { Field, reduxForm } from 'redux-form';
import ImageUploader from '../../ImageUploader';
import styles from './AgentBankForm.component.module.css';
import { requiredValidator, emailValidator, minLength10, maxLength11 } from '../../../shared/utils/validation';

class AgentBankForm extends React.Component {

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
                    <div className="col-md-12">
                        <Field
                            name="name"
                            component={CustomInput}
                            type="text"
                            label="Organisation name"
                            validate={[requiredValidator]}
                        />
                    </div>
                    <div className="col-md-12">
                        <Field
                            name="email"
                            component={CustomInput}
                            type="email"
                            label="Email"
                            validate={[requiredValidator, emailValidator]}
                        />
                    </div>
                    <div className="col-md-12">
                        <Field
                            name="primary_phone_number"
                            component={CustomInput}
                            type="number"
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
    form: 'AgentBankForm'
})(AgentBankForm);