import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reset } from 'redux-form';
import { Link } from 'react-router-dom';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import LayoutContent from '@iso/components/utility/layoutContent';
import DashboardLayout from '../../../containers/Dashboard/Dashboard';
import EncounterCard from '../../../ui/EncounterCard';
import EncounterUserForm from '../../../ui/forms/EncounterUserForm';
import { getQuery, resetGetQuery } from '../../../shared/actions/Encounter.action';
import Loader from '../../../ui/Loader/Loader.Component';

class EncounterAdd extends Component {

    state = {
        submittingForm: false,
        role_seperated_status: 0,
        provider_role_users: [],
        other_provider_role_users: [],
    }

    handleSubmit = formData => {
        let form = {};

        form['field'] = 'enrollee_id';
        form['value'] = formData.value;
        form['provider_id'] = this.props.active.organization_profile.id;

        if (parseInt(formData.value) == formData.value) {
            form['field'] = 'primary_phone_number';
            form['value'] = formData.value;
        }

        if (/(.+)@(.+){2,}\.(.+){2,}/.test(formData.value)) {
            form['field'] = 'email';
            form['value'] = formData.value;
        }

        this.setState({
            submittingForm: true
        }, () => {
            this.props.getQuery(form);
        });
    }

    cancelHandler = () => {
        this.props.resetGetQuery();
        this.props.reset('EncounterUserForm');
    }

    componentWillUnmount() {
        this.props.resetGetQuery();
    }

    componentDidUpdate(prevProps) {
        if ( (this.props.role_users != null) && (this.props.role_users != prevProps.role_users) && (this.props.get_encounter_query_status === 200)) {

            let provider_role_users = this.props.role_users.filter(role_user => role_user.organization_profile_id == this.props.active.organization_profile.id)
                                                           .filter(role_user => role_user.role.name == 'BENEFICIARY');
            let other_provider_role_users = this.props.role_users.filter(role_user => role_user.organization_profile_id != this.props.active.organization_profile.id);

            this.setState({
                role_seperated_status: 1,
                provider_role_users: provider_role_users,
                other_provider_role_users: other_provider_role_users,
            });
        }
    }

    componentDidMount() {
        if (!(this.props.match.params.enrollee_id === undefined)) {

            let form = {};

            form['field'] = 'enrollee_id';
            form['value'] = this.props.match.params.enrollee_id;
            form['provider_id'] = this.props.active.organization_profile.id;

            this.setState({
                submittingForm: true
            }, () => {
                this.props.getQuery(form);
            });
        }
    }

    render() {
        let result;
        let container;

        if (this.props.match.params.enrollee_id === undefined) {
            container = (
                <div className={'card'}>
                    <div className={'card-header'}>
                        <Link className={'btn btn-sm btn-success m-1'} to="/dashboard/claim_all">View Claims</Link>
                    </div>
                    <div  className={'card-body'}>
                        <EncounterUserForm
                            cancel={this.cancelHandler}
                            onSubmit={this.handleSubmit}
                        />
                    </div>
                </div>
            );
        }

        if (this.props.get_encounter_query_status === 200 && this.state.role_seperated_status === 1) {
            result = (
                <div className={'card card-body'}>
                    <div className="searchResult">
                        <EncounterCard user={this.props.user}
                            transaction={this.props.transaction}
                            role_users={this.state.provider_role_users}
                            other_provider_role_users={this.state.other_provider_role_users}
                            previous_encounters={this.props.previous_encounters}
                        />
                    </div>
                </div>
            );
        }

        if (this.props.get_encounter_query_status === 404) {
            result = (
                <div className={'card card-body table-responsive-sm'}>
                    <div className="searchResult">
                        <table className={"table table-striped"}>
                            <tbody>
                                <tr><td colSpan="7">User does not exists for this provider</td></tr>
                            </tbody>
                        </table>
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
                                <div className="col-md-6">{ container }</div>
                                <div className="col-md-6">{ result }</div>
                            </div>
                        </LayoutContent>
                    </LayoutContentWrapper>
                </Loader>
            </DashboardLayout>
        );
    }
}

const mapStateToProps = state => ({
    active: state.ChoseRoleReducer.role,
    previous_encounters: state.EncounterReducer.previous_encounters,
    get_encounter_query_status: state.EncounterReducer.get_encounter_query_status,
    user: state.EncounterReducer.user,
    role_users: state.EncounterReducer.role_users,
});

const mapDispatchToProps = dispatch => ({
    reset: payload => dispatch(reset(payload)),
    resetGetQuery: () => dispatch(resetGetQuery()),
    getQuery: payload => dispatch(getQuery(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EncounterAdd);
