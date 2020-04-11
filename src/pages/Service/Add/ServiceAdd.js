import React, { Component } from 'react';
import swal from 'sweetalert';
import { reset } from 'redux-form';
import {Card} from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import LayoutContent from '@iso/components/utility/layoutContent';
import DashboardLayout from '../../../containers/Dashboard/Dashboard';
import Breadcrumb from "../../../ui/Breadcrumb";
import Loader from '../../../ui/Loader/Loader.Component';
import ServiceForm from '../../../ui/forms/ServiceForm';
import ServiceBatchForm from '../../../ui/forms/ServiceBatchForm';
import { storeService, resetStoreService, storeBatchService } from '../../../shared/actions/Service.action';

class ServiceAdd extends Component {

    state = {
        submittingForm: false,
        submittingBatchForm: false
    }

    handleSubmit = formData => {
        this.setState({
            submittingForm: true
        }, () => {
            this.props.storeService(formData);
        });
    }

    handleBatchSubmit = formData => {
        this.setState({
            submittingBatchForm: true
        }, () => {
            return this.props.storeBatchService({
                data: {
                    type: formData.type,
                    service_category: formData.service_category
                },
                picture: formData.services
            });
        });
    }

    showNotification = async props => {
        if (props.status === 200) {
            this.props.reset('ServiceForm');
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
                this.props.resetStoreService();
            }
        }

        if (props.batch_status === 200) {
            this.props.reset('ServiceBatchForm');
            this.setState({
                submittingBatchForm: false
            });

            let alert = await swal({
                title: "Good job!",
                text: `services was created successfully!`,
                icon: "success",
                closeOnClickOutside: false
            });

            if (alert) {
                this.props.resetStoreService();
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        this.showNotification(nextProps);
    }

    render() {

        let actions = [];
        let addNew, breadcrumb;

        if (this.props.active.role.name === "ADMIN") {
            actions = [
                {
                    key: "slug",
                    type: "delete",
                    title: "Delete",
                    url: "dashboard/service/delete/"
                },
                {
                    key: "slug",
                    type: "edit",
                    title: "Edit",
                    url: "dashboard/service_edit_"
                }
            ];
            breadcrumb = (
                <Breadcrumb
                    links={[
                        {
                            url: "/dashboard/service_all",
                            name: "All Services"
                        }
                    ]}
                />
            )
        }

        return (
            <DashboardLayout>
                <Loader>
                    <LayoutContentWrapper>
                        <LayoutContent>  
                            <div className="row">
                                <div className="col-md-6">
                                    <h4>All Services</h4>
                                </div>
                                {this.props.active.role.name === "ADMIN" && (
                                    <div className="col-md-6 text-right">
                                        <Link className="" to="/dashboard/service_add">
                                            <button className="btn btn-sm btn-success" type="button">Add Service</button>
                                        </Link>
                                    </div>
                                )}
                            </div><hr/>
                            <div className="row">
                                <div className="col-md-6">
                                    <Card title="Create A Service" style={{width: '100%'}}>
                                        <ServiceForm
                                            btnText="Add"
                                            plans={this.props.plans}
                                            onSubmit={this.handleSubmit}
                                            submittingForm={this.state.submittingForm}
                                        />
                                    </Card>
                                </div>
                                <div className="col-md-6">
                                    <Card style={{width: '100%'}}>
                                        <div style={{marginBottom: '30px'}}>
                                            <div className="row">
                                                <div className="col-md-7"><h4>Batch Service Upload</h4></div>
                                                <div className="col-md-5">
                                                    <Link to={require('../../../assets/files/service.xlsx')} >
                                                        <button type="" className="btn btn-sm btn-outline-success pull-right">Download Format</button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                        <ServiceBatchForm 
                                            plans={this.props.plans} 
                                            onSubmit={this.handleBatchSubmit} 
                                            submittingForm={this.state.submittingBatchForm} 
                                        />
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
    active: state.ChoseRoleReducer.role,
    service: state.ServiceReducer.service,
    status: state.ServiceReducer.store_service_status,
    message: state.ServiceReducer.store_service_message,
    batch_status: state.ServiceReducer.store_batch_service_status,
    batch_message: state.ServiceReducer.store_batch_service_message
});

const mapDispatchToProps = dispatch => ({
    reset: payload => dispatch(reset(payload)),
    resetStoreService: () => dispatch( resetStoreService() ),
    storeService: payload => dispatch( storeService(payload) ),
    storeBatchService: payload => dispatch( storeBatchService(payload) )
});

export default connect(mapStateToProps, mapDispatchToProps)(ServiceAdd);