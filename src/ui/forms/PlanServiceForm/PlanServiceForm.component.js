import React from 'react';
import {Card} from 'antd';
import CustomInput from '../../CustomInput';
import CustomSelect from '../../CustomSelect';
import CustomButton from '../../CustomButton';
import { Field, reduxForm } from 'redux-form';
import styles from './PlanServiceForm.component.module.css';
import { requiredValidator,maxGreater100 } from '../../../shared/utils/validation';

class PlanServiceForm extends React.Component {

    state = {
        showPercentageForm: (this.props.initialValues.payment_type === 'CO PAY') ? true : false
    }

    handleSubmit = formData => {
        this.props.submit(formData);
    }

    setPaymentType = (e, value, prev, type) => {
        let result = (value === 'CO PAY') ? true : false; 

        return this.setState({
            showPercentageForm: result
        });
    }

    render() {
        let { pristine, invalid } = this.props;
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
                    validate={[maxGreater100,requiredValidator]}
                />
            )
        }

        return (
            <form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
                <Card style={{width: '100%'}}>
                    <div className="row">
                        <div className="col-md-6">
                            <Field
                                name="plan_id"
                                component={CustomInput}
                                type="text"
                                label="Plan"
                                readOnly
                            />
                        </div>
                        <div className="col-md-6">
                            <Field
                                name="service_id"
                                component={CustomInput}
                                type="text"
                                label="Service"
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
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
                        <div className="col-md-4">
                            <Field
                                name="limit_allowed"
                                component={CustomInput}
                                type="number"
                                label="Limit Allowed"
                                validate={[requiredValidator]}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <Field
                                name="payment_type"
                                component={CustomSelect}
                                label="Payment Type"
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
                        <div className="col-md-6">
                            { paymentPercentage }
                        </div>
                    </div>
                </Card>
                <div className="row">
                    <div className="col-md-12">
                        <div className={styles.buttonContainer}>
                            <div className={styles.button}>
                                <CustomButton disabled={invalid || pristine}>Update</CustomButton>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}

export default reduxForm({
    form: 'PlanServiceForm'
})(PlanServiceForm);