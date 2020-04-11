import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './Switch.component.module.css';

class Switch extends React.Component {

    getDisplay = name => {
        return name.split("_").join(" ");
    }

    // componentDidMount() {
    //     console.dir(this.props.active.organization_profile.name);
    // }

    render () {
        return (
            <div className={styles.container}>
                <div className={styles.description}>
                    <div>
                        { this.props.active.organization_profile  ? (<div className={styles.name}>Welcome {this.props.name} - ({this.props.active.organization_profile.name})</div>) : (<div className={styles.name}>Welcome {this.props.name}</div>)}
                        <div className={styles.message}>You can make changes to your dashboard and view active plans</div>
                    </div>
                    <div className={styles.privilege}>
                        <div className={styles.role}>{this.getDisplay(this.props.active.role.name)}</div>
                        {this.props.active.organization_profile && (<div className={styles.organization}>{this.props.active.organization_profile.name}</div>)}
                    </div>
                </div>
                <Link className={styles.action} to="/chose_role">
                    <div><img src={require('../../assets/images/switch.png')} /></div>
                    <div className={styles.mode}>Switch Mode</div>
                </Link>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        name: state.AuthReducer.name,
        active: state.ChoseRoleReducer.role
    }
}

export default connect(mapStateToProps)(Switch);