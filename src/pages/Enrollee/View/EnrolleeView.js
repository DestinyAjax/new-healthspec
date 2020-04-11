import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from "classnames";
import {Card} from 'antd';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import LayoutContent from '@iso/components/utility/layoutContent';
import DashboardLayout from '../../../containers/Dashboard/Dashboard';
import Breadcrumb from "../../../ui/Breadcrumb";
import Datatable from '../../../ui/Datatable';
import Spinner from "../../../ui/Spinner";
import { getEnrollee, resetStoreEnrollee } from "../../../shared/actions/Enrollee.action";
import Loader from '../../../ui/Loader/Loader.Component';

class EnrolleeView extends Component {
    
    state = {
        tab: 1
    };

    componentDidMount() {
        this.props.getEnrollee(this.props.match.params.slug);
    }

    componentWillUnmount() {
        this.props.resetStoreEnrollee();
    }

    switchTab(tab) {
        this.setState({
            tab
        });
    }

    render() {

        const { enrollee, status } = this.props;
        const { tab } = this.state;

        let options = (
            <div className={classnames("p-3", "bg-light")}>
                <div style={{display: 'flex', width: 'inherit', height: 30}}>

                    <button type="button" style={{ borderRight: "none" }}
                        className={classnames("tabSingle", {active: tab === 1 }, "btn")}
                        onClick={this.switchTab.bind(this, 1)}
                        aria-label="Click Me!"
                        data-balloon-pos="up"
                    >
                        Dependants
                    </button>
                    <button type="button"  style={{ borderRight: "none" }}
                        className={classnames("tabSingle", {
                            active: tab === 2
                        }, "btn")}
                        onClick={this.switchTab.bind(this, 2)}
                        aria-label="Click Me!"
                        data-balloon-pos="up"
                    >
                        Transactions
                    </button>
                    <button type="button"
                        className={classnames("tabSingle", {
                            active: tab === 3
                        }, "btn")}
                        onClick={this.switchTab.bind(this, 3)}
                        aria-label="Click Me!"
                        data-balloon-pos="up"
                    >
                        Encounter
                    </button>
                    <button type="button"
                        className={classnames("tabSingle", {
                            active: tab === 4
                        }, "btn")}
                        onClick={() => this.props.history.push(`dependant_add_${this.props.enrollee.slug}`)}
                        aria-label="Click Me!"
                        data-balloon-pos="up"
                    >
                        Add Dependant
                    </button>
                    <button
                        type="button"
                        className={classnames("tabSingle", {
                            active: tab === 5
                        }, "btn")}
                        onClick={() => this.props.history.push(`beneficiary_edit_${this.props.enrollee.slug}`)}
                        aria-label="Click Me!"
                        data-balloon-pos="up"
                    >
                        Edit
                    </button>
                </div>

                <Card style={{width: '100%'}}>
                    {tab === 1 && (
                        <Datatable
                            columns={[
                                {
                                    key: "id",
                                    dataIndex: 'id',
                                    title: "ID",
                                    cell: "Default",
                                    searchable: false
                                },
                                {
                                    key: "first_name",
                                    title: "First name",
                                    dataIndex: 'first_name',
                                    cell: "Default",
                                    searchable: false
                                },
                                {
                                    key: "primary_phone_number",
                                    title: "Phone No.",
                                    cell: "Default",
                                    dataIndex: 'primary_phone_number',
                                    searchable: false
                                },
                            ]}
                            url={`beneficiary/details/${this.props.match.params.slug}?type=dependents`}
                            actions={[]}
                        />
                    )}
                    {tab === 2 && (
                        <Datatable
                            columns={[
                                {
                                    key: "id",
                                    title: "ID",
                                    cell: "Default",
                                    dataIndex: 'id',
                                    searchable: false
                                },
                                {
                                    key: "amount",
                                    title: "Amount",
                                    cell: "Default",
                                    dataIndex: 'amount',
                                    searchable: false
                                },
                                {
                                    key: "reference_number",
                                    title: "Reference No.",
                                    cell: "Default",
                                    dataIndex: 'reference_number',
                                    searchable: false
                                },
                                {
                                    key: "type",
                                    title: "Type",
                                    cell: "Default",
                                    searchable: false,
                                    dataIndex: 'type'
                                },
                                {
                                    key: "confirmed_date",
                                    title: "Date",
                                    cell: "Default",
                                    searchable: false,
                                    dataIndex: 'confirmed_date'
                                }
                            ]}
                            url={`beneficiary/details/${this.props.match.params.slug}?type=transactions`}
                            actions={[]}
                        />
                    )}
                    {tab === 3 && (
                        <Datatable
                            columns={[
                                {
                                    key: "id",
                                    title: "ID",
                                    cell: "Default",
                                    dataIndex: 'id',
                                    searchable: false
                                },
                                {
                                    key: "provider_name",
                                    title: "Provider",
                                    cell: "Default",
                                    dataIndex: 'provider_name',
                                    searchable: false
                                },
                                {
                                    key: "case",
                                    title: "Case",
                                    cell: "Default",
                                    dataIndex: 'case',
                                    searchable: false
                                },
                                {
                                    key: "status",
                                    title: "Status",
                                    cell: "Default",
                                    dataIndex: 'status',
                                    searchable: false
                                },
                            ]}
                            url={`beneficiary/details/${this.props.match.params.slug}?type=treatment_cases`}
                            actions={[]}
                        />
                    )}
                </Card>
            </div>
        );

        if ((enrollee !== null) && enrollee.is_dependant === 'Dependant') {
            options = (
                <div>
                    <div style={{display: 'flex', width: 'inherit', height: 30}}>
                        <button
                            type="button"
                            className={classnames("tabSingle", { active: tab === 1 })}
                            onClick={this.switchTab.bind(this, 1)}
                            aria-label="Click Me!"
                            data-balloon-pos="up"
                        >
                            Encounter
                        </button>
                        <button
                            type="button"
                            className={classnames("tabSingle", {active: tab === 2})}
                            onClick={""}
                            aria-label="Click Me!"
                            data-balloon-pos="up"
                        >
                            Edit
                        </button>
                    </div>

                    <Card style={{width: '100%'}}>
                        {tab === 1 && (
                            <Datatable
                                columns={[
                                    {
                                        key: "id",
                                        title: "ID",
                                        dataIndex: 'id',
                                        cell: "Default",
                                        searchable: false
                                    },
                                    {
                                        key: "provider_name",
                                        title: "Provider",
                                        dataIndex: 'provider_name',
                                        cell: "Default",
                                        searchable: false
                                    },
                                    {
                                        key: "case",
                                        title: "Case",
                                        cell: "Default",
                                        dataIndex: 'case',
                                        searchable: false
                                    },
                                    {
                                        key: "status",
                                        title: "Status",
                                        cell: "Default",
                                        dataIndex: 'status',
                                        searchable: false
                                    },
                                ]}
                                url={`beneficiary/details/${this.props.match.params.slug}?type=treatment_cases`}
                                actions={[
                                    {
                                        key: "slug",
                                        type: "view",
                                        title: "Encounter",
                                        url: "/dashboard/treatmentcase_"
                                    }
                                ]}
                            />
                        )}
                    </Card>
                </div>
            );
        }

        return (
            <DashboardLayout>
                <Loader>
                    <LayoutContentWrapper>
                        <LayoutContent>  
                            {status === 200 ? (
                                <React.Fragment>
                                <div className="row" style={{marginBottom: '10px'}}>
                                    <div className="col-md-6">
                                        <h4>All Enrollees</h4>
                                    </div>
                                    <div className="col-md-6 text-right">
                                        <Breadcrumb
                                            links={[
                                                {
                                                    url: "/dashboard/beneficiary_all",
                                                    name: "Beneficiaries"
                                                },
                                                {
                                                    url: `dashboard/enrollee_view_${this.props.match.params.slug}`,
                                                    name: `${enrollee.name}`
                                                },
                                            ]}
                                        />
                                    </div> 
                                </div>
                            
                                <div className="row">
                                    <div className="col-md-12">
                                        {status === 200 ? (
                                            <React.Fragment>
                                                <Card style={{width: '100%'}}>
                                                    <div style={{marginBottom: '30px'}}>
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                Enrollee ID: <strong> {enrollee.enrollee_id} </strong>
                                                            </div>
                                                            <div className="col-md-6 text-right">
                                                                <span><strong>Status:</strong> {enrollee.is_active}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                            
                                                
                                                    <div className="row">
                                                        <div className="col-md-3 col-sm-12 col-xs-12">
                                                            <img alt={enrollee.name} className="rounded img-thumbnail" src={enrollee.picture} />
                                                        </div>

                                                        <div className="col-md-5 col-sm-12 col-xs-12">
                                                            <h6 className="mb-2">Personal Details:</h6>
                                                            <table className="table table-striped">
                                                                <tr><td><strong>{enrollee.title}. {enrollee.surname} {enrollee.first_name} {enrollee.other_name}</strong></td></tr>
                                                                <tr><td>{enrollee.age} year(s) old,  ({enrollee.gender})</td></tr>
                                                                <tr><td>{enrollee.address_of_residence}, {enrollee.city_of_residence}</td></tr>
                                                                <tr><td>Group: {enrollee.company_name}</td></tr>
                                                                <tr><td>Email: {enrollee.email}</td></tr>
                                                                <tr><td>Phone: {enrollee.primary_phone_number}</td></tr>
                                                            </table>
                                                        </div>

                                                        <div className="col-md-4 col-sm-12 col-xs-12">
                                                            <h6 className="mb-2">Policy:</h6>
                                                            <table className="table table-striped">
                                                                <tr><td><strong>{enrollee.policy_name} ({enrollee.is_dependant})</strong></td></tr>
                                                                <tr><td>Role: {enrollee.role_name}</td></tr>
                                                                <tr><td>{enrollee.provider_name} ({enrollee.provider_code})</td></tr>
                                                                <tr><td>Dependant Enrolled: {enrollee.no_of_dependent}</td></tr>
                                                                <tr><td>Dependant Allowed: {enrollee.maximum_no_of_beneficiary_dependant}</td></tr>
                                                                <tr><td>Policy Duration: Active for {enrollee.policy_duration} months</td></tr>
                                                                <tr><td>Expires On: {enrollee.expires_at}</td></tr>
                                                            </table>
                                                        </div>
                                                    </div>
                                                    <div style={{marginTop: '20px'}}>
                                                        {options}
                                                    </div>
                                                </Card>
                                            </React.Fragment>
                                        ): (<Spinner />)}
                                    </div>
                                </div>
                                </React.Fragment>
                            ) : (<Spinner/>)}
                        </LayoutContent>
                    </LayoutContentWrapper>
                </Loader>
            </DashboardLayout>
        );
    }
}

const mapStateToProps = state => ({
    enrollee: state.EnrolleeReducer.enrollee,
    status: state.EnrolleeReducer.get_enrollee_status
});

const mapDispatchToProps = dispatch => ({
    getEnrollee: payload => dispatch(getEnrollee(payload)),
    resetStoreEnrollee: () => dispatch(resetStoreEnrollee())
});

export default connect(mapStateToProps, mapDispatchToProps)(EnrolleeView);