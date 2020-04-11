import React, { Component } from 'react';
import swal from 'sweetalert';
import moment from 'moment';
import { connect } from 'react-redux';
import { reset } from 'redux-form';
import {Card} from 'antd';
import Invoice from '../../ui/Invoice';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import LayoutContent from '@iso/components/utility/layoutContent';
import DashboardLayout from '../../containers/Dashboard/Dashboard';
import Breadcrumb from "../../ui/Breadcrumb";
import Loader from '../../ui/Loader/Loader.Component';
import { getAllForUser, transactionGetUserReset } from '../../shared/actions/Transaction.action';
import TransactionSearchForm from '../../ui/forms/TransactionSearchForm';

class Transaction extends Component {

    state = {
        transaction: null,
        submittingForm: false
    }

    handleSubmit = formData => {
        this.setState({
            submittingForm: true
        }, () => {
            this.props.getAllForUser({
                field: 'enrollee_id',
                value: formData.enrollee_id
            });
        });
    }

    async componentDidUpdate(prevProps, prevState) {


        if (this.props.status !== prevProps.status) {

            if (this.props.status === 200) {
                let alert = await swal({
                    title: "Good job!",
                    text: `User Found, Pick a transaction to update status!`,
                    icon: "success",
                    closeOnClickOutside: false
                });

                if (alert) {
                    this.setState({
                        submittingForm: false
                    });
                }
            }

            if (this.props.status == 404) {
                let alert = await swal({
                    title: "Opps",
                    text: `No User Found!`,
                    icon: "error",
                    closeOnClickOutside: false
                });

                if (alert) {
                    this.props.transactionGetUserReset();
                    this.setState({
                        submittingForm: false
                    });
                }
            }
        }
    }

    cancelHandler = () => {
        this.props.transactionGetUserReset();
        this.props.reset('TransactionSearchForm');
    }

    componentWillUnmount() {
        this.props.transactionGetUserReset();
    }

    activeTransactionHandler = transaction => {
        return this.setState({
            transaction: transaction,
        });
    }

    render() {

        let invoiceContainer, transactionContainer;

        if (this.props.status === 200) {

            if (this.state.transaction !== null) {
                invoiceContainer = (
                    <div>
                        <Invoice transaction_id={this.state.transaction.id} />
                    </div>
                )
            }

            let transactions = this.props.transactions.map(transaction => (
                <tr key={transaction.id}>
                    <td>{moment(transaction.created_at.date).format('Do MMMM YYYY')}</td>
                    <td>{transaction.type}</td>
                    <td>{(transaction.status == 1) ? 'PAID' : 'UNPAID'}</td>
                    <td>{transaction.reference_number}</td>
                    <td>{transaction.amount.toLocaleString()}</td>
                    <td onClick={() => this.activeTransactionHandler(transaction)}><i className="fa fa-eye"></i></td>
                </tr>
            ));

            transactionContainer = (
                <React.Fragment>
                    <Card style={{width: '100%'}}>
                        <table className='table table-strip table-hover'>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Type</th>
                                    <th>Status</th>
                                    <th>Reference number</th>
                                    <th>Amount</th>
                                    <th>Access</th>
                                </tr>
                            </thead>
                            <tbody>{transactions}</tbody>
                        </table>
                    </Card>
                    {invoiceContainer}
                </React.Fragment>
            )
        }


        if (this.props.status === 404) {
            transactionContainer = (
                <Card style={{width: '100%'}}>
                    <div className="searchResult">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Type</th>
                                    <th>Status</th>
                                    <th>Reference number</th>
                                    <th>Amount</th>
                                    <th>Access</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colSpan="6">
                                        <div className="notFoundTransaction">
                                            <div>User Transaction not found</div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Card>
            )
        }

        return (
            <DashboardLayout>
                <Loader>
                    <LayoutContentWrapper>
                        <LayoutContent>  
                            <div className="row">
                                <div className="col-md-6">
                                    <Breadcrumb links={[
                                        {
                                            url: '/dashboard/transaction',
                                            name: 'Transaction'
                                        },
                                    ]} />
                                </div>
                            </div><hr/>
                            <div className="row">
                                <div className="col-md-12">
                                    <Card style={{width: '100%'}}>
                                        <TransactionSearchForm
                                            onSubmit={this.handleSubmit}
                                            cancel={this.cancelHandler}
                                            submittingForm={this.state.submittingForm}
                                        />
                                    </Card><br/>
                                    {transactionContainer}
                                </div>
                            </div>
                        </LayoutContent>
                    </LayoutContentWrapper>
                </Loader>
            </DashboardLayout>
        );
    }
}

const mapStateToProps = state => ({
    transactions: state.TransactionReducer.transactions,
    status: state.TransactionReducer.get_transactions_status,
});

const mapDispatchToProps = dispatch => ({
    reset: payload => dispatch( reset(payload) ),
    getAllForUser: payload => dispatch(getAllForUser(payload)),
    transactionGetUserReset: () => dispatch(transactionGetUserReset())
});

export default connect(mapStateToProps, mapDispatchToProps)(Transaction);