import React from 'react';
import moment from 'moment';
import swal from 'sweetalert';

import { connect } from 'react-redux';
import { closeModal } from '../Modal.action';
import styles from './TransactionSearch.component.module.css';

import TransactionUserSearchForm from '../../forms/TransactionUserSearchForm';
import { setTransaction, getUserTransactions, transactionGetUserReset } from '../../../shared/actions/Transaction.action';

class TransactionSearch extends React.Component {

    state = {
        submittingForm: false
    }

    handleSubmit = formData => {
        let form = {};

        form['value'] = formData.value;

        if (parseInt(formData.value) == formData.value) {
            form['field'] = 'primary_phone_number';
        }
        if (/(.+)@(.+){2,}\.(.+){2,}/.test(formData.value)) {
            form['field'] = 'email';
        }

        if (form['field'] == undefined) {
            console.dir('formError');
            return;
        }

        this.setState({
            submittingForm: true
        }, () => {
            this.props.getUserTransactions(form);
        });
    }

    async componentDidUpdate(prevProps, prevState) {
        if ((prevProps.status != this.props.status) && (this.props.status === 200)) {
            let alert = await swal({
                title: "Good job!",
                text: `transaction seen for user`,
                icon: "success",
                closeOnClickOutside: false
            });

            if (alert) {
                this.setState({
                    submittingForm: false
                });
            }
        }
        if ((prevProps.status != this.props.status) && (this.props.status === 404)) {
            let alert = await swal({
                title: "Opps!",
                text: `user does not exists in our system`,
                icon: "error",
                closeOnClickOutside: false
            });

            if (alert) {
                this.setState({
                    submittingForm: false
                }, () => {
                    this.props.transactionGetUserReset();
                });
            }
        }
    }

    componentWillUnmount() {
        this.props.transactionGetUserReset();
    }

    activeTransactionHandler = transaction => {
        this.props.closeModal();
        this.props.setTransaction(transaction);
    }

    render() {
        let transactionContainer;

        if (this.props.status === 200) {
            let transactions = this.props.transactions.map(transaction => (
                <tr key={transaction.id} className={styles.transaction}>
                    <td>{moment(transaction.created_at.date).format('Do MMMM YYYY')}</td>
                    <td>{transaction.type}</td>
                    <td>{transaction.status}</td>
                    <td>{transaction.reference_number}</td>
                    <td>{transaction.amount.toLocaleString()}</td>
                    <td onClick={() => this.activeTransactionHandler(transaction)}><i className="fa fa-eye"></i></td>
                </tr>
            ));

            transactionContainer = (
                <table className={"table table-striped"}>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Type</th>
                            <th>Status</th>
                            <th>Reference number</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        { transactions }
                    </tbody>
                </table>
            )
        }

        return (
            <div className={styles.modal}>
                <div className={styles.body}>
                    <div>
                        <div className={styles.action}>
                            <div className={styles.goBack} onClick={this.props.closeModal}>
                                <i className="fa fa-close" aria-hidden="true"></i>  Go Back
                            </div>
                        </div>

                        <div>
                            <TransactionUserSearchForm
                                onSubmit={this.handleSubmit}
                                submittingForm={this.state.submittingForm}
                            />
                        </div>

                        <div>
                            { transactionContainer }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        transactions: state.TransactionReducer.transactions,
        status: state.TransactionReducer.transaction_get_user_status,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        closeModal: () => dispatch(closeModal()),
        setTransaction: payload => dispatch(setTransaction(payload)),
        transactionGetUserReset: () => dispatch(transactionGetUserReset()),
        getUserTransactions: payload => dispatch(getUserTransactions(payload)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionSearch);