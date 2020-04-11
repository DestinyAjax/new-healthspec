import React, { Component } from 'react';
import {connect} from 'react-redux';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import LayoutContent from '@iso/components/utility/layoutContent';
import DashboardLayout from '../../../containers/Dashboard/Dashboard';
import Status from '../../../ui/Status';
import EmptyState from '../../../ui/EmptyState';
import Breadcrumb from '../../../ui/Breadcrumb';
import Loader from '../../../ui/Loader/Loader.Component';
import { getCompanyBeneficiary } from '../../../shared/actions/OrganizationProfile.action'; 

class CompanyBeneficiary extends Component {

    state = {
        meta: {},
        current_page: 1,
    }

    componentDidMount() {
        this.props.getCompanyBeneficiary({
            slug: this.props.match.params.slug,
            page_number: 1
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            meta: nextProps.meta,
            current_page: nextProps.meta.current_page
        });
    }

    getNewPlansWith = page_number => {
        this.props.getCompanyBeneficiary({
            slug: this.props.match.params.slug,
            page_number: page_number
        });
    }
    render() {

        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(this.state.meta.total / this.state.meta.per_page); i++) {
            pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
            let classes = this.state.current_page === number ? 'active' : '';

            if (number === 1 || number === this.state.meta.total || (number >= this.state.current_page - 2 && number <= this.state.current_page + 2)) {
                return (
                    <span key={number} className={classes} onClick={() => this.getNewPlansWith(number)}>{number}</span>
                );
            }
        });

        return (
            <DashboardLayout>
                <Loader>
                    <LayoutContentWrapper>
                        <LayoutContent>
                            <div className="row">
                                <div className="col-md-6">
                                    <h4>All Beneficiaries</h4>
                                </div>
                                <div className="col-md-6 text-right">
                                    <Breadcrumb links={[
                                        {
                                            url: '/dashboard/company_all',
                                            name: 'All Companies'
                                        },
                                        {
                                            url: `/dashboard/company_all-beneficiary_${this.props.match.params.slug}`,
                                            name: 'Enrollees'
                                        },
                                    ]} />
                                </div>
                            </div><hr/>
                            <div className="row">
                                <div className="col-md-12">
                                    {this.props.status === 200 && !this.props.company_beneficiaries.length && (
                                        <div className="text-center">
                                            <EmptyState message="No beneficiary created yet" />
                                        </div>
                                    )}
                                    {this.props.status === 200 && this.props.company_beneficiaries.length && (
                                        <div className="card card-body table-responsive">
                                            <table className={"table table-striped"}>
                                                <thead>
                                                    <tr>
                                                        <th>Name</th>
                                                        <th>Provider</th>
                                                        <th>Policy</th>
                                                        <th>Status</th>
                                                        <th>Dependants</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.props.company_beneficiaries.map(company_beneficiary => (
                                                            <tr key={company_beneficiary.beneficiary.id}>
                                                                <td>
                                                                    <div className="name">
                                                                        <div className="tImage"><img src={company_beneficiary.role_user.profile.picture} /></div>
                                                                        <div className="tTitle">
                                                                            <div className="head">{company_beneficiary.beneficiary.first_name} {company_beneficiary.beneficiary.middle_name} {company_beneficiary.beneficiary.last_name}</div>
                                                                            <div className="sub">{company_beneficiary.beneficiary.enrollee_id}</div>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="name">
                                                                        <div className="tImage"><img src={company_beneficiary.role_user.organization_profile.logo} /></div>
                                                                        <div className="tTitle">
                                                                            <div className="head">{company_beneficiary.role_user.organization_profile.name}</div>
                                                                            <div className="sub">{company_beneficiary.role_user.organization_profile.code}</div>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>{company_beneficiary.policy.name}</td>
                                                                
                                                                <td><Status status={company_beneficiary.role_user.is_active} /></td>
                                                                <td>{company_beneficiary.role_user.beneficiary_dependents.length}</td>
                                                                <td> <span><i className="fa fa-trash"></i></span></td>
                                                            </tr>
                                                        ))
                                                    }

                                                    <div className="pagination">
                                                        <span onClick={() => this.getNewPlansWith(1)}>&laquo;</span>
                                                        {renderPageNumbers}
                                                        <span onClick={() => this.getNewPlansWith(this.props.meta.last_page)}>&raquo;</span>
                                                    </div>
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
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
    meta: state.OrganizationProfileReducer.company_my_beneficiary_meta,
    status: state.OrganizationProfileReducer.get_company_beneficiary_status,
    company_beneficiaries: state.OrganizationProfileReducer.company_beneficiaries,
});

const mapDispatchToProps = dispatch => ({
    getCompanyBeneficiary: payload => dispatch(getCompanyBeneficiary(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CompanyBeneficiary);