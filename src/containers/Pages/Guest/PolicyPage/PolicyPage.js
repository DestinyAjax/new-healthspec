import React from 'react';
import {connect} from 'react-redux';
import FooterComponent from '../../Home/components/Footer/FooterComponent';
import HeaderComponent from '../../Home/components/Header/HeaderComponent';
import { getDefaultData } from '../../../../shared/actions/Guest.action';
import PolicyCard from '../../../../ui/Policy';
import PolicyPageStyleWrapper from './PolicyPage.style';

class PolicyPage extends React.Component {
    componentDidMount() {
		this.props.dispatch(getDefaultData());
	}
    render() {
        let policies;
		if (this.props.status === 200) {
			policies = this.props.policies.map(policy => (
				<PolicyCard
					name={policy.name}
					amount={policy.price.toLocaleString()}
					services={[
						{
							name: `${policy.name}`
						},
						{
							name: `Maximum ${policy.maximum_no_of_beneficiary_dependant} Dependents`
						},
					]}
					policyId={policy.id}
					key={policy.id}
					showBorder
				/>
			));
        }
        
        return (
            <React.Fragment>
                <HeaderComponent />
                <PolicyPageStyleWrapper className="isoPolicyPageWrapper">
                    <section className="second-section">
                        <div className="row mb-4 text-center p-3">
                            <div className="col-md-12 col-sm-12 col-xs-12">
                                <h2 className="mb-3">Select A Policy to Get Started</h2>
                                <span className="bar"></span>
                            </div>
                        </div>
                    </section>
                    <div className="container mb-4">
                        <div className="row">
                            {policies}
                        </div>
                    </div><br/><br/>
                </PolicyPageStyleWrapper>
                <FooterComponent />
            </React.Fragment>
        );
    }
};

const mapStateToProps = state => ({
    policies: state.GuestReducer.policies,
	status: state.GuestReducer.get_default_data_status
});

export default connect(mapStateToProps, null)(PolicyPage);