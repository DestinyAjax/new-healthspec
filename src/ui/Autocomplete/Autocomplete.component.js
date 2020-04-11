import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import Async from 'react-select/lib/Async';
import styles from './Autocomplete.module.css';

import { getStorage } from '../../shared/utils/storage';


class Autocomplete extends React.Component {

    // selectHandler = option => {
    //     this.props.onChange({
    //         value:  option,
    //         name: this.props.name,
    //     });
    // }


    onChange(event) {
        if (this.props.input.onChange && event != null) {
            // To be aligned with how redux-form publishes its CHANGE action payload. The event received is an object with 2 keys: "value" and "label"
            // this.props.input.onChange(event.value);

            if (event.value) {
                this.props.input.onChange(event);
            } else {
                this.props.input.onChange(event);
            }

        } else {
            // Clear the input field
            this.props.input.onChange(null);
        }
    }

    makeRequestWith = async inputValue => {
        let token = await getStorage('ohis:auth_token');
        let url;
        if(this.props.is_query_string) url = `${this.props.url}?query=${inputValue}`;
        else url = `${this.props.url}${inputValue}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "AuthorizationHeader": "Bearer OSUN_1234567890987654321",
                'AuthToken': token
            }
        });

        const json = await response.json();
        let results = [];
        if(Array.isArray(json.data)){
            results = json.data.map(result => {
                return {
                    value: result.id,
                    label: result.name || result.service_name,
                    type : result.service_type || '',
                    price: result.price || 0
                }
            });
        }
        return results;
    }

    //not handled debounce
    loadOptions = inputValue => {

        if (!inputValue) {
            return [];
        }

        let results = this.makeRequestWith(inputValue);

        return results;
    }


    render () {
        const { input, meta, label, placeholder } = this.props;

        const errorFeedback = (this.props.touched && !this.props.valid) ? styles.formControlError : '';
        const successFeedback = (this.props.touched && this.props.valid) ? styles.formControlValid : '';

        const classes = `${errorFeedback} ${successFeedback}`;
        
        return (
            <div className={styles.formGroup}>
                <label htmlFor={this.props.label} className={styles.label}>{this.props.label}</label>
                <Async
                    {...this.props}
                    isClearable
                    cacheOptions
                    defaultOptions
                    placeholder={this.props.placeholder}
                    loadOptions={debounce(this.loadOptions, 300)}
                    onChange={(value) => this.onChange(value)}
                    className={classes}
                />
                {
                    (meta.error && meta.touched) && (
                        <div className={styles.errorText}>{meta.error}</div>
                    )
                }
            </div>
        )
    }
}

Autocomplete.propTypes = {
    label: PropTypes.string,
    placeholder: PropTypes.string,
    url: PropTypes.string.isRequired,
};


export default Autocomplete;