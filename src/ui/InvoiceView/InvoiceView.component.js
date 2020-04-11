import React from 'react';
import moment from 'moment';
import swal from 'sweetalert';
import { connect } from 'react-redux';
import CustomButton from '../CustomButton';
import styles from './InvoiceView.component.module.css';

import { get, updateTransaction, startConfirmOnlinePayment } from '../../shared/actions/Transaction.action';

class InvoiceView extends React.Component {


    makeDecisionWith = async decision => {
        let decisionMessage = decision === 2 ? 'Reject' : 'Accept';

        let alert = await swal({
            title: `Are you sure you want to ${decisionMessage} this invoice`,
            type: 'confirm',
            buttons: [
                'No',
                'Yes, I am sure!'
            ],
            dangerMode: true,
        });

        if (alert) {
            this.props.updateTransaction({
                status: decision,
                bank_id: this.props.role.id,
                reference_number: this.props.transaction.reference_number
            });
        }
    }


    // showNotificationWith = async props => {
    //     if (props.online_payment_status === 200) {
    //         // this.setState({
    //         //     submittingForm: false
    //         // });

    //         let alert = await swal({
    //             title: "Good job!",
    //             text: `Payment was successfully!`,
    //             icon: "success",
    //             closeOnClickOutside: false
    //         });

    //         if (alert) {
    //             // this.props.resetStoreService();
    //             console.dir('reset payment');
    //         }
    //     }
    //     if (props.online_payment_status === 422) {
    //         // this.setState({
    //         //     submittingForm: false
    //         // });

    //         let alert = await swal({
    //             title: "Oops!",
    //             text: `Your purchase failed!`,
    //             icon: "error",
    //             closeOnClickOutside: false
    //         });

    //         if (alert) {
    //             console.dir('reset payment');
    //             // this.props.resetStoreService();
    //         }
    //     }
    //     if (props.update_transaction_status === 200) {
    //         let alert = await swal({
    //             title: "Good job!",
    //             text: `Payment status was updated successfully!`,
    //             icon: "success",
    //             closeOnClickOutside: false
    //         });

    //         if (alert) {
    //             // this.props.navigation.navigate();
    //             // this.props.resetStoreService();

    //             //redirect here if role is agent
    //             console.dir('close ');
    //             // return this.props.history.push('/agent_my_beneficiary');
    //         }
    //     }
    // }

    componentDidMount() {
        let form = {};

        form['field'] = 'id';
        form['value'] = this.props.transaction_id;

        this.props.get(form);
    }

    render () {

        let container;


        if (this.props.get_transaction_status === 200) {

            let transaction = this.props.transaction;
            let model = this.props.transaction.model;

            let decision, verifier, confirmHeader, confirmBody;

            if (transaction.status === 1) {
                decision = (
                    <div className={styles.actions}>
                        <div className={styles.action}>
                            <CustomButton>VERIFIED & ACTIVE</CustomButton>
                        </div>
                    </div>
                )

                verifier = (
                    <React.Fragment>
                        <div className={styles.item}>
                            <div className={styles.itemTitle}>Verifier</div>
                            <div className={styles.itemDescription}>
                                <div>{transaction.verifier.first_name} {transaction.verifier.last_name} {transaction.verifier.middle_name}</div>
                            </div>
                        </div>
                    </React.Fragment>
                )

                confirmHeader = (
                    <React.Fragment>
                        <th>Confirmed Date</th>
                        <th>Expires</th>
                    </React.Fragment>
                )

                confirmBody = (
                    <React.Fragment>
                        <td>{moment(transaction.confirmed_date.date).format('Do MMMM YYYY')}</td>
                        <td>{moment(model.expires_at.date).format('Do MMMM YYYY')}</td>
                    </React.Fragment>
                )
            }
            if (transaction.status === 2) {
                decision = (
                    <div className={styles.actions}>
                        <div className={styles.action}>
                            <CustomButton>REJECTED</CustomButton>
                        </div>
                    </div>
                )
            }



            container = (
                <div className={styles.container}>

                    <div  className={'card-header'}>
                        <div className={styles.ref_number_title}>
                            <div className={styles.ref_number}>1022020200202</div>
                            <div className={'h3'} >INVOICE</div>
                        </div>
                        <div className={styles.date}>
                            Osun Health Insurance Scheme
                        </div>
                    </div>


                    <div className={styles.body}>


                        <div className={styles.itemsImage}>
                            <div className={styles.items}>
                                <div className={styles.item}>
                                    <div className={styles.itemTitle}>Enrollee</div>
                                    <div className={styles.itemDescription}>
                                        <div>{transaction.owner.first_name} {transaction.owner.last_name} {transaction.owner.middle_name}</div>
                                        <div>{transaction.owner.enrollee_id}</div>
                                    </div>
                                </div>
                                <div className={styles.item}>
                                    <div className={styles.itemTitle}>Provider</div>
                                    <div className={styles.itemDescription}>
                                        <div>{transaction.model.provider_name}</div>
                                        <div>{transaction.model.provider_code}</div>
                                        {/* <div>{model.organization_profile.warden}</div> */}
                                    </div>
                                </div>
                                <div className={styles.item}>
                                    <div className={styles.itemTitle}>Amount</div>
                                    <div className={styles.itemDescription}>
                                        <div>NGN {Number(transaction.amount).toLocaleString()}</div>
                                    </div>
                                </div>

                                {verifier}
                            </div>

                            <div className={styles.image}>
                                <img src={transaction.model.picture} />
                            </div>
                        </div>

                        <table className={"table table-striped"}>
                            <thead>
                                <tr>
                                    <th>Type</th>
                                    <th>Issued Date</th>
                                    <th>Policy Name</th>
                                    <th>Duration</th>
                                    <th>Reference Number</th>
                                    {confirmHeader}
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{transaction.type}</td>
                                    <td>{moment(transaction.created_at.date).format('Do MMMM YYYY')}</td>
                                    <td>{transaction.model.policy_name}</td>
                                    <td>{transaction.model.policy_duration} Months</td>
                                    <td>{transaction.reference_number}</td>
                                    {confirmBody}
                                </tr>
                            </tbody>
                        </table>
                    </div>


                    {decision}
                </div>
            )
        }


        return (
            <React.Fragment>
                { container }
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        role: state.ChoseRoleReducer.role,
        auth_user_id: state.AuthReducer.id,
        transaction: state.TransactionReducer.transaction,

        online_payment_status: state.TransactionReducer.online_payment_status,
        get_transaction_status: state.TransactionReducer.get_transaction_status,
        update_transaction_status: state.TransactionReducer.update_transaction_status,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        get: payload => dispatch(get(payload)),
        updateTransaction: payload => dispatch(updateTransaction(payload)),
        startConfirmOnlinePayment: payload => dispatch(startConfirmOnlinePayment(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceView);