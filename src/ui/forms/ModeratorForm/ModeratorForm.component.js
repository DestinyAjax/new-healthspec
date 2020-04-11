import React from 'react';
import {Card} from 'antd';
import CustomInput from '../../CustomInput';
import CustomSelect from '../../CustomSelect';
import CustomButton from '../../CustomButton';
import { Field, reduxForm } from 'redux-form';
import ImageUploader from '../../ImageUploader';
import styles from './ModeratorForm.component.module.css';
import { requiredValidator, emailValidator,minLength10, maxLength11 } from '../../../shared/utils/validation';

class ModeratorForm extends React.Component {

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
                    <div className="col-md-3 col-lg-3 col-sm-12 col-xs-12">
                        <ImageUploader fileInputHandler={this.fileInputHandler} />
                    </div>
                    <div className="col-md-9 col-lg-9 col-sm-12 col-xs-12">
                        <Card title="Create Moderator Form" style={{width: '100%'}}>
                            <div className="row">
                                <div className="col-md-6">
                                    <Field
                                        name="surname"
                                        component={CustomInput}
                                        type="text"
                                        label="Surname"
                                        validate={[requiredValidator]}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <Field
                                        name="first_name"
                                        component={CustomInput}
                                        type="text"
                                        label="Firstname"
                                        validate={[requiredValidator]}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <Field
                                        name="other_name"
                                        component={CustomInput}
                                        type="text"
                                        label="Othername"
                                        validate={[]}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <Field
                                        name="email"
                                        component={CustomInput}
                                        type="email"
                                        label="Email"
                                        validate={[requiredValidator, emailValidator]}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <Field
                                        name="primary_phone_number"
                                        component={CustomInput}
                                        type="text"
                                        label="Phone number"
                                        validate={[requiredValidator,minLength10, maxLength11]}
                                    />
                                </div>
                                <div className="col-md-6">
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
                            </div>
                        </Card><br/>
                        <div className="row col-md-6">
                            <div className={styles.organizationFooter}>
                                <div className={styles.buttonContainer}>
                                    <div className={styles.button}>
                                        <CustomButton disabled={this.props.invalid || this.props.pristine || (this.state.image_string === null)} submittingForm={this.props.submittingForm}>Submit</CustomButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}

export default reduxForm({
    form: 'ModeratorForm'
})(ModeratorForm);