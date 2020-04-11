import React from 'react';
import MyInvoice from '../MyInvoice';
import { connect } from 'react-redux';
import styles from './InvoiceCard.component.module.css';
import { get, resetGetTransaction } from '../../shared/actions/Transaction.action';

class InvoiceCard extends React.Component {

	render() {
		let container = (
			<React.Fragment>
				<div id="slip">
					<MyInvoice transaction_id={this.props.transaction.id} />
				</div>

				<div className={styles.buttonContainer}>
					<a className={styles.cancelOrBack} onClick={this.props.nextStep}>Proceed to Slip</a>
				</div>
			</React.Fragment>
		);

		return (
			<div className={styles.container}>
				{ container }
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {}
}

const mapDispatchToProps = dispatch => {
	return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceCard);