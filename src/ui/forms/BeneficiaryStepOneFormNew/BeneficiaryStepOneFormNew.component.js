import moment from 'moment';
import React, { Fragment } from 'react';
import { Card } from 'antd';
import CustomInput from '../../CustomInput';
import CustomSelect from '../../CustomSelect';
import CustomButton from '../../CustomButton';
import { Field, reduxForm } from 'redux-form';
import { FaEye, FaArrowRight } from 'react-icons/fa';
import { states_and_locals } from '../../../shared/utils/state_lga';
import { maxDate, minLength10, maxLength11, requiredValidator } from '../../../shared/utils/validation';

class BeneficiaryStepOneFormNew extends React.Component {

	state = {
		age_disabled: false,
		year_of_birth_disabled: false,
		month_of_birth_disabled: false,
		day_of_birth_disabled: false,

		title: null,
		wardens: [],
		companies: [],
		allow_roam: false,
		residence_lgas: [],
		previous_name: false,
		local_government: null,
		make_compulsory: true,
		selected_sector: null,
		providers: this.props.organization_profiles.filter(organization_profile => organization_profile.type === 'PROVIDER'),
	}

	localGovtChosen = (event, newValue, previousValue, name) => {
		if (this.state.selected_sector != null) {
			let providers = this.props.organization_profiles.filter(organization_profile => organization_profile.type === 'PROVIDER');

			if ((!this.state.selected_sector.can_roam) && providers.length) {
				let local_government_providers = providers.filter(provider => provider.local_government == newValue).filter(provider => provider.grade == 'P');

				this.setState({
					local_government: newValue,
					providers: local_government_providers,
				});
			}
		}

		this.setState({
			local_government: newValue,
		});
	}

	sectorChosen = (event, newValue, previousValue, name) => {
		let sector = this.props.sectors.find(sector => sector.id == newValue);
		let providers = this.props.organization_profiles.filter(organization_profile => organization_profile.type === 'PROVIDER')
														.filter(provider => provider.grade != 'S');


		if (!sector.can_roam && (this.state.local_government != null)) {
			providers = this.props.organization_profiles.filter(organization_profile => organization_profile.type === 'PROVIDER')
														.filter(provider => provider.local_government == this.state.local_government)
														.filter(provider => provider.grade == 'P');
		}
		let companies = this.props.organization_profiles.filter(organization_profile => organization_profile.type === 'COMPANY')
														.filter(organization_profile => organization_profile.sector_id == newValue);
		
		this.setState({
			companies: companies,
			providers: providers,
			selected_sector: sector,
		});
	}

	switchQuickFill = () => {
		this.setState({ make_compulsory: !this.state.make_compulsory});
	}

	setAge = (e, value, prev, type) => {
		let year, day, current_year, age, month, status;

		if (value.length) {
			const months = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
			const tokens = value.split('-');

			year = parseInt(tokens[0]);
			day = parseInt(tokens[2]);
			month = months[parseInt(--tokens[1])];
			current_year = new Date().getFullYear();
			age = current_year - year;
			status = true;

		} else {
			day = '';
			age = '';
			year = '';
			month = '';
			status = false;
		}

		return this.setState({
			age_disabled: status,
			day_of_birth_disabled: status,
			year_of_birth_disabled: status,
			month_of_birth_disabled: status,
		}, () => {
			this.props.change('year_of_birth', year);
			this.props.change('age', parseInt(age));
			this.props.change('day_of_birth', day);
			this.props.change('month_of_birth', month);
		});
	}

	setAgeYear = (e, value, prev, type) => {
		if (value.length) {
			const current_year = new Date().getFullYear();
			const age = parseInt(value);
			const birth_year = current_year - age;
			this.props.change('year_of_birth', birth_year);


			this.setState({
				year_of_birth_disabled: true,
			});
		} else {
			this.props.change('year_of_birth', '');
			this.setState({
				year_of_birth_disabled: false,
			});
		}
	}

	resideneStateChosen = (event, newValue, previousValue, name) => {
		let state = states_and_locals.find(states_and_local => states_and_local.state.name == newValue);

		return this.setState({
			residence_lgas: state.state.locals
		});
	}

	titleSelected = (e, value, prev, type) => {
		return this.setState({
			title: value
		});
	}

	previousNameChosen = (e, value, prev, type) => {
		return this.setState({
			previous_name: value
		});
	}

	componentDidMount() {
		// console.dir(this.props.organization_profiles);
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

		let maiden_name, pregnant, previous_name;


		if (this.state.title === 'Mrs') {
			maiden_name = (
				<Field
					name="maiden_name"
					component={CustomInput}
					type="text"
					label="Maiden Name"
					compulsory={false}
					validate={[]}
				/>
			)
		}
		if (this.state.title === 'Mrs' || this.state.title === 'Miss') {
			pregnant = (
				<div className="col-md-3 col-lg-3 col-sm-12 col-xs-12">
					<Field
						name="pregnant"
						component={CustomSelect}
						label="Are you pregnant?"
						compulsory={false}
						validate={[]}
						options={[
							{
								displayValue: 'Yes',
								value: 'yes'
							},
							{
								displayValue: 'No',
								value: 'No'
							}
						]}
					/>
				</div>
			)
		}
		if (this.state.previous_name) {
			previous_name = (
				<React.Fragment>
					<div className="col-md-3 col-lg-3 col-sm-12 col-xs-12">
						<Field
							name="previous_surname"
							component={CustomInput}
							compulsory={false}
							type="text"
							label="Previous Surname"
							validate={[]}
						/>
					</div>
					<div className="col-md-3 col-lg-3 col-sm-12 col-xs-12">
						<Field
							name="previous_firstname"
							component={CustomInput}
							compulsory={false}
							type="text"
							label="Previous Firstname"
							validate={[]}
						/>
					</div>
					<div className="col-md-3 col-lg-3 col-sm-12 col-xs-12">
						<Field
							name="previous_middlename"
							component={CustomInput}
							compulsory={false}
							type="text"
							label="Previous Middlename"
							validate={[]}
						/>
					</div>
				</React.Fragment>
			)
		}

		return (
			<Fragment>
				<form onSubmit={this.props.handleSubmit}>
					<Card title={toggleBtn} style={{width: '100%'}}>
							<div className="container">
								<div className="row">
								<div className="col-md-3 col-lg-3 col-sm-12 col-xs-12">
									<Field
										name="title"
										component={CustomSelect}
										label="Title "
										validate={[requiredValidator]}
										compulsory={true}
										options={[
											{
												displayValue: 'Mr',
												value: 'Mr'
											},
											{
												displayValue: 'Mrs',
												value: 'Mrs'
											},
											{
												displayValue: 'Miss',
												value: 'Miss'
											},
											{
												displayValue: 'Master',
												value: 'Master'
											},

											{
												displayValue: 'Rev',
												value: 'Rev'
											},
											{
												displayValue: 'Dr',
												value: 'Dr'
											},
											{
												displayValue: 'Chief',
												value: 'Chief'
											},
											{
												displayValue: 'Pastor',
												value: 'Pastor'
											},
											{
												displayValue: 'Prof',
												value: 'Prof'
											},
											{
												displayValue: 'Ms',
												value: 'Ms'
											},
										]}
										onChange={this.titleSelected}
									/>
								</div>
								<div className="col-md-3 col-lg-3 col-sm-12 col-xs-12">
									<Field
										name="surname"
										component={CustomInput}
										compulsory={true}
										type="text"
										label="Surname "
										validate={[requiredValidator]}
									/>
								</div>
								
								<div className="col-md-3 col-lg-3 col-sm-12 col-xs-12">
									<Field
										name="first_name"
										component={CustomInput}
										type="text"
										label="First Name "
										validate={[requiredValidator]}
										compulsory={true}
									/>
								</div>
								<div className="col-md-3 col-lg-3 col-sm-12 col-xs-12">
									<Field
										name="gender"
										component={CustomSelect}
										label="Gender "
										validate={[requiredValidator]}
										compulsory={true}
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
								<div className="col-md-3 col-lg-3 col-sm-12 col-xs-12">
									<Field
										name="primary_phone_number"
										component={CustomInput}
										compulsory={true}
										type="number"
										label="Telephone"
										validate={[requiredValidator, minLength10, maxLength11]}
									/>
								</div>
								{this.state.make_compulsory && (
									<div className="col-md-3 col-lg-3 col-sm-12 col-xs-12">
										<Field
											name="date_of_birth"
											max={moment(new Date()).format('YYYY-MM-DD')}
											min={moment(new Date('Jan 1, 1899')).format('YYYY-MM-DD')}
											component={CustomInput}
											type="date"
											label="DOB"
											compulsory={false}
											onChange={this.setAge}
											validate={[maxDate]}
										/>
									</div>
								)}
								<div className="col-md-3 col-lg-3 col-sm-12 col-xs-12">
									<Field
										name="age"
										component={CustomInput}
										type="number"
										label="Age"
										disabled={this.state.age_disabled}
										validate={[requiredValidator]}
										compulsory={true}
										onChange={this.setAgeYear}
									/>
								</div>
								<div className="col-md-3 col-lg-3 col-sm-12 col-xs-12">
									<Field
										name="year_of_birth"
										disabled={this.state.year_of_birth_disabled}
										component={CustomInput}
										type="number"
										label="Year Of Birth"
										compulsory={false}
										validate={[requiredValidator]}
										compulsory={true}
									/>
								</div>
								{this.state.make_compulsory && (
									<Fragment>
										<div className="col-md-3 col-lg-3 col-sm-12 col-xs-12">
											<Field
												name="month_of_birth"
												compulsory={false}
												disabled={this.state.month_of_birth_disabled}
												component={CustomSelect}
												label="Month Of Birth"
												validate={[]}
												options={[
													{
														displayValue: 'January',
														value: 'January'
													},
													{
														displayValue: 'Feburary',
														value: 'Feburary'
													},
													{
														displayValue: 'March',
														value: 'March'
													},
													{
														displayValue: 'April',
														value: 'April'
													},
													{
														displayValue: 'May',
														value: 'May'
													},
													{
														displayValue: 'June',
														value: 'June'
													},
													{
														displayValue: 'July',
														value: 'July'
													},
													{
														displayValue: 'August',
														value: 'August'
													},
													{
														displayValue: 'Spetember',
														value: 'Spetember'
													},
													{
														displayValue: 'October',
														value: 'October'
													},
													{
														displayValue: 'November',
														value: 'November'
													},
													{
														displayValue: 'December',
														value: 'December'
													},
												]}
											/>
										</div>
										<div className="col-md-3 col-lg-3 col-sm-12 col-xs-12">
											<Field
												name="day_of_birth"
												component={CustomInput}
												compulsory={false}
												type="number"
												label="Day Of Birth"
												disabled={this.state.day_of_birth_disabled}
												validate={[]}
											/>
										</div>
									</Fragment>
								)}
								<div className="col-md-3 col-lg-3 col-sm-12 col-xs-12">
									<Field
										name="state_of_origin"
										component={CustomSelect}
										label="State of Origin"
										validate={[requiredValidator]}
										compulsory={true}
										options={states_and_locals.map(state_lga => {
											return {
												value: state_lga.state.name,
												displayValue: state_lga.state.name,
											}
										})}
										onChange={this.resideneStateChosen}
									/>
								</div>
								<div className="col-md-3 col-lg-3 col-sm-12 col-xs-12">
									<Field
										name="lga_of_origin"
										label="Lga of Origin"
										component={CustomSelect}
										validate={[requiredValidator]}
										compulsory={true}
										options={this.state.residence_lgas.map(residence_lga => {
											return {
												value: residence_lga.name,
												displayValue: residence_lga.name,
											}
										})}
									/>
								</div>
								<div className="col-md-3 col-lg-3 col-sm-12 col-xs-12">
									<Field
										name="marital_status"
										component={CustomSelect}
										label="Marital Status"
										validate={[requiredValidator]}
										compulsory={true}
										options={[
											{
												displayValue: 'Married',
												value: 'Married'
											},
											{
												displayValue: 'Single',
												value: 'Single'
											},
											{
												displayValue: 'Divorced',
												value: 'Divorced'
											},
											{
												displayValue: 'Widowed',
												value: 'Widowed'
											},
										]}
									/>
								</div>
								<div className="col-md-3 col-lg-3 col-sm-12 col-xs-12">
									<Field
										name="religion"
										component={CustomSelect}
										label="Religion"
										validate={[requiredValidator]}
										compulsory={true}
										options={[
											{
												displayValue: 'Christianity',
												value: 'Christianity'
											},
											{
												displayValue: 'Islam',
												value: 'Islam'
											},
											{
												displayValue: 'Traditional',
												value: 'Traditional'
											},
										]}
									/>
								</div>
								<div className="col-md-3 col-lg-3 col-sm-12 col-xs-12">
									<Field
										name="nationality"
										component={CustomInput}
										type="text"
										compulsory={true}
										label="Nationality "
										validate={[requiredValidator]}
									/>
								</div>
								<div className="col-md-3 col-lg-3 col-sm-12 col-xs-12">
									<Field
										name="local"
										component={CustomSelect}
										label="Local Govt. Of Hospital Of Choice"
										validate={[requiredValidator]}
										compulsory={true}
										options={this.props.local_governments.map(local_government => {
											return local_government
										})}
										onChange={this.localGovtChosen}
									/>
								</div>
								<div className="col-md-3 col-lg-3 col-sm-12 col-xs-12">
									<Field
										name="sector_id"
										component={CustomSelect}
										label="Sector"
										validate={[requiredValidator]}
										options={this.props.sectors.map(sector => {
											return {
												value: sector.id,
												displayValue: sector.name,
											}
										})}
										onChange={this.sectorChosen}
									/>
								</div>
								<div className="col-md-3 col-lg-3 col-sm-12 col-xs-12">
									<Field
										name="provider_id"
										component={CustomSelect}
										label="Default Hospital"
										validate={[requiredValidator]}
										compulsory={true}
										options={this.state.providers.map(provider => {
											return {
												value: provider.id,
												displayValue: provider.name_lga_ward,
											}
										})}
									/>
								</div>
								<div className="col-md-3 col-lg-3 col-sm-12 col-xs-12">
									<Field
										name="company_id"
										component={CustomSelect}
										label="Group"
										validate={[requiredValidator]}
										compulsory={true}
										options={this.state.companies.map(company => {
											return {
												value: company.id,
												displayValue: company.name,
											}
										})}
									/>
								</div>
								<div className="col-md-3 col-lg-3 col-sm-12 col-xs-12">
									<Field
										name="policy_id"
										component={CustomSelect}
										label="Policy"
										validate={[requiredValidator]}
										compulsory={true}
										options={this.props.policies.map(policy => {
											return {
												value: policy.id,
												displayValue: policy.name
											}
										})}
									/>
								</div>

								{ this.state.make_compulsory && (
									<Fragment>
										{ pregnant }
										<div className="col-md-3 col-lg-3 col-sm-12 col-xs-12">
											<Field
												name="whatsapp_number"
												component={CustomInput}
												type="text"
												label="Whatsapp Number"
												compulsory={false}
												validate={[]}
											/>
										</div>
										<div className="col-md-3 col-lg-3 col-sm-12 col-xs-12">
											<Field
												name="nin"
												component={CustomInput}
												type="number"
												compulsory={false}
												label="National Identification Number"
												validate={[]}
											/>
										</div>
										<div className="col-md-3 col-lg-3 col-sm-12 col-xs-12">
											<Field
												name="email"
												component={CustomInput}
												type="email"
												label="Email"
												validate={[]}
												compulsory={false}
											/>
										</div>
										<div className="col-md-3 col-lg-3 col-sm-12 col-xs-12">
											<Field
												name="other_name"
												component={CustomInput}
												type="text"
												label="Other Name"
												compulsory={false}
												validate={[]}
											/>
										</div>

										<div className="col-md-3 col-lg-3 col-sm-12 col-xs-12">
											<Field
												name="previous_name"
												component={CustomSelect}
												label="Have you changed your name before?"
												validate={[]}
												compulsory={false}
												options={[
													{
														displayValue: 'Yes',
														value: true
													},
													{
														displayValue: 'No',
														value: false
													}
												]}
												onChange={this.previousNameChosen}
											/>
										</div>

										{ previous_name }

										<div className="col-md-12">
											{maiden_name}
										</div>
									</Fragment>
								)}
							</div>
							</div>
						</Card><hr/>
						<div className="pull-right">
							<CustomButton disabled={this.props.invalid || this.props.pristine}>
								Next {" "}
								<FaArrowRight />
							</CustomButton>
						</div> 
				</form>
			</Fragment>
		);
	}

}

export default reduxForm({
	form: 'BeneficiaryStepOneFormNew'
})(BeneficiaryStepOneFormNew);