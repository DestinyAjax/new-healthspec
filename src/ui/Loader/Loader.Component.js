import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';

class Loader extends Component {

    render() {
        const { isLoading, children } = this.props;

        if (isLoading) {
            return (
                <Fragment>
                    <p style={{ textAlign: 'center', padding: '20px'}}>
                        <span style={{fontSize: '25px'}}>
                            <i className="fa fa-spinner fa-spin"></i> Loading...
                        </span>
                    </p>
                </Fragment>
            )
        }
        return children;
    }
}

const mapStateToProps = ({ LoaderReducer }) => ({
    isLoading: LoaderReducer.isLoading
})

export default connect(mapStateToProps)(Loader);