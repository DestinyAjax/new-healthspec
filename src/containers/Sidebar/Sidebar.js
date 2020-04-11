import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Layout } from 'antd';
import {companyMenus, hmoMenus, providerMenus, bankMenus} from './options';
import Scrollbars from '@iso/components/utility/customScrollBar';
import Menu from '@iso/components/uielements/menu';
import appActions from '@iso/redux/app/actions';
import Logo from '@iso/components/utility/logo';
import SidebarWrapper from './Sidebar.styles';
import SidebarMenu from './SidebarMenu';
import { removeStorage } from '../../utils/storage';

const { Sider } = Layout;
const {
  toggleOpenDrawer,
  changeOpenKeys,
  changeCurrent,
  toggleCollapsed,
} = appActions;

class Sidebar extends React.Component {

  handleClick = (e) => {
    const {view} = this.props.App;
    const {dispatch} = this.props;

    dispatch(changeCurrent([e.key]));
    if (view === 'MobileView') {
      setTimeout(() => {
        dispatch(toggleCollapsed());
      }, 100)
    }
  }

  logUserOutHandler = () => {
    removeStorage('ohis:auth_token');
    removeStorage('ohis:reduxState');
    this.props.history.push('/signin');
  }

  getAncestorKeys = key => {
    const map = {
      sub3: ['sub2'],
    };
    return map[key] || [];
  };

  onOpenChange = (newOpenKeys) => {
    const {dispatch} = this.props;
    const {openKeys} = this.props.App;

    const latestOpenKey = newOpenKeys.find(key => !(openKeys.indexOf(key) > -1));
    const latestCloseKey = openKeys.find(key => !(newOpenKeys.indexOf(key) > -1));
    let nextOpenKeys = [];
    if (latestOpenKey) {
      nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey);
    }
    if (latestCloseKey) {
      nextOpenKeys = this.sgetAncestorKeys(latestCloseKey);
    }
    dispatch(changeOpenKeys(nextOpenKeys));
  };
  
  onMouseEnter = event => {
    const {dispatch} = this.props;
    const {collapsed, openDrawer} = this.props.App;

    if (collapsed && openDrawer === false) {
      dispatch(toggleOpenDrawer());
    }
    return;
  };

  onMouseLeave = () => {
    const {dispatch} = this.props;
    const {collapsed, openDrawer} = this.props.App;

    if (collapsed && openDrawer === true) {
      dispatch(toggleOpenDrawer());
    }
    return;
  };
  
  render() {
    const {openKeys,collapsed,openDrawer,current,height} = this.props.App;
    const isCollapsed = collapsed && !openDrawer;
    const mode = isCollapsed === true ? 'vertical' : 'inline';
    const role = localStorage.getItem("OHIS:role");
    const styling = {
      backgroundColor: this.props.Theme.backgroundColor,
    };
    const submenuStyle = {
      backgroundColor: 'rgba(0,0,0,0.3)',
      color: this.props.Theme.textColor,
    }
    const submenuColor = {
      color: this.props.Theme.textColor,
    };

    let menus;
    
    if(role === "HMO_ADMIN") {
      menus = (
        hmoMenus.map(singleOption => (
          <SidebarMenu
            key={singleOption.key}
            submenuStyle={submenuStyle}
            submenuColor={submenuColor}
            singleOption={singleOption}
          />
        ))
      );
    }
    else if(role === "COMPANY_ADMIN") {
      menus = (
        companyMenus.map(singleOption => (
          <SidebarMenu
            key={singleOption.key}
            submenuStyle={submenuStyle}
            submenuColor={submenuColor}
            singleOption={singleOption}
          />
        ))
      );
    }
    else if (role === "PROVIDER_ADMIN") {
      menus = (
        providerMenus.map(singleOption => (
          <SidebarMenu
            key={singleOption.key}
            submenuStyle={submenuStyle}
            submenuColor={submenuColor}
            singleOption={singleOption}
          />
        ))
      );
    }
    else if (role === "BANK_ADMIN") {
      menus = (
        bankMenus.map(singleOption => (
          <SidebarMenu
            key={singleOption.key}
            submenuStyle={submenuStyle}
            submenuColor={submenuColor}
            singleOption={singleOption}
          />
        ))
      );
    }

    return (
      <SidebarWrapper>
        <Sider
          trigger={null}
          collapsible={true}
          collapsed={isCollapsed}
          width={240}
          className="isomorphicSidebar"
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.sonMouseLeave}
          style={styling}
        >
          <Logo collapsed={isCollapsed} />
          <Scrollbars style={{ height: height - 70 }}>
            <Menu
              onClick={this.handleClick}
              theme="dark"
              className="isoDashboardMenu"
              mode={mode}
              openKeys={isCollapsed ? [] : openKeys}
              selectedKeys={current}
              onOpenChange={this.onOpenChange}
            >
              {menus}
              {/* Demo Menu */}
              <Menu.Item>
                <Link to="/chose_role">
                  <span className="isoMenuHolder" style={submenuColor}>
                    <i className="ion-flash" />
                    <span className="nav-text">Switch</span>
                  </span>
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="#" onClick={this.logUserOutHandler} >
                  <span className="isoMenuHolder" style={submenuColor}>
                    <i className="ion-android-checkbox-outline" />
                    <span className="nav-text">Logout</span>
                  </span>
                </Link>
              </Menu.Item>
                
            </Menu>
          </Scrollbars>
        </Sider>
      </SidebarWrapper>
    );  
  }
};

const mapStateToProps = state => ({
  App: state.App,
  Theme: state.ThemeSwitcher.sidebarTheme,
  roles: state.AuthReducer.roles
});

export default withRouter(connect(mapStateToProps, null)(Sidebar));
