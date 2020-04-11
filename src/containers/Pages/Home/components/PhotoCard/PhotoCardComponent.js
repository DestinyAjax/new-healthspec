import React, { Fragment } from 'react';
import './style.css';

const PhotoCardComponent = ({type}) => {

    return (
        <Fragment>
            {( type === 'forth' &&
                <div className="col-md-3 col-lg-3 col-sm-12 col-xs-12" style={{padding: 0}} >
                    <div className="photo-card cssanimation fadeIn forth col-md-12 col-lg-12 col-sm-12 col-xs-12" style={{padding: 0}}>
                        <div className="cover">
                            <div className="content">
                                <div className="square">03</div>
                                <p>Activate your policy and proceed to hospital for care.</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {( type === 'third' &&
                <div className="col-md-3 col-lg-3 col-sm-12 col-xs-12" style={{padding: 0}}>
                    <div className="photo-card cssanimation fadeIn third col-md-12 col-lg-12 col-sm-12 col-xs-12" style={{padding: 0}}>
                        <div className="cover">
                            <div className="content">
                                <div className="square">02</div>
                                <p>Explore our provider list and choose an hospital of your choice.</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {( type === 'second' &&
                <div className="col-md-3 col-lg-3 col-sm-12 col-xs-12" style={{padding: 0}}>
                    <div className="photo-card cssanimation fadeIn second col-md-12 col-lg-12 col-sm-12 col-xs-12" style={{padding: 0}}>
                        <div className="cover">
                            <div className="content">
                                <div className="square">01</div>
                                <p>Choose a policy and register as an enrolee of the scheme.</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Fragment>
    );
};

export default PhotoCardComponent;