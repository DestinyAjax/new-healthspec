import React, { Component } from 'react';
import {connect} from 'react-redux';
import swal from 'sweetalert';
import classnames from 'classnames';
import {Card} from 'antd';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import LayoutContent from '@iso/components/utility/layoutContent';
import DashboardLayout from '../../../containers/Dashboard/Dashboard';
import Datatable from '../../../ui/Datatable';
import Loader from '../../../ui/Loader/Loader.Component';
import { getOrganization, updateOrganization } from "../../../shared/actions/General.action";
import { states_and_locals } from '../../../shared/utils/state_lga';
import { local_governments } from '../../../shared/utils/local_government';
import CustomButton from '../../../ui/CustomButton';

class ProviderView extends Component {

    state = {
        requestingForm: false,
        url: '',
        slug: '',
        activeTab: "profile",
        setActiveTab: "profile",
        wardens: [],
        lgas: [],
        state: "",
        website: "",
        warden: "",
        bank_name: "",
        account_name: "",
        account_number: "",
        local_government: "",
        name: "",
        registration_number: "",
        registration_year: "",
        expiry_date: "",
        license_number: "",
        date_of_birth: "",
        date_of_issue: "",
        grade: "",
        type: "",
        office_address: "",
        postal_address: "",
        professional_qualification: "",
        surname: "",
        first_name: "",
        other_name: "",
        primary_phone_number: "",
        phone: "",
        email: "",
        last_name: ""
      };
    
      stateHandler = async e => {
        e.preventDefault();
        await this.setState({ state: e.target.value });
    
        let lgas = states_and_locals.filter(state => {
          return state.state.name === this.state.state;
        });
    
        this.setState(
          { lgas: lgas[0].state.locals },
          console.log(lgas[0].state.locals)
        );
      };
    
      changeHandler = async e => {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
      };
    
      localGovtChosen = (event, newValue, previousValue, name) => {
          let local_government = local_governments.filter(
            local_government => event.target.value === local_government.displayValue
          );
    
          // console.dir(local_government);
    
          this.setState({
            wardens: local_government[0].wardens
          });
      };
    
      setActiveTab = tab => {
        this.setState({
          activeTab: tab
        });
      };
      
      componentDidMount() {
        let data = {
          url: `dashboard/organization_profile/show/${this.props.match.params.id}`
        };
        this.getProile(data);
      }
    
      componentWillReceiveProps(props){
        this.getPropsData(props);
      }
    
      getPropsData = (props) => {
        if(props.status === 200){
          const {
            state,
            website,
            warden,
            local_government,
            name,
            registration_number,
            registration_year,
            expiry_date,
            license_number,
            date_of_issue,
            grade,
            type,
            bank_name,
            account_name,
            account_number,
            office_address,
            postal_address,
            professional_qualification,
            last_name,
            owner
          } = props.data;
      
          const {
            email,
            first_name,
            primary_phone_number,
            date_of_birth,
            other_name,
            surname
          } = owner;
      
          this.setState({
            state,
            website,
            warden,
            local_government,
            name,
            registration_number,
            registration_year,
            expiry_date,
            license_number,
            date_of_birth,
            date_of_issue,
            bank_name,
            account_name,
            account_number,
            grade,
            type,
            office_address,
            postal_address,
            professional_qualification,
            surname,
            first_name,
            other_name,
            primary_phone_number,
            email,
            last_name
          });
        }
      }
    
      getProile = data => {
        this.props.getOrganization(data)
      };
    
      showNotification = async() => {
          if (this.props.status === 200 && this.props.data !== null) {
              // this.props.reset('PolicyForm');
              this.setState({
                  requestingForm: false
              });
    
              let alert = await swal({
                  title: "Good job!",
                  text: `${this.props.message}`,
                  icon: "success",
                  closeOnClickOutside: false
              });
    
              if (alert) {
                  this.setState({
                      requestingForm: false
                  });
              }
          }
      }
    
      handleSubmit = () => {
          const { name, type, grade, state, warden, local_government, bank_name, account_name, account_number,
          office_address, postal_address, license_number, date_of_issue, expiry_date, registration_year, registration_number, website 
          } = this.state;
          const data = { name, type, grade, state, warden, local_government, bank_name, account_name, account_number,
              office_address, postal_address, license_number, date_of_issue, expiry_date, registration_year, registration_number, website 
          };
          this.setState({
              requestingForm: true,
          }, () => {
              data.url = 'dashboard/organization_profile/update';
              data.slug = `${this.props.match.params.id}`;
              this.props.updateOrganization(data);
          });
          this.showNotification();
      }
    render() {

        const { status, data } = this.props;
        let profile;

        const toggle = tab => {
            if (this.state.activeTab !== tab) this.setActiveTab(tab);
        };

        if (status === 200 && (data.type === "PROVIDER")) {
            profile = (
                <div className="row">
                    <div className="col-lg-4 col-md-4 col-sm-12 ">
                        <div className="form-group">
                            <label for="Surname">Surname</label>
                            <input
                                disabled
                                onChange={this.changeHandler}
                                className="form-control"
                                value={this.state.surname}
                                name="surname"
                                // component={CustomInput}
                                type="text"
                            />
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12 ">
                        <div className="form-group">
                            <label for="First name">First name</label>
                            <input
                                disabled
                                onChange={this.changeHandler}
                                className="form-control"
                                value={this.state.first_name}
                                name="first_name"
                                type="text"
                            />
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12 ">
                        <div className="form-group">
                            <label for="other_name">Middle name</label>
                            <input
                                disabled
                                onChange={this.changeHandler}
                                className="form-control"
                                value={this.state.other_name}
                                name="other_name"
                                type="text"
                            />
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12 ">
                        <div className="form-group">
                            <label for="date_of_birth">Date of Birth</label>
                            <input
                                disabled
                                onChange={this.changeHandler}
                                className="form-control"
                                value={this.state.date_of_birth}
                                name="date_of_birth"
                                type="date"
                            />
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12 ">
                        <div className="form-group">
                            <label for="email">Email</label>
                            <input
                                disabled
                                onChange={this.changeHandler}
                                className="form-control"
                                value={this.state.email}
                                name="email"
                                type="email"
                            />
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12 ">
                        <div className="form-group">
                            <label for="primary_phone_number">Phone Number</label>
                            <input
                                disabled
                                onChange={this.changeHandler}
                                className="form-control"
                                value={this.state.primary_phone_number}
                                name="primary_phone_number"
                                type="text"
                            />
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12 ">
                        <div class="form-group">
                            <label for="name">Organization name</label>
                            <input
                                onChange={this.changeHandler}
                                className="form-control"
                                value={this.state.name}
                                name="name"
                                type="text"
                            />
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12 ">
                        <div className="form-group">
                        <label for="registration_year">Registration Date</label>
                            <input
                                onChange={this.changeHandler}
                                className="form-control"
                                value={this.state.registration_year}
                                name="registration_year"
                                type="date"
                            />
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12 ">
                        <div className="form-group">
                            <label for="registration_number">Registration number</label>
                            <input
                                onChange={this.changeHandler}
                                className="form-control"
                                value={this.state.registration_number}
                                name="registration_number"
                                type="text"
                            />
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12 ">
                        <div className="form-group">
                            <label for="license_number">License number </label>
                            <input
                                onChange={this.changeHandler}
                                className="form-control"
                                value={this.state.license_number}
                                name="license_number"
                                type="text"
                            />
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12 ">
                        <div className="form-group">
                            <label for="date_of_issue">Date of issue</label>
                            <input
                                onChange={this.changeHandler}
                                className="form-control"
                                value={this.state.date_of_issue}
                                name="date_of_issue"
                                type="date"
                            />
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12 ">
                        <div className="form-group">
                            <label for="expiry_date">Expiry Date</label>
                            <input
                                onChange={this.changeHandler}
                                className="form-control"
                                value={this.state.expiry_date}
                                name="expiry_date"
                                type="date"
                            />
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12 ">
                        <div className="form-group">
                            <label for="grade">Grade</label>
                            <select className="form-control" onChange={this.changeHandler} name="grade">
                                <option value="P" selected={this.state.grade === "P"}>Primary</option>
                                <option value="S" selected={this.state.grade === "S"}>Secondary</option>
                                <option value="T" selected={this.state.grade === "T"}>Dual</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12 ">
                        <div className="form-group">
                            <label for="type">Type</label>
                            <select className="form-control"  onChange={this.changeHandler}  value={this.state.type} name="type">
                                <option>Private</option>
                                <option>Public</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12 ">
                        <div className="form-group">
                            <label for="office_address">Office Address</label>
                            <input
                                onChange={this.changeHandler}
                                className="form-control"
                                value={this.state.office_address}
                                name="office_address"
                                type="text"
                            />
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12 ">
                        <div className="form-group">
                            <label for="postal_address">Postal Address</label>
                            <input
                                onChange={this.changeHandler}
                                className="form-control"
                                value={this.state.postal_address}
                                name="postal_address"
                                type="text"
                            />
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12 ">
                        <div className="form-group">
                        <label for="local_government">Local Govt.</label>
                        <select className="form-control" name="local_government" onChange={this.localGovtChosen}>
                            {local_governments.map(local_government => {
                                return (
                                    <option
                                    key={local_government.value}
                                    value={local_government.displayValue}
                                    selected={this.state.local_government === local_government.displayValue}
                                    >
                                    {local_government.displayValue}
                                    </option>
                                );
                            })}
                        </select>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12 ">
                        <div className="form-group">
                            <label for="Ward">Ward</label>
                            <select  className="form-control" onChange={this.wardenChosen} name="warden" >
                                {this.state.wardens.map(warden => {
                                    return (
                                        <option
                                        key={warden.displayValue}
                                        value={warden.displayValue}
                                        selected={this.state.warden === warden.displayValue}
                                        >
                                        {warden.displayValue}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12">
                        <div className="form-group">
                            <label for="state">State</label>
                            <select className="form-control" disabled name="state" >
                                {states_and_locals.map(state_lga => {
                                    return (
                                        <option
                                        key={state_lga.state.name}
                                        value={state_lga.state.name}
                                        selected={this.state.state === state_lga.state.name}
                                        >
                                        {state_lga.state.name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12 ">
                        <div className="form-group">
                            <label for="website">Website</label>
                            <input
                                onChange={this.changeHandler}
                                className="form-control"
                                value={this.state.website}
                                name="website"
                                type="text"
                            />
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12 ">
                        <div className="form-group">
                            <label for="Professional qualification">Professional qualification</label>
                            <input
                                onChange={this.changeHandler}
                                className="form-control"
                                value={this.state.professional_qualification}
                                name="professional_qualification"
                                type="text"
                            />
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12 ">
                        <div className="form-group">
                            <label for="Operating qualification"> Operating qualification </label>
                            <input
                                onChange={this.changeHandler}
                                className="form-control"
                                value={this.state.operating_qualification}
                                name="operating_qualification"
                                type="text"
                            />
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12 ">
                        <div className="form-group">
                            <label for="Bank Name">Bank Name</label>
                            <input
                                onChange={this.changeHandler}
                                className="form-control"
                                value={this.state.bank_name}
                                name="bank_name"
                                type="text"
                            />
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12 ">
                        <div className="form-group">
                            <label for="account_name">Account Name</label>
                            <input
                                onChange={this.changeHandler}
                                className="form-control"
                                value={this.state.account_name}
                                name="account_name"
                                type="text"
                            />
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12 ">
                        <div className="form-group">
                            <label for="Account Number">Account Number</label>
                            <input
                                onChange={this.changeHandler}
                                className="form-control"
                                value={this.state.account_number}
                                name="account_number"
                                type="text"
                            />
                        </div>
                    </div>
                </div>
            );
        }

        if(status === 200 && (data.type === "AGENT")) {
            profile =  (
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <div class="form-group">
                            <label for="name">Organization name</label>
                            <input
                                onChange={this.changeHandler}
                                className="form-control"
                                value={this.state.name}
                                name="name"
                                type="text"
                            />
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 ">
                        <div className="form-group">
                            <label for="email">Email</label>
                            <input
                                disabled
                                onChange={this.changeHandler}
                                className="form-control"
                                value={this.state.email}
                                name="email"
                                type="email"
                            />
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 ">
                        <div className="form-group">
                            <label for="primary_phone_number">Phone Number</label>
                            <input
                                disabled
                                onChange={this.changeHandler}
                                className="form-control"
                                value={this.state.primary_phone_number}
                                name="primary_phone_number"
                                type="text"
                            />
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <DashboardLayout>
                <Loader>
                    <LayoutContentWrapper>
                        <LayoutContent>
                            <div className="row">
                                <div className="col-md-6">
                                    {status && (
                                        <table className="table table-condensed table-responsive table-hover">
                                            <tr><th>Name:</th><td>{data.name}</td></tr>
                                            <tr><th>LGA:</th><td>{data.name_lga_ward}</td></tr>
                                            <tr><th>Email:</th><td>{data.owner.email}</td></tr>
                                            <tr><th>Telephone:</th><td>{data.owner_phone_number}</td></tr>
                                        </table>
                                    )} 
                                </div>
                                <div className="col-md-4 text-right">
                                    <span className="pull-right">
                                        {status === 200 && (
                                            <img
                                                title="profile image"
                                                className="img-circle img-responsive"
                                                src={data.logo}
                                                width="150"
                                                height="150"
                                            />
                                        )}
                                    </span>
                                </div>
                            </div><hr/>
                            <div className="row">
                                <div className="col-md-12">
                                    <Nav tabs>
                                        <NavItem>
                                            <NavLink
                                                className={classnames({active: this.state.activeTab === "profile"})}
                                                style={{color: '#000',fontSize: '14px', padding: "5px 20px" }}
                                                onClick={() => {toggle("profile");}}>
                                                Profile
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                className={classnames({active: this.state.activeTab === "beneficiaries"})}
                                                style={{color: '#000',fontSize: '14px', padding: "5px 20px" }}
                                                onClick={() => {toggle("beneficiaries")}}>
                                                Enrollees
                                            </NavLink>
                                        </NavItem>
                                        {status === 200 && data.type === "PROVIDER" && (
                                            <NavItem>
                                                <NavLink
                                                    className={classnames({active:this.state.activeTab === "treatment_claims"})}
                                                    style={{color: '#000',fontSize: '14px', padding: "5px 20px" }}
                                                    onClick={() => {toggle("treatment_claims")}}>
                                                    Submitted Claim
                                                </NavLink>
                                            </NavItem>
                                        )}
                                        <NavItem>
                                            <NavLink
                                                className={classnames({active: this.state.activeTab === "treatment_claimed"})}
                                                style={{color: '#000',fontSize: '14px', padding: "5px 20px" }}
                                                onClick={() => {toggle("treatment_claimed")}}>
                                                Approved Claim
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                className={classnames({active: this.state.activeTab === "treatment_paid"})}
                                                style={{color: '#000',fontSize: '14px', padding: "5px 20px" }}
                                                onClick={() => {toggle("treatment_paid")}} >
                                                Treatments Paid
                                            </NavLink>
                                        </NavItem>
                                    </Nav>
                                    <TabContent activeTab={this.state.activeTab}>
                                        <TabPane tabId="profile">
                                            <Card style={{width: '100%'}}>
                                                {profile} <hr/>
                                                <CustomButton 
                                                    onClick={this.handleSubmit} 
                                                    submittingForm={this.state.requestingForm}
                                                >Submit
                                                </CustomButton>  
                                            </Card>   
                                        </TabPane>
                                        <TabPane tabId="beneficiaries">
                                            <Card style={{width: '100%'}}>
                                            <Datatable
                                                columns={[
                                                    {
                                                        cell: "Default",
                                                        searchable: true,
                                                        dataIndex: 'surname',
                                                        key: "surname",
                                                        title: "Surname",
                                                        search_key: "user.surname",
                                                        sorter: (a,b) => a.surname.length - b.surname.length
                                                    },
                                                    {
                                                        cell: "Default",
                                                        dataIndex: 'first_name',
                                                        searchable: true,
                                                        key: "first_name",
                                                        title: "First Name",
                                                        search_key: "user.first_name",
                                                        sorter: (a,b) => a.first_name.length - b.first_name.length
                                                    },
                                                    {
                                                        cell: "Default",
                                                        searchable: true,
                                                        key: "other_name",
                                                        dataIndex: 'other_name',
                                                        title: "Other Name",
                                                        search_key: "user.other_name",
                                                        sorter: (a,b) => a.other_name.length - b.other_name.length
                                                    },
                                                    {
                                                        cell: "Default",
                                                        searchable: false,
                                                        key: "gender",
                                                        title: "Gender",
                                                        dataIndex: 'gender'
                                                    },
                                                    {
                                                        cell: "Default",
                                                        searchable: true,
                                                        key: "enrollee_id",
                                                        title: "Enrollee ID",
                                                        search_key: "user.enrollee_id",
                                                        dataIndex: 'enrollee_id'
                                                    },
                                                    {
                                                        cell: "Default",
                                                        key: "policy_name",
                                                        dataIndex: 'policy_name',
                                                        searchable: false,
                                                        title: "Policy"
                                                    },
                                                    {
                                                        cell: "Default",
                                                        searchable: false,
                                                        key: "agent_company",
                                                        title: "Agent Company",
                                                        dataIndex: 'agent_company'
                                                    },
                                                    {
                                                        cell: "Default",
                                                        searchable: false,
                                                        key: "no_of_dependent",
                                                        title: "No. Of Dependent",
                                                        dataIndex: 'no_of_dependent'
                                                    },

                                                    {
                                                        key: "is_active",
                                                        title: "Status",
                                                        cell: "Default",
                                                        dataIndex: 'is_active',
                                                        searchable: false
                                                    }
                                                ]}
                                                hideSearch
                                                url={`organization_profile/show/${this.props.match.params.id}?relation_type=beneficiaries`}
                                                actions={[
                                                    {
                                                        key: "id",
                                                        type: "view",
                                                        title: "VIEW",
                                                        url: "/dashboard/enrollee_view_"
                                                    }
                                                ]}
                                            />
                                            </Card>
                                        </TabPane>
                                        <TabPane tabId="treatment_claims">
                                            <Card style={{width: '100%'}}>
                                            <Datatable
                                                columns={[
                                                    {
                                                        cell: "Default",
                                                        searchable: true,
                                                        key: "provider_name",
                                                        dataIndex: 'provider_name',
                                                        title: "Hospital Name",
                                                        sorter: (a,b) => a.provider_name.length - b.provider_name.length
                                                    },
                                                    {
                                                        cell: "Default",
                                                        searchable: true,
                                                        dataIndex: 'beneficiary_first_name',
                                                        key: "beneficiary_first_name",
                                                        title: "Enrollee First Name",
                                                        search_key: "user.first_name",
                                                        sorter: (a,b) => a.beneficiary_first_name.length - b.beneficiary_first_name.length
                                                    },
                                                    {
                                                        cell: "Default",
                                                        searchable: true,
                                                        key: "beneficiary_surname",
                                                        dataIndex: 'beneficiary_surname',
                                                        title: "Enrollee Last Name",
                                                        search_key: "user.first_name",
                                                        sorter: (a,b) => a.beneficiary_surname.length - b.beneficiary_surname.length
                                                    },
                                                    {
                                                        cell: "Default",
                                                        searchable: false,
                                                        key: "total_approved_quantity",
                                                        title: "Service Quantity",
                                                        dataIndex: 'total_approved_quantity'
                                                    },
                                                    {
                                                        key: "status",
                                                        dataIndex: 'status',
                                                        title: "Status",
                                                        cell: "Default",
                                                        searchable: false
                                                    }
                                                ]}
                                                hideSearch
                                                url={`organization_profile/show/${this.props.match.params.id}?relation_type=treatment_claims`}
                                                actions={[]}
                                            />
                                            </Card>
                                        </TabPane>
                                        <TabPane tabId="treatment_claimed">
                                            <Card style={{width: '100%'}}>
                                                <Datatable
                                                    columns={[
                                                        {
                                                            cell: "Default",
                                                            searchable: true,
                                                            key: "provider_name",
                                                            title: "Hospital Name",
                                                            dataIndex: 'provider_name',
                                                            sorter: (a,b) => a.provider_name.length - b.provider_name.length
                                                        },
                                                        {
                                                            cell: "Default",
                                                            searchable: true,
                                                            key: "beneficiary_first_name",
                                                            dataIndex: 'beneficiary_first_name',
                                                            title: "Enrollee First Name",
                                                            search_key: "user.first_name",
                                                            sorter: (a,b) => a.beneficiary_first_name.length - b.beneficiary_first_name.length
                                                        },
                                                        {
                                                            cell: "Default",
                                                            searchable: true,
                                                            key: "beneficiary_surname",
                                                            dataIndex: 'beneficiary_surname',
                                                            title: "Enrollee Last Name",
                                                            search_key: "user.first_name",
                                                            sorter: (a,b) => a.beneficiary_surname.length - b.beneficiary_surname.length
                                                        },
                                                        {
                                                            cell: "Default",
                                                            searchable: false,
                                                            key: "total_approved_quantity",
                                                            title: "Service Quantity",
                                                            dataIndex: 'total_approved_quantity'
                                                        },
                                                        {
                                                            key: "status",
                                                            title: "Status",
                                                            cell: "Default",
                                                            searchable: false,
                                                            dataIndex: 'status'
                                                        }
                                                    ]}
                                                    hideSearch
                                                    url={`organization_profile/show/${this.props.match.params.id}?relation_type=treatment_claimed`}
                                                    actions={[]}
                                                />
                                            </Card>
                                        </TabPane>
                                        <TabPane tabId="treatment_paid">
                                            <Card style={{width: '100%'}}>
                                            <Datatable
                                                columns={[
                                                    {
                                                        cell: "Default",
                                                        searchable: true,
                                                        key: "provider_name",
                                                        dataIndex: 'provider_name',
                                                        title: "Hospital Name",
                                                        sorter: (a,b) => a.provider_name.length - b.provider_name.length
                                                    },
                                                    {
                                                        cell: "Default",
                                                        searchable: true,
                                                        dataIndex: 'beneficiary_first_name',
                                                        key: "beneficiary_first_name",
                                                        title: "Enrollee First Name",
                                                        search_key: "user.first_name",
                                                        sorter: (a,b) => a.beneficiary_first_name.length - b.beneficiary_first_name.length
                                                    },
                                                    {
                                                        cell: "Default",
                                                        searchable: true,
                                                        key: "beneficiary_surname",
                                                        title: "Enrollee Last Name",
                                                        dataIndex: 'beneficiary_surname',
                                                        search_key: "user.first_name",
                                                        sorter: (a,b) => a.beneficiary_surname.length - b.beneficiary_surname.length
                                                    },
                                                    {
                                                        cell: "Default",
                                                        dataIndex: 'total_approved_quantity',
                                                        searchable: false,
                                                        key: "total_approved_quantity",
                                                        title: "Service Quantity"
                                                    },
                                                    {
                                                        key: "status",
                                                        title: "Status",
                                                        dataIndex: 'status',
                                                        cell: "Default",
                                                        searchable: false
                                                    }
                                                ]}
                                                hideSearch
                                                url={`organization_profile/show/${this.props.match.params.id}?relation_type=treatment_paid`}
                                                actions={[]}
                                            />
                                            </Card>
                                        </TabPane>
                                    </TabContent>
                                </div>
                            </div>
                        </LayoutContent>
                    </LayoutContentWrapper>
                </Loader>
            </DashboardLayout>
        );
    }
}

const mapStateToProps = state => ({
    data: state.GeneralReducer.data,
    status: state.GeneralReducer.status,
    message: state.GeneralReducer.message
});

const mapDispatchToProps = dispatch => ({
    getOrganization: payload => dispatch(getOrganization(payload)),
    updateOrganization: payload => dispatch(updateOrganization(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProviderView);