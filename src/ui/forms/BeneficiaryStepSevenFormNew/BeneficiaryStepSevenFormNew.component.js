import React, { Fragment } from 'react';
import { Card } from 'antd';
import CustomInput from '../../CustomInput';
import CustomSelect from '../../CustomSelect';
import CustomButton from '../../CustomButton';
import { Field, reduxForm } from 'redux-form';
import { requiredValidator } from '../../../shared/utils/validation';
import { FaEye, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

class BeneficiaryStepSevenFormNew extends React.Component {
	state = {
		make_compulsory: true
	};

	switchQuickFill = () => {
		this.setState({
			make_compulsory: !this.state.make_compulsory
		});
	}

	render() {
		let toggleBtn = (
			<button className="btn btn-sm btn-default" type="type" onClick={this.switchQuickFill} style={{border: '1px solid #f5f5f5'}}>
				<FaEye />{" "}
				Toggle require fields
			</button>
		);

		if (this.state.make_compulsory === true) {
			toggleBtn = (
				<button className="btn btn-sm btn-success" type="type" onClick={this.switchQuickFill}>
					<FaEye />{" "}
					Toggle require fields
				</button>
			);
		} else {
			toggleBtn = (
				<button className="btn btn-sm btn-secondary" type="type" onClick={this.switchQuickFill} style={{border: '1px solid #f5f5f5'}}>
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
									name="do_you_own_a_bank_account"
									component={CustomSelect}
									label="Do you own a bank account "
									validate={[requiredValidator]}
									compulsory={true}
									options={[
										{
											displayValue: 'Yes',
											value: 'yes'
										},
										{
											displayValue: 'No',
											value: 'no'
										},
									]}
								/>
							</div>
							<div className="col-md-4 col-lg-4 col-sm-12 col-xs-12">
								<Field
									name="rent"
									component={CustomSelect}
									label="Do you pay rent currently "
									validate={[requiredValidator]}
									compulsory={true}
									options={[
										{
											displayValue: 'Yes',
											value: 'yes'
										},
										{
											displayValue: 'No',
											value: 'no'
										},
									]}
								/>
							</div>
							<div className="col-md-4 col-lg-4 col-sm-12 col-xs-12">
								<Field
									name="drinking_water"
									component={CustomSelect}
									label="Do you pay for drinking water "
									compulsory={true}
									validate={[requiredValidator]}
									options={[
										{
											displayValue: 'Yes',
											value: 'yes'
										},
										{
											displayValue: 'No',
											value: 'no'
										},
									]}
								/>
							</div>
							<div className="col-md-4 col-lg-4 col-sm-12 col-xs-12">
								<Field
									name="loan"
									component={CustomSelect}
									label="Have you received any loan/grants ?"
									validate={[requiredValidator]}
									compulsory={true}
									options={[
										{
											displayValue: 'Yes',
											value: 'yes'
										},
										{
											displayValue: 'No',
											value: 'no'
										},
									]}
								/>
							</div>
							<div className="col-md-4 col-lg-4 col-sm-12 col-xs-12">
								<Field
									name="conditional_cash_transfer"
									component={CustomSelect}
									label="Conditional cash transfer "
									compulsory={true}
									validate={[requiredValidator]}
									options={[
										{
											displayValue: 'Yes',
											value: 'yes'
										},
										{
											displayValue: 'No',
											value: 'no'
										},
									]}
								/>
							</div>
							<div className="col-md-4 col-lg-4 col-sm-12 col-xs-12">
								<Field
									name="elderly_cash_transfer"
									component={CustomSelect}
									label="Elderly cash transfer "
									compulsory={true}
									validate={[requiredValidator]}
									options={[
										{
											displayValue: 'Yes',
											value: 'yes'
										},
										{
											displayValue: 'No',
											value: 'no'
										},
									]}
								/>
							</div>
							<div className="col-md-4 col-lg-4 col-sm-12 col-xs-12">
								<Field
									name="empowerment"
									component={CustomSelect}
									label="Empowerment "
									compulsory={true}
									validate={[requiredValidator]}
									options={[
										{
											displayValue: 'Yes',
											value: 'yes'
										},
										{
											displayValue: 'No',
											value: 'no'
										},
									]}
								/>
							</div>
							<div className="col-md-4 col-lg-4 col-sm-12 col-xs-12">
								<Field
									name="other_current_health_insurance"
									component={CustomSelect}
									label="Other current health insurance "
									compulsory={true}
									validate={[requiredValidator]}
									options={[
										{
											displayValue: 'Yes',
											value: 'yes'
										},
										{
											displayValue: 'No',
											value: 'no'
										},
									]}
								/>
							</div>
							{ this.state.make_compulsory && (
								<Fragment>
									<div className="col-md-4 col-lg-4 col-sm-12 col-xs-12">
										<Field
											name="monthly_income"
											component={CustomInput}
											compulsory={false}
											type="text"
											label="Monthly Income"
											validate={[]}
										/>
									</div>
									<div className="col-md-4 col-lg-4 col-sm-12 col-xs-12">
										<Field
											name="spouse_monthly_income"
											compulsory={false}
											component={CustomInput}
											type="text"
											label="Spouse Monthly Income"
											validate={[]}
										/>
									</div>
									<div className="col-md-4 col-lg-4 col-sm-12 col-xs-12">
										<Field
											name="spouse_no_income_alternative"
											compulsory={false}
											component={CustomInput}
											type="text"
											label="If there is no income, please explain how you are living:"
											validate={[]}
										/>
									</div>
									<div className="col-md-4 col-lg-4 col-sm-12 col-xs-12">
										<Field
											name="rent_amount"
											component={CustomInput}
											compulsory={false}
											type="text"
											label="Rent Amount"
											validate={[]}
										/>
									</div>
									<div className="col-md-4 col-lg-4 col-sm-12 col-xs-12">
										<Field
											name="water_amount"
											component={CustomInput}
											type="text"
											label="If yes, how much do you spent on water monthly"
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
									<CustomButton disabled={this.props.invalid || this.props.pristine} submittingForm={this.props.submittingForm}>
										Submit
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
	form: 'BeneficiaryStepSevenFormNew'
})(BeneficiaryStepSevenFormNew);