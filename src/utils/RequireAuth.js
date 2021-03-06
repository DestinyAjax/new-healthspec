import React from 'react';
import { withRouter } from 'react-router';
import { getStorage } from '../utils/storage';

export default function requireAuth(Component) {

    class AuthenticatedComponent extends React.Component {
        state = {
            isLogedIn: 0
        }

        componentDidMount() {
            this.checkAuth();
        }

        checkAuth = async () => {

            try {
                const authUserId = await getStorage("ohis:auth_token") || 0;

                this.setState({
                    isLogedIn: authUserId
                });

                const isFirstLogin = await getStorage("is_first_login");

                if (isFirstLogin === 1) {
                    return this.props.history.push('/change_password');
                }

                if (authUserId === 0) {
                    return this.props.history.push('/');
                }

                

            } catch (error) {
                console.dir('Error getting in storage');
            }

        }

        render() {
            return this.state.isLogedIn !== 0 ? <Component {...this.props} /> : null;
        }
    }

    return withRouter(AuthenticatedComponent);
}