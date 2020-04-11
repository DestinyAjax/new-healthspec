import React from 'react';
import CustomInput from '../../CustomInput';
import CustomSelect from '../../CustomSelect';
import CustomButton from '../../CustomButton';
import { Field, reduxForm } from 'redux-form';
import styles from './ProfileNextOfKinForm.component.module.css';
import { requiredValidator } from '../../../shared/utils/validation';

const ProfileNextOfKinForm = props => {

    const { handleSubmit, pristine, invalid } = props;

    return (
        <form onSubmit={handleSubmit}>
            <div className="row">       
                <div className="col-md-4 col-sm-12 col-xs-12">
                    <Field
                        name="next_of_kin_surname"
                        component={CustomInput}
                        type="text"
                        label="Next Of Kin Surname"
                        validate={[requiredValidator]}
                    />
                </div>
                <div className="col-md-4 col-sm-12 col-xs-12">
                    <Field
                        name="next_of_kin_firstname"
                        component={CustomInput}
                        type="text"
                        label="Next Of Kin Firstname"
                        validate={[requiredValidator]}
                    />
                </div>
                <div className="col-md-4 col-sm-12 col-xs-12">
                    <Field
                        name="next_of_kin_middlename"
                        component={CustomInput}
                        type="text"
                        label="Next Of Kin Middlename"
                        validate={[requiredValidator]}
                    />
                </div>
                <div className="col-md-4 col-sm-12 col-xs-12">
                    <Field
                        name="relationship_with_next_of_kin"
                        component={CustomInput}
                        type="text"
                        label="Relationship With Next Of Kin"
                        validate={[requiredValidator]}
                    />
                </div>
                <div className="col-md-4 col-sm-12 col-xs-12">
                    <Field
                        name="next_of_kin_occupation"
                        component={CustomInput}
                        type="text"
                        label="Next Of Kin Occupation"
                        validate={[requiredValidator]}
                    />
                </div>

                <div className="col-md-4 col-sm-12 col-xs-12">
                    <Field
                        name="next_of_kin_address"
                        component={CustomInput}
                        type="text"
                        label="Next Of Kin Address"
                        validate={[requiredValidator]}
                    />
                </div>
                <div className="col-md-4 col-sm-12 col-xs-12">
                    <Field
                        name="next_of_kin_lga"
                        component={CustomInput}
                        type="text"
                        label="Next of Kin LGA"
                        validate={[requiredValidator]}
                    />
                </div>
                <div className="col-md-4 col-sm-12 col-xs-12">
                    <Field
                        name="next_of_kin_state"
                        component={CustomSelect}
                        label="Next Of Kin State"
                        validate={[requiredValidator]}
                        options={[
                            {
                                displayValue: 'Osun',
                                value: 'Osun'
                            },
                            {
                                displayValue: 'Lagos',
                                value: 'Lagos'
                            },
                            {
                                displayValue: 'Others',
                                value: 'Others'
                            },
                        ]}
                    />
                </div>
            </div><hr/>

            <div className={styles.buttonContainer}>
                <div className={styles.button}>
                    <CustomButton disabled={invalid || pristine}>Update</CustomButton>
                </div>
            </div>
        </form>
    )

}

export default reduxForm({
    form: 'ProfileNextOfKinForm'
})(ProfileNextOfKinForm);