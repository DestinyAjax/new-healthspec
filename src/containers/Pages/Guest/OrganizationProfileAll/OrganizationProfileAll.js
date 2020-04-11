import React, {Fragment} from 'react';
import FooterComponent from '../../Home/components/Footer/FooterComponent';
import HeaderComponent from '../../Home/components/Header/HeaderComponent';
import OrganisationStyleWrapper from './OrganizationStyle';
import Datatable from '../../../../ui/Datatable';
import '../../Home/style.css';

class OrganizationProfileAll extends React.Component {

    state = {
		organization_profile_url: '2',
		organization_profile_name: '',
		organization_profile_number: '2',
	}

	componentDidMount() {
		this.checkSlug(this.props.match.params.slug);
	}

	checkSlug = slug => {
		if ((slug != 'all-company') && (slug != 'all-hospital') && (slug != 'all-agent')) {
			return this.props.history.push('/');
		}

		let organization_profile_name = '';
		let organization_profile_number = '';
		let organization_profile_url = '';

		if (slug == 'all-company') {
			organization_profile_name = 'Company';
			organization_profile_number = '3';
			organization_profile_url = 'Company';
		}
		if (slug == 'all-hospital') {
			organization_profile_name = 'Hospital';
			organization_profile_number = '2';
			organization_profile_url = 'Hospital';
		}

		this.setState({
			organization_profile_url: organization_profile_url,
			organization_profile_name: organization_profile_name,
			organization_profile_number: organization_profile_number,
		});
    }
    
    render() {
        return (
            <Fragment>
                <HeaderComponent />
                <OrganisationStyleWrapper className="isoBenefitPageWrapper">
                    <section className="second-section">
                        <div className="row mb-4 text-center">
                            <div className="col-md-12">
                                <h2 className="mb-3">Search Our Hospitals</h2>
                                <span className="bar"></span>
                            </div>
                        </div>
                    </section>
                    <div className="container mt-4">
                        <div className="datatable">
                        <Datatable
                                columns={[
                                    {
                                        key: 'id',
                                        title: 'ID',
                                        cell: 'Default',
                                        searchable: false,
                                    },
                                    {
                                        cell: 'Default',
                                        searchable: true,
                                        key: 'name',
                                        title: 'Name',
                                        search_key: 'name',
                                    },
                                    {
                                        cell: 'Default',
                                        key: 'code',
                                        searchable: false,
                                        title: 'Code',
                                    },
                                    {
                                        cell: 'Default',
                                        searchable: false,
                                        key: 'category',
                                        title: 'Provider Type',
                                    },
                                    {
                                        cell: 'Default',
                                        searchable: false,
                                        key: 'owner_phone_number',
                                        title: 'Contact',
                                    },
                                ]}
                                url={`organization_profile/index/${this.state.organization_profile_number}`}
                                actions={[]}
                            />
                        </div>
                    </div>
                </OrganisationStyleWrapper>
                <FooterComponent bottomFooter={false}/>
            </Fragment>  
        );
    }
};

export default OrganizationProfileAll;