import React, { Fragment } from 'react';
import { Card } from 'antd';
import CustomInput from '../../CustomInput';
import CustomButton from '../../CustomButton';
import { Field, reduxForm } from 'redux-form';
import { FaEye, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

class BeneficiaryStepFiveFormNew extends React.Component {
	state = {
		make_compulsory: true
	};

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
					<Card title="Next of Kin Information" style={{width: '100%'}}>
						<div className="row">
							<div className="col-md-4 col-lg-4 col-sm-12 col-xs-12">
								<Field
									name="next_of_kin_surname"
									component={CustomInput}
									type="text"
									compulsory={false}
									label="Next of kin surname"
									validate={[]}
								/>
							</div>
							<div className="col-md-4 col-lg-4 col-sm-12 col-xs-12">
								<Field
									name="next_of_kin_firstname"
									component={CustomInput}
									type="text"
									compulsory={false}
									label="Next of kin First Name"
									validate={[]}
								/>
							</div>
							<div className="col-md-4 col-lg-4 col-sm-12 col-xs-12">
								<Field
									name="next_of_kin_othername"
									component={CustomInput}
									type="text"
									compulsory={false}
									label="Next of kin Other Name"
									validate={[]}
								/>
							</div>
						</div>
						<div className="row">
							<div className="col-md-6 col-lg-6 col-sm-12 col-xs-12">
								<Field
									name="relationship_with_next_of_kin"
									component={CustomInput}
									type="text"
									compulsory={false}
									label="Relationship with next of kin"
									validate={[]}
								/>
							</div>
							<div className="col-md-6 col-lg-6 col-sm-12 col-xs-12">
								<Field
									name="next_of_kin_occupation"
									component={CustomInput}
									type="text"
									compulsory={false}
									label="Next of kin occupation"
									validate={[]}
								/>
							</div>
						</div>
						<div className="row">
							<div className="col-md-6 col-lg-6 col-sm-12 col-xs-12">
								<Field
									name="next_of_kin_phone_number"
									component={CustomInput}
									type="text"
									compulsory={false}
									label="Next of kin phone number"
									validate={[]}
								/>
							</div>
							<div className="col-md-4 col-lg-4 col-sm-12 col-xs-12">
								<Field
									name="next_of_kin_address"
									component={CustomInput}
									type="text"
									compulsory={false}
									label="Next of kin address"
									validate={[]}
								/>
							</div>
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
	form: 'BeneficiaryStepFiveFormNew'
})(BeneficiaryStepFiveFormNew);