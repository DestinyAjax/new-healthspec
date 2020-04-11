import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import CustomButton from '../../ui/CustomButton';
import styles from './BeneficiaryPlanDetail.component.module.css';

class BeneficiaryPlanDetail extends React.Component {

	render () {

		let services;

		if (this.props.policies.length) {
			services = this.props.policies.map(policy => {
				return policy.plan.plan_services.map(plan_service => (
					<tr key={plan_service.id}>
						{/* <td>{this.props.policy.plan.name}</td> */}
						<td>{plan_service.service.name}</td>
					</tr>
				))
			});
		}

		return (
			<div>
				<div className={"table-responsive-sm"}>
					<table className={"table table-striped"}>
						<thead>
							<tr>
								{/* <th>Plan</th> */}
								<th>Service</th>
							</tr>
						</thead>
						<tbody>

							{ services }

						</tbody>
					</table>
				</div>

				<div className={styles.organizationFooter}>
					<div className={styles.buttonContainer}>
						<div className={styles.button}>
							<CustomButton onClick={this.props.onSubmit}>Start</CustomButton>
						</div>

						<Link to={{ pathname: '/' }} className={styles.cancelOrBack}> Cancel </Link>
					</div>

					<a className={styles.link}>
						{/* Don't want to register as an HMO? Click here to change category */}
					</a>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		// defaultHmo: state.rootReducer.defaultHmo,
	}
}

const mapDispatchToProps = dispatch => {
	return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(BeneficiaryPlanDetail);