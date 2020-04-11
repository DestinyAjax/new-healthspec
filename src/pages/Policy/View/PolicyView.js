import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import classnames from "classnames";
import {Card} from 'antd';
import Spinner from "../../../ui/Spinner";
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import LayoutContent from '@iso/components/utility/layoutContent';
import DashboardLayout from '../../../containers/Dashboard/Dashboard';
import Breadcrumb from "../../../ui/Breadcrumb";
import Datatable from '../../../ui/Datatable';
import Loader from '../../../ui/Loader/Loader.Component';
import { getPolicy, getPolicyReset } from "../../../shared/actions/Policy.action";

class PolicyView extends Component {
    
    state = {
        tab: 1
    };

    componentDidMount() {
        this.props.getPolicy(this.props.match.params.slug);
    }

    componentWillUnmount() {
        this.props.getPolicyReset();
    }

    render() {
        const { tab } = this.state;
        const { status, policy } = this.props;

        return (
            <DashboardLayout>
                <Loader>
                    <LayoutContentWrapper>
                        <LayoutContent>  
                            <div className="row">
                                <div className="col-md-6">
                                    <h4>All Banks</h4>
                                </div>
                                <div className="col-md-6 text-right">
                                    <Link className="" to="/dashboard/bank_add">
                                        <button className="btn btn-sm btn-success" type="button">Create Bank</button>
                                    </Link>
                                </div> 
                            </div><hr/>
                            <div className="row">
                                <div className="col-md-12">
                                {status === 200 ? (
                                    <Card style={{width: '100%'}}>
                                        <div style={{marginBottom: '20px'}}>
                                            <div className="providerBasic">
                                                <h3>{policy.name}</h3>
                                                <h5>Price: ₦{policy.price}</h5>
                                            </div>
                                            <div className="providerContent">
                                                <div className="tabs">
                                                    <button
                                                        type="button"
                                                        className={classnames("tabSingle", {
                                                            active: tab === 1
                                                        })}
                                                        aria-label="Click Me!"
                                                        data-balloon-pos="up"
                                                    >
                                                        Enrollees
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        
                                            <Datatable
                                                columns={[
                                                    {
                                                        key: "id",
                                                        title: "ID",
                                                        dataIndex: 'id',
                                                        cell: "Default",
                                                        searchable: false
                                                    }
                                                ]}
                                                url={"organization_profile/index/2"}
                                                actions={[
                                                    {
                                                        key: "slug",
                                                        type: "delete",
                                                        title: "Delete",
                                                        url: "dashboard/organization_profile/delete/"
                                                    },
                                                    {
                                                        key: "slug",
                                                        type: "view",
                                                        title: "VIEW ENROLLEES",
                                                        url: "/dashboard/provider_all-beneficiary_"
                                                    }
                                                ]}
                                            />
                                    </Card>
                                ) : (<Spinner />)}
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
    policy: state.PolicyReducer.policy,
    status: state.PolicyReducer.get_policy_status
});

const mapDispatchToProps = dispatch => ({
    getPolicy: payload => dispatch(getPolicy(payload)),
    getPolicyReset: payload => dispatch(getPolicyReset(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(PolicyView);