import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import {Card} from 'antd';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import LayoutContent from '@iso/components/utility/layoutContent';
import DashboardLayout from '../../containers/Dashboard/Dashboard';
import Breadcrumb from "../../ui/Breadcrumb";
import Loader from '../../ui/Loader/Loader.Component';
import { getAllForUser } from '../../shared/actions/Transaction.action';
import MyInvoice from '../../ui/MyInvoice';

class BillingInformation extends Component {

    state = {
        transaction: null
    }

    componentDidMount() {
        if (this.props.match.params.user_id != undefined) {
            this.props.getAllForUser({
                field: 'id',
                value: this.props.match.params.user_id
            });
        } else {
            this.props.getAllForUser({
                field: 'id',
                value: this.props.user_id
            });
        }

        console.dir(this.props.user_id);
    }

    componentWillReceiveProps(nextProps) {
        // this.showNotificationFrom(nextProps);
    }

    activeTransactionHandler = transaction => {
        this.setState({
            transaction: transaction
        });
    }

    render() {
        let profileContainer, transactions, invoiceContainer;
        if (this.props.status === 200) {

            if (this.state.transaction !== null) {
                invoiceContainer = (
                    <Card style={{width: '100%'}}>
                        <MyInvoice transaction_id={this.state.transaction.id} />
                    </Card>
                );
            }

            transactions = this.props.transactions.map(transaction => (
                <tr key={transaction.id}>
                    <td>{moment(transaction.created_at.date).format('Do MMMM YYYY')}</td>
                    <td>{transaction.type}</td>
                    <td>{transaction.status}</td>
                    <td>{transaction.reference_number}</td>
                    <td>{transaction.amount.toLocaleString()}</td>
                    <td onClick={() => this.activeTransactionHandler(transaction)}><i className="fa fa-eye"></i></td>
                </tr>
            ));

            profileContainer = (
                <React.Fragment>
                    <div className="col-md-12">
                        <Card title="Transactions" style={{width: '100%',marginBottom: '30px'}}>
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
                                    {transactions}
                                </tbody>
                            </table>
                        </Card><br/>  
                        {invoiceContainer}       
                    </div>
                </React.Fragment>
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
                                {profileContainer}
                            </div>
                        </LayoutContent>
                    </LayoutContentWrapper>
                </Loader>
            </DashboardLayout>
        );
    }
}

const mapStateToProps = state => ({
    user_id: state.AuthReducer.id,
    role_user: state.ProfileReducer.profile,
    transactions: state.TransactionReducer.transactions,
    status: state.TransactionReducer.get_transactions_status,
});

const mapDispatchToProps = dispatch => ({
    getAllForUser: payload => dispatch(getAllForUser(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(BillingInformation);