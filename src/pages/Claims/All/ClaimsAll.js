import React, { Component } from 'react';
import swal from 'sweetalert';
import {connect} from 'react-redux';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import LayoutContent from '@iso/components/utility/layoutContent';
import DashboardLayout from '../../../containers/Dashboard/Dashboard';
import EmptyState from '../../../ui/EmptyState';
import Spinner from '../../../ui/Spinner';
import Loader from '../../../ui/Loader/Loader.Component';
import { getAllClaims, confirmClaim, resetClaimConfirm } from '../../../shared/actions/Claim.action';

class ClaimsAll extends Component {

    state = {
        meta: {},
        current_page: 1
    }

    componentDidMount() {
        this.getAllClaims(1);
    }

    getAllClaims = number => {
        if (this.props.role_user.role.name == 'PROVIDER_ADMIN') {
            return this.props.getAllClaims({
                page_number: 1,
                role: this.props.role_user.role.name,
                id: this.props.role_user.organization_profile.id,
            });
        }

        return this.props.getAllClaims({
            id: 1,
            page_number: number,
            role: 'TENANT_ADMIN'
        });
    }

    async componentWillReceiveProps(nextProps) {
        this.setState({
            meta: nextProps.meta,
            current_page: nextProps.meta.current_page
        });

        if (nextProps.confirm_claim_status != this.props.confirm_claim_status) {
            if (nextProps.confirm_claim_status === 200) {
                let alert = await swal({
                    title: "Good job!",
                    text: `Claim status was updated successfully!`,
                    icon: "success",
                    closeOnClickOutside: false
                });

                if (alert) {
                    this.setState({
                        submittingForm: false
                    }, () => {
                        this.props.resetClaimConfirm();
                    });
                }
            }
        }
    }

    markAsPaid = claim => {
        if ((claim.status == 1) && ((this.props.role_user.role.name == 'TENANT_ADMIN') || (this.props.role_user.role.name == 'AGENT')) ) {
            let formData = {};
            formData['status'] = 3;
            formData['claim_id'] = claim.id;

            this.setState({
                submittingForm: true
            }, () => {
                this.props.confirmClaim(formData);
            });
        }
    }


    getPrice = (claim, status) => {
        let price = 0;

        claim.plan_services.map(encounter_service => {
            if (status == 'admin_passed') {
                if (encounter_service.admin_passed == true) {
                    price += Number(encounter_service.plan_service.price) * encounter_service.actual_quantity;
                }
            } else {
                if (encounter_service.is_passed == true) {
                    price += Number(encounter_service.plan_service.price) * encounter_service.quantity;
                }
            }

            return encounter_service;
        });

        return price;
    }

    getNewClaimsWith = page_number => {
        this.getAllClaims(page_number);
    }

    navigateWith = claim => {
        this.props.history.push(`/dashboard/claim_service_${claim.id}`);
    }

    displayStatusFrom = status => {
        let display = (
            <div className="pendingStatus">
                PENDING
            </div>
        )
        if (status == 1) {
            display = (
                <div className="activeStatus">
                    AUTHORIZED
                </div>
            )
        }
        if (status == 2) {
            display = (
                <div className="inactiveStatus">
                    UNAUTHORIZED
                </div>
            )
        }
        if (status == 3) {
            display = (
                <div className="paidStatus">
                    PAID
                </div>
            )
        }


        return display;
    }
    
    render() {
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(this.state.meta.total / this.state.meta.per_page); i++) {
            pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
            let classes = this.state.current_page === number ? 'active' : '';

            if (number == 1 || number == this.state.meta.total || (number >= this.state.current_page - 2 && number <= this.state.current_page + 2)) {
                return (
                    <span key={number} className={classes} onClick={() => this.getNewClaimsWith(number)}>{number}</span>
                );
            }
        });


        let container = <div className="text-center"><Spinner /></div>

        if (this.props.status === 200 && !this.props.claims.length) {
            container = (
                <React.Fragment>
                    <div className="text-center">
                        <EmptyState message="No claim created yet" />
                    </div>
                </React.Fragment>
            );
        }

        if (this.props.status === 200 && this.props.claims.length) {
            let claims = this.props.claims.map(claim => (
                <tr key={claim.id}>
                    <td>{claim.id}</td>
                    <td>
                        <div className="name">
                            <div className="tImage"><img src={claim.user.primary_profile_picture} /></div>
                            <div className="tTitle">
                                <div className="head">{claim.user.first_name} {claim.user.middle_name} {claim.user.last_name}</div>
                                <div className="sub">{claim.user.enrollee_id}</div>
                            </div>
                        </div>
                    </td>
                    <td>
                        <div className="name">
                            <div className="tImage"><img src={claim.provider.logo} /></div>
                            <div className="tTitle">
                                <div className="head">{claim.provider.name}</div>
                                <div className="sub">{claim.provider.code}</div>
                            </div>
                        </div>
                    </td>
                    <td>
                        &#8358; {Number(this.getPrice(claim, 'passed_price')).toLocaleString()}
                    </td>
                    <td>&#8358; {Number(this.getPrice(claim, 'admin_passed')).toLocaleString()}</td>
                    <td onClick={() => this.markAsPaid(claim)}>{this.displayStatusFrom(claim.status)} </td>
                    <td onClick={() => this.navigateWith(claim)}><i className={"fa fa-eye"}></i></td>
                </tr>
            ));

            container = (
                <div>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>S/N</th>
                                <th>Patient</th>
                                <th>Provider</th>
                                <th>Passed Price</th>
                                <th>Billable Price</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {claims}
                            <div className="pagination">
                                <span onClick={() => this.getNewClaimsWith(1)}>&laquo;</span>
                                {renderPageNumbers}
                                <span onClick={() => this.getNewClaimsWith(this.props.meta.last_page)}>&raquo;</span>
                            </div>
                        </tbody>
                    </table>
                </div>
            );
        }

        return (
            <DashboardLayout>
                <Loader>
                    <LayoutContentWrapper>
                        <LayoutContent> 
                            <div className="row">
                                <div className="col-md-6">
                                    <h4>Manage Claims</h4>
                                </div>
                            </div><hr/>
                            <div className="row">
                                <div className="col-md-12">
                                    {container}
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
    role_user: state.ChoseRoleReducer.role,
    meta: state.ClaimReducer.meta,
    claims: state.ClaimReducer.claims,
    status: state.ClaimReducer.get_claims_status,
    confirm_claim_status: state.ClaimReducer.confirm_claim_status
});

const mapDispatahToProps = dispatch => ({
    resetClaimConfirm: () => dispatch(resetClaimConfirm()),
    confirmClaim: payload => dispatch( confirmClaim(payload) ),
    getAllClaims: payload => dispatch( getAllClaims(payload) ),
});

export default connect(mapStateToProps, mapDispatahToProps)(ClaimsAll);