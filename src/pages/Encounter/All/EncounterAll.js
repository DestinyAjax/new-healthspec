import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import Spinner from '../../../ui/Spinner';
import EmptyState from '../../../ui/EmptyState';
import LayoutContent from '@iso/components/utility/layoutContent';
import DashboardLayout from '../../../containers/Dashboard/Dashboard';
import Breadcrumb from "../../../ui/Breadcrumb";
import Loader from '../../../ui/Loader/Loader.Component';
import { getAllFor } from '../../../shared/actions/Encounter.action';

class EncounterAll extends Component {

    state = {
        meta: {},
        current_page: 1,
    }

    componentDidMount() {
        this.props.getAllFor({
            page_number: 1,
            field: 'provider_id',
            value: this.props.active.organization_profile.id
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            meta: nextProps.meta,
            current_page: nextProps.meta.current_page
        });
    }

    generateClaimFor = encounter => {
        console.dir(encounter);
    }

    getNewEncounters = page_number => {
        this.props.getAllFor({
            field: 'provider_id',
            page_number: page_number,
            value: this.props.active.organization_profile.id,
        });
    }

    display = status => {
        return status == 0 ? <div className="inactiveBill">Not Billable</div> : <div className="activeBill">Billable</div>
    }

    render() {

        let container = <Spinner />

        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(this.state.meta.total / this.state.meta.per_page); i++) {
            pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
            let classes = this.state.current_page === number ? 'active' : '';

            if (number == 1 || number == this.state.meta.total || (number >= this.state.current_page - 2 && number <= this.state.current_page + 2)) {
                return (
                    <span key={number} className={classes} onClick={() => this.getNewEncounters(number)}>{number}</span>
                );
            }
        });


        if (this.props.encounter_get_all_for_status === 200 && !this.props.encounters.length) {
            container = (
                <React.Fragment>
                    <div>
                        <EmptyState message="No encounter created yet" />
                        <div className="add_new">
                            <Link to="/dashboard/encounter_add">Click here to add new encounter</Link>
                        </div>
                    </div>
                </React.Fragment>
            );
        }
        if (this.props.encounter_get_all_for_status === 200 && this.props.encounters.length) {
            let encounters = this.props.encounters.map(encounter => {

                let claimable = (
                    <td></td>
                );

                if ( (!encounter.is_claimed) && (encounter.is_billable)) {
                    claimable = (
                        <td onClick={() => this.generateClaimFor(encounter)}><span className="view">Claim</span></td>
                    )
                }

                return (
                    <tr key={encounter.id}>
                        <td>{encounter.id}</td>
                        <td>
                            <div className="name">
                                <div className="tTitle">
                                    <div className="head">
                                        {encounter.user.first_name} {encounter.user.middle_name} {encounter.user.last_name}
                                    </div>
                                    <div className="sub">{encounter.user.email}</div>
                                </div>
                            </div>
                        </td>
                        <td>{this.display(encounter.is_billable)}</td>
                        <td>&#8358; {Number(encounter.price).toLocaleString()}</td>
                        { claimable }
                    </tr>
                )
            });

            container = (
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-body table-responsive">
                                <table className={"table table-striped"}>
                                    <thead>
                                        <tr>
                                            <th>S/N</th>
                                            <th>User</th>
                                            <th>Billable</th>
                                            <th>Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        { encounters }
                                    </tbody>
                                </table>
                                <div className="pagination">
                                    <span onClick={() => this.getNewEncounters(1)}>&laquo;</span>
                                    {renderPageNumbers}
                                    <span onClick={() => this.getNewEncounters(this.props.meta.last_page)}>&raquo;</span>
                                </div>
                            </div>
                        </div>
                    </div>
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
                                    <h4>Encounters</h4>
                                </div>
                                <div className="col-md-6 text-right">
                                    <Link className="" to="/dashboard/encounter_all">
                                        <button className="btn btn-sm btn-success" type="button">All Encounter</button>
                                    </Link>
                                </div> 
                            </div><hr/>
                            {container}
                        </LayoutContent>
                    </LayoutContentWrapper>
                </Loader>
            </DashboardLayout>
        );
    }
}

const mapStateToProps = state => ({
    active: state.ChoseRoleReducer.role,
    meta: state.EncounterReducer.meta,
    encounters: state.EncounterReducer.encounters,
    encounter_get_all_for_status: state.EncounterReducer.encounter_get_all_for_status,
});

const mapDispatchToProps = dispatch => ({
    getAllFor: payload => dispatch(getAllFor(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EncounterAll);