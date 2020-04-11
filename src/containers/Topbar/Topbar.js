import React from 'react';
import {connect} from 'react-redux';
import { Layout } from 'antd';
import appActions from '@iso/redux/app/actions';
import TopbarSearch from './TopbarSearch';
import TopbarUser from './TopbarUser';
import { removeStorage } from '../../utils/storage';
import TopbarWrapper from './Topbar.styles';

const { Header } = Layout;
const { toggleCollapsed } = appActions;

class Topbar extends React.Component {

  state = {
    selectedItem: ''
  }

  handleToggle = () => {
    const {dispatch} = this.props;
    dispatch(toggleCollapsed());
  }

  logUserOutHandler = () => {
    removeStorage('ohis:auth_token');
    removeStorage('ohis:reduxState');

    return this.props.history.push('/');
  }
  
  render() {
    let token = this.props.active.role.name.split("_");
    let admin_name = `${token[0]} ${token[1]}`;

    const {Theme,App:{collapsed, openDrawer}} = this.props;
    const isCollapsed = collapsed && !openDrawer;
    const styling = {
      background: Theme.backgroundColor,
      position: 'fixed',
      width: '100%',
      height: 70,
    };

    return (
      <TopbarWrapper>
        <Header
          style={styling}
          className={
            isCollapsed ? 'isomorphicTopbar collapsed' : 'isomorphicTopbar'
          }
        >
          <div className="isoLeft">
            <button
              className={
                isCollapsed ? 'triggerBtn menuCollapsed' : 'triggerBtn menuOpen'
              }
              style={{ color: Theme.textColor }}
              onClick={this.handleToggle}
            />
            <span style={{marginLeft: '50px'}}>{admin_name}</span>
          </div>

          <ul className="isoRight">
            <li className="isoSearch">
              <TopbarSearch />
            </li>
            <li onClick={() => this.setState({selectedItem: 'user'})} className="isoUser">
              <TopbarUser />
            </li>
          </ul>
        </Header>
      </TopbarWrapper>
    );
  }
}

const mapStateToProps = state => ({
  App: state.App,
  Theme: state.ThemeSwitcher.topbarTheme,
  active: state.ChoseRoleReducer.role,
});

export default connect(mapStateToProps, null)(Topbar);
