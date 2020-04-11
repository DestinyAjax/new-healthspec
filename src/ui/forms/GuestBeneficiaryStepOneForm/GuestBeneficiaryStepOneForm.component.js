import React from 'react';
import CustomInput from '../../CustomInput';
import CustomSelect from '../../CustomSelect';
import CustomButton from '../../CustomButton';
import { Field, reduxForm } from 'redux-form';
import { requiredValidator } from '../../../shared/utils/validation';
import styles from './GuestBeneficiaryStepOneForm.component.module.css';

class GuestBeneficiaryStepOneForm extends React.Component {

	state = {
		wardens: [],
		policies: [],
		providers: [],
	}


	companyChosen = (event, newValue, previousValue, name) => {
		let policies = this.props.policies.filter(policy => newValue == policy.company.id);
		this.setState({
			policies: policies
		});
	}


	localGovtChosen = (event, newValue, previousValue, name) => {
		let local_government = this.props.local_governments.filter(local_government => newValue == local_government.value);
		this.setState({
			wardens: local_government[0].wardens
		});
	}


	wardenChosen = (event, newValue, previousValue, name) => {
		const wardenProviders = this.props.providers.filter(provider => provider.warden === newValue).map(provider => {
			return {
				value: provider.id,
				displayValue: provider.name,
			}
		});

		this.setState({
			providers: wardenProviders
		});
	}


	componentDidMount() {}

	render () {
		return (
			<form onSubmit={this.props.handleSubmit}>

				<div className={styles.inlineGroup}>

					<div className={styles.formGroup}>
						<Field
							name="first_name"
							component={CustomInput}
							type="text"
							label="Firstname"
							validate={[requiredValidator]}
						/>
					</div>

					<div className={styles.formGroup}>
						<Field
							name="middle_name"
							component={CustomInput}
							type="text"
							label="Middlename"
							validate={[requiredValidator]}
						/>
					</div>

				</div>


				<div className={styles.inlineGroup}>

					<div className={styles.formGroup}>
						<Field
							name="last_name"
							component={CustomInput}
							type="text"
							label="Lastname"
							validate={[requiredValidator]}
						/>
					</div>

					<div className={styles.formGroup}>
						<Field
							name="date_of_birth"
							component={CustomInput}
							type="date"
							label="Date Of Birth"
						/>
					</div>

				</div>


				<div className={styles.inlineGroup}>

					<div className={styles.formGroup}>
						<Field
							name="maiden_name"
							component={CustomInput}
							type="text"
							label="Mother maiden name"
							validate={[requiredValidator]}
						/>
					</div>

					<div className={styles.formGroup}>
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
								}
							]}
						/>
					</div>

				</div>


				<div className={styles.inlineGroup}>

					<div className={styles.formGroup}>
						<Field
							name="primary_phone_number"
							component={CustomInput}
							type="number"
							label="Phone number"
							validate={[requiredValidator]}
						/>
					</div>

					<div className={styles.formGroup}>
						<Field
							name="whatsapp_number"
							component={CustomInput}
							type="number"
							label="Whatsapp number"
							validate={[requiredValidator]}
						/>
					</div>

				</div>


				<Field
					name="local"
					component={CustomSelect}
					label="Choose Local Govt."
					placeholder="Select an option"
					validate={[requiredValidator]}
					options={this.props.local_governments.map(local_government => {
						return local_government
					})}
					onChange={this.localGovtChosen}
				/>

				<div className={styles.inlineGroup}>
					<div className={styles.formGroup}>
						<Field
							name="warden"
							component={CustomSelect}
							label="Choose Ward"
							placeholder="Select an option"
							validate={[requiredValidator]}
							options={this.state.wardens.map(warden => {
								return warden
							})}
							onChange={this.wardenChosen}
						/>
					</div>
					<div className={styles.formGroup}>
						<Field
							name="provider_id"
							component={CustomSelect}
							label="Choose Provider"
							placeholder="Select an option"
							validate={[requiredValidator]}
							options={this.state.providers}
						/>
					</div>
				</div>

				<div className={styles.organizationFooter}>
					<div className={styles.buttonContainer}>
						<div className={styles.button}>
							<CustomButton disabled={this.props.invalid || this.props.pristine}>Next</CustomButton>
						</div>

						<a className={styles.cancelOrBack} onClick={this.props.previousStep}> Previous </a>
					</div>

					<a className={styles.link}></a>
				</div>

			</form>
		);
	}
}

export default reduxForm({
	form: 'GuestBeneficiaryStepOneForm'
})(GuestBeneficiaryStepOneForm);