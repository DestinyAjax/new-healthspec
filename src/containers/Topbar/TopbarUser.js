import React from 'react';
import {connect} from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import Popover from '@iso/components/uielements/popover';
import IntlMessages from '@iso/components/utility/intlMessages';
import { removeStorage } from '../../utils/storage';
import { getProfileFor } from '../../shared/actions/Profile.action';

import TopbarDropdownWrapper from './TopbarDropdown.styles';

 class TopbarUser extends React.Component {
   
  state = {
    visible: false
  }

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(getProfileFor(this.props.active.slug));
  }
  
  handleVisibleChange = () => {
    this.setState({
      visible: !this.state.visible
    });
  }

  logUserOutHandler = () => {
    removeStorage('ohis:auth_token');
    removeStorage('ohis:reduxState');
  
    return this.props.history.push('/signin');
  }

  render () {
    let img;

    if (this.props.get_profile_status === 200) {
      img = this.props.role_user.profile.picture
    }

    const content = (
      <TopbarDropdownWrapper className="isoUserDropdown">
        <Link className="isoDropdownLink" to={`/dashboard/profile_show_${this.props.active.slug}`}>
          <IntlMessages id="topbar.myprofile" />
        </Link>
        <Link className="isoDropdownLink" to={'/dashboard/billing_information_'}>Billing Information</Link>
        <Link className="isoDropdownLink" to={'/dashboard/change_password'}>Change Password</Link>
        <a className="isoDropdownLink" href="# ">
          <IntlMessages id="themeSwitcher.settings" />
        </a>
        <div className="isoDropdownLink" onClick={this.logUserOutHandler}>
          <IntlMessages id="topbar.logout" />
        </div>
      </TopbarDropdownWrapper>
    );

    return (
      <Popover
        content={content}
        trigger="click"
        visible={this.state.visible}
        onVisibleChange={this.handleVisibleChange}
        arrowPointAtCenter={true}
        placement="bottomLeft"
      >
        <div className="isoImgWrapper">
          <img alt="user" style={{height: '30px',width: '30px'}} src={img} />
          <span className="userActivity online" />
        </div>
      </Popover>
    );
  }
}

const mapStateToProps = state => ({
  App: state.App,
  active: state.ChoseRoleReducer.role,
  role_user: state.ProfileReducer.profile,
  get_profile_status: state.ProfileReducer.get_profile_status,
});

export default withRouter(connect(mapStateToProps,null)(TopbarUser));
