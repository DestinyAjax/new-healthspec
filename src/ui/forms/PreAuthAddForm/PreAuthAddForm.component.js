import React from 'react';
import {Card} from 'antd';
import { Field, reduxForm } from 'redux-form';
import Autocomplete from '../../Autocomplete';
import { requiredValidator } from '../../../shared/utils/validation';
import { url } from '../../../config';

const PreAuthAddForm = ({ handleSubmit, pristine, invalid, plans, services, questions, submittingForm, appendServices, beneficiary_role_user_id }) => {
     
    return (
        
        <form onSubmit={handleSubmit}>
            <Card style={{width:'100%'}}>
                <div className="row">
                    <div className="col-md-12">
                        <Field
                            isMulti
                            name="service_ids"
                            component={Autocomplete}
                            label="Service"
                            type="multiple"
                            is_query_string
                            onChange={appendServices}
                            url={`${url}plan_service/search/${beneficiary_role_user_id}/P`}
                            // url={"http://hcbackend.test/api/service/search/"}
                            validate={[requiredValidator]}
                        />
                    </div>
                </div>
            </Card>
        </form>
    );
}

export default reduxForm({
    form: 'PreAuthAddForm'
})(PreAuthAddForm);