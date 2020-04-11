import React, { Fragment } from 'react';
import { Card } from 'antd';
import CustomInput from '../../CustomInput';
import CustomSelect from '../../CustomSelect';
import CustomButton from '../../CustomButton';
import { Field, reduxForm } from 'redux-form';
import { requiredValidator } from '../../../shared/utils/validation';
import { FaEye, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

class BeneficiaryStepSixFormNew extends React.Component {
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
									name="blind"
									component={CustomSelect}
									label="Blind "
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
									name="deaf"
									component={CustomSelect}
									label="Deaf "
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
										name="dumb"
										component={CustomSelect}
										label="Dumb "
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
										name="disable_in_a_limb"
										component={CustomSelect}
										label="Disable in a limb "
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
										name="spinal_injury"
										component={CustomSelect}
										label="Spinal injury "
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
										name="chronically_ill"
										component={CustomSelect}
										label="Chronically ill "
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
										name="house_hold_disable"
										component={CustomSelect}
										label="House hold disable "
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
										name="diabetes"
										component={CustomSelect}
										label="Diabetes "
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
										name="hypertension"
										component={CustomSelect}
										label="Hypertension "
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
										name="sickle_cell"
										component={CustomSelect}
										label="Sickle Cell"
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
								{ this.state.make_compulsory && (
									<Fragment>
										<div className="col-md-4 col-lg-4 col-sm-12 col-xs-12">
											<Field
												name="my_other_diability"
												component={CustomInput}
												compulsory={false}
												type="text"
												label="Others: Specify"
												validate={[]}
											/>
										</div>
										<div className="col-md-4 col-lg-4 col-sm-12 col-xs-12">
											<Field
												name="other_blood_group"
												component={CustomInput}
												compulsory={false}
												type="text"
												label="Other Blood Group"
												validate={[]}
											/>
										</div>
										<div className="col-md-4 col-lg-4 col-sm-12 col-xs-12">
											<Field
												name="genotype"
												compulsory={false}
												component={CustomSelect}
												label="Genotype"
												validate={[]}
												options={[
													{
														displayValue: 'AA',
														value: 'AA'
													},
													{
														displayValue: 'AS',
														value: 'AS'
													},
													{
														displayValue: 'SS',
														value: 'SS'
													},
													{
														displayValue: 'others',
														value: 'others'
													},
												]}
											/>
										</div>
										<div className="col-md-4 col-lg-4 col-sm-12 col-xs-12">
											<Field
												name="other_genotype"
												compulsory={false}
												component={CustomInput}
												type="text"
												label="Others Genotype"
												validate={[]}
											/>
										</div>
										<div className="col-md-4 col-lg-4 col-sm-12 col-xs-12">
											<Field
												name="height"
												component={CustomInput}
												type="text"
												label="height"
												compulsory={false}
												validate={[]}
											/>
										</div>
										<div className="col-md-4 col-lg-4 col-sm-12 col-xs-12">
											<Field
												name="weight"
												component={CustomInput}
												type="text"
												label="weight"
												compulsory={false}
												validate={[]}
											/>
										</div>
										<div className="col-md-4 col-lg-4 col-sm-12 col-xs-12">
											<Field
												name="tribal_mark"
												component={CustomSelect}
												label="Tribal Mark"
												validate={[]}
												compulsory={false}
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
												name="complexion"
												component={CustomSelect}
												compulsory={false}
												label="Complexion"
												validate={[]}
												options={[
													{
														displayValue: 'Fair',
														value: 'Fair'
													},
													{
														displayValue: 'Dark',
														value: 'Dark'
													},
													{
														displayValue: 'Light',
														value: 'Light'
													},
													{
														displayValue: 'Albino',
														value: 'Albino'
													},
												]}
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
	form: 'BeneficiaryStepSixFormNew'
})(BeneficiaryStepSixFormNew);