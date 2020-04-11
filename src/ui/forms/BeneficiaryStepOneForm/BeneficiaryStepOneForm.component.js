import moment from 'moment';
import React, { Fragment} from 'react';
import { Row, Col, Card } from 'antd';
import CustomInput from '../../CustomInput';
import CustomSelect from '../../CustomSelect';
import CustomButton from '../../CustomButton';
import { Field, reduxForm } from 'redux-form';
import { states_and_locals } from '../../../shared/utils/state_lga';
import { maxDate, minLength10, maxLength11, requiredValidator } from '../../../shared/utils/validation';
import { FaEye, FaArrowRight } from 'react-icons/fa';

class BeneficiaryStepOneForm extends React.Component {

	state = {
		age_disabled: false,
		year_of_birth_disabled: false,
		month_of_birth_disabled: false,
		day_of_birth_disabled: false,

		wardens: [],
		providers: [],
		allow_roam: false,
		local_government: null,
		make_compulsory: true
	}

	localGovtChosen = (event, newValue, previousValue, name) => {
		let local_government = this.props.local_governments.filter(local_government => newValue == local_government.value);

		this.setState({
			wardens: local_government[0].wardens,
			local_government: local_government[0].value,
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
			this.props.change('age', age);
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
		}
	}

	wardenChosen = (event, newValue, previousValue, name) => {
		let providers = this.props.organization_profiles.filter(organization_profile => organization_profile.type === 'PROVIDER')
														.filter(provider => provider.local_government == this.state.local_government);


		const wardenProviders = providers.filter(provider => provider.warden === newValue).map(provider => {
			return {
				value: provider.id,
				displayValue: provider.name_lga_ward,
			}
		});

		this.setState({
			providers: wardenProviders
		});
	}

	sectorChosen = (event, newValue, previousValue, name) => {
		let sector = this.props.sectors.find(sector => sector.id == event.target.value);

		if (sector.can_roam) {

			let providers = this.props.organization_profiles.filter(organization_profile => organization_profile.type === 'PROVIDER').map(provider => {
				return {
					value: provider.id,
					displayValue: provider.name_lga_ward,
				}
			});

			this.setState({
				allow_roam: true,
				providers: providers
			});
		}
	}

	render () {

		let roamFieldContainer = (
			<Field
				name="warden"
				component={CustomSelect}
				label="Ward Of Hospital Of Choice"
				validate={[]}
				options={this.state.wardens.map(warden => {
					return warden
				})}
			/>
		);

		if (!this.state.allow_roam) {
			roamFieldContainer = (
				<Field
					name="warden"
					component={CustomSelect}
					label="Ward Of Hospital Of Choice"
					validate={[requiredValidator]}
					options={this.state.wardens.map(warden => {
						return warden
					})}
					onChange={this.wardenChosen}
				/>
			)
		}

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
						<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
							<Col className="gutter-row" span={12}>
								<Field
									name="title"
									component={CustomSelect}
									label="Title"
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
								/>
							</Col>
							<Col className="gutter-row" span={12}>
								<Field
									name="surname"
									component={CustomInput}
									type="text"
									label="Surname"
									compulsory={true}
									validate={[requiredValidator]}
								/>
							</Col>
						</Row>
						<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
							<Col className="gutter-row" span={8}>
								<Field
									name="first_name"
									component={CustomInput}
									type="text"
									label="First Name"
									compulsory={true}
									validate={[requiredValidator]}
								/>
							</Col>
							<Col className="gutter-row" span={8}>
								<Field
									name="gender"
									component={CustomSelect}
									label="Gender"
									compulsory={true}
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
							</Col>
							<Col className="gutter-row" span={8}>
								<Field
									name="primary_phone_number"
									component={CustomInput}
									type="number"
									label="Tel"
									compulsory={true}
									validate={[requiredValidator, minLength10, maxLength11]}
								/>
							</Col>
						</Row>
						<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
							{ this.state.make_compulsory && (
								<Col className="gutter-row" span={24}>
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
								</Col>
							)}
						</Row>
						<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
							<Col className="gutter-row" span={12}>
								<Field
									name="age"
									component={CustomInput}
									disabled={this.state.age_disabled}
									type="number"
									label="Age"
									compulsory={true}
									validate={[requiredValidator]}
									onChange={this.setAgeYear}
								/>
							</Col>
							<Col className="gutter-row" span={12}>
								<Field
									name="year_of_birth"
									component={CustomInput}
									disabled={this.state.year_of_birth_disabled}
									type="number"
									label="Year Of Birth"
									compulsory={false}
									validate={[requiredValidator]}
									compulsory={true}
								/>
							</Col>
						</Row>
						<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
								{this.state.make_compulsory && (
									<Fragment>
										<Col className="gutter-row" span={12}>
											<Field
												name="month_of_birth"
												disabled={this.state.month_of_birth_disabled}
												compulsory={false}
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
										</Col>
										<Col className="gutter-row" span={12}>
											<Field
												name="day_of_birth"
												component={CustomInput}
												disabled={this.state.day_of_birth_disabled}
												compulsory={false}
												type="number"
												label="Day Of Birth"
												validate={[]}
											/>
										</Col>
									</Fragment>
								)}
							</Row>
							<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
								<Col className="gutter-row" span={8}>
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
									/>
								</Col>
								<Col className="gutter-row" span={8}>
									<Field
										name="religion"
										component={CustomSelect}
										label="Religion"
										compulsory={true}
										validate={[requiredValidator]}
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
								</Col>
								<Col className="gutter-row" span={8}>
									<Field
										name="marital_status"
										component={CustomSelect}
										label="Marital Status"
										compulsory={true}
										validate={[requiredValidator]}
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
								</Col>
							</Row>
							<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
								<Col className="gutter-row" span={12}>
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
								</Col>
								<Col className="gutter-row" span={12}>
									<Field
										name="provider_id"
										component={CustomSelect}
										label="Default Hospital"
										compulsory={true}
										validate={[requiredValidator]}
										compulsory={true}
										options={this.props.providers.map(provider => {
											return {
												value: provider.id,
												displayValue: provider.name_lga_ward,
											}
										})}
									/>
								</Col>
							</Row>
							<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
								<Col className="gutter-row" span={12}>
									<Field
										name="nationality"
										component={CustomInput}
										type="text"
										label="Nationality"
										compulsory={true}
										validate={[requiredValidator]}
										compulsory={false}
									/>
								</Col>
								<Col className="gutter-row" span={12}>
									<Field
										name="email"
										component={CustomInput}
										type="email"
										label="Email"
										validate={[requiredValidator]}
										compulsory={true}
									/>
								</Col>
							</Row>
							<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
								{this.state.make_compulsory && (
									<Fragment>
										<Col className="gutter-row" span={12}>
											<Field
												name="other_name"
												component={CustomInput}
												type="text"
												label="Other Name"
												compulsory={false}
												validate={[]}
											/>
										</Col>
										<Col className="gutter-row" span={12}>
											<Field
												name="maiden_name"
												component={CustomInput}
												compulsory={false}
												type="text"
												label="Maiden Name"
												validate={[]}
											/>
										</Col>
										<Col className="gutter-row" span={12}>
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
										</Col>
										<Col className="gutter-row" span={12}>
											<Field
												name="whatsapp_number"
												component={CustomInput}
												compulsory={false}
												type="number"
												min="10"
												max="11"
												label="Whatsapp Number"
												validate={[]}
											/>
										</Col>
										<Col className="gutter-row" span={12}>
											<Field
												name="nin"
												component={CustomInput}
												type="number"
												label="National Identification Number"
												validate={[]}
											/>
										</Col>
										<Col className="gutter-row" span={12}>
											<Field
												name="lga_of_origin"
												component={CustomInput}
												type="text"
												label="LGA of Origin"
												compulsory={false}
											/>
										</Col>
										<Col className="gutter-row" span={12}>
											<Field
												name="previous_surname"
												component={CustomInput}
												type="text"
												label="Previous Surname"
												validate={[]}
											/>
										</Col>
										<Col className="gutter-row" span={12}>
											<Field
												name="previous_firstname"
												component={CustomInput}
												type="text"
												compulsory={false}
												label="Previous Firstname"
												validate={[]}
											/>
										</Col>
										<Col className="gutter-row" span={12}>
											<Field
												name="previous_middlename"
												component={CustomInput}
												type="text"
												label="Previous Middlename"
												validate={[]}
											/>
										</Col>
									</Fragment>
								)
							}
						</Row>
						<Row>
							<Col className="gutter-row" span={24}>
								<div className="pull-right">
									<CustomButton disabled={this.props.invalid || this.props.pristine}>
										Next {" "} <FaArrowRight />
									</CustomButton>
								</div>
							</Col>
						</Row>
					</Card>
				</form>
			</Fragment>
		);
	}

}

export default reduxForm({
	form: 'BeneficiaryStepOneForm'
})(BeneficiaryStepOneForm);