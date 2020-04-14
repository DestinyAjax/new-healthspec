import React, { Fragment } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import FooterStyleWrapper from './FooterComponent.styles';

const FooterComponent = props => {
	return (
		<FooterStyleWrapper className="FooterComponentStyle">
			{props.bottomFooter && (
				<div className="footerTop">
					<div className="container">
						<div className="row">
							<div className="col-md-6 col-lg-6 col-sm-12 col-xs-12">
								<img src="/images/doctor.png" className="cssanimation fadeIn" alt="" className="" />
							</div>
							<div className={`col-md-6 col-lg-6 col-sm-12 col-xs-12 cssanimation fadeIn`}>
								<div className="formContent">
									<h2 className="h2">LEAVE US A MESSAGE</h2>
									<span className="bar"></span>
									<form>
										<div className="form-row mt-4">
											<div className={`col`}>
												<input type="text" className={`form-control formInput`} placeholder="Full Name" style={{height: '60px',padding: 10,fontSize:'18px'}}/>
											</div>
											<div className="col">
												<input type="text" className={`form-control formInput`} placeholder="Email Address" style={{height: '60px',padding: 10,fontSize: '18px'}}/>
											</div>
										</div>
										<div className="form-group">
											<textarea row="5" className="mt-4 form-control" style={{height: '120px',padding: 10,fontSize: '18px'}} placeholder="Message"></textarea>
										</div>
										<button className="btn btn-lg btn-success mt-2" style={{height: '50px',width: '100%',backgroundColor: '#15974b'}} type="button">Submit</button>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
			<div className="footer">
				<div className="container">
					<div className="row">
						<div className="col-md-4 col-sm-12 col-xs-12 text-left">
							<a href="http://healthspecsltd.com/" className="logo" target="_blank">
								<img src='/images/Rectangle.png' className="" />
							</a>
						</div>
						<div className="col-md-4 col-lg-3 col-sm-12 col-xs-12 text-center">
							<a target="_blank" className="socialLink" href='https://twitter.com/OsunHIS?s=08'>
								<i className="fa fa-facebook-square" aria-hidden="true"></i>
							</a>
							<a target="_blank" className="socialLink" href='https://www.facebook.com/OsunHealthInsuranceScheme/'>
								<i className="fa fa-twitter" aria-hidden="true"></i>
							</a>
							<a target="_blank" className="socialLink" href='https://www.instagram.com/osun_his/'>
								<i className="fa fa-instagram" aria-hidden="true"></i>
							</a>
							<a target="_blank" className="socialLink" href='https://www.youtube.com/channel/UCUhNCzyzq2gHQJjeR2-Ca1w'>
								<i className="fa fa-youtube" aria-hidden="true"></i>
							</a>
						</div>
						<div className="col-md-4 col-sm-12 col-xs-12 text-right">
							<span className="scroll pull-right">
								<a href="#up"></a><FaArrowUp />
							</span>
						</div>
					</div>
				</div>
			</div>
			<div className="bottomFooter text-center">
				<p>info@ohis.com. &copy; {Date().getFullYear} OHIS. All Rights Reserved.</p>
			</div>
		</FooterStyleWrapper>
	);
}

export default FooterComponent;