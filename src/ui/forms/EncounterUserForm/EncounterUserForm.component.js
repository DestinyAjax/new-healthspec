import React from 'react';
import CustomInput from '../../CustomInput';
import CustomButton from '../../CustomButton';
import { Field, reduxForm } from 'redux-form';
import styles from './EncounterUserForm.component.module.css';
import { requiredValidator } from '../../../shared/utils/validation';

class EncounterUserForm extends React.Component {


    render() {
        return (
            <form onSubmit={this.props.handleSubmit}>
                <div className="row">
                    <div className="col-md-12">
                        <Field
                            name="value"
                            component={CustomInput}
                            label="Search by Email, Phone number or Enrollee Id"
                            validate={[requiredValidator]}
                        />
                    </div>
                </div><hr/>
                <div className={styles.buttonContainer}>
                    <div className={styles.button}>
                        <CustomButton disabled={this.props.invalid || this.props.pristine} submittingForm={this.props.submittingForm}>Search</CustomButton>
                    </div>
                    <div className={styles.button} onClick={this.props.cancel}>Cancel</div>
                </div>
            </form>
        )
    }
}

export default reduxForm({
    form: 'EncounterUserForm'
})(EncounterUserForm);