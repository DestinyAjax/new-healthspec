import React from 'react';
import CustomInput from '../../CustomInput';
import CustomSelect from '../../CustomSelect';
import CustomButton from '../../CustomButton';
import { Field, reduxForm } from 'redux-form';
import Autocomplete from '../../Autocomplete';
import { url } from '../../../config';
import styles from './AddPlanServiceForm.component.module.css';
import { maxGreater100, requiredValidator } from '../../../shared/utils/validation';

class AddPlanServiceForm extends React.Component {

    state = {
        showPercentageForm: false
    }

    setPaymentType = (e, value, prev, type) => {
        let result = (value === 'CO PAY') ? true : false; 

        return this.setState({
            showPercentageForm: result
        });
	}

    render () {
        let paymentPercentage;

        if (this.state.showPercentageForm) {
            paymentPercentage = (
                <Field
                    name="payment_percentage"
                    component={CustomInput}
                    type="number"
                    min="1"
                    max="99"
                    label="Payment Percentage"
                    validate={[maxGreater100, requiredValidator]}
                />
            )
        }

        return (
            <form onSubmit={this.props.handleSubmit}>
                <div className="row">
                    <div className="col-md-6 col-sm-12 col-xs-12">
                        <Field
                            name="service_id"
                            component={Autocomplete}
                            label="Service"
                            url={`${url}service/search?query=`}
                            validate={[requiredValidator]}
                        />
                    </div>
                    <div className="col-md-6 col-sm-12 col-xs-12">
                        <Field
                            name="plan_id"
                            component={CustomSelect}
                            label="Plan"
                            validate={[requiredValidator]}
                            options={this.props.plans.map(plan => {
                                return {
                                    value: plan.id,
                                    displayValue: plan.name
                                }
                            })}
                        />
                    </div>
                    <div className="col-md-6 col-sm-12 col-xs-12">
                        <Field
                            name="price"
                            component={CustomInput}
                            type="number"
                            label="Price"
                            validate={[requiredValidator]}
                        />
                    </div>
                    <div className="col-md-6 col-sm-12 col-xs-12">
                        <Field
                            name="limit_type"
                            component={CustomSelect}
                            label="Limit Type"
                            validate={[requiredValidator]}
                            options={[
                                {
                                    displayValue: 'Day',
                                    value: 'DAY'
                                },
                                {
                                    displayValue: 'Monthly',
                                    value: 'MONTHLY'
                                },
                                {
                                    displayValue: '3 months',
                                    value: '3 MONTHS'
                                },
                                {
                                    displayValue: 'Policy Duration',
                                    value: 'POLICY DURATION'
                                },
                            ]}
                        />
                    </div>

                    <div className="col-md-6 col-sm-12 col-xs-12">
                        <Field
                            name="limit_allowed"
                            component={CustomInput}
                            type="number"
                            label="Limit Allowed"
                            validate={[requiredValidator]}
                        />
                    </div>
                    <div className="col-md-6 col-sm-12 col-xs-12">
                        <Field
                            name="is_active"
                            component={CustomSelect}
                            label="Status"
                            validate={[requiredValidator]}
                            options={[
                                {
                                    displayValue: 'Active',
                                    value: 1
                                },
                                {
                                    displayValue: 'Inactive',
                                    value: 0
                                },
                            ]}
                        />
                    </div>
                    <div className="col-md-6 col-sm-12 col-xs-12">
                        <Field
                            name="allow_out_of_station"
                            component={CustomSelect}
                            label="Allow out of station"
                            validate={[requiredValidator]}
                            options={[
                                {
                                    displayValue: 'Yes',
                                    value: 1
                                },
                                {
                                    displayValue: 'No',
                                    value: 0
                                },
                            ]}
                        />
                    </div>
                    <div className="col-md-6 col-sm-12 col-xs-12">
                        <Field
                            name="payment_type"
                            component={CustomSelect}
                            label="Limit Type"
                            validate={[requiredValidator]}
                            options={[
                                {
                                    displayValue: 'Capitated',
                                    value: 'CAPITATED'
                                },
                                {
                                    displayValue: 'Not Capitated',
                                    value: 'NOT CAPITATED'
                                },
                                {
                                    displayValue: 'Co Pay',
                                    value: 'CO PAY'
                                },
                            ]}
                            onChange={this.setPaymentType}
                        />
                    </div>
                    <div className="col-md-6 col-sm-12 col-xs-12">
                        { paymentPercentage }
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
    form: 'AddPlanServiceForm'
})(AddPlanServiceForm);