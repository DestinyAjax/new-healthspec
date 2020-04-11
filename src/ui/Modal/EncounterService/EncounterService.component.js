import React from 'react';
import swal from 'sweetalert';
import { connect } from 'react-redux';
import { closeModal } from '../Modal.action';
import styles from './EncounterService.component.module.css';

import AdminEncounterServiceForm from '../../forms/AdminEncounterServiceForm';
import { updateClaimEncounterService, resetUpdateClaimEncounterService } from '../../../shared/actions/Claim.action';

class EncounterService extends React.Component {

    state = {
        service: null,
        submittingForm: false,
    }

    componentDidMount() {
        this.setState({
            service: {
                quantity: Number(this.props.encounter_service.quantity),
                admin_passed: this.props.encounter_service.admin_passed,
                service: this.props.encounter_service.plan_service.service.name,
            }
        });
    }

    async componentDidUpdate(prevState, prevProps) {
        if (prevProps.update_encounter_service_status !== this.props.update_encounter_service_status) {
            if (this.props.update_encounter_service_status === 200) {
                let alert = await swal({
                    title: "Good job!",
                    text: `Claim service was updated successfully!`,
                    icon: "success",
                    closeOnClickOutside: false
                });

                if (alert) {
                    this.setState({
                        submittingForm: false
                    }, () => {
                        this.props.closeModal();
                        this.props.resetUpdateClaimEncounterService();
                    });
                }
            }
        }
    }

    handleSubmit = formData => {
        formData['claim_id'] = this.props.claim.id;
        formData['claim_plan_service_id'] = this.props.encounter_service.id;

        this.setState({
            submittingForm: true
        }, () => {
            this.props.updateClaimEncounterService(formData);
        });
    }

    render() {

        let formContainer;

        if (this.state.service != null) {
            formContainer = (
                <div>
                    <AdminEncounterServiceForm
                        onSubmit={this.handleSubmit}
                        initialValues={this.state.service}
                        submittingForm={this.state.submittingForm}
                    />
                </div>
            )
        }

        return (
            <div className={styles.modal}>
                <div className={styles.body}>
                    <div>
                        <div className={styles.action}>
                            <div className={styles.goBack} onClick={this.props.closeModal}>
                                <i className="fa fa-close" aria-hidden="true"></i>  Go Back
                            </div>
                        </div>

                        { formContainer }
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        update_encounter_service_status: state.ClaimReducer.update_encounter_service_status
    }
}
const mapDispatchToProps = dispatch => {
    return {
        closeModal: () => dispatch(closeModal()),
        resetUpdateClaimEncounterService: () => dispatch( resetUpdateClaimEncounterService() ),
        updateClaimEncounterService: payload => dispatch( updateClaimEncounterService(payload) ),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EncounterService);