import React from 'react';
import {Card} from 'antd';
import CustomInput from '../../CustomInput';
import CustomSelect from '../../CustomSelect';
import CustomButton from '../../CustomButton';
import { Field, reduxForm } from 'redux-form';
import styles from './ClaimServiceForm.component.module.css';
import { requiredValidator } from '../../../shared/utils/validation';

class ClaimServiceForm extends React.Component {

    render() {
        return (
            <form onSubmit={this.props.handleSubmit}>
                <Card style={{width: '100%'}}>
                    <div className="row">
                        <div className="col-md-12">
                            <Field
                                name="status"
                                component={CustomSelect}
                                validate={[requiredValidator]}
                                options={[
                                    {
                                        displayValue: 'AUTHORIZED',
                                        value: 1
                                    },
                                    {
                                        displayValue: 'UNAUTHORIZED',
                                        value: 2
                                    },
                                ]}
                            />
                        </div>
                    </div>
                </Card>

                <div className={styles.buttonContainer}>
                    <div className={styles.button}>
                        <CustomButton disabled={this.props.invalid || this.props.pristine} submittingForm={this.props.submittingForm}>{"Submit"}</CustomButton>
                    </div>
                </div>
            </form>
        )
    }
}

export default reduxForm({
    form: 'ClaimServiceForm'
})(ClaimServiceForm);