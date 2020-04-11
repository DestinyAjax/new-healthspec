import React from 'react';
import {Card} from 'antd';
import Header from '../../../../ui/Header';
import { connect } from 'react-redux';
import { roleChosen } from '../../../../shared/actions/ChoseRole.action';
import ChoseRoleStyleWrapper from './ChoseRole.page.style';

class ChoseRole extends React.Component {

    componentDidMount() { }

    navigateWith = role => {
        this.props.roleChosen(role);
        localStorage.setItem("OHIS:role", role.role.name);
        console.log(role.role.name)
        this.props.history.push(`/dashboard`);
        // this.props.history.push(`/profile_show_${role.slug}`);
    }

    getDisplay = name => {
        return name.split("_").join(" ");
    }

    render() {
        let roles = this.props.roles.map(role => (
            
            <div className="role" key={role.slug}>
                <div className="roleDescription">
                    <div className="companyLogo">
                        {role.organization_profile !== null && (<img src={role.organization_profile.logo} />)}
                    </div>
                    <div>
                        <div>{this.getDisplay(role.role.name)}</div>
                        {role.organization_profile && (<div>{role.organization_profile.name}</div>)}
                    </div>
                </div>
                <div className="enter" onClick={() => this.navigateWith(role)}>
                    <img src={require('../../../../assets/images/enter.png')} />
                </div>
            </div>
        ));

        return (
            <ChoseRoleStyleWrapper className="ChoseRoleStyle">
                <Header />
                <div className="container" style={{backgroundColor: 'unset'}}>
                    <div className="container-lg" style={{marginTop: '30px'}}>
                        <Card style={{width:'100%'}}>
                            <div className="content-div">
                                <h3>Select A Profile</h3>
                                <p className="text-center">
                                    Hi {this.props.name}, You happen to have the profile listed below.
                                    Please, click on one of the options below to access your profile of choice.
                                </p>
                            </div><hr/>
                            <div className="roles">{roles}</div>
                        </Card>
                    </div>
                </div>
            </ChoseRoleStyleWrapper>
        );
    }
}

const mapStateToProps = state => ({
    name: state.AuthReducer.name,
    roles: state.AuthReducer.roles
});

const mapDispatchToProps = dispatch => ({
    roleChosen: role => dispatch(roleChosen(role))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChoseRole);