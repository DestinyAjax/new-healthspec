import React from 'react';
import { CustomSearchSelect } from '../CustomSelect';
import { CustomSearchInput } from '../CustomInput';
import CustomButton from '../CustomButton';
import { Field, reduxForm } from 'redux-form';
import styles from './Datatable.page.module.css';
import { requiredValidator, minLength1900, maxLength2019 } from '../../shared/utils/validation';


class Filter extends React.Component {

    state = {

    }


    render () {

        let { handleSubmit, pristine, invalid, submittingForm } = this.props;

        return (
            <form onSubmit={this.props.handleSubmit}>
                <table className={[styles.table, styles.table_bordered, styles.table_striped].join(' ')}>
                    <tr>
                        <td>
                            <Field
                                name="column"
                                component={CustomSearchSelect}
                                label=""
                                // placeholder="Select an option"
                                validate={[requiredValidator]}
                                options={this.props.columns.map(column => {
                                    return {
                                        label: column,
                                        displayValue: column,
                                    }
                                })}
                            />
                        </td>
                        <td>
                            <Field
                                name="option"
                                component={CustomSearchSelect}
                                label=""
                                // placeholder="Select an option"
                                validate={[requiredValidator]}
                                options={[
                                    {
                                        displayValue: '=',
                                        value: '='
                                    },
                                    {
                                        displayValue: '≠',
                                        value: '≠'
                                    },
                                    {
                                        displayValue: 'between',
                                        value: 'between'
                                    },
                                    {
                                        displayValue: 'contains',
                                        value: 'contains'
                                    },
                                    {
                                        displayValue: 'does not contain',
                                        value: 'does not contain'
                                    }
                                ]}
                            />
                        </td>
                        <td>
                            <Field
                                name="value"
                                component={CustomSearchInput}
                                label=""
                                // placeholder="Select an option"
                                validate={[requiredValidator]}
                            />
                        </td>
                        <td>
                            <button className={styles.button}> Filter </button>
                        </td>
                    </tr>
                </table>
            </form>
        )
    }
}


export default reduxForm({
    form: 'ServiceProviderStepOneForm'
})(Filter);