import React from 'react';
import CustomSelect from '../../CustomSelect';
import CustomButton from '../../CustomButton';
import { Field, reduxForm } from 'redux-form';
import styles from './ServiceBatchForm.component.module.css';
import { requiredValidator } from '../../../shared/utils/validation';
import CustomFileInput from '../../CustomFileInput/CustomFileInput.component';

class ServiceBatchForm extends React.Component {

    render() {
        return (
            <form onSubmit={this.props.handleSubmit}>
                <div  className="row">
                    <div className="col-md-12">
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
                    <div className="col-md-12">
                        <Field
                            name="service_category"
                            component={CustomSelect}
                            label="Chose category"
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
                                    displayValue: 'Pharmacy',
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
                    <div className="col-md-12">
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
        );
    }
}

export default reduxForm({
    form: 'ServiceBatchForm'
})(ServiceBatchForm);