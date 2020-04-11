import React, { Component } from 'react';
import swal from 'sweetalert';
import {Card} from 'antd';
import { connect } from 'react-redux';
import { reset } from 'redux-form';
import { Link } from 'react-router-dom';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import LayoutContent from '@iso/components/utility/layoutContent';
import DashboardLayout from '../../containers/Dashboard/Dashboard';
import Breadcrumb from "../../ui/Breadcrumb";
import ProfileMenu from "../../ui/ProfileMenu";
import ProfileNextOfKinForm from "../../ui/forms/ProfileNextOfKinForm";
import ProfileBasicInfoForm from "../../ui/forms/ProfileBasicInfoForm";
import { getProfileFor, updateBasicProfile, resetProfileUpdate } from "../../shared/actions/Profile.action";
import ProfileResidentialAddressForm from "../../ui/forms/ProfileResidentialAddressForm";
import Loader from '../../ui/Loader/Loader.Component';

class ProfileShow extends Component {
    
    handleProfileBasicInfo = formData => {
        let basicFormData = {};
        basicFormData["religion"] = formData.religion;
        basicFormData["job_name"] = formData.job_name;
        basicFormData["physical_challenge"] = formData.physical_challenge;

        basicFormData["highest_education_level"] = formData.highest_education_level;
        basicFormData["marital_status"] = formData.marital_status;
        basicFormData["whatsapp_number"] = formData.whatsapp_number;
        basicFormData["id"] = this.props.role_user.id;

        this.props.updateBasicProfile({
            formData: basicFormData,
            url: "role_user/basic-update"
        });
    };

    handleProfileResidentialAddress = formData => {
        let basicFormData = {};
        basicFormData["state"] = formData.state;
        basicFormData["address"] = formData.address;
        basicFormData["lga"] = formData.lga;
        basicFormData["office_address"] = formData.office_address;
        basicFormData["id"] = this.props.role_user.id;

        this.props.updateBasicProfile({
            formData: basicFormData,
            url: "role_user/basic-update"
        });
    };

    handleNextOfKin = formData => {
        let basicFormData = {};
        basicFormData["next_of_kin_surname"] = formData.next_of_kin_surname;
        basicFormData["next_of_kin_firstname"] = formData.next_of_kin_firstname;
        basicFormData["next_of_kin_middlename"] = formData.next_of_kin_middlename;
        basicFormData["relationship_with_next_of_kin"] = formData.relationship_with_next_of_kin;

        basicFormData["next_of_kin_occupation"] = formData.next_of_kin_occupation;
        basicFormData["next_of_kin_address"] = formData.next_of_kin_address;
        basicFormData["next_of_kin_state"] = formData.next_of_kin_state;
        basicFormData["next_of_kin_lga"] = formData.next_of_kin_lga;
        basicFormData["id"] = this.props.role_user.id;

        this.props.updateBasicProfile({
            formData: basicFormData,
            url: "role_user/basic-update"
        });
    };

    componentDidMount() {
        this.props.getProfileFor(this.props.match.params.slug);
    }

    showNotificationFrom = async nextProps => {
        if (nextProps.update_profile_status === 200) {
            let alert = await swal({
                title: "Good job!",
                text: `Profile was updated successfully!`,
                icon: "success",
                closeOnClickOutside: false
            });

            if (alert) {
                this.props.resetProfileUpdate();
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
                            {this.props.get_profile_status === 200 && (
                                <div className="row">
                                    <div className="col-md-6 col-sm-12 col-xs-12">
                                        <Card title="Basic Information" style={{width:'100%'}}>
                                            <ProfileBasicInfoForm 
                                                onSubmit={this.handleProfileBasicInfo} 
                                                initialValues={this.props.role_user.profile} />
                                        </Card> 
                                    </div>
                                    <div className="col-md-6 col-sm-12 col-xs-12">
                                        <Card title="Residential Address" style={{width:'100%'}}>
                                            <ProfileResidentialAddressForm
                                                onSubmit={this.handleProfileResidentialAddress}
                                                initialValues={this.props.role_user.profile}
                                            />
                                        </Card>
                                    </div>
                                    <div className="col-md-12 col-sm-12 col-xs-12">
                                        <Card title="Next of Kin Information" style={{width:'100%'}}>
                                            <ProfileNextOfKinForm 
                                                onSubmit={this.handleNextOfKin} 
                                                initialValues={this.props.role_user.profile} />
                                        </Card>
                                    </div>
                                </div>
                            )}
                        </LayoutContent>
                    </LayoutContentWrapper>
                </Loader>
            </DashboardLayout>
        );
    }
}

const mapStateToProps = state => ({
    role_user: state.ProfileReducer.profile,
    get_profile_status: state.ProfileReducer.get_profile_status,
    update_profile_status: state.ProfileReducer.update_profile_status
});

const mapDispatchToProps = dispatch => ({
    reset: payload => dispatch(reset(payload)),
    resetProfileUpdate: () => dispatch(resetProfileUpdate()),
    getProfileFor: payload => dispatch(getProfileFor(payload)),
    updateBasicProfile: payload => dispatch(updateBasicProfile(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileShow);