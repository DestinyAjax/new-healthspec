import React from 'react';
import Select from 'react-select';
import styles from './CustomReactSelect.component.module.css';


class CustomReactSelect extends React.Component {

    onChange(event) {

        if (this.props.input.onChange && event != null) {
            // To be aligned with how redux-form publishes its CHANGE action payload. The event received is an object with 2 keys: "value" and "label"
            // this.props.input.onChange(event.value);

            if (event.value) {
                this.props.input.onChange(event.value);
            } else {
                this.props.input.onChange(event);
            }

        } else {
            // Clear the input field
            this.props.input.onChange(null);
        }
    }

    render () {
        const { input, meta, label, placeholder } = this.props;

        const inputError = (meta.invalid && meta.touched) ? styles.formControlError : '';
        const inputValid = (meta.valid && meta.touched) ? styles.formControlValid : '';

        const classes = `${styles.formControl} ${inputError} ${inputValid}`;

        return (
            <div className={styles.formGroup}>
                <label className={styles.formLabel}>{label}</label>
                <Select
                    {...this.props}
                    value={this.props.input.value}
                    onChange={(value) => this.onChange(value)}
                    onBlur={() => this.props.input.onBlur(this.props.input.value)}
                    options={this.props.options}
                    placeholder={this.props.placeholder}
                    className={classes}
                />

                {
                    (meta.error && meta.touched) && (
                        <div className={styles.errorText}>{meta.error}</div>
                    )
                }
            </div>
        );
    }
}

export default CustomReactSelect;