import React from 'react';
import CustomInput from '../../CustomInput';
import CustomSelect from '../../CustomSelect';
import CustomButton from '../../CustomButton';
import { Field, reduxForm } from 'redux-form';
import styles from './ServiceProviderStepThreeForm.component.module.css';
import { maxLength11, minLength10, requiredValidator, emailValidator } from '../../../shared/utils/validation';

class ServiceProviderStepThreeForm extends React.Component {

	render () {

		let type;

		if (this.props.is_provider) {
			type = (
				<React.Fragment>
					<div className="col-md-6">
						<Field
							name="professional_qualification"
							component={CustomInput}
							type="text"
							label="Professional qualification"
							validate={[requiredValidator]}
						/>
					</div>

					<div className="col-md-6">
						<Field
							name="operating_qualification"
							component={CustomInput}
							type="text"
							label="Operating qualification"
							validate={[requiredValidator]}
						/>
					</div>
				</React.Fragment>
			);
		}

		return (
			<form onSubmit={this.props.handleSubmit}>
				<div className="row">
					<div className="col-md-6">
						<Field
							name="surname"
							component={CustomInput}
							type="text"
							label="Surname"
							validate={[requiredValidator]}
						/>
					</div>
					<div className="col-md-6">
						<Field
							name="first_name"
							component={CustomInput}
							type="text"
							label="First name"
							validate={[requiredValidator]}
						/>
					</div>
					<div className="col-md-6">
						<Field
							name="middle_name"
							component={CustomInput}
							type="text"
							label="Middle name"
							validate={[]}
						/>
					</div>
					<div className="col-md-6">
						<Field
							name="date_of_birth"
							component={CustomInput}
							type="date"
							label="Date of birth"
							validate={[requiredValidator]}
						/>
					</div>
					<div className="col-md-6">
						<Field
							name="email"
							component={CustomInput}
							type="email"
							label="email"
							validate={[requiredValidator, emailValidator]}
						/>
					</div>
					<div className="col-md-6">
						<Field
							name="primary_phone_number"
							component={CustomInput}
							type="text"
							label="Phone number"
							validate={[requiredValidator, minLength10, maxLength11]}
						/>
					</div>
					<div className="col-md-6"></div>
				</div>
				{ type }
				<hr />
				<div className={styles.organizationFooter}>
					<div className={styles.buttonContainer}>
						<div className="pull-left">
							<button className="btn btn-sm btn-secondary" onClick={this.props.previousStep}>Previous</button>
						</div>&nbsp; &nbsp;
						<div className={"pull-right"}>
							<CustomButton disabled={this.props.invalid || this.props.pristine} submittingForm={this.props.submittingForm}>Submit</CustomButton>
						</div>
					</div>
				</div>
			</form>
		);
	}

}

export default reduxForm({
	form: 'ServiceProviderStepThreeForm'
})(ServiceProviderStepThreeForm);