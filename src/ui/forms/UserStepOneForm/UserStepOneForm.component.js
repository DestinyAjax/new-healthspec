import React from 'react';
import CustomInput from '../../CustomInput';
import CustomSelect from '../../CustomSelect';
import CustomButton from '../../CustomButton';
import { Field, reduxForm } from 'redux-form';
import styles from './UserStepOneForm.component.module.css';
import { requiredValidator } from '../../../shared/utils/validation';

class UserStepOneForm extends React.Component {

	render() {
		return (
			<form onSubmit={this.props.handleSubmit}>
				<div className="row">
					<div className="col-md-6">
						<Field
							name="tenant_id"
							component={CustomSelect}
							label="Tenant"
							validate={[requiredValidator]}
							options={[
								{
									displayValue: 'OHIS',
									value: 1
								},
							]}
						/>
					</div>
					<div className="col-md-6">
						<Field
							name="role_id"
							component={CustomSelect}
							label="Role"
							validate={[requiredValidator]}
							options={[
								{
									displayValue: 'TENANT ADMIN MODERATOR',
									value: 9
								},
								{
									displayValue: 'HMO MODERATOR',
									value: 10
								},
								{
									displayValue: 'COMPANY MODERATOR',
									value: 11
								},
								{
									displayValue: 'PROVIDER MODERATOR',
									value: 12
								},
							]}
						/>
					</div>
					<div className="col-md-6">
						<Field
							name="office_address"
							component={CustomInput}
							type="text"
							label="Office address"
							validate={[requiredValidator]}
						/>
					</div>
					<div className="col-md-6">
						<Field
							name="postal_address"
							component={CustomInput}
							type="text"
							label="Postal address"
							validate={[requiredValidator]}
						/>
					</div>
					<div className="col-md-6">
						<Field
							name="local_govt"
							component={CustomInput}
							type="text"
							label="LGA"
							validate={[requiredValidator]}
						/>
					</div>
					<div className="col-md-6">
						<Field
							name="state"
							component={CustomSelect}
							label="State"
							validate={[requiredValidator]}
							options={[
								{
									displayValue: 'Lagos',
									value: 'Lagos'
								},
								{
									displayValue: 'Osun',
									value: 'Osun'
								},
								{
									displayValue: 'Others',
									value: 'Others'
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
	form: 'UserStepOneForm'
})(UserStepOneForm);