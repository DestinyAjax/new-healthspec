import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Policy.component.module.css';

import { currency_formatter } from '../../shared/utils/currency_formatter';

const Policy = props => {

	const classes = props.showBorder ? [styles.container, styles.addBorder] : [styles.container] 

	return (
		<div className="col-md-4 col-lg-4 col-sm-12 col-xs-12">
			<div className="col-md-12 col-sm-12 col-xs-12 card mb-4 p-4">
				<div className={'h3'} >{props.name}</div>	
				<div className={styles.subTitle}>&#8358;{currency_formatter(props.amount)}</div>
				<ul className={styles.items}>
					{props.services.map(service => (
						<li key={service.name} className={styles.policyItem}><img src={require('../../assets/images/policy.png')} /> <span>{service.name}</span></li>
					))}
				</ul>

				<Link className={styles.getStartedButton} to={{ pathname: `/guest_policy_add_${props.policyId}` }}>
					<span className={styles.getStarted}>Get Started</span>
					<img src={require('../../assets/images/forward-arrow.png')} />
				</Link>
			</div>
		</div>
	);
}

export default Policy;