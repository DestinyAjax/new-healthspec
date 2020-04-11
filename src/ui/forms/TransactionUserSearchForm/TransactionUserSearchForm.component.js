import React from 'react';
import {Card} from 'antd';
import CustomInput from '../../CustomInput';
import CustomButton from '../../CustomButton';
import { Field, reduxForm } from 'redux-form';
import { requiredValidator } from '../../../shared/utils/validation';
import styles from './TransactionUserSearchForm.component.module.css';

class TransactionUserSearchForm extends React.Component {


    render() {
        return (
            <form onSubmit={this.props.handleSubmit}>
                <Card style={{width:'100%'}}>
                    <div className="row">
                        <div className="col-md-12">
                            <Field
                                name="value"
                                component={CustomInput}
                                label="Search Transaction with Email or phone number"
                                validate={[requiredValidator]}
                            />
                        </div>
                    </div>
                </Card>

                <div className={styles.buttonContainer}>
                    <div className={styles.button} onClick={this.props.cancel}>Cancel</div>
                    <div className={styles.button}>
                        <CustomButton disabled={this.props.invalid || this.props.pristine} submittingForm={this.props.submittingForm}>Search</CustomButton>
                    </div>
                </div>
            </form>
        );
    }
}

export default reduxForm({
    form: 'TransactionUserSearchForm'
})(TransactionUserSearchForm);