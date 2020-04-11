import React from 'react';
import moment from 'moment';
import swal from 'sweetalert';
import { connect } from 'react-redux';
import CustomButton from '../CustomButton';
import styles from './MyInvoice.component.module.css';

import { get, updateTransaction, startConfirmOnlinePayment, resetPaymentVerification } from '../../shared/actions/Transaction.action';

class MyInvoice extends React.Component {

    state = {
        isVerifying: false,
    }

    makePayment = async () => {
        if(navigator.onLine){
            const handler = await window.PaystackPop.setup({
                //pk_test_c6107f2bff6d8a2d211f6cce9b9067f612f29a14
                //pk_live_2a761fbb1a6eae9e6a4021e334182d8d7413b904
    
                key: 'pk_live_2a761fbb1a6eae9e6a4021e334182d8d7413b904',
                email: this.props.transaction.owner.email,
                amount: this.props.transaction.amount * 100,
                ref: this.props.transaction.reference_number,
                subaccount: 'ACCT_d1y7v4egjmlf96b',
                callback: response => {
                    this.setState({
                        isVerifying: true,
                    });
                    this.props.startConfirmOnlinePayment({
                        reference_number: response.reference
                    });
                },
                onClose: function () {
                    console.dir('window closed');
                }
            });
            handler.openIframe();
        } else {
            alert('offline, please check your internet');
        }
    
    }

    showNotification = async props => {
        if (props.online_payment_status === 200) {
            let alert = await swal({
                text: `Payment was made successfully!`,
                icon: "success",
                closeOnClickOutside: false
            });

            if (alert) {
                this.props.resetPaymentVerification();
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        this.showNotification(nextProps);
    }

    componentDidMount() {
        let form = {};

        form['field'] = 'id';
        form['value'] = this.props.transaction_id;

        this.props.get(form);
    }


    render () {

        let container;
        let header = 'INVOICE';

        if (this.props.get_single_transaction_status === 200) {

            let transaction = this.props.transaction;
            let model = this.props.transaction.model;

            let decision, verifier, confirmHeader, confirmBody, payOption;

            let notification = (
                <div className={styles.notification}>
                    We noticed that you have not supplied your email address. Please note that you will not be able to do online payment as email address is required for this
                </div>
            );


            if (transaction.owner.email !== null) {
                payOption = (
                    <CustomButton onClick={this.makePayment} >Pay NGN {Number(transaction.amount).toLocaleString()}</CustomButton>
                )
                notification = null;
            }

            if (this.state.isVerifying) {
                payOption = <CustomButton onClick={this.makePayment} submittingForm={true}>isloading</CustomButton>
            }

            if (transaction.status === 0) {
                decision = (
                    <div className={styles.actions}>
                        <div className={styles.action}>
                            { payOption }
                        </div>
                    </div>
                )
            }
            if (transaction.status === 1) {
                decision = (
                    <div className={styles.actions}>
                        <div className={styles.action}>
                            <CustomButton>VERIFIED & ACTIVE</CustomButton>
                        </div>
                    </div>
                )

                verifier = (
                    <div className={styles.item}>
                        <div className={styles.itemTitle}>Verifier</div>
                        <div className={styles.itemDescription}>
                            <div>{transaction.verifier.surname} {transaction.verifier.first_name} {transaction.verifier.other_name}</div>
                        </div>
                    </div>
                )

                confirmHeader = (
                    <React.Fragment>
                        <th>Confirmed Date</th>
                        <th>Expires</th>
                    </React.Fragment>
                )

                confirmBody = (
                    <React.Fragment>
                        <td>{moment(transaction.confirmed_date).format('Do MMMM YYYY')}</td>
                        <td>{moment(model.expires_at).format('Do MMMM YYYY')}</td>
                        {/* <td>{moment(model.expires_at.date).format('Do MMMM YYYY')}</td> */}
                    </React.Fragment>
                )
                header = 'RECEIPT';
            }


            container = (
                <div className={styles.container}>

                    <div  className={'card-header'}>
                        <div className={styles.ref_number_title}>
                            <div className={styles.ref_number}>1022020200202</div>
                            <div className={'h3'} >{header}</div>
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
                                        <div>{transaction.model.surname} {transaction.model.first_name} {transaction.model.other_name}</div>
                                        <div>{transaction.model.enrollee_id}</div>
                                    </div>
                                </div>
                                <div className={styles.item}>
                                    <div className={styles.itemTitle}>Provider</div>
                                    <div className={styles.itemDescription}>
                                        <div>{transaction.model.provider_name}</div>
                                        <div>{transaction.model.provider_code}</div>
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

                        <div className={"table-responsive-sm"}>
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
                                        <td>{transaction.type.split("_").join(" ")}</td>
                                        <td>{moment(transaction.created_at.date).format('Do MMMM YYYY')}</td>
                                        <td>{transaction.model.policy_name}</td>
                                        <td>{transaction.model.policy_duration} Months</td>
                                        <td>{transaction.reference_number}</td>
                                        {confirmBody}
                                    </tr>
                                </tbody>
                            </table>
                            <div>
                                { notification }
                            </div>
                        </div>
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
        get_single_transaction_status: state.TransactionReducer.get_single_transaction_status,

        online_payment_status: state.TransactionReducer.online_payment_status,
        update_transaction_status: state.TransactionReducer.update_transaction_status,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        get: payload => dispatch(get(payload)),
        updateTransaction: payload => dispatch(updateTransaction(payload)),
        resetPaymentVerification: () => dispatch(resetPaymentVerification()),
        startConfirmOnlinePayment: payload => dispatch(startConfirmOnlinePayment(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyInvoice);