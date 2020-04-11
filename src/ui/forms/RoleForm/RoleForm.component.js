import React from 'react';
import {Card} from 'antd';
import CustomInput from '../../CustomInput';
import CustomButton from '../../CustomButton';
import { Field, reduxForm } from 'redux-form';
import styles from './RoleForm.component.module.css';
import { requiredValidator } from '../../../shared/utils/validation';

class RoleForm extends React.Component {

    state = {
        permissions: []
    }

    componentDidMount() {
        this.setPermissions();
    }

    setPermissions = () => {
        const role_permissions = this.props.role_permissions.map(role_permission => role_permission.permission.id);

        const permissions = this.props.permissions.map(permission => {
            if (role_permissions.includes(permission.id)) {
                permission['is_picked'] = true;
            } else {
                permission['is_picked'] = false;
            }
            return permission;
        });

        this.setState({
            permissions: permissions
        });
    }

    permissionHandler = (permission, index) => {
        permission['is_picked'] = !permission['is_picked'];

        let newPermissions = [...this.state.permissions];
        newPermissions[index] = permission;

        this.setState({
            permissions: newPermissions
        });
    }

    handleSubmit = formData => {
        formData['permissions'] = this.state.permissions.filter(permission => permission.is_picked).map(permission => permission.id);

        this.props.submit(formData);
    }


    render () {

        let { handleSubmit, pristine, invalid, btnText } = this.props;

        let permissions = this.state.permissions.map((permission, index) => {

            let checked = <i className="fa fa-circle-o" aria-hidden="true"></i>
            if (permission.is_picked) {
                checked = <i className="fa fa-circle" aria-hidden="true"></i>
            }

            return (
                <tr key={permission.id} onClick={() => this.permissionHandler(permission, index)}>
                    <td>{checked}</td>
                    <td>{permission.name}</td>
                    <td>{permission.url}</td>
                    <td>{permission.description}</td>
                </tr>
            )
        });


        return (
            <form onSubmit={handleSubmit(this.handleSubmit)}>
                <Card style={{width:'100%'}}>
                    <div className="row">
                        <div className="col-md-12">
                            <Field
                                name="name"
                                component={CustomInput}
                                type="text"
                                label="Name"
                                validate={[requiredValidator]}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className={styles.questionHeader}>Permissions</div>
                            <div>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Status</th>
                                            <th>Name</th>
                                            <th>Url</th>
                                            <th>Description</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        { permissions }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </Card>
                <div className={styles.buttonContainer}>
                    <div className={styles.button}>
                        <CustomButton disabled={invalid || pristine}>{btnText}</CustomButton>
                    </div>
                </div>
            </form>
        );
    }
}

export default reduxForm({
    form: 'RoleForm'
})(RoleForm);