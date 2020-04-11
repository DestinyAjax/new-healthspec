import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Card} from 'antd';
import ReactToPrint from 'react-to-print';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import LayoutContent from '@iso/components/utility/layoutContent';
import DashboardLayout from '../../containers/Dashboard/Dashboard';
import Loader from '../../ui/Loader/Loader.Component';
import MyInvoice from '../../ui/MyInvoice';

class MyTransaction extends Component {
    render() {

        return (
            <DashboardLayout>
                <Loader>
                    <LayoutContentWrapper>
                        <LayoutContent>
                            <div className="row">
                                <div className="col-md-12">
                                    <Card style={{width: '100%'}}>
                                        <div style={{marginBottom: '20px'}}>
					                        <MyInvoice 
                                                transaction_id={this.props.match.params.id} 
                                                ref={el => (this.componentRef = el)} />
				                        </div>
                                        <div>
                                            <ReactToPrint
                                                trigger={() => <div>Print this out!</div>}
                                                content={() => this.componentRef}
                                            />
                                        </div>
                                    </Card>
                                </div>
                            </div>
                        </LayoutContent>
                    </LayoutContentWrapper>
                </Loader>
            </DashboardLayout>
        );
    }
}

export default connect(null)(MyTransaction);