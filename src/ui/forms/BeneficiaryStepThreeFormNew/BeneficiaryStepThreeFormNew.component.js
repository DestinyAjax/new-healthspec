import React, { Fragment } from 'react';
import { Row, Col, Card } from 'antd';
import CustomInput from '../../CustomInput';
import CustomSelect from '../../CustomSelect';
import CustomButton from '../../CustomButton';
import { Field, reduxForm } from 'redux-form';
import CustomReactSelect from '../../CustomReactSelect';
import { requiredValidator } from '../../../shared/utils/validation';
import styles from './BeneficiaryStepThreeFormNew.component.module.css';
import { FaEye, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

import { states_and_locals } from '../../../shared/utils/state_lga';

class BeneficiaryStepThreeFormNew extends React.Component {
	state = {
		local_governments: states_and_locals.find(states_and_local => states_and_local.state.name == 'Osun State').state.locals,
		make_compulsory: true
	}

	switchQuickFill = () => {
		this.setState({ make_compulsory: !this.state.make_compulsory});
	}

	render () {
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
							<Col className="gutter-row" span={8}>
								<Field
									name="city_of_residence"
									component={CustomInput}
									type="text"
									label="Town/City of Residence"
									compulsory={true}
									validate={[requiredValidator]}
								/>
							</Col>
							<Col className="gutter-row" span={8}>
								<Field
									name="lga_of_residence"
									component={CustomSelect}
									label="LGA of Residence"
									validate={[requiredValidator]}
									compulsory={true}
									options={this.state.local_governments.map(local_government => {
										return {
											value: local_government.name,
											displayValue: local_government.name,
										}
									})}
								/>
							</Col>
							<Col className="gutter-row" span={8}>
								<Field
									name="address_duration"
									component={CustomInput}
									type="text"
									label="How long have you lived at this address?"
									validate={[requiredValidator]}
									compulsory={true}
								/>
							</Col>
						</Row>
						{this.state.make_compulsory && (
							<React.Fragment>
								<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
									<Col className="gutter-row" span={8}>
										<Field
											name="address_of_residence"
											component={CustomInput}
											type="text"
											label="Address of Residence"
											validate={[]}
											compulsory={false}
										/>
									</Col>
									<Col className="gutter-row" span={8}>
										<Field
											name="address_range"
											component={CustomSelect}
											label="Did you move into this address within the last three months?"
											validate={[]}
											compulsory={false}
											options={[
												{
													displayValue: 'Yes',
													value: 'below 3 months'
												},
												{
													displayValue: 'No',
													value: 'over 3 months'
												}
											]}
										/>
									</Col>
									<Col className="gutter-row" span={8}>
										<Field
											name="guardian_surname"
											component={CustomInput}
											type="text"
											label="Guardian Surname"
											validate={[]}
										/>
									</Col>
								</Row>
								<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
									<Col className="gutter-row" span={12}>
										<Field
											name="guardian_firstname"
											component={CustomInput}
											type="text"
											label="Guardian First Name"
											validate={[]}
										/>
									</Col>
									<Col className="gutter-row" span={12}>
										<Field
											name="guardian_middlename"
											component={CustomInput}
											type="text"
											label="Guardian Middle Name"
											validate={[]}
										/>
									</Col>
								</Row>
							</React.Fragment>
						)}
						<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
							<Col className="gutter-row" span={12}>
								<div className="pull-left">
									<button className="btn btn-lg btn-secondary" onClick={this.props.previousStep}> 
										<FaArrowLeft /> {" "}
										Previous 
									</button>
								</div>
							</Col>
							<Col className="gutter-row" span={12}>
								<CustomButton disabled={this.props.invalid || this.props.pristine}>
									Next {" "}
									<FaArrowRight />
								</CustomButton>
							</Col>
						</Row>
					</Card>
				</form>
			</Fragment>
		);
	}
}

export default reduxForm({
	form: 'BeneficiaryStepThreeFormNew',
	enableReinitialize: true
})(BeneficiaryStepThreeFormNew);