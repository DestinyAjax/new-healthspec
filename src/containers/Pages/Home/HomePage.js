import React, { Component, Fragment} from 'react';
import { Link } from "react-router-dom";
import { FaArrowRight, FaArrowCircleRight } from 'react-icons/fa';
import FooterComponent from './components/Footer/FooterComponent';
import HeaderComponent from './components/Header/HeaderComponent';
import PhotoCardComponent from './components/PhotoCard/PhotoCardComponent';
import './style.css';

class HomePage extends Component {

    render() {
        let policies;

        if (this.props.status === 200) {
            let policyArray = this.props.policies.map(policy => (
                <div className="pol-card policy_card">
                    <h6>{policy.name}</h6>
                    <h2>₦{parseInt(policy.price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</h2>
                    <span><i><FaArrowCircleRight /></i> {policy.name}</span>
                    <span>
                        <i><FaArrowCircleRight /></i> Maximum {policy.maximum_no_of_beneficiary_dependant} Dependents
                    </span>
                    <p style={{marginTop: '10px'}}><Link to={{ pathname: `/guest_policy_add_${policy.id}` }} className="started">Get Started <FaArrowRight /></Link></p>
                </div>
            ));

            policies = (
                <div class="col-md-6 col-lg-6 col-sm-12 col-xs-12">
                    <div className="col-md-12 pol-card cssanimation fadeIn">{ policyArray }</div> 
                </div>
            );
        }

        return (
            <Fragment>
                <HeaderComponent />
                    <section className="top-slider" >
                        <div className="container">
                            <div className="col-md-7">
                                {/** display for desktop screens */}
                                <div className="top-content d-none d-md-block" style={{paddingTop: '70px'}}>
                                    <h3 className="d-block mb-2 mt-3">Osun Health Insurance SCHEME</h3>
                                    <h1 className="mb-5 leJoltZoom sequence">Providing access to qualitative healthcare without tears</h1>
                                    <form className="form-inline">
                                        <div className="form-group mr-3">
                                            <input className="form-control input" placeholder="Find a policy that works for you" type="text" />
                                        </div>
                                        <button type="submit" className="button btn btn-primary mb-2">
                                            Search {" "}
                                            <FaArrowRight />
                                        </button>
                                    </form>
                                </div>
                                {/** display for obile screens */}
                                <div className="top-content d-block d-md-none" style={{paddingTop: '30px'}}>
                                    <h3 className="d-block mb-2 mt-3">Insure your health</h3>
                                    <h1 className="mb-5">Providing access to qualitative health care without tears</h1>
                                    <form className="form-inline">
                                        <div className="form-group mr-3">
                                            <input className="form-control input" placeholder="Find a policy that works for you" type="text" />
                                        </div>
                                        <button type="submit" className="button btn btn-primary mb-2">
                                            Search {" "}
                                            <FaArrowRight />
                                        </button>
                                    </form>
                                </div>
                            </div>
                            <div className="col-md-5"></div>
                        </div>
                    </section>
                    <section className="policy-section">
                        <div className="container">
                            <div className="row mb-4 text-center">
                                <div className="col-md-12">
                                    <h2 className="mb-3 cssanimation fadeIn">Our Policies</h2>
                                    <span className="bar"></span>
                                </div>
                            </div>
                            <div className="clearfix"></div><br/>
                            <div className="row">
                                <div className="col-md-4 col-sm-12 col-xs-12 first cssanimation fadeIn">
                                    <h3>SAVING YOU</h3>
                                    <h1>OHIS Policy</h1>
                                    <p>Choose a policy that best suit your insurance needs and get started</p>
                                    <Link to="/guest_policy" style={{fontSize: '14px',fontWeight: 'bold'}}>Choose a policy</Link>
                                </div>
                                <div className="col-md-8 col-lg-8 col-sm-12 col-xs-12">
                                    <div className="row">{ policies }</div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="flat-section d-none d-md-block">
                        <div className="container">
                            <div className="row top-layer">
                                <div className="col-md-3 first">
                                    <h3 className="">How it works</h3>
                                    <span ></span>
                                    <p>Find out about the different types of policies you are eligible to register and how to go about it.</p><br/><br/>
                                    <Link to="/guest_benefit" className="mt-3">Find out more <FaArrowRight /></Link>
                                </div>
                                <PhotoCardComponent type="second" />
                                <PhotoCardComponent type="third" />
                                <PhotoCardComponent type="forth" />
                            </div>
                        </div>
                    </section>
                    <section className="fluid-section">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-6 map cssanimation fadeIn">
                                </div>
                                <div className="col-md-6 content">
                                    <p className="mb-5 cssanimation fadeIn">"Revitalizing Primary Healthcare Centres PHCs; thereby giving access to all citizens whether you reside in the inner most part of our rural areas or semi urban centres and this will in turn reduce child and maternal mortality,
                                        communicable and non-communicable diseases which will give credence to a more healthier and productive citizenry".</p>
                                    <h4>Gboyega Oyetola</h4>
                                    <span>Executive Governor of Osun State</span>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* <section className="partners-section">
                        <div className="container">
                            <div className="row mb-4 text-center">
                                <div className="col-md-12">
                                    <h2 className="mb-3">OUR PARTNERS</h2>
                                    <span className="bar"></span><br/><br/>
                                </div>
                            </div>
                            <div className="row text-center">
                                <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
                                    <img src="/images/partners/FMOH-Logo.png" className="mr-4" alt="" />
                                    <img src="/images/partners/Logo-WHO.png" className="mr-4" alt="" />
                                    <img src="/images/partners/NEMA-2.png" className="mr-4" alt="" />
                                    <img src="/images/partners/UNICEF_Logo.png" className="mr-4" alt="" />
                                    <img src='/images/hs-log.png' className="" alt=""/>
                                </div>
                            </div>
                        </div>
                    </section> */}
                <FooterComponent bottomFooter={true} />
            </Fragment>
        );
    }
}

export default HomePage;