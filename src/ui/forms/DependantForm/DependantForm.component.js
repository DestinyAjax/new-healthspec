import React from 'react';
import CustomInput from '../../CustomInput';
import CustomSelect from '../../CustomSelect';
import CustomButton from '../../CustomButton';
import { Field, reduxForm } from 'redux-form';
import ImageUploader from '../../ImageUploader';
import styles from './DependantForm.component.module.css';
import { requiredValidator,minLength10, maxLength11 } from '../../../shared/utils/validation';

class DependantForm extends React.Component {

    state = {
        file: null,
        image_string: null,
    }

    handleSubmit = formData => {
        formData['picture'] = this.state.image_string;
        this.props.onSubmit(formData);
    }

    fileInputHandler = (file, image_string) => {
        this.setState({
            file: file,
            image_string: image_string,
        });
    }

    render() {
        return (
            <form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
                <div className="row">
                    <div className="col-md-4">
                        <ImageUploader fileInputHandler={this.fileInputHandler} />
                    </div>
                    <div className="col-md-8 col-sm-12 col-xs-12">
                        <div className="row">
                            <div className="col-md-6 col-sm-12 col-xs-12">
                                <Field
                                    name="first_name"
                                    component={CustomInput}
                                    type="text"
                                    label="First name"
                                    validate={[requiredValidator]}
                                />
                            </div>
                            <div className="col-md-6 col-sm-12 col-xs-12">
                                <Field
                                    name="gender"
                                    component={CustomSelect}
                                    label="Gender"
                                    validate={[requiredValidator]}
                                    options={[
                                        {
                                            displayValue: 'Male',
                                            value: 'M'
                                        },
                                        {
                                            displayValue: 'Female',
                                            value: 'F'
                                        },
                                    ]}
                                />
                            </div>
                            <div className="col-md-6 col-sm-12 col-xs-12">
                                <Field
                                    name="age"
                                    component={CustomInput}
                                    type="number"
                                    label="Age"
                                    validate={[requiredValidator]}
                                />
                            </div>
                            <div className="col-md-6 col-sm-12 col-xs-12">
                                <Field
                                    name="primary_phone_number"
                                    component={CustomInput}
                                    type="number"
                                    label="Phone number"
                                    validate={[requiredValidator,minLength10, maxLength11]}
                                />
                            </div>
                            <div className="col-md-6 col-sm-12 col-xs-12">
                                <Field
                                    name="relationship"
                                    component={CustomSelect}
                                    label="Relationship"
                                    validate={[requiredValidator]}
                                    options={[
                                        {
                                            displayValue: 'Spouse',
                                            value: 'Spouse'
                                        },
                                        {
                                            displayValue: 'Child',
                                            value: 'Child'
                                        },
                                    ]}
                                />
                            </div>
                        </div>
                    </div>
                </div><hr/>
                
                <div className={styles.organizationFooter}>
                    <div className={styles.buttonContainer}>
                        <div className={styles.button}>
                            <CustomButton disabled={this.props.invalid || this.props.pristine}>Submit</CustomButton>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}

export default reduxForm({
    form: 'DependantForm'
})(DependantForm);