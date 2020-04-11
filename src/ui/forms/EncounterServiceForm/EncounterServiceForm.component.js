import React from 'react';
import CustomSelect from '../../CustomSelect';
import CustomButton from '../../CustomButton';
import { Field, reduxForm } from 'redux-form';
import CustomReactSelect from '../../CustomReactSelect';
import styles from './EncounterServiceForm.component.module.css';
import { requiredValidator } from '../../../shared/utils/validation';

class EncounterServiceForm extends React.Component {

    state = {
        services: []
    }

    componentDidMount() {
        let services = this.props.plan_services.map(plan_service => {
            return {
                value: plan_service.id,
                label: plan_service.service.name,
            }
        });

        this.setState({
            services: services
        });
    }

    render() {
        return (
            <form onSubmit={this.props.handleSubmit}>
                <div>
                    Select Services below
                </div>
                <div  className={'card-body'}>

                    <Field
                        name="value"
                        component={CustomReactSelect}
                        validate={[requiredValidator]}
                        options={this.state.services}
                    />

                </div>

                <div className={styles.buttonContainer}>
                    <div className={styles.button}>
                        <CustomButton disabled={this.props.invalid || this.props.pristine} submittingForm={this.props.submittingForm}>Add</CustomButton>
                    </div>
                </div>
            </form>
        )
    }
}

export default reduxForm({
    form: 'EncounterServiceForm'
})(EncounterServiceForm);