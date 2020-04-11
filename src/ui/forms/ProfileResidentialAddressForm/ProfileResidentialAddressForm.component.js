import React from 'react';
import CustomInput from '../../CustomInput';
import CustomSelect from '../../CustomSelect';
import CustomButton from '../../CustomButton';
import { Field, reduxForm } from 'redux-form';
import styles from './ProfileResidentialAddressForm.component.module.css';
import { requiredValidator } from '../../../shared/utils/validation';

const ProfileResidentialAddressForm = props => {

    const { handleSubmit, pristine, invalid } = props;

    return (
        <form onSubmit={handleSubmit}>
            <div className="row">
                <div className="col-md-12 col-sm-12 col-xs-12">
                    <Field
                        name="state"
                        component={CustomSelect}
                        label="State Of Residence"
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
                <div className="col-md-12 col-sm-12 col-xs-12">
                    <Field
                        name="address"
                        component={CustomInput}
                        type="text"
                        label="Residential Address"
                        validate={[requiredValidator]}
                    />
                </div>
                <div className="col-md-12 col-sm-12 col-xs-12">
                    <Field
                        name="lga"
                        component={CustomInput}
                        type="text"
                        label="Residential Local Govt."
                        validate={[requiredValidator]}
                    />
                </div>
                <div className="col-md-12 col-sm-12 col-xs-12">
                    <Field
                        name="office_address"
                        component={CustomInput}
                        type="text"
                        label="Office Address"
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
    form: 'ProfileResidentialAddressForm'
})(ProfileResidentialAddressForm);