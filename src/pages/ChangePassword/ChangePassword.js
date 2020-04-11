import React, { Component } from 'react';
import swal from 'sweetalert';
import {Card} from 'antd';
import { connect } from 'react-redux';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import LayoutContent from '@iso/components/utility/layoutContent';
import DashboardLayout from '../../containers/Dashboard/Dashboard';
import Loader from '../../ui/Loader/Loader.Component';
import { getStorage } from '../../shared/utils/storage';
import ChangePasswordForm from '../../ui/forms/ChangePasswordForm';
import { storeChangePassword, resetChangePassword } from '../../shared/actions/ChangePassword.action';

class ChangePassword extends Component {

    state = {
        requestingForm: false,
    }

    componentDidMount() {
    }

    showNotification = async props => {
        let alert;
        if (props.status && props.status === 200) {
            alert = await swal({
                title: "Good job!",
                text: `password changed successfully!`,
                icon: "success",
                closeOnClickOutside: false
            });
        }else if(props.status && props.status !== 200){
            alert = await swal({
                title: "An Error Occured!",
                text: `${props.msg}`,
                icon: "warning",
                closeOnClickOutside: false
            });
        }
        if (alert) {
            this.props.resetChangePassword();
            return this.props.history.push('/chose_role');
        }
    }

    componentWillReceiveProps(nextProps) {
        this.showNotification(nextProps);
    }

    handleSubmit = formData => {
        const isFirstLogin = getStorage("is_first_login");

        if (isFirstLogin === 1) {
            formData["user_id"] = this.props.auth[0].id
        }if(isFirstLogin === 0 && !this.props.active){
            return this.props.history.push('/chose_role');
        }else{
            formData["user_id"] = this.props.active[0].user_id
        }
        
        this.setState({
            requestingForm: true
        }, () => {
            this.props.storeChangePassword(formData);
        });
    }

    render() {

        return (
            <DashboardLayout>
                <Loader>
                    <LayoutContentWrapper>
                        <LayoutContent> 
                            <div className="row">
                                <div className="col-md-12">
                                    <Card title="Chaage Password" style={{width: '100%'}}>
                                        <ChangePasswordForm 
                                            onSubmit={this.handleSubmit} 
                                            submittingForm={this.state.requestingForm}/>
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
    active: state.AuthReducer.roles,
    auth: state.AuthReducer.roles,
    msg: state.ReferReducer.refer_msg,
    status: state.ChangePasswordReducer.status
});

const mapDispatchToProps = dispatch => ({
    resetChangePassword: () => dispatch(resetChangePassword()),
    storeChangePassword: payload => dispatch(storeChangePassword(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);