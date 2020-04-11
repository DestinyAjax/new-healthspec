import React from 'react';
import { Link } from 'react-router-dom'; 
import styles from './SuccessCard.component.module.css';

const SuccessCard = props => (
	<div className={styles.container}>
		<div className={styles.imageContainer}>
			<img src={require('../../assets/images/Vector.png')} />
		</div>
		<div className={styles.success}>
			Success
		</div>
		<div className={styles.message}>
			Portal Logon - You will receive logon details in your e-mail which will give you access to your policy and you can begin accessing care. 
		</div>
		<Link target="_blank" to={{ pathname: '/auth' }} className={styles.redirectLink}>Click here to log in</Link>
	</div>
);

export default SuccessCard;