import React from 'react';
import CustomInput from '../../CustomInput';
import CustomSelect from '../../CustomSelect';
import CustomButton from '../../CustomButton';
import { Field, reduxForm } from 'redux-form';
import { states_and_locals } from '../../../shared/utils/state_lga';
import { requiredValidator } from '../../../shared/utils/validation';
import styles from './ServiceProviderStepTwoForm.component.module.css';
class ServiceProviderStepTwoForm extends React.Component {

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
				<div className="row">
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
							name="local_government"
							component={CustomSelect}
							label="Local Govt."
							// placeholder="Select an option"
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
							// placeholder="Select an option"
							options={this.state.wardens.map(warden => {
								return warden
							})}
							onChange={this.wardenChosen}
						/>
					</div>
					<div className="col-md-6">
						<Field
							name="state"
							component={CustomSelect}
							label="State"
							validate={[requiredValidator]}
							options={states_and_locals.map(state_lga => {
								return {
									value: state_lga.state.name,
									displayValue: state_lga.state.name,
								}
							})}
						/>
					</div>
					<div className="col-md-6">
						<Field
							name="website"
							component={CustomInput}
							type="text"
							label="Website"
							validate={[]}
						/>
					</div>
				</div><hr/>

				<div className={styles.organizationFooter}>
					<div className={styles.buttonContainer}>
						<div className="pull-left">
							<button className="btn btn-lg btn-secondary" onClick={this.props.previousStep}>
								Previous
							</button>
						</div>&nbsp; &nbsp;
						<div className={"pull-right"}>
							<CustomButton disabled={this.props.invalid || this.props.pristine}>Next</CustomButton>
						</div>
					</div>
				</div>
			</form>
		);
	}
}

export default reduxForm({
	form: 'ServiceProviderStepTwoForm'
})(ServiceProviderStepTwoForm);