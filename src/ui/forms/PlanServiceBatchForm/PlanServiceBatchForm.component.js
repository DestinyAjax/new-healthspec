import React from 'react';
import CustomInput from '../../CustomInput';
import CustomSelect from '../../CustomSelect';
import CustomButton from '../../CustomButton';
import { Field, reduxForm } from 'redux-form';
import styles from './PlanServiceBatchForm.component.module.css';
import { requiredValidator } from '../../../shared/utils/validation';
import CustomFileInput from '../../CustomFileInput/CustomFileInput.component';

class PlanServiceBatchForm extends React.Component {

    render() {
        return (
            <form onSubmit={this.props.handleSubmit}>
                <div  className="row">
                    <div className="col-md-12 col-sm-12 col-xs-12">
                        <Field
                            name="plan_id"
                            component={CustomSelect}
                            label="Chose a plan"
                            validate={[requiredValidator]}
                            options={this.props.plans.map(plan => {
                                return {
                                    value: plan.id,
                                    displayValue: plan.name,
                                }
                            })}
                        />
                    </div>
                    <div className="col-md-12 col-sm-12 col-xs-12">
                        <Field
                            name="services"
                            component={CustomFileInput}
                            type="file"
                            label="Services"
                            validate={[requiredValidator]}
                        />
                    </div>
                </div><hr/>

                <div className={styles.buttonContainer}>
                    <div className={styles.button}>
                        <CustomButton disabled={this.props.invalid || this.props.pristine} submittingForm={this.props.submittingForm}>Add</CustomButton>
                    </div>
                </div>
            </form>
        )
    }
}

export default reduxForm({
    form: 'PlanServiceBatchForm'
})(PlanServiceBatchForm);