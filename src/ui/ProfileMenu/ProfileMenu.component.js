import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import styles from './ProfileMenu.component.module.css';

const ProfileMenu = props => {
    return (
        <div className={styles.container}>
            <div className={styles.image}>
                <img src={props.profile_picture} />
            </div>
            <NavLink to={`/summary`} activeClassName="active" className={styles.menu}>Summary</NavLink>
            <NavLink to={`/profile_show_${props.active.slug}`} activeClassName="active" className={styles.menu}>My Profile</NavLink>
            <NavLink to="/billing_information_" className={styles.menu} activeClassName="active">Billing Information</NavLink>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        active: state.ChoseRoleReducer.role,
    };
}

const mapDispatchToProps = dispatch => {
    return {}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileMenu));