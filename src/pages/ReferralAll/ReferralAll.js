import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Card} from 'antd';
import { Link } from 'react-router-dom';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import LayoutContent from '@iso/components/utility/layoutContent';
import DashboardLayout from '../../containers/Dashboard/Dashboard';
import Breadcrumb from "../../ui/Breadcrumb";
import Datatable from '../../ui/Datatable';
import Loader from '../../ui/Loader/Loader.Component';

class ReferralAll extends Component {

    state = {
        query_string: null,
    };

    componentDidMount(){
        this.submitFilter()
    }

    submitFilter = type => {
        if(this.props.match.params.claims){
            this.query_string = `claim_type=${this.props.match.params.claims}`;
        }else if(this.props.match.params.type){
            this.query_string = `type=${this.props.match.params.type.toUpperCase()}`;
        }else{
            this.query_string = "type=PREAUTH";
        }
        this.setState({
            query_string: this.query_string,
        });
    }

    render() {

        let actions = [];
        let page_name, actionButtons, columns;
        const { active } = this.props;
        if(this.props.match.params.claims) {
            let type = this.props.match.params.claims;
            page_name = (
                <h4>Claim Items :: {type.toUpperCase()})</h4>
            )
            if(this.props.match.params.claims){
                let links;
                if(type === "claim") {
                    links =(
                        <div className="list_row">
                            <Link style={{marginRight: '10px'}} className="pull-right btn btn-sm btn-danger" to="/dashboard/claim_services/claim">All Approved Requests</Link>
                            <Link style={{marginRight: '10px'}} className="pull-right btn btn-sm btn-success" to="/dashboard/claim_services/claimed">Submitted Claims</Link>
                            <Link className="btn btn-sm btn-success pull-right" to="/dashboard/claim_services/paid">Paid Claims</Link>
                        </div>
                    )
                }
                if(type === "claimed") {
                    links =(
                        <div className="list_row">
                            <Link style={{marginRight: '10px'}} to="/dashboard/claim_services/claim" className="pull-right btn btn-sm btn-success">All Approved Requests</Link>
                            <Link style={{marginRight: '10px'}} to="/dashboard/claim_services/claimed" className="pull-right btn btn-sm btn-danger">Submitted Claims</Link>
                            <Link to="/dashboard/claim_services/paid" className="btn btn-sm btn-success pull-right">Paid Claims</Link>
                        </div>
                    )
                }
                if(type === "paid") {
                    links =(
                        <div className="list_row">
                            <Link style={{marginRight: '10px'}} className="btn btn-sm btn-success pull-right" to="/dashboard/claim_services/claim">All Approved Requests</Link>
                            <Link style={{marginRight: '10px'}} className="btn btn-sm btn-success pull-right" to="/dashboard/claim_services/claimed">Submitted Claims</Link>
                            <Link className="btn btn-sm btn-danger pull-right" to="/claim_services/paid">Paid Claims</Link>
                        </div>
                    )
                }
                actionButtons = (
                    <div className="pull-right">{links}</div>
                );

                columns = [
                    {
                        cell: 'Default',
                        dataIndex: 'provider_name',
                        searchable: true,
                        key: 'provider_name',
                        title: 'Hospital Name',
                        sorter: (a,b) => a.provider_name.length - b.provider_name.length
                    },
                    {
                        cell: 'Default',
                        searchable: true,
                        key: 'beneficiary_first_name',
                        dataIndex: 'beneficiary_first_name',
                        title: 'Enrollee First Name',
                        search_key: 'user.first_name',
                        sorter: (a,b) => a.beneficiary_first_name.length - b.beneficiary_first_name.length
                    },
                    {
                        cell: 'Default',
                        searchable: true,
                        dataIndex: 'beneficiary_surname',
                        key: 'beneficiary_surname',
                        title: 'Enrollee Last Name',
                        search_key: 'user.first_name',
                        sorter: (a,b) => a.beneficiary_surname.length - b.beneficiary_surname.length
                    },
                    {
                        cell: 'Default',
                        searchable: false,
                        key: 'services_count',
                        dataIndex: 'services_count',
                        title: 'Service Quantity',
                    },
                    {
                        cell: 'Default',
                        searchable: false,
                        key: 'visit_code',
                        dataIndex: 'visit_code',
                        title: 'Visit Code',
                    },
                    {
                        cell: 'Default',
                        searchable: false,
                        key: 'visit_date',
                        title: 'Visit Date',
                        dataIndex: 'visit_date'
                    },
                    {
                        key: 'status',
                        title: 'Status',
                        cell: 'Default',
                        searchable: false,
                        dataIndex: 'status'
                    },
                ]
            }
        }
        if(this.props.match.params.type) {
            let type = this.props.match.params.type;
            page_name = (
                <h4>PA Code :: {type.toUpperCase() === 'PREAUTH' ? 'Treated' : 'Referral'}</h4>
            );


            if(this.props.match.params.type){
                let links;
                if(type === "preauth") {
                    links =(
                        <React.Fragment>
                            <Link style={{marginRight: '10px'}} className="btn btn-sm btn-danger pull-right" to="/dashboard/services/preauth">PA Requests</Link>
                            <Link className="btn btn-sm btn-success pull-right" to="/dashboard/services/refer">Referral Requests</Link>
                        </React.Fragment>
                    )

                    columns = [
                        {
                            cell: 'Default',
                            searchable: true,
                            dataIndex: 'provider_name',
                            key: 'provider_name',
                            title: 'Hospital Name',
                            sorter: (a,b) => a.provider_name.length - b.provider_name.length
                        },
                        {
                            cell: 'Default',
                            dataIndex: 'beneficiary_first_name',
                            searchable: true,
                            key: 'beneficiary_first_name',
                            title: 'First Name',
                            sorter: (a,b) => a.beneficiary_first_name.length - b.beneficiary_first_name.length
                        },
                        {
                            cell: 'Default',
                            searchable: true,
                            dataIndex: 'beneficiary_surname',
                            key: 'beneficiary_surname',
                            title: 'Last Name',
                            sorter: (a,b) => a.beneficiary_surname.length - b.beneficiary_surname.length
                        },
                        {
                            cell: 'Default',
                            searchable: true,
                            key: 'service_name',
                            title: 'Service Name',
                            dataIndex: 'service_name'
                        },
                        {
                            cell: 'Default',
                            searchable: false,
                            key: 'services_count',
                            dataIndex: 'services_count',
                            title: 'Service Qty',
                        },
                        {
                            cell: 'Default',
                            searchable: false,
                            key: 'authorization_code',
                            title: 'Authorization Code',
                            dataIndex: 'authorization_code'
                        },
                        {
                            cell: 'Default',
                            searchable: false,
                            key: 'visit_code',
                            title: 'Visit Code',
                            dataIndex: 'visit_code'
                        },
                        {
                            cell: 'Default',
                            searchable: false,
                            key: 'visit_date',
                            title: 'Date',
                            dataIndex: 'visit_date'
                        },
                        {
                            key: 'status',
                            title: 'Status',
                            cell: 'Default',
                            searchable: false,
                            dataIndex: 'status'
                        },
                    ]
                }

                if(type === "refer") {
                    links = (
                        <React.Fragment>
                            <Link style={{marginRight: '10px'}} className="btn btn-sm btn-success actionpull-right" to="/dashboard/services/preauth">PA Requests</Link>
                            <Link className="btn btn-sm btn-danger pull-right" to="/dashboard/services/refer">Referral Requests</Link>  
                        </React.Fragment>    
                    );

                    columns = [
                        {
                            cell: 'Default',
                            searchable: true,
                            key: 'provider_name',
                            dataIndex: 'provider_name',
                            title: 'Hospital Name',
                            sorter: (a,b) => a.provider_name.length - b.provider_name.length
                        },
                        {
                            cell: 'Default',
                            searchable: true,
                            dataIndex: 'beneficiary_first_name',
                            key: 'beneficiary_first_name',
                            title: 'First Name',
                            sorter: (a,b) => a.beneficiary_first_name.length - b.beneficiary_first_name.length
                        },
                        {
                            cell: 'Default',
                            searchable: true,
                            dataIndex: 'beneficiary_surname',
                            key: 'beneficiary_surname',
                            title: 'Last Name',
                            sorter: (a,b) => a.beneficiary_surname.length - b.beneficiary_surname.length
                        },
                        {
                            cell: 'Default',
                            searchable: true,
                            key: 'service_name',
                            dataIndex: 'service_name',
                            title: 'Service Name',
                            sorter: (a,b) => a.service_name.length - b.service_name.length
                        },
                        {
                            cell: 'Default',
                            searchable: false,
                            key: 'services_count',
                            dataIndex: 'services_count',
                            title: 'Service Qty',
                        },
                        {
                            cell: 'Default',
                            searchable: false,
                            key: 'referral_code',
                            dataIndex: 'referral_code',
                            title: 'Referral Code',
                        },
                        {
                            cell: 'Default',
                            searchable: false,
                            key: 'visit_code',
                            dataIndex: 'visit_code',
                            title: 'Visit Code',
                        },
                        {
                            cell: 'Default',
                            searchable: false,
                            key: 'visit_date',
                            dataIndex: 'visit_date',
                            title: 'Date',
                        },
                        {
                            key: 'status',
                            title: 'Status',
                            cell: 'Default',
                            dataIndex: 'status',
                            searchable: false,
                        },
                    ]
                }
                actionButtons = (
                    <div>{links}</div>
                );
            }
        }

        let DatatableList;
        if (active.role.name === "PROVIDER_ADMIN" || active.role.name === "PROVIDER_MODERATOR" ||
            active.role.name === "AGENT_ADMIN" || active.role.name === "AGENT_MODERATOR" ||
            active.role.name === "HMO_ADMIN" || active.role.name === "HMO_MODERATOR") {
            let url;
            if(this.props.match.params.claims) url = "/dashboard/visitaion_";
            else url = "/dashboard/visitaion_"
            actions = [
                {
                    key: "treatment_id",
                    type: "view",
                    title: "View",
                    url: url
                }
            ];
        }
        if(this.state.query_string){
            let query = this.state.query_string;
            DatatableList = (
                <Datatable
                    hideSearch
                    columns={columns}
                    url={`treatment-service/index/${active.id}?${query}`}
                    actions={actions}
                />
            )
        }

        let breadcrumb_url = `/dashboard/services/${this.props.match.params.type}`;
        let breadcrumb_name = `Encounter Services (${this.props.match.params.type === 'preauth' ? 'Treated' : 'Referred'})`;


        return (
            <DashboardLayout>
                <Loader>
                    <LayoutContentWrapper>
                        <LayoutContent>  
                            <div className="row">
                                <div className="col-md-6">
                                    <Breadcrumb links={[
                                        {
                                            url: '/dashboard/insurance',
                                            name: 'Insurance'
                                        },
                                        {
                                            url: `${breadcrumb_url}`,
                                            name: `${breadcrumb_name}`
                                        },
                                    ]} />
                                </div>
                            </div><hr/>
                            <div className="row">
                                <div className="col-md-12">
                                    <Card style={{width: '100%'}}>
                                        <div className="row" style={{marginBottom: '30px'}}>
                                            <div className="col-md-6">{ page_name }</div>
                                            <div className="col-md-6 text-right"> { actionButtons }</div>
                                        </div>
                                        <div>
                                            {DatatableList}
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

const mapStateToProps = state => ({
    active: state.ChoseRoleReducer.role
});

export default connect(mapStateToProps, null)(ReferralAll);