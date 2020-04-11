import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { removeStorage } from '../../shared/utils/storage';
import { toggle } from '../../shared/actions/Menu.action';
import HeaderStyleWrapper from './Header.component.style';

class Header extends React.Component {
    mobileMenuHandler = () => {
        this.props.toggle();
    }

    logUserOutHandler = () => {
        removeStorage('ohis:auth_token');
        removeStorage('ohis:reduxState');

        return this.props.history.push('/');
    }

    render() {
        return (
            <HeaderStyleWrapper className="headerStyle">
                <div className='bg-light'>
                    <div className="mobile">
                        <div className="logo">
                            <img src={require('../../assets/images/ohis_logo.png')} />
                        </div>
                        <div className="menu" onClick={this.mobileMenuHandler}>
                            <img src={require('../../assets/images/menu.png')} />
                        </div>
                    </div>

                    <div className="web">
                        <div className="webMenu">
                            <img src={require('../../assets/images/ohis_logo.png')} />
                        </div>
                        <div className="rightMenu">
                            <div className="supportUs">
                                <div className="button">Contact Support</div>
                            </div>
                            <div className="profile">
                                <div>{this.props.name}</div>
                                <div className="setting" onClick={this.logUserOutHandler}>
                                    <i className="fa fa-sign-out fa-2x"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </HeaderStyleWrapper>
        );
    };
};

const mapStateToProps = state => {
    return {
        name: state.AuthReducer.name
    }
}

const mapDispatchToProps = dispatch => {
    return {
        toggle: () => dispatch(toggle())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));