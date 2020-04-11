import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import IntlMessages from '@iso/components/utility/intlMessages';
import AuthForm from '../../../ui/forms/AuthForm/AuthForm.component';
import { startAuth } from '../../../shared/actions/Auth.action';

import SignInStyleWrapper from './SignIn.styles';

class SignIn extends React.Component {

  state = {
    submittingForm: false,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.status !== null) {
      this.setState({
        submittingForm: false
      });
    }

    if (nextProps.status === 200) {
      return this.props.history.push('/chose_role');
    }

    if (nextProps.status === 522) {
      this.setState({
        submittingForm: false
      });
    }
  }

  handleSubmit = formData => {
    const {dispatch} = this.props;

    formData['field'] = 'enrollee_id';

    if (/(.+)@(.+){2,}\.(.+){2,}/.test(formData.value)) {
      formData['field'] = 'email';
    }

    this.setState({
      submittingForm: true
    }, () => {
      dispatch(startAuth(formData));
    });
  }

  handleOnChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }
  
  render() {

    let errorMsg;
    if (this.props.status !== 200 && this.props.message) {
      errorMsg = (
        <div className="">
          { this.props.message }
        </div>
      );
    }

    return (
      <SignInStyleWrapper className="isoSignInPage">
        <div className="isoLoginContentWrapper">
          <div className="isoLoginContent">
            <div className="isoLogoWrapper">
              <Link to="/">
                <img src="/images/logo.jpeg" alt="ohis-logo" style={{width: '100px'}} />
              </Link>
            </div>
            <div className="isoSignInForm">
              {errorMsg && (
                <div className="alert alert-danger">
                  {errorMsg}
                </div>
              )}
              <AuthForm onSubmit={this.handleSubmit} submittingForm={this.state.submittingForm} />
              <hr/>
              <div className="isoCenterComponent isoHelperWrapper">
                <Link to="/forgotpassword" className="isoForgotPass">
                  <IntlMessages id="page.signInForgotPass" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </SignInStyleWrapper>
    );
  }
}

const mapStateToProps = state => ({
  status: state.AuthReducer.status,
  message: state.AuthReducer.message,
});

export default connect(mapStateToProps, null)(SignIn);
