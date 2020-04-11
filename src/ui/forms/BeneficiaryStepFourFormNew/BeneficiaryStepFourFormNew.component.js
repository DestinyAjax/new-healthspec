import React, { Fragment } from 'react';
import { Row, Col, Card } from 'antd';
import CustomInput from '../../CustomInput';
import CustomSelect from '../../CustomSelect';
import CustomButton from '../../CustomButton';
import { Field, reduxForm } from 'redux-form';
import { requiredValidator } from '../../../shared/utils/validation';
import { FaEye, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

class BeneficiaryStepFourFormNew extends React.Component {
	state = {
		make_compulsory: true
	};

	switchQuickFill = () => {
		this.setState({ make_compulsory: !this.state.make_compulsory});
	}

	render () {
		let toggleBtn = (
			<button className="btn btn-md btn-default" type="type" onClick={this.switchQuickFill} style={{border: '1px solid #f5f5f5'}}>
				<FaEye />{" "}
				Toggle require fields
			</button>
		);

		if (this.state.make_compulsory === true) {
			toggleBtn = (
				<button className="btn btn-md btn-success" type="type" onClick={this.switchQuickFill}>
					<FaEye />{" "}
					Toggle require fields
				</button>
			);
		} else {
			toggleBtn = (
				<button className="btn btn-md btn-secondary" type="type" onClick={this.switchQuickFill} style={{border: '1px solid #f5f5f5'}}>
					<FaEye />{" "}
					Toggle full form
				</button>
			);
		}

		return (
			<Fragment>
				<form onSubmit={this.props.handleSubmit}>
					<Card title={toggleBtn} style={{width: '100%'}}>
						<div className="row">
							<div className="col-md-4 col-lg-4 col-sm-12 col-xs-12">
								<Field
									name="education_level"
									component={CustomSelect}
									label="Education Level "
									compulsory={true}
									validate={[requiredValidator]}
									options={[
										{
											displayValue: 'No Education',
											value: 'No Education'
										},
										{
											displayValue: 'Primary',
											value: 'Primary'
										},
										{
											displayValue: 'Secondary',
											value: 'Secondary'
										},
										{
											displayValue: 'Graduate',
											value: 'Graduate'
										},
										{
											displayValue: 'Post-Graduate',
											value: 'Post-Graduate'
										},
									]}
								/>
							</div>
							<div className="col-md-4 col-lg-4 col-sm-12 col-xs-12">
								<Field
									name="employment_type"
									component={CustomSelect}
									label="Employment Type "
									validate={[requiredValidator]}
									compulsory={true}
									options={[
										{
											displayValue: 'Federal Govt.',
											value: 'Federal Govt.'
										},
										{
											displayValue: 'State Govt.',
											value: 'State Govt.'
										},
										{
											displayValue: 'Non for Profit/ Charitable',
											value: 'Non for Profit/ Charitable'
										},
										{
											displayValue: 'Local Govt.',
											value: 'Local Govt.'
										},
										{
											displayValue: 'Employment in own business/ Farm',
											value: 'Employment in own business/ Farm'
										},
									]}
								/>
							</div>
							<div className="col-md-4 col-lg-4 col-sm-12 col-xs-12">
								<Field
									name="employment_status"
									component={CustomSelect}
									label="Employment Status"
									validate={[requiredValidator]}
									compulsory={true}
									options={[
										{
											displayValue: 'Self Employed',
											value: 'Self Employed'
										},
										{
											displayValue: 'Employed',
											value: 'Employed'
										},
										{
											displayValue: 'Unemployed',
											value: 'Unemployed'
										},
										{
											displayValue: 'Retired',
											value: 'Retired'
										},
										{
											displayValue: 'House Wife',
											value: 'House Wife'
										},
										{
											displayValue: 'Unable to work',
											value: 'Unable to work'
										},
										{
											displayValue: 'Student',
											value: 'Student'
										},
									]}
								/>
							</div>
							<div className="col-md-4 col-lg-4 col-sm-12 col-xs-12">
								<Field
									name="occupation"
									compulsory={false}
									component={CustomInput}
									type="text"
									label="Occupation "
									validate={[]}
								/>
							</div>
						</div>
						<div className="row">
							{ this.state.make_compulsory && (
								<Fragment>
									<div className="col-md-6 col-lg-6 col-sm-12 col-xs-12">
										<Field
											name="name_of_cooperative_society"
											component={CustomInput}
											compulsory={false}
											type="text"
											label="Name of Cooperative Society"
											validate={[]}
										/>
									</div>
									<div className="col-md-6 col-lg-6 col-sm-12 col-xs-12">
										<Field
											name="trade_union"
											component={CustomInput}
											type="text"
											label="Trade Union (For Artisans only)"
											validate={[]}
										/>
									</div>
								</Fragment>
							)}
						</div>
						<div className="row">
							<div className="col-md-6">
								<div className="pull-left">
									<button className="btn btn-lg btn-secondary" onClick={this.props.previousStep}>
										<FaArrowLeft /> {" "}
										Previous
									</button>
								</div>
							</div>
							<div className="col-md-6">
								<div className="pull-right">
									<CustomButton disabled={this.props.invalid || this.props.pristine}>
										Next {" "}
										<FaArrowRight />
									</CustomButton>
								</div>
							</div>
						</div>
					</Card>
				</form>
			</Fragment>
		);
	}
}

export default reduxForm({
	form: 'BeneficiaryStepFourFormNew'
})(BeneficiaryStepFourFormNew);