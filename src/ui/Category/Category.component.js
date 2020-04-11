import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import styles from './Category.component.module.css';

const Category = props => {
	const classes = props.showBorder ? [styles.container, styles.addBorder] : [styles.container]
	return (
		<Fragment>
			<div className="col-md-4 col-sm-12 col-xs-12 col-lg-4">
				<div className="col-md-12" style={{border: '2px solid #15974b',height: '230px'}}>
					<div className={'h3'} >{props.name}</div>
					<div className={styles.subTitle}>{props.organization}</div>
					<div className={styles.description}>
						{props.description}
					</div>
					<div className={styles.getStartedButton}>
						<Link className={styles.getStarted} to={{ pathname: `${props.register_url}` }}>{props.call_to_action}</Link>
						{/* <Link className={styles.getStarted} to={{ pathname: `${props.url}` }}>Get Started</Link> */}
					</div>
				</div>
			</div>
		</Fragment>
	);
}

Category.defaultProps = {
	name: '',
	organization: 'Organization',
	call_to_action: 'Get Started',
}

export default Category;