import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import styles from './Breadcrumb.component.module.css';

const Breadcrumb = props => {
    let links = props.links.map(link => (
        <Link to={link.url} className={[styles.item, styles.itemTwo].join(" ")} key={link.url}> > {link.name}</Link>
    ));

    return (
        <div className={'card-body bg-light '} >
            <Link className={styles.item} to="/chose_role">Dashboard</Link>
            {links}
        </div>
    )
}

Breadcrumb.defaultProps = {
    links: []
}

const mapStateToProps = state => {
    return {
        active: state.ChoseRoleReducer.role
    }
}

export default withRouter(connect(mapStateToProps)(Breadcrumb));