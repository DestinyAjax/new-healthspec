import React from 'react';
import moment from 'moment';
import swal from 'sweetalert';
import { connect } from 'react-redux';
import CustomButton from '../CustomButton';

import ClaimQuestion from '../../ui/Modal/ClaimQuestion';
import styles from './EncounterCard.component.module.css';

import EncounterServiceForm from '../forms/EncounterServiceForm';
import { storeEncounter, resetStoreEncounter } from '../../shared/actions/Encounter.action';


class EncounterCard extends React.Component {

    state = {
        user_id: null,
        profile: null,
        policy_id: null,
        provider_id: null,
        plan_services: [],
        selected_services: [],
        submittingForm: false,

        showModal: false,
        selected_service: null,
        selected_service_key: null,

        role_users: [],
        role_user_info: ''
    }

    showNotificationWith = async props => {
        if (props.store_encounter_status === 200) {
            let alert = await swal({
                title: "Good job!",
                text: `Encounter was recorded successfully!`,
                icon: "success",
                closeOnClickOutside: false
            });

            if (alert) {
                this.setState({
                    user_id: null,
                    policy_id: null,
                    provider_id: null,
                    plan_services: [],
                    selected_services: [],
                    submittingForm: false
                });
                this.props.resetStoreEncounter();
            }
        }
    }

    componentDidUpdate(prevState, prevProps) {
        if (prevState.store_encounter_status !== this.props.store_encounter_status) {
            this.showNotificationWith(this.props);
        }
    }

    componentWillUnmount() {
        this.setState({
            user_id: null,
            profile: null,
            policy_id: null,
            provider_id: null,
            plan_services: [],
            selected_services: [],
            submittingForm: false
        });
        this.props.resetStoreEncounter();
    }

    select = role_user => {
        this.setState({
            profile: role_user.profile,
            user_id: role_user.user_id,
            provider_id: role_user.organization_profile_id,
            policy_id: role_user.enrol.policy.id,
            plan_services: role_user.enrol.policy.plan.plan_services
        }, () => {
            console.dir(role_user);
        });
    }

    handleSubmit = formData => {

        // I need the plan_service_id
        let plan_service = this.state.plan_services.find(plan_service => {
            return plan_service.id == formData.value
        });

        let previous_encounter_services = this.props.previous_encounters.filter(previous_encounter => {
            return previous_encounter.policy.id == this.state.policy_id;
        }) //ensure its encounter for a particular policy
        .map(previous_encounter => {
            return previous_encounter.plan_services;
            // return previous_encounter.services;
        }) //get all services and merge with below
        .reduce((acc, curr) => {
            return acc.concat(...curr);
        }, []);


        let services = previous_encounter_services.filter(previous_encounter_service => {
            return previous_encounter_service.plan_service.service.id == plan_service.service.id;
        }); //ensure it is the particular service chosen


        if (services.length >= plan_service.limit) {
            return swal({
                title: "Opps!",
                text: `Limit exceeded for this service!`,
                icon: "error",
            });;
        }

        //I need to give this service_id
        let selected_services = this.state.plan_services.filter(state_plan_service => {
            return state_plan_service.service.id == plan_service.service.id
        }).map(selected_service => {
            selected_service['quantity'] = 1;

            return selected_service;
        });

        this.setState({
            selected_services: [...new Set([...selected_services, ...this.state.selected_services])]
        });
    }

    removeSelectedServiceHandler = service => {
        this.setState(prevState => ({
            selected_services: [...prevState.selected_services].filter(selected_service => {
                return service.id != selected_service.id;
            })
        }));
    }

    submitEncounterHandler = async () => {

        //ensure all services are ticked
        let status = this.state.selected_services.find(selected_service => {
            if (! selected_service.hasOwnProperty("is_passed")) {
                return true;
            }
        });

        if (status != undefined) {
            let alert = await swal({
                title: "Opps!",
                text: `You must answer all questions!`,
                icon: "error",
                closeOnClickOutside: true
            });

            if (alert) {
                console.dir('close');
            }
            return;
        }

        let form = {};

        form['user_id'] = this.state.user_id;
        form['policy_id'] = this.state.policy_id;
        form['provider_id'] = this.state.provider_id;
        form['services'] = this.state.selected_services.map(selected_service => {
            return {
                id: selected_service.service.id,
                quantity: selected_service.quantity,
                plan_service_id: selected_service.id,
                is_passed: selected_service.is_passed,
            }
        });


        //check if it is_billable
        let is_passed = this.state.selected_services.find(selected_service => {
            return selected_service.is_passed === true;
        });


        if (is_passed == undefined) {
            form['is_billable'] = false;
        } else {
            form['is_billable'] = true;
        }

        this.setState({
            submittingForm: true
        }, () => {
            this.props.storeEncounter(form);
        });
    }

    counter = (selected_service, operator, index) => {
        let new_selected_service = { ...selected_service };
        let quantity;

        if (operator === "minus") {
            quantity = selected_service['quantity'] == 1 ? selected_service['quantity'] : selected_service['quantity'] - 0.1;
            quantity = parseFloat(quantity).toFixed(1);

            new_selected_service['quantity'] = quantity;
        }
        if (operator === "addition") {
            quantity = Number(selected_service['quantity']) + Number(0.1);

            quantity = quantity.toFixed(1);

            new_selected_service['quantity'] = quantity;
        }

        let selected_services = [...this.state.selected_services];
        selected_services[index] = new_selected_service;

        this.setState({
            selected_services: selected_services
        });
    }


    validateServiceHandler = (selected_service, index) => {
        this.setState({
            showModal: true,
            selected_service_key: index,
            selected_service: selected_service,
        });
    }


    closeQuestion = ()=> {
        this.setState({
            showModal: false,
            selected_service: null
        });
    }


    questionHandler = selected_service => {
        let copied_selected_services = [...this.state.selected_services];
        copied_selected_services[this.state.selected_service_key] = selected_service;

        this.setState({
            showModal: false,
            selected_service: null,
            selected_services: copied_selected_services
        });
    }


    render () {

        let { user, role_users, other_provider_role_users } = this.props;

        let serviceForm, selectedServices, selectedServicesContainer, profile_picture, roles;


        if (role_users.length) {
            roles = role_users.map(role_user => (
                <tr key={role_user.id} onClick={() => this.select(role_user)}>
                    <td>{role_user.role.name}</td>
                    <td>{role_user.enrol.policy.name}</td>
                    <td>{moment(role_user.expires_at).format('Do MMMM YYYY')}</td>
                    {/* <td>{role_user.enrol.policy.company.name}</td> */}
                </tr>
            ));
        }
        if (!role_users.length && other_provider_role_users.length) {
            roles = other_provider_role_users.map(role_user => (
                <tr key={role_user.id} onClick={() => this.select(role_user)}>
                    <td>{role_user.role.name}</td>
                    <td>{role_user.enrol.policy.name}</td>
                    <td>{moment(role_user.expires_at).format('Do MMMM YYYY')}</td>
                    {/* <td>{role_user.enrol.policy.company.name}</td> */}
                </tr>
            ));
        }
        if (!role_users.length && !other_provider_role_users.length) {
            roles = (
                <tr>
                    <td colSpan={'4'}>
                        <span className={styles.no_active}>{'Beneficiary does have an active policy'}</span>
                    </td>
                </tr>
            )
        }


        let roleContainer = (
            <div className={styles.table}>
                <div className={styles.message}>{this.state.role_user_info}</div>
                <table>
                    <thead>
                        <tr>
                            <th>Role</th>
                            <th>Policy Name</th>
                            <th>Plan Expiration Date</th>
                            {/* <th>Company</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {roles}
                    </tbody>
                </table>
            </div>
        )


        if (!this.state.plan_services.length && this.state.user_id != null) {
            serviceForm = (
                <div className={styles.formContainer}>
                    Plan service not yet created
                </div>
            )
        }

        if (this.state.plan_services.length) {
            serviceForm = (
                <div className={styles.formContainer}>
                    <EncounterServiceForm
                        cancel={this.cancelHandler}
                        onSubmit={this.handleSubmit}
                        plan_services={this.state.plan_services}
                    />
                </div>
            )
        }

        if (this.state.selected_services.length) {

            selectedServices = this.state.selected_services.map((selected_service, index) => {

                let checkIcon = (
                    <div className={styles.pending}>
                        {"NOT VERIFIED"}
                    </div>
                )

                if (selected_service.is_passed === true) {
                    checkIcon = (
                        <div className={styles.active}>
                            {"BILLABLE"}
                        </div>
                    )
                }
                if (selected_service.is_passed === false) {
                    checkIcon = (
                        <div className={styles.inactive}>
                            {"NOT BILLABLE"}
                        </div>
                    );
                }

                return (
                    <tr>
                        <td>{selected_service.service.name}</td>
                        <td className={styles.quantityContainer}>
                            <span className={styles.changer} onClick={() => this.counter(selected_service, "minus", index)}>-</span>
                            <span className={[styles.quantity, styles.changer].join(" ")}>{selected_service.quantity}</span>
                            <span className={styles.changer} onClick={() => this.counter(selected_service, "addition", index)}>+</span>
                        </td>
                        <td>&#8358; {Number(selected_service.price * selected_service.quantity).toLocaleString()} </td>
                        <td onClick={() => this.validateServiceHandler(selected_service, index)}>
                            {checkIcon}
                        </td>
                        <td onClick={() => this.removeSelectedServiceHandler(selected_service)}><i className={"fa fa-trash-o"}></i></td>
                    </tr>
                );
            });

            selectedServicesContainer = (
                <div className={"table-responsive-sm"}>
                    <table className={"table table-striped"}>
                        <thead>
                            <tr>
                                <th>Service</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedServices}
                        </tbody>
                    </table>

                    <div className={styles.submitEncounterButton}>
                        <CustomButton onClick={this.submitEncounterHandler}>Submit Encounter</CustomButton>
                    </div>
                </div>
            )
        }

        if (this.state.profile !== null) {
            profile_picture = this.state.profile.picture;
        }

        let container = (
            <div className={styles.container}>

                <div className={styles.header}>
                    <div className={styles.ref_number_title}>
                        <div className={styles.ref_number}>1022020200202</div>
                        <div className={'h3'} >ENCOUNTER</div>
                    </div>
                    <div className={styles.date}>
                        Osun Health Insurance Scheme
                    </div>
                </div>


                <div className={styles.body}>


                    <div className={styles.itemsImage}>
                        <div className={styles.items}>

                            <div className={styles.item}>
                                <div className={styles.itemTitle}>PATIENT</div>
                                <div className={styles.itemDescription}>
                                    <div>{user.first_name} {user.last_name} {user.middle_name}</div>
                                    <div>{user.enrollee_id}</div>
                                    <div>{moment(user.date_of_birth.date).format('Do MMMM YYYY')}</div>
                                </div>
                            </div>

                        </div>
                        <div className={styles.image}>
                            <img src={profile_picture} />
                        </div>
                    </div>


                    { roleContainer }
                </div>


                {serviceForm}


                {selectedServicesContainer}
            </div>
        );

        if (this.state.showModal) {
            container = (
                <div className={styles.container}>
                    <ClaimQuestion
                            closeQuestion={this.closeQuestion}
                            questionHandler={this.questionHandler}
                            selected_service={this.state.selected_service}
                    />
                </div>
            )
        }

        return (
            <React.Fragment>

                { container }

            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        encounter: state.EncounterReducer.encounter,
        store_encounter_status: state.EncounterReducer.store_encounter_status,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        resetStoreEncounter: () => dispatch( resetStoreEncounter() ),
        storeEncounter: payload => dispatch( storeEncounter(payload) ),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EncounterCard);