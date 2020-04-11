import React, { Component } from 'react';
import swal from 'sweetalert';
import {Card} from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import LayoutContent from '@iso/components/utility/layoutContent';
import DashboardLayout from '../../../containers/Dashboard/Dashboard';
import Breadcrumb from "../../../ui/Breadcrumb";
import Loader from '../../../ui/Loader/Loader.Component';
import ServiceForm from '../../../ui/forms/ServiceForm';
import { updateService, resetUpdateService, getService } from '../../../shared/actions/Service.action';

class ServiceEdit extends Component {

    state = {
        submittingForm: false,
    }

    handleSubmit = formData => {
        this.setState({
            submittingForm: true
        }, () => {
            formData['slug'] = this.props.match.params.slug;
            this.props.updateService(formData);
        });
    }


    showNotification = async props => {
        if (props.status === 200) {
            this.setState({
                submittingForm: false
            });

            let alert = await swal({
                title: "Good job!",
                text: `${props.service.name} was created successfully!`,
                icon: "success",
                closeOnClickOutside: false
            });

            if (alert) {
                this.props.resetUpdateService();
                this.props.history.push('/service_all');
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        this.showNotification(nextProps);
    }


    componentDidMount() {
        this.props.getService(this.props.match.params.slug);
    }


    componentWillUnmount() {
        this.props.resetUpdateService();
    }

    render() {

        let formContainer;

        if (this.props.get_service_status === 200) {
            let service = this.props.service;
            service['is_active'] = this.props.service.is_active_unformatted;

            formContainer = (
                <React.Fragment>
                    <ServiceForm
                        btnText="Update"
                        plans={this.props.plans}
                        onSubmit={this.handleSubmit}
                        submittingForm={this.state.submittingForm}
                        initialValues={service}
                    />  
                </React.Fragment>
            )
        }

        return (
            <DashboardLayout>
                <Loader>
                    <LayoutContentWrapper>
                        <LayoutContent>  
                            <div className="row">
                                <div className="col-md-6">
                                    <h4>Edit Services</h4>
                                </div>
                                {this.props.active.role.name === "ADMIN" && (
                                    <div className="col-md-6 text-right">
                                        <Link className="" to="/dashboard/service_all">
                                            <button className="btn btn-sm btn-success" type="button">All Services</button>
                                        </Link>
                                    </div>
                                )}
                            </div><hr/>
                            <div className="row">
                                <div className="col-md-6">
                                    <Card title="Create A Service" style={{width: '100%'}}>
                                        {formContainer}
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
    service: state.ServiceReducer.service,
    status: state.ServiceReducer.update_service_status,
    get_service_status: state.ServiceReducer.get_service_status,
});

const mapDispatchToProps = dispatch => ({
    getService: payload => dispatch( getService(payload) ),
    resetUpdateService: () => dispatch(resetUpdateService()),
    updateService: payload => dispatch(updateService(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ServiceEdit);