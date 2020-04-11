import React, {Fragment} from 'react';
import FooterComponent from '../../Home/components/Footer/FooterComponent';
import HeaderComponent from '../../Home/components/Header/HeaderComponent';
import OrganisationStyleWrapper from './OrganizationStyle';
import Category from '../../../../ui/Category';
import '../../Home/style.css';

class OrganizationProfile extends React.Component {
    render() {
        return (
            <Fragment>
                <HeaderComponent />
                <OrganisationStyleWrapper className="isoBenefitPageWrapper">
                    
                    <div className="container mt-4">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-header">Select A Category to Get Started</div>
                                    <div className="card-body">
                                        <Category
                                            showBorder
                                            name="COMPANY"
                                            description="Enroll your organization for the State Insurance Coverage for your Employees."
                                            url="guest_organization_profile_add_new-company"
                                        />

                                        <Category
                                            showBorder
                                            name="PROVIDER"
                                            description="Enroll your organization for the State Insurance Coverage for your Employees."
                                            url="guest_organization_profile_add_new-hospital"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </OrganisationStyleWrapper>
                <FooterComponent bottomFooter={false}/>
            </Fragment>  
        );
    }
};

export default OrganizationProfile;