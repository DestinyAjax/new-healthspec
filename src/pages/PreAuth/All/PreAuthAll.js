import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Card} from 'antd';
import { Link } from 'react-router-dom';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import LayoutContent from '@iso/components/utility/layoutContent';
import DashboardLayout from '../../../containers/Dashboard/Dashboard';
import Datatable from '../../../ui/Datatable';
import Loader from '../../../ui/Loader/Loader.Component';
import {FaPlus} from 'react-icons/fa';

class PreAuthAll extends Component {

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
        let page_name, actionButtons;
        const { active } = this.props;
        if(this.props.match.params.claims) {
            let type = this.props.match.params.claims;
            page_name = (
                <div className={'h3'} >Manage Claim</div>
            )
            if(this.props.match.params.claims){
                let links;
                if(type === "claim") {
                    links =(
                        <div className='list_row'>
                            <Link className={`btn btn-sm btn-warning`} to="/dashboard/claim_all/claim">Pending</Link>
                            <Link className={`btn btn-sm btn-success`} to="/dashboard/claim_all/claimed">Vetting</Link>
                            <Link className={`btn btn-sm btn-primary`} to="/dashboard/claim_all/paid">Claimable</Link>
                        </div>
                    )
                }
                if(type === "claimed") {
                    links =(
                        <div className='list_row'>
                            <Link className={`btn btn-sm btn-warning`} to="/claim_all/claim">Pending</Link>
                            <Link className={`btn btn-sm btn-success`} to="/claim_all/claimed">Vetting</Link>
                            <Link className={`btn btn-sm btn-primary`} to="/claim_all/paid">Claimable</Link>
                        </div>
                    )
                }
                if(type === "paid") {
                    links =(
                        <div className='list_row'>
                            <Link className={`btn btn-sm btn-warning`} to="/claim_all/claim">Pending</Link>
                            <Link className={`btn btn-sm btn-success`} to="/claim_all/claimed">Vetting</Link>
                            <Link className={`btn btn-sm btn-primary`} to="/claim_all/paid">Claimable</Link>
                        </div>
                    )
                }
                actionButtons = (
                    <div class="pull pull-right">
                        <div className={`list_row`}>
                            {links}
                        </div>
                    </div>
                )
            }
        }
        if(this.props.match.params.type) {
            let type = this.props.match.params.type;
            page_name = (
                <div className={'h3'} >Encounter </div>
            )

            if(this.props.match.params.type){
                let links;
                if(type === "preauth") {
                    links =(
                        <div className='list_row'>
                            <Link style={{marginRight: '10px'}} className={`btn btn-sm btn-danger`} to="/dashboard/visitation/preauth">Registered Patients</Link>
                            <Link className={`btn btn-sm btn-success`} to="/dashboard/visitation/refer">Referred Patients</Link>
                        </div>
                    )
                }
                if(type === "refer") {
                    links =(
                        <div className='list_row'>
                            <Link style={{marginRight: '10px'}} className={`btn btn-sm btn-danger`} to="/dashboard/visitation/preauth">Registered Patients</Link>
                            <Link className={`btn btn-sm btn-success`} to="/dashboard/visitation/refer">Referred Patients</Link>
                        </div>
                    )
                }
                actionButtons = (
                    <div class="pull pull-right">
                        <div className={`list_row`}>
                            {links}
                        </div>
                    </div>
                )
            }
        }
        let DatatableList;
        if (active.role.name === "PROVIDER_ADMIN" || active.role.name === "PROVIDER_MODERATOR" ||
            active.role.name === "AGENT_ADMIN" || active.role.name === "AGENT_MODERATOR" ||
            active.role.name === "HMO_ADMIN" || active.role.name === "HMO_MODERATOR") {
            let url;let type = this.props.match.params.type;
            if(this.props.match.params.claims) url = "/dashboard/visitaion_";
            else url = "/dashboard/visitaion_"
            if(type === "refer" && ((active.role.name === "PROVIDER_ADMIN") || (active.role.name === "PROVIDER_MODERATOR"))){
                actions = [
                    {
                        key: "id",
                        type: "view",
                        title: "View Encounter",
                        url: url
                    },
                    // {
                    //     key: "id",
                    //     type: "edit",
                    //     title: "Edit Encounter",
                    //     url: '/visitation_edit_'
                    // }
                ];
            }else{
                actions = [
                    {
                        key: "id",
                        type: "view",
                        title: "View Encounter",
                        url: url
                    }
                ];
            }

        }
        if(this.state.query_string){
            let query = this.state.query_string;
            let type = this.props.match.params.type;
            if(type === "refer"){
                DatatableList = (
                    <Datatable
                        columns={[
                            {
                                cell: 'Default',
                                searchable: true,
                                dataIndex: 'parent_provider_name',
                                key: 'parent_provider_name',
                                title: 'Referred From Hospital',
                            },
                            {
                                cell: 'Default',
                                searchable: true,
                                key: 'provider_name',
                                dataIndex: 'provider_name',
                                title: 'Referred To Hospital',
                                sorter: (a,b) => a.provider_name.length - b.provider_name.length,
                            },
                            {
                                cell: 'Default',
                                dataIndex: 'beneficiary_enrollee_id',
                                searchable: true,
                                key: 'beneficiary_enrollee_id',
                                title: 'Enrollee Id',
                                search_key: 'user.enrollee_id',
                            },
                            {
                                cell: 'Default',
                                dataIndex: 'beneficiary_first_name',
                                searchable: true,
                                key: 'beneficiary_first_name',
                                title: 'First Name',
                                search_key: 'user.first_name',
                                sorter: (a,b) => a.beneficiary_first_name.length - b.beneficiary_first_name.length,
                            },
                            {
                                cell: 'Default',
                                searchable: true,
                                dataIndex: 'beneficiary_surname',
                                key: 'beneficiary_surname',
                                title: 'Last Name',
                                search_key: 'user.first_name',
                                sorter: (a,b) => a.beneficiary_surname.length - b.beneficiary_surname.length,
                            },
                            {
                                cell: 'Default',
                                searchable: false,
                                dataIndex: 'services_count',
                                key: 'services_count',
                                title: 'Service QTY',
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
                                dataIndex: 'status',
                                cell: 'Default',
                                searchable: false,
                            },
                        ]}
                        url={`treatment/index/${active.id}?${query}`}
                        actions={actions}
                    />
                )
            }else{
                DatatableList = (
                    <Datatable
                        columns={[
                            {
                                cell: 'Default',
                                searchable: false,
                                key: 'visit_code',
                                dataIndex: 'visit_code',
                                title: 'Visit ID',
                            },
                            {
                                cell: 'Default',
                                searchable: true,
                                key: 'beneficiary_enrollee_id',
                                title: 'Enrollee Id',
                                dataIndex: 'beneficiary_enrollee_id',
                                search_key: 'user.enrollee_id',
                            },
                            {
                                cell: 'Default',
                                searchable: true,
                                key: 'provider_name',
                                dataIndex: 'provider_name',
                                title: 'Hospital Name',
                                sorter: (a,b) => a.provider_name.length - b.provider_name.length,
                            },

                            {
                                cell: 'Default',
                                searchable: true,
                                key: 'beneficiary_first_name',
                                title: 'First Name',
                                dataIndex: 'beneficiary_first_name',
                                search_key: 'user.first_name',
                                sorter: (a,b) => a.beneficiary_first_name.length - b.beneficiary_first_name.length,                          
                            },
                            {
                                cell: 'Default',
                                searchable: true,
                                dataIndex: 'beneficiary_surname',
                                key: 'beneficiary_surname',
                                title: 'Last Name',
                                search_key: 'user.first_name',
                                sorter: (a,b) => a.beneficiary_surname.length - b.beneficiary_surname.length,
                            },
                            {
                                cell: 'Default',
                                searchable: false,
                                key: 'services_count',
                                dataIndex: 'services_count',
                                title: 'Service QTY',
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
                                dataIndex: 'status',
                                cell: 'Default',
                                searchable: false,
                            },
                        ]}
                        url={`treatment/index/${active.id}?${query}`}
                        actions={actions}
                    />
                )
            }
        }
        // Referred Patients
        // let breadcrumb = (
            
        //     <Breadcrumb links={[
        //         {
        //             url: '/insurance',
        //             name: 'Insurance'
        //         },
               
        //     ]} />
        // )

        if (!this.props.match.params.claims) {
            // breadcrumb = (
            //     <Breadcrumb links={[
            //         {
            //             url: '/insurance',
            //             name: 'Insurance'
            //         },
            //         {
            //             url: '/visitation/preauth',
            //             name: `Encounter (${this.props.match.params.type.toUpperCase() === 'PREAUTH' ? 'Registered Patients' : 'Referred Patients'})`
            //         },
            //     ]} />
            // )
        }

        return (
            <DashboardLayout>
                <Loader>
                    <LayoutContentWrapper>
                        <LayoutContent>
                            <Card title="" style={{width: '100%'}}>
                                <div style={{marginBottom: '20px'}}>
                                    {actionButtons}
                                    {page_name}
                                </div>
                                {DatatableList}
                            </Card>
                        </LayoutContent>
                    </LayoutContentWrapper>
                </Loader>
            </DashboardLayout>
        )
    }
}

const mapStateToProps = state => ({
    active: state.ChoseRoleReducer.role
});

export default connect(mapStateToProps, null)(PreAuthAll);