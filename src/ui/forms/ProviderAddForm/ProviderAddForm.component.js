import React from 'react';
import {Card} from 'antd';
import { Field, reduxForm } from 'redux-form';
import Autocomplete from '../../Autocomplete';
import { url } from '../../../config';

const ProviderAddForm = ({ handleSubmit, role_user_id, onChange }) => {
     
    return (
        
        <form onSubmit={handleSubmit}>
            <Card style={{width:'100%'}}>
                <div className="row">
                    <div className="col-md-12">
                        <Field
                            name="organization_profile"
                            component={Autocomplete}
                            label="Provider (Secondary)"
                            is_query_string={true}
                            onChange={onChange}
                            url={`${url}organization_profile/search/${role_user_id}/provider/S`}
                            validate={[]}
                        />
                    </div>
                </div>
            </Card>
        </form>
    );
}

export default reduxForm({
    form: 'ProviderAddForm'
})(ProviderAddForm);