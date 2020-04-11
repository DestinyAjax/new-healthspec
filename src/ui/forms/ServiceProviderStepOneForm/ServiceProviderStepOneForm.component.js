import React from 'react';
import CustomInput from '../../CustomInput';
import CustomSelect from '../../CustomSelect';
import CustomButton from '../../CustomButton';
import { Field, reduxForm } from 'redux-form';
import CustomReactSelect from '../../CustomReactSelect';
import styles from './ServiceProviderStepOneForm.component.module.css';
import { requiredValidator, minLength1900, maxLength2019 } from '../../../shared/utils/validation';

class ServiceProviderStepOneForm extends React.Component {

	render () {
		let policyForm;

		if (this.props.isCompany) {
			policyForm = (
				<div className="col-md-6">
					<Field
						isMulti
						name="policy_id"
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
				{ policyForm }

				<div className="row">
					<div className="col-md-6">
						<Field
							name="name"
							component={CustomInput}
							type="text"
							label="Organisation name"
							validate={[requiredValidator]}
						/>
					</div>
					<div className="col-md-6">
						<Field
							name="registration_year"
							component={CustomInput}
							type="date"
							label="Registration date"
							validate={[requiredValidator]}
						/>
					</div>
					<div className="col-md-6">
						<Field
							name="registration_number"
							component={CustomInput}
							type="text"
							label="Registration number"
							validate={[requiredValidator]}
						/>
					</div>
					<div className="col-md-6">
						<Field
							name="license_number"
							component={CustomInput}
							type="text"
							label="License number"
							validate={[]}
						/>
					</div>
					<div className="col-md-6">
						<Field
							name="date_of_issue"
							component={CustomInput}
							type="date"
							label="Date of issue"
							validate={[]}
						/>
					</div>
					<div className="col-md-6">
						<Field
							name="expiry_date"
							component={CustomInput}
							type="date"
							label="Expiry date"
							validate={[]}
						/>
					</div>
					<div className="col-md-6">
						<Field
							name="grade"
							component={CustomSelect}
							label="Grade"
							// placeholder="Select an option"
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
									displayValue: 'Dual',
									value: 'T'
								}
							]}
						/>
					</div>
					<div className="col-md-6">
						<Field
							name="type"
							component={CustomSelect}
							label="Type"
							// placeholder="Select an option"
							validate={[requiredValidator]}
							options={[
								{
									displayValue: 'Private',
									value: 'Private'
								},
								{
									displayValue: 'Public',
									value: 'Public'
								},
							]}
						/>
					</div>
				</div><hr/>
				<div className={styles.organizationFooter}>
					<div className={styles.buttonContainer}>
						<div className={styles.button}>
							<CustomButton disabled={this.props.invalid || this.props.pristine}>Next</CustomButton>
						</div>
					</div>
				</div>
			</form>
		);
	}

}

export default reduxForm({
	form: 'ServiceProviderStepOneForm'
})(ServiceProviderStepOneForm);