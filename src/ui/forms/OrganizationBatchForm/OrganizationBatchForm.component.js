import React from 'react';
import CustomSelect from '../../CustomSelect';
import CustomButton from '../../CustomButton';
import { Field, reduxForm } from 'redux-form';
import CustomReactSelect from '../../CustomReactSelect';
import styles from './OrganizationBatchForm.component.module.css';
import { requiredValidator } from '../../../shared/utils/validation';
import CustomFileInput from '../../CustomFileInput/CustomFileInput.component';

class OrganizationBatchForm extends React.Component {

    render() {

        let sectorForm, policyForm;

        if (this.props.isCompany) {
            sectorForm = (
                <div className="col-md-12">
                    <Field
                        label="Sector"
                        name="sector_id"
                        component={CustomSelect}
                        validate={[requiredValidator]}
                        options={this.props.sectors.map(sector => {
                            return {
                                displayValue: sector.name,
                                value: sector.id
                            }
                        })}
                    />
                </div>
            );

            policyForm = (
                <div className="col-md-12">
                    <Field
                        isMulti
                        name="policy_ids"
                        component={CustomReactSelect}
                        label="Policies"
                        validate={[requiredValidator]}
                        options={this.props.policies.map(policy => {
                            return {
                                value: policy.id,
                                label: policy.name,
                            }
                        })}
                    />
                </div>
            );
        }

        return (
            <form onSubmit={this.props.handleSubmit}>
                <div className="row">
                    { sectorForm }
                    { policyForm }
                    <br/>
                    <div className="col-md-12">
                        <Field
                            name="organization_profiles"
                            component={CustomFileInput}
                            type="file"
                            label="organization_profiles"
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

OrganizationBatchForm.defaultProps = {
    isCompany: false
}

export default reduxForm({
    form: 'OrganizationBatchForm'
})(OrganizationBatchForm);