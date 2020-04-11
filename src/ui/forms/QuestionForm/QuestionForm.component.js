import React from 'react';
import CustomInput from '../../CustomInput';
import CustomButton from '../../CustomButton';
import { Field, reduxForm } from 'redux-form';
import styles from './QuestionForm.component.module.css';
import { requiredValidator } from '../../../shared/utils/validation';

class QuestionForm extends React.Component {


    render() {
        return (
            <form onSubmit={this.props.handleSubmit}>
                <div className="row">
                    <div className="col-md-12">
                        <Field
                            name="value"
                            component={CustomInput}
                            label={this.props.label}
                            validate={[requiredValidator]}
                            placeholder={this.props.placeholder}
                        />
                    </div>
                </div><hr/>

                <div className={styles.buttonContainer}>
                    <div className={styles.button}>
                        <CustomButton disabled={this.props.invalid || this.props.pristine}>Add</CustomButton>
                    </div>
                </div>
            </form>
        );
    }
}

export default reduxForm({
    form: 'QuestionForm'
})(QuestionForm);