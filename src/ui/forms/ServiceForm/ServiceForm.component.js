import React from 'react';
import CustomInput from '../../CustomInput';
import CustomSelect from '../../CustomSelect';
import CustomButton from '../../CustomButton';
import { Field, reduxForm } from 'redux-form';
import styles from './ServiceForm.component.module.css';
import { requiredValidator } from '../../../shared/utils/validation';

class ServiceForm extends React.Component {

    render() {
        return (
            <form onSubmit={this.props.handleSubmit}>
                <div className="row">
                    <div className="col-md-6">
                        <Field
                            name="name"
                            component={CustomInput}
                            type="text"
                            label="Name"
                            validate={[requiredValidator]}
                        />
                    </div>
                    <div className="col-md-6">
                        <Field
                            name="type"
                            component={CustomSelect}
                            label="Type"
                            validate={[requiredValidator]}
                            options={[
                                {
                                    displayValue: 'Primary',
                                    value: 'P'
                                },
                                {
                                    displayValue: 'Secondary',
                                    value: 'S'
                                },
                                {
                                    displayValue: 'Partial Exclusion',
                                    value: 'T'
                                },
                                {
                                    displayValue: 'Diagnosis',
                                    value: 'D'
                                },
                            ]}
                        />
                    </div>
                    <div className="col-md-6">
                        <Field
                            name="service_category"
                            component={CustomSelect}
                            label="Category"
                            validate={[requiredValidator]}
                            options={[
                                {
                                    displayValue: 'Diagnosis',
                                    value: 'Diagnosis'
                                },
                                {
                                    displayValue: 'Laboratory',
                                    value: 'Laboratory'
                                },
                                {
                                    displayValue: 'Surgery',
                                    value: 'Surgery'
                                },
                                {
                                    displayValue: 'Procedures',
                                    value: 'Procedures'
                                },
                                {
                                    displayValue: 'Radiology',
                                    value: 'Radiology'
                                },
                                {
                                    displayValue: 'Pharmacy (Drugs)',
                                    value: 'Pharmacy'
                                },
                                {
                                    displayValue: 'Inpatient',
                                    value: 'Inpatient'
                                },
                                {
                                    displayValue: 'Consumable',
                                    value: 'Consumable'
                                },
                                {
                                    displayValue: 'Random',
                                    value: 'Random'
                                },
                                {
                                    displayValue: 'Others',
                                    value: 'Others'
                                },
                            ]}
                        />
                    </div>

                    <div className="col-md-6">
                        <Field
                            name="price"
                            component={CustomInput}
                            type="number"
                            label="Price"
                            validate={[requiredValidator]}
                        />
                    </div>

                    <div className="col-md-6">
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
                </div><hr/>

                <div className={styles.buttonContainer}>
                    <div className={styles.button}>
                        <CustomButton disabled={this.props.invalid || this.props.pristine} submittingForm={this.props.submittingForm}>{this.props.btnText}</CustomButton>
                    </div>
                </div>
            </form>
        );
    }
}

export default reduxForm({
    form: 'ServiceForm'
})(ServiceForm);