import React from 'react';
import { Card } from 'antd';
import CustomSelect from '../../CustomSelect';
import CustomButton from '../../CustomButton';
import { Field, reduxForm } from 'redux-form';
import styles from './BeneficiaryBatchForm.component.module.css';
import { requiredValidator } from '../../../shared/utils/validation';
import CustomFileInput from '../../CustomFileInput/CustomFileInput.component';

class BeneficiaryBatchForm extends React.Component {
    state = {
        policies: []
    }

    render() {
        return (
            <form onSubmit={this.props.handleSubmit}>
                <Card style={{width: '100%'}}>
                    <div className="row">
                        <div className="col-md-6 col-lg-6 col-md-12 col-xs-12">
                            <Field
                                name="sector_id"
                                component={CustomSelect}
                                label="Sector"
                                validate={[requiredValidator]}
                                options={this.props.sectors.map(sector => {
                                    return {
                                        value: sector.id,
                                        displayValue: sector.name,
                                    }
                                })}
                                onChange={this.sectorChosen}
                            />
                        </div>
                        <div className="col-md-6 col-lg-6 col-md-12 col-xs-12">
                            <Field
                                name="provider_id"
                                component={CustomSelect}
                                label="Provider"
                                validate={[requiredValidator]}
                                options={this.props.organization_profiles.filter(organization_profile => organization_profile.type === 'PROVIDER').map(provider => {
                                    return {
                                        value: provider.id,
                                        displayValue: provider.name_lga_ward,
                                    }
                                })}
                            />
                        </div>
                        <div className="col-md-6 col-lg-6 col-md-12 col-xs-12">
                            <Field
                                name="company_id"
                                component={CustomSelect}
                                label="Company"
                                validate={[requiredValidator]}
                                options={this.props.organization_profiles.filter(organization_profile => organization_profile.type === 'COMPANY').map(company => {
                                    return {
                                        value: company.id,
                                        displayValue: company.name,
                                    }
                                })}
                            />
                        </div>
                        <div className="col-md-6 col-lg-6 col-md-12 col-xs-12">
                            <Field
                                name="policy_id"
                                component={CustomSelect}
                                label="Policy"
                                validate={[requiredValidator]}
                                options={this.props.policies.map(policy => {
                                    return {
                                        value: policy.id,
                                        displayValue: policy.name
                                    }
                                })}
                            />
                        </div>
                        <div className="col-md-6 col-lg-6 col-md-12 col-xs-12">
                            <Field
                                name="beneficiaries"
                                component={CustomFileInput}
                                type="file"
                                label="Enrollees"
                                validate={[requiredValidator]}
                            />
                        </div>
                    </div><hr/>
                    <div className={styles.buttonContainer}>
                        <div className={styles.button}>
                            <CustomButton disabled={this.props.invalid || this.props.pristine} submittingForm={this.props.submittingForm}>Submit</CustomButton>
                        </div>
                    </div>
                </Card>
            </form>
        )
    }
}

export default reduxForm({
    form: 'BeneficiaryBatchForm'
})(BeneficiaryBatchForm);