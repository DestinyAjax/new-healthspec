import React from 'react';
import { Field, reduxForm } from 'redux-form';
import Autocomplete from '../../Autocomplete';
// import CustomReactSelect from '../../CustomReactSelect';
import styles from './ReferAddForm.component.module.css';
import { requiredValidator } from '../../../shared/utils/validation';
import { url } from '../../../config';

const ReferAddForm = ({ handleSubmit, pristine, invalid, plans, services, questions, submittingForm, appendReferServices, beneficiary_role_user_id, role_user_id, onChange, allow_out_of_station}) => {
     

    let endpoint = (allow_out_of_station === true) ? `${url}plan_service/search/${beneficiary_role_user_id}` : `${url}plan_service/search/${beneficiary_role_user_id}/S`;
    let service_label = (allow_out_of_station === true) ? 'Service (Primary & Secondary)' : 'Service (Secondary)'

    return (
        
        <form onSubmit={handleSubmit}>
            <div className="row">
                <div className="col-md-12">
                    <Field
                        isMulti
                        name="service_ids"
                        is_query_string
                        component={Autocomplete}
                        label={service_label}
                        type="multiple"
                        onChange={appendReferServices}
                        url={endpoint}
                        validate={[requiredValidator]}
                    />
                </div>
                <div className="col-md-12">
                    <Field
                        name="organization_profile"
                        component={Autocomplete}
                        label="Provider (Secondary)"
                        is_query_string={true}
                        onChange={onChange}
                        url={`${url}organization_profile/search/${role_user_id}/provider/S`}
                        validate={[requiredValidator]}
                    />
                </div>
            </div>
        </form>
    );
}

export default reduxForm({
    form: 'ReferAddForm'
})(ReferAddForm);