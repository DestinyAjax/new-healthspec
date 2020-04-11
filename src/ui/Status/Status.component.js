import React from 'react';
import styles from './Status.component.module.css';

const Status = ({status}) => {
    let statusContainer = (status === 0 || status === "INACTIVE") ? <div className={styles.inactive}>Inactive</div> : <div className={styles.active}>Active</div>

    return (
        <React.Fragment>
            { statusContainer }
        </React.Fragment>
    )
}

export default Status;