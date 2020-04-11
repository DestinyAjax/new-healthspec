import React, { Component } from 'react';
import classnames from "classnames";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import LayoutContent from '@iso/components/utility/layoutContent';
import DashboardLayout from '../../../containers/Dashboard/Dashboard';
import Spinner from "../../../ui/Spinner";
import Breadcrumb from "../../../ui/Breadcrumb";
import Datatable from '../../../ui/Datatable';
import Loader from '../../../ui/Loader/Loader.Component';
import { getPlan, resetGetPlan } from "../../../shared/actions/Plan.action";

class PlanView extends Component {

    state = {
        tab: 1
    };

    componentDidMount() {
        this.props.getPlan(this.props.match.params.slug);
    }

    componentWillUnmount() {
        this.props.resetGetPlan();
    }

    render() {
        const { status, plan } = this.props;

        return (
            <DashboardLayout>
                <Loader>
                    <LayoutContentWrapper>
                        <LayoutContent>  
                            <div className="row">
                                <div className="col-md-6">
                                    <h4>Plan Details</h4>
                                </div>
                            </div><hr/>
                            <div className="row">
                            {status === 200 ? (
                                <div className="col-md-12">
                                    <div className="card">
                                        <div className="card-header">
                                            <h4>{plan.name}</h4>
                                            <div style={{ display: "flex", marginTop: "20px" }}>
                                                <h5 style={{ marginRight: "20px" }}>Code: {plan.code}</h5>
                                                <h5>Status: {plan.is_active}</h5>
                                            </div>
                                            <Link
                                                to={`/dashboard/plan_edit_${this.props.match.params.slug}`}
                                                className=""
                                                style={{ marginRight: "10px" }}
                                            >
                                                Edit
                                            </Link>
                                        </div>
                                        <div className="card-body">
                                            <Datatable
                                                columns={[
                                                    {
                                                        key: "id",
                                                        title: "ID",
                                                        cell: "Default",
                                                        searchable: false
                                                    },
                                                    {
                                                        cell: "Default",
                                                        searchable: true,
                                                        key: "local_government",
                                                        title: "LGA",
                                                        search_key: "local_government"
                                                    },
                                                    {
                                                        cell: "Default",
                                                        searchable: false,
                                                        key: "owner_email",
                                                        title: "Email"
                                                    },
                                                    {
                                                        cell: "Default",
                                                        searchable: false,
                                                        key: "owner_phone_number",
                                                        title: "Phone"
                                                    },
                                                    {
                                                        key: "is_active",
                                                        title: "Status",
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
                                                        url: "organization_profile/delete/"
                                                    },
                                                    {
                                                        key: "slug",
                                                        type: "view",
                                                        title: "VIEW ENROLLEES",
                                                        url: "/provider_all-beneficiary_"
                                                    }
                                                ]}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ) : (<Spinner />)}
                            </div>
                        </LayoutContent>
                    </LayoutContentWrapper>
                </Loader>
            </DashboardLayout>
        );
    }
}

const mapStateToProps = state => ({
    plan: state.PlanReducer.plan,
    status: state.PlanReducer.get_plan_status
});

const mapDispatchToProps = dispatch => ({
    getPlan: payload => dispatch(getPlan(payload)),
    resetGetPlan: payload => dispatch(resetGetPlan(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(PlanView);