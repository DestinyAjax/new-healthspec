import React from 'react';
import CustomInput from '../CustomInput';
import { Field, reduxForm } from 'redux-form';
// import { requiredValidator } from '../../../shared/utils/validation';


const SearchForm = props => {

    const { onChangeHandler } = props

    const onNameChanged = event => {
        onChangeHandler(event.target.value);
    }

    return (
        <form>
            <Field
                name="value"
                component={CustomInput}
                type="text"
                placeholder="Search"
                validate={[]}
                onChange={onNameChanged}
            />
        </form>
    )

}

export default reduxForm({
    form: 'SearchForm'
})(SearchForm);