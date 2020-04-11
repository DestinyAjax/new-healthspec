import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styles from './Sidebar.component.module.css';

import { toggle } from '../../shared/actions/Menu.action';
import { removeStorage } from '../../shared/utils/storage';

class Sidebar extends React.Component {

    navigateTo = permission => {
        if (window.innerWidth <= 1200) {
            this.props.toggle();
        }
        return this.props.history.push(permission.url);
    }

    logUserOutHandler = () => {
        removeStorage('ohis:auth_token');
        removeStorage('ohis:reduxState');

        return this.props.history.push('/');
    }

    componentDidMount() {
    }

    render() {
        const permission_roles = this.props.role.role.permission_roles;

        let menuContainer;

        let menus = permission_roles.map(permission_role => {

            if (permission_role.permission.is_menu_link) {
                let activeMenu = (this.props.location.pathname == permission_role.permission.url) ? styles.active : '';
                let menuClass = `${styles.menu} ${activeMenu} ${styles.mobileMenu}`;

                return (
                    <div className={menuClass} key={permission_role.permission.id} onClick={() => this.navigateTo(permission_role.permission)}>
                        <div className={[styles.icon, styles.mobileIcon].join(" ")}><i className={permission_role.permission.icon}></i></div>
                        <div className={[styles.title, styles.mobileTitle].join(" ")}>{permission_role.permission.name}</div>
                    </div>
                )
            }

        });

        if (this.props.is_opened) {
            menuContainer = (
                <div>
                    {menus}


                    <div className={[styles.menu, styles.mobileMenu].join(" ")} onClick={this.logUserOutHandler}>
                        <div className={[styles.icon, styles.mobileIcon].join(" ")}><i className="fa fa-sign-out"></i></div>
                        <div className={[styles.title, styles.mobileTitle].join(" ")}>logout</div>
                    </div>
                </div>
            )
        }

        return (
            <div className={styles.container}>
                { menuContainer }
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        role: state.ChoseRoleReducer.role,
        is_opened: state.MenuReducer.is_opened
    };
}

const mapDispatchToProps = dispatch => {
    return {
        toggle: () => dispatch(toggle())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sidebar));