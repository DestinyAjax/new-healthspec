import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import swal from 'sweetalert';
import {Card} from 'antd';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import LayoutContent from '@iso/components/utility/layoutContent';
import DashboardLayout from '../../containers/Dashboard/Dashboard';
import Breadcrumb from "../../ui/Breadcrumb";
import { EncounterService } from '../../ui/Modal';
import { openModal } from '../../ui/Modal/Modal.action';
import { getClaim, confirmClaim, resetClaimConfirm } from '../../shared/actions/Claim.action';
import Loader from '../../ui/Loader/Loader.Component';

class ClaimService extends Component {

    state = {
        submittingForm: false
    }

    componentDidMount() {
        this.props.getClaim({
            id: this.props.match.params.slug
        });
    }

    makeDecisionWith = status => {
        let formData = {};

        formData['status'] = status;
        formData['authorizer_id'] = this.props.id;
        formData['claim_id'] = this.props.match.params.slug;

        this.setState({
            submittingForm: true
        }, () => {
            this.props.confirmClaim(formData);
        });
    }

    showNotificationWith = async props => {
        if (props.confirm_claim_status === 200) {
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

    componentDidUpdate(prevState, prevProps) {
        if (prevState.confirm_claim_status !== this.props.confirm_claim_status) {
            this.showNotificationWith(this.props);
        }
    }

    componentWillUnmount() {
        this.props.resetClaimConfirm();
    }

    getPrice = status => {
        let price = 0;

        this.props.claim.plan_services.map(encounter_service => {
            if (status == true) {
                if (encounter_service.is_passed == status) {
                    price += Number(encounter_service.plan_service.price) * encounter_service.quantity;
                }
            } 
            else {
                price += Number(encounter_service.plan_service.price) * encounter_service.quantity;
            }

            return encounter_service;
        });

        return price;
    }


    getApprovedPrice = () => {
        let price = 0;

        if (this.props.claim.status === 1 || this.props.claim.status === 3) {
            this.props.claim.plan_services.map(encounter_service => {
                if (encounter_service.admin_passed == true) {
                    price += Number(encounter_service.plan_service.price) * encounter_service.actual_quantity;
                }

                return encounter_service;
            });
        }

        return price;
    }


    format = status => {
        if (status === 0) {
            return 'PENDING';
        }
        if (status === 1) {
            return 'AUTHORIZED';
        }
        if (status === 2) {
            return 'UNAUTHORIZED';
        }

        return 'PAID';
    }


    changeStatusFor = encounter_service => {
        if (((this.props.role_user.role.name == 'TENANT_ADMIN') || (this.props.role_user.role.name == 'AGENT')) && this.props.claim.status == 0) {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });

            this.props.openModal(EncounterService, {
                claim: this.props.claim,
                encounter_service: encounter_service
            });
        }
    }

    displayStatusFor = status => {
        return status === 0 ? <div className="">Inactive</div> : <div className="">Active</div>;
    }

    render() {
        let decision;

        if (this.props.status === 200) {
            let {claim} = this.props;

            if (claim.status === 0) {
                if ((this.props.role_user.role.name == 'TENANT_ADMIN') || (this.props.role_user.role.name == 'AGENT')) {
                    decision = (
                        <div className="row">
                            <div className="col-md-12" >
                                <button type="button" className="btn btn-sm btn-danger" style={{marginRight: 10}} onClick={() => this.makeDecisionWith(2)}>Reject</button>
                                <button type="button" onClick={() => this.makeDecisionWith(1)} className="btn btn-sm btn-success">Confirm</button>
                            </div>
                        </div>
                    );
                }
            }
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
                                            url: '/dashboard/claim_all',
                                            name: 'All Claims'
                                        },
                                    ]} />
                                </div>
                            </div><hr/>
                            <div className="row">
                                <div className="col-md-12">
                                    <Card style={{width: '100%'}} title="Claim - Osun Health Insurance Scheme">
                                        
                                        {this.props.status === 200 && (
                                            <React.Fragment>
                                                <div className="row">
                                                    <div className="col-md-5">
                                                        <table className="table table-striped">
                                                            <tr><th>Enrollee Name:</th><td>{this.props.claim.user.first_name} {this.props.claim.user.middle_name} {this.props.claim.user.last_name}</td></tr>
                                                            <tr><th>Enrollee ID:</th><td>{this.props.claim.user.enrollee_id}</td></tr>
                                                            <tr><th>Date: </th><td>{moment(this.props.claim.user.date_of_birth.date).format('Do MMMM YYYY')}</td></tr>
                                                        </table>

                                                        <table className="table table-striped">
                                                            <tr><th>Provider Name: </th><td>{this.props.claim.provider.name}</td></tr>
                                                            <tr><th>Provider Code:</th><td>{this.props.claim.provider.code}</td></tr>
                                                            <tr><th>Warden: </th><td>{this.props.claim.provider.warden}</td></tr>
                                                        </table>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <table className="table table-striped">
                                                            <tr><th>Status: </th><td>{this.format(this.props.claim.status)}</td></tr>
                                                            <tr><th>Total Price: </th><td>&#8358; {Number(this.getPrice(false)).toLocaleString()}</td></tr>
                                                            <tr><th>Passed Price: </th><td>&#8358; {Number(this.getPrice(true)).toLocaleString()}</td></tr>
                                                            <tr><th>Approved Price: </th><td>&#8358; {Number(this.getApprovedPrice()).toLocaleString()}</td></tr>
                                                        </table>
                                                        {this.props.claim.authorizer != null && (
                                                            <table className="table table-striped">
                                                                <tr><th>Verifier Name:</th><td>{this.props.claim.authorizer.first_name} {this.props.claim.authorizer.middle_name} {this.props.claim.authorizer.last_name}</td></tr>
                                                            </table>
                                                        )}
                                                    </div>
                                                    <div className="col-md-3">
                                                        <img src={this.props.claim.user.primary_profile_picture} />
                                                    </div>
                                                </div><br/>
                                                <div className="row">
                                                    <div className="col-md-12">
                                                    <table className={"table table-striped"}>
                                                        <thead>
                                                            <tr>
                                                                <th>S/N</th>
                                                                <th>Service</th>
                                                                <th>Unit Price</th>
                                                                <th>Quantity</th>
                                                                <th>Total</th>
                                                                <th>Admin Quantity</th>
                                                                <th>Admin Total</th>
                                                                <th>Status</th>
                                                                <th>Admin Status</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {this.props.claim.plan_services.map(encounter_service => (
                                                                <tr key={encounter_service.plan_service.service.id} onClick={() => this.changeStatusFor(encounter_service)}>
                                                                    <td>{encounter_service.plan_service.service.id}</td>
                                                                    <td>{encounter_service.plan_service.service.name}</td>
                                                                    <td>&#8358; {Number(encounter_service.plan_service.price).toLocaleString()}</td>
                                                                    <td>{encounter_service.quantity}</td>
                                                                    <td>&#8358; {Number(encounter_service.plan_service.price * encounter_service.quantity).toLocaleString()}</td>
                                                                    <td>{encounter_service.actual_quantity}</td>
                                                                    <td>&#8358; {Number(encounter_service.plan_service.price * encounter_service.actual_quantity).toLocaleString()}</td>
                                                                    <td>{this.displayStatusFor(encounter_service.is_passed)}</td>
                                                                    <td>{this.displayStatusFor(encounter_service.admin_passed)}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                    </div>
                                                </div>
                                            </React.Fragment>
                                        )}
\                                       <div style={{marginTop:'30px'}}>{decision}</div>
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
    id: state.AuthReducer.id,
    claim: state.ClaimReducer.claim,
    role_user: state.ChoseRoleReducer.role,
    status: state.ClaimReducer.get_claim_status,
    confirm_claim_status: state.ClaimReducer.confirm_claim_status,
});

const mapDispatchToProps = dispatch => ({
    getClaim: payload => dispatch( getClaim(payload) ),
    resetClaimConfirm: () => dispatch( resetClaimConfirm() ),
    confirmClaim: payload => dispatch( confirmClaim(payload) ),
    openModal: (modalType, modalProp) => dispatch(openModal(modalType, modalProp)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClaimService);