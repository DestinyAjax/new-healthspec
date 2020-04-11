import React from 'react';
import CustomInput from '../../CustomInput';
import CustomSelect from '../../CustomSelect';
import CustomButton from '../../CustomButton';
import { Field, reduxForm } from 'redux-form';
import styles from './OrganizationStepOneForm.component.module.css';
import { requiredValidator, emailValidator } from '../../../shared/utils/validation';

class OrganizationStepOneForm extends React.Component {


	state = {
		wardens: [],
	}

	localGovtChosen = (event, newValue, previousValue, name) => {
		let local_government = this.props.local_governments.filter(local_government => newValue == local_government.value);

		console.dir(local_government);

		this.setState({
			wardens: local_government[0].wardens
		});
	}

	render () {
		return (
			<form onSubmit={this.props.handleSubmit}>
				<div className='row'>
					<div className="col-md-6">
						<Field
							name="name"
							component={CustomInput}
							type="text"
							label="Name"
							validate={[requiredValidator]}
						/>
					</div>
					<div className="col-md-6">
						<Field
							name="email"
							component={CustomInput}
							type="email"
							label="Owner Email"
							validate={[requiredValidator, emailValidator]}
						/>
					</div>
					<div className="col-md-6">
						<Field
							name="primary_phone_number"
							component={CustomInput}
							type="number"
							label="Owner Phone Number"
							validate={[requiredValidator]}
						/>
					</div>
					<div className="col-md-6">
						<Field
							name="grade"
							component={CustomSelect}
							label="Grade"
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
					<div className="col-md-6">
						<Field
							name="type"
							component={CustomSelect}
							label="Type"
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
					<div className="col-md-6">
						<Field
							name="local_government"
							component={CustomSelect}
							label="Local Govt."
							validate={[requiredValidator]}
							options={this.props.local_governments.map(local_government => {
								return local_government
							})}
							onChange={this.localGovtChosen}
						/>
					</div>
					<div className="col-md-6">
						<Field
							name="warden"
							component={CustomSelect}
							label="Ward"
							options={this.state.wardens.map(warden => {
								return warden
							})}
							onChange={this.wardenChosen}
						/>
					</div>
					<div className="col-md-6">
						<Field
							name="organization_address"
							component={CustomInput}
							type="text"
							label="Address"
							validate={[requiredValidator]}
						/>
					</div>
					<div className="col-md-6">
						<Field
							name="state"
							component={CustomSelect}
							label="State Organization is Located"
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
						<a className={styles.cancelOrBack}>Cancel</a>
					</div>
				</div>
			</form>
		);
	}
}

export default reduxForm({
	form: 'OrganizationStepOneForm'
})(OrganizationStepOneForm);