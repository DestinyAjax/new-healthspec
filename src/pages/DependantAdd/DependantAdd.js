import React, { Component } from 'react';
import swal from 'sweetalert';
import { reset } from 'redux-form';
import { connect } from 'react-redux';
import {Card} from 'antd';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import LayoutContent from '@iso/components/utility/layoutContent';
import DashboardLayout from '../../containers/Dashboard/Dashboard';
import Breadcrumb from "../../ui/Breadcrumb";
import Loader from '../../ui/Loader/Loader.Component';
import DependantForm from '../../ui/forms/DependantForm';
import { storeDependant, resetStoreDependant } from '../../shared/actions/Dependant.action';

class DependantAdd extends Component {

    state = {
        submittingForm: false,
        role_user_slug: this.props.match.params.slug == undefined ? this.props.active.slug : this.props.match.params.slug,
    }

    handleSubmit = async formData => {
        formData['role_user_slug'] = this.state.role_user_slug;

        if (formData.picture == null) {
            return await swal({
                text: `You must pick an image`,
                icon: "error",
                closeOnClickOutside: true
            });
        }

        this.setState({
            submittingForm: true
        }, () => {
            return this.props.storeDependant(formData);
        });
    }

    
    showNotification = async props => {
        if (props.store_dependant_status === 200) {
            this.props.reset('AgentStepOneForm');
            this.setState({
                activeStep: 0,
                submittingForm: false
            });

            let alert = await swal({
                title: "Good job!",
                text: `Dependant was created successfully!`,
                icon: "success",
                closeOnClickOutside: false
            });

            if (alert) {
                this.props.resetStoreDependant();
            }
            return;
        }
        if (props.store_dependant_status !== null && props.store_dependant_status !== 200) {
            let alert = await swal({
                title: "Opps!",
                text: `Maximum number of dependant has been reached!`,
                icon: "error",
                closeOnClickOutside: false
            });

            if (alert) {
                this.props.resetStoreDependant();
                this.setState({
                    submittingForm: false
                });
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        this.showNotification(nextProps);
    }

    componentDidMount() {
        console.dir(this.props.active.role.name);
    }

    render() {
        let breadcrumb = (
            <Breadcrumb
                links={[
                    {
                        url: "/dashboard/beneficiary_all",
                        name: "Beneficiaries"
                    },
                    {
                        url: `/dashboard/enrollee_view_${this.props.match.params.slug}`,
                        name: "Enrollee"
                    },
                    {
                        url: `/dashboard/dependant_add_${this.props.match.params.slug}`,
                        name: "Add dependant"
                    },
                ]}
            />
        )

        if (this.props.match.params.slug == undefined) {
            breadcrumb = (
                <Breadcrumb
                    links={[
                        {
                            url: `/dashboard/dependant_add_${this.props.active.slug}`,
                            name: "Add dependant"
                        },
                    ]}
                />
            )
        }

        if (this.props.active.role.name === 'AGENT_ADMIN' || this.props.active.role.name === 'AGENT_MODERATOR') {
            breadcrumb = (
                <Breadcrumb
                    links={[
                        {
                            url: "/dashboard/agent_my_beneficiary",
                            name: "Beneficiaries"
                        },
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
                                <div className="col-md-12">
                                   {breadcrumb}
                                </div>
                            </div><hr/>
                            <div className="row">
                                <div className="col-md-12">
                                    <Card style={{width: '100%'}}>
                                        <DependantForm onSubmit={this.handleSubmit} />
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
    dependant: state.DependantReducer.dependant,
    store_dependant_status: state.DependantReducer.store_dependant_status,
});

const mapDispatchToProps = dispatch => ({
    reset: payload => dispatch(reset(payload)),
    resetStoreDependant: () => dispatch(resetStoreDependant()),
    storeDependant: payload => dispatch(storeDependant(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DependantAdd);