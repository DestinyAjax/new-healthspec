import React, { Component } from 'react';
import swal from "sweetalert";
import { connect } from 'react-redux';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import LayoutContent from '@iso/components/utility/layoutContent';
import DashboardLayout from '../../containers/Dashboard/Dashboard';
import EmptyState from "../../ui/EmptyState";
import Breadcrumb from "../../ui/Breadcrumb";
import { getDependants } from "../../shared/actions/Dependant.action";
import Loader from '../../ui/Loader/Loader.Component';

class DependantShow extends Component {
    
    componentDidMount() {
        this.props.getDependants(this.props.active.id);
    }

    navigateToBeneficiary = slug => {
        // return this.props.history.push(`/dependant_add_${slug}`);
    };

    showNotificationFrom = async nextProps => {
        if (nextProps.delete_beneficiary_status === 200) {
            let alert = await swal({
                title: "Good job!",
                text: `Beneficiary deleted successfully!`,
                icon: "success",
                closeOnClickOutside: false
            });

            if (alert) {
                this.props.resetStoreBeneficiary();
            }
        }
    };

    componentWillReceiveProps(nextProps) {
        this.showNotificationFrom(nextProps);
    }

    render() {

        return (
            <DashboardLayout>
                <Loader>
                    <LayoutContentWrapper>
                        <LayoutContent>  
                            <div className="row">
                                <div className="col-md-6">
                                    <h4>All Dependants</h4>
                                </div>
                                <div className="col-md-12">
                                    <Breadcrumb />
                                </div>
                            </div><hr/>
                            <div className="row">
                                <div className="col-md-12">
                                    {this.props.status === 200 && !this.props.dependants.length && (
                                        <div className="text-center">
                                            <EmptyState message="No dependants created yet" />
                                        </div>
                                    )}

                                    {this.props.status === 200 && this.props.dependants.length && (
                                        <div className="card card-body table-responsive-sm">
                                            <table className="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th>S/N</th>
                                                        <th>Name</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.props.dependants.map(dependant => (
                                                        <tr key={dependant.id}>
                                                            <td>{dependant.id}</td>
                                                            <td>{dependant.dependent.first_name} {dependant.dependent.middle_name} {dependant.dependent.last_name}</td>
                                                        </tr>
                                                    ))}
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
    active: state.ChoseRoleReducer.role,
    dependants: state.DependantReducer.dependants,
    status: state.DependantReducer.get_dependants_status
});

const mapDispatchToProps = dispatch => ({
    getDependants: payload => dispatch(getDependants(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(DependantShow);