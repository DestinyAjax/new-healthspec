import React from 'react';
import swal from 'sweetalert';
import { reset } from 'redux-form';
import { connect } from 'react-redux';
import DependantForm from '../forms/DependantForm';
import { storeDependant, resetStoreDependant } from '../../shared/actions/Dependant.action';

class DependantAdd extends  React.Component {

    state = {
        submittingForm: false,
    }

    handleSubmit = formData => {
        formData['role_user_slug'] = this.props.role_user_slug;

        this.setState({
            submittingForm: true
        }, () => {
            return this.props.storeDependant(formData);
        });
    }

    showNotification = async props => {
        if (props.store_dependant_status === 200) {
            this.props.reset('AgentStepOneForm');
            this.setState({
                activeStep: 0,
                submittingForm: false
            });

            let alert = await swal({
                title: "Good job!",
                text: `Dependant was created successfully!`,
                icon: "success",
                closeOnClickOutside: false
            });

            if (alert) {
                this.props.resetStoreDependant();
            }
            return;
        }
        if (props.store_dependant_status !== null && props.store_dependant_status !== 200) {
            let alert = await swal({
                title: "Opps!",
                text: `Maximum number of dependant has been reached!`,
                icon: "error",
                closeOnClickOutside: false
            });

            if (alert) {
                this.props.resetStoreDependant();
                this.setState({
                    submittingForm: false
                });
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        console.dir(nextProps);
        this.showNotification(nextProps);
    }

    render () {
        return (
            <React.Fragment>
                <DependantForm onSubmit={this.handleSubmit} />
            </React.Fragment>
        )
    }
}


const mapStateToProps = state => {
    return {
        active: state.ChoseRoleReducer.role,
        dependant: state.DependantReducer.dependant,
        store_dependant_status: state.DependantReducer.store_dependant_status,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        reset: payload => dispatch(reset(payload)),
        resetStoreDependant: () => dispatch(resetStoreDependant()),
        storeDependant: payload => dispatch(storeDependant(payload)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DependantAdd);