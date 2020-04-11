import React, { Fragment } from 'react';
import styles from './Footer.component.module.css';
import { FaArrowUp } from 'react-icons/fa';

const Footer = props => {
	return (
		<>
			<div className={styles.footerTop}>
				<div className={styles.footerTopItem}>
					<img src="/doctor.png" className="cssanimation fadeIn" alt="" className="" />
				</div>

				<div className={styles.footerTopItem}>
					<div className={styles.formContent}>
						<h2>LEAVE US A MESSAGE</h2>
						<span className={styles.bar}></span>
						<form>
							<div className="form-row mt-4">
								<div className={`col`}>
									<input type="text" className={`form-control ${styles.formInput}`} placeholder="Full Name" style={{height: '60px',padding: 10,fontSize:'18px'}}/>
								</div>
								<div className="col">
									<input type="text" className={`form-control ${styles.formInput}`} placeholder="Email Address" style={{height: '60px',padding: 10,fontSize: '18px'}}/>
								</div>
							</div>
							<div className="form-group">
								<textarea row="5" className="mt-4 form-control" style={{height: '120px',padding: 10,fontSize: '18px'}} placeholder="Message"></textarea>
							</div>
							<button className="btn btn-lg btn-primary mt-2" style={{height: '60px',width: '232px',backgroundColor: '#15974b'}} type="button">Submit</button>
						</form>
					</div>
				</div>
			</div>

			<div className={styles.footer}>
				<div className="container">
					<div className="row">
						<div className="col-md-4">
							<p className={styles.p}>info@ohis.com</p>
							<p className={styles.p}>Copyright {Date().getFullYear} OHIS. All Rights Reserved.</p>
						</div>
						<div className="col-md-4 col-sm-12 col-xs-12 text-center">
							<a href="http://healthspecsltd.com/" className={styles.logo} target="_blank">
								<img src='/Rectangle.png' className="" />
							</a>
						</div>
						<div className="col-md-3 col-lg-3 col-sm-12 col-xs-12">
							<a target="_blank" className={styles.socialLink} href='https://twitter.com/OsunHIS?s=08'>
								<i className="fa fa-facebook-square" aria-hidden="true"></i>
							</a>
							<a target="_blank" className={styles.socialLink} href='https://www.facebook.com/OsunHealthInsuranceScheme/'>
								<i className="fa fa-twitter" aria-hidden="true"></i>
							</a>
							<a target="_blank" className={styles.socialLink} href='https://www.instagram.com/osun_his/'>
								<i className="fa fa-instagram" aria-hidden="true"></i>
							</a>
							<a target="_blank" className={styles.socialLink} href='https://www.youtube.com/channel/UCUhNCzyzq2gHQJjeR2-Ca1w'>
								<i className="fa fa-youtube" aria-hidden="true"></i>
							</a>
						</div>
						<div className="col-md-1 col-sm-12 col-xs-12">
							<span className={styles.scroll}>
								<a href="#up"></a><FaArrowUp />
							</span>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Footer;