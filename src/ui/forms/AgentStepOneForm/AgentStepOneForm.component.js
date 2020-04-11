import React from 'react';
import CustomInput from '../../CustomInput';
import Autocomplete from '../../Autocomplete';
import CustomSelect from '../../CustomSelect';
import CustomButton from '../../CustomButton';
import { Field, reduxForm } from 'redux-form';
import { requiredValidator, minLength1900, maxLength2019 } from '../../../shared/utils/validation';
import styles from './AgentStepOneForm.component.module.css';

class AgentStepOneForm extends React.Component {

	state = {
		showSuperAgent: false
	}

	typePicked = event => {
		if (event.target.value == '13') {
			this.setState({
				showSuperAgent: true
			});
		}
	}

	render() {

		let agent_role_user_input;

		if (this.state.showSuperAgent) {
			agent_role_user_input = (

				<Field
					name="agent_role_user_id"
					component={CustomSelect}
					label="Agent Type"
					validate={[requiredValidator]}
					options={[
						{
							displayValue: 'Agent One',
							value: 13
						},
						{
							displayValue: 'Agent Two',
							value: 14
						},
						{
							displayValue: 'Agent Three',
							value: 15
						}

					]}
				/>

				// <div className={styles.formGroup}>
				// 	<Field
				// 		name="agent_role_user_id"
				// 		component={Autocomplete}
				// 		label="Super Agent"
				// 		url={"http://healthconnect-api.test/api/hmo_agent/search/"}
				// 		// url={"https://api.healthspecsng.com/api/service/search/"}
				// 		validate={[requiredValidator]}
				// 	/>
				// </div>
			)
		}

		return (
			<form onSubmit={this.props.handleSubmit}>

				<Field
					name="role_id"
					component={CustomSelect}
					label="Agent Type"
					validate={[requiredValidator]}
					onChange={event => this.typePicked(event)}
					options={[
						{
							displayValue: 'HMO AGENT',
							value: 13
						},
						{
							displayValue: 'GENERAL AGENT',
							value: 14
						}
					]}
				/>

				{ agent_role_user_input }

				<Field
					name="organization_name"
					component={CustomInput}
					type="text"
					label="Organisation name"
					validate={[requiredValidator]}
				/>

				<Field
					name="registration_year"
					component={CustomInput}
					type="date"
					label="Registration date"
					validate={[requiredValidator]}
				/>

				<Field
					name="registration_number"
					component={CustomInput}
					type="text"
					label="Registration number"
					validate={[requiredValidator]}
				/>

				<Field
					name="license_number"
					component={CustomInput}
					type="text"
					label="License number"
					validate={[]}
				/>

				<div className={styles.inlineGroup}>
					<div className={styles.formGroup}>
						<Field
							name="date_of_issue"
							component={CustomInput}
							type="date"
							label="Date of issue"
							validate={[]}
						/>
					</div>
					<div className={styles.formGroup}>
						<Field
							name="expiry_date"
							component={CustomInput}
							type="date"
							label="Expiry date"
							validate={[]}
						/>
					</div>
				</div>


				<div className={styles.inlineGroup}>
					<div className={styles.formGroup}>
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
								}
							]}
						/>
					</div>
					<div className={styles.formGroup}>
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
				</div>



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
	form: 'AgentStepOneForm'
})(AgentStepOneForm);