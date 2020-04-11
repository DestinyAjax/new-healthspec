import React, { Fragment } from 'react';
import { Link } from "react-router-dom";
import './ContentCard.css';

const ContentCard = ({image, content, header, subHeader}) => {
    return (
        <Fragment>
            <div className="content-card col-md-4 col-lg-4 mb-7 mb-md-0 col-sm-12 col-xs-12">
                <div className="card card-view cssanimation fadeIn">
                    <img src={image} className="card-img-top" alt="..." height="177"/>
                    <div className="card-body">
                        <h6 className="text-uppercase">{subHeader}</h6>
                        <h5 className="card-title">{header}</h5>
                        <p className="card-text mb-3">{content}</p>
                        <Link to="/guest_policy" className="link">Get started</Link>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default ContentCard;