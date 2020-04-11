import React, { Component } from 'react';
import ReactToPrint from 'react-to-print';
import {Card} from 'antd';
import MyInvoice from '../../../ui/MyInvoice';
import Breadcrumb from '../../../ui/Breadcrumb';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import LayoutContent from '@iso/components/utility/layoutContent';
import DashboardLayout from '../../../containers/Dashboard/Dashboard';
import Loader from '../../../ui/Loader/Loader.Component';

class BeneficiaryAddCard extends Component {
    render() {
        return (
            <DashboardLayout>
                <Loader>
                    <LayoutContentWrapper>
                        <LayoutContent>
                            <div className="row">
                                <div className="col-md-6">
                                    <Breadcrumb links={[
                                        {url: '/dashboard/beneficiary_add',name: 'Add Beneficiary'} 
                                    ]} />
                                </div>
                            </div><hr/>
                            <div className="row">
                                <div className="col-md-12">
                                    <Card style={{width: '100%'}}>
                                        <MyInvoice 
                                            transaction_id={this.props.match.params.transaction_id} 
                                            ref={el => (this.componentRef = el)} />

                                        <div className="">
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

export default BeneficiaryAddCard;