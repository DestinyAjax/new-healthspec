import React from 'react';
// import Card from '../Card';
import MyInvoice from '../MyInvoice';
import html2canvas from "html2canvas";
import ReactToPrint from 'react-to-print';
import CustomButton from '../CustomButton';
import styles from './BeneficiaryCard.component.module.css';
import { get, resetGetTransaction } from '../../shared/actions/Transaction.action';

class BeneficiaryCard extends React.Component {

	render() {
		return (
			<div className={styles.container}>

				<div id="slip">
					<MyInvoice transaction_id={this.props.transaction.id} ref={el => (this.componentRef = el)} />
				</div>

				<div className={styles.buttonContainer}>
					<div className={styles.button}>
						<ReactToPrint
							trigger={() => <div>Print this out!</div>}
							content={() => this.componentRef}
						/>
					</div>
				</div>
			</div>
		)
	}
}


export default BeneficiaryCard;