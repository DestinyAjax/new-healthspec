import React from 'react';
import { Field, reduxForm } from 'redux-form';
import CustomInput from '../../CustomInput';
import styles from './TreatmentForm.component.module.css';
import Autocomplete from '../../Autocomplete';
import { url } from '../../../config';
import { requiredValidator } from '../../../shared/utils/validation';

const DiagnosisForm = ({handleSubmit, pristine, invalid,appendDiagnosis, visit_date}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div className="row">
                <div className="col-md-12 col-sm-12 col-xs-12">
                    <Field
                        isMulti
                        name="case"
                        is_query_string={true}
                        component={Autocomplete}
                        label="Service (Diagnosis)"
                        type="multiple"
                        onChange={appendDiagnosis}
                        url={`${url}service/search/Diagnosis/service_category`}
                        validate={[requiredValidator]}
                    />
                </div>
                <div className="col-md-12 col-sm-12 col-xs-12">
                    {!visit_date &&
                        <Field
                            name="visit_date"
                            label="Encounter Date"
                            type="date"
                            component={CustomInput}
                            validate={[requiredValidator]}
                        />
                    }
                </div>
            </div>
        </form>
    );
}

export default reduxForm({
    form: 'DiagnosisForm'
})(DiagnosisForm);