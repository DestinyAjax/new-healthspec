import React, { Component } from 'react';
import {Row,Col} from 'antd';
import {connect} from 'react-redux';
import { Pie } from 'react-chartjs-2';
import PageHeader from '@iso/components/utility/pageHeader';
import Box from '@iso/components/utility/box';
import LayoutWrapper from '@iso/components/utility/layoutWrapper.js';
import ContentHolder from '@iso/components/utility/contentHolder';
import { getProfileFor } from '../../shared/actions/Profile.action';
import DashboardLayout from '../../containers/Dashboard/Dashboard';
import Loader from '../../ui/Loader/Loader.Component';
import './Dashboard.style.css';

class DashboardPage extends Component {

    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(getProfileFor(this.props.role.slug));
    }

  render() {
    let content;

    const rowStyle = {
        width: '100%',
        display: 'flex',
        flexFlow: 'row wrap',
      };
      const colStyle = {
        marginBottom: '16px',
      };
      const gutter = 16;

    if (this.props.get_profile_status === 200) {
        let dashboard = this.props.dashboard.map(dashboard => {
            let data = {
                labels: [
                    'Total',
                    'Active',
                    'Inactive'
                ],
                datasets: [{
                    data: [dashboard.data.total, dashboard.data.active, dashboard.data.inactive],
                    backgroundColor: [
                        '#36A2EB',
                        '#01a9ac',
                        '#FF6384'
                    ],
                    hoverBackgroundColor: [
                        '#36A2EB',
                        '#01a9ac',
                        '#FF6384'
                    ]
                }]
            };

            return (
                <Col md={8} sm={8} xs={24} style={colStyle}>
                    <Box>
                        <ContentHolder>
                            <div className="summaryCard" style={{width: '100%'}}>
                                <div className="summaryCardTitle">{dashboard.name}</div>
                                <div className="summaryCardGraph">
                                    <Pie data={data}
                                        options={{
                                            legend: { position: 'bottom' }
                                        }}
                                    />
                                </div>
                                <div className="summaryCardBottom">
                                    <div className={['summaryCardDescription', 'b_r_default'].join(" ")}>
                                        <div className="summaryCardCount">{dashboard.data.total}</div>
                                        <div className="summaryCardName">Total</div>
                                    </div>
                                    <div className={["summaryCardDescription", "b_r_default"].join(" ")}>
                                        <div className="summaryCardCount">{dashboard.data.active}</div>
                                        <div className="summaryCardName">Active</div>
                                    </div>
                                    <div className={['summaryCardDescription']}>
                                        <div className="summaryCardCount">{dashboard.data.inactive}</div>
                                        <div className="summaryCardName">Inactive</div>
                                    </div>
                                </div>
                            </div>
                        </ContentHolder>
                    </Box>
                </Col>
            );
        });

        content = (
            <Row style={rowStyle} gutter={gutter} justify="start">   
                { dashboard }
            </Row>
        );
    };

    return (
        <DashboardLayout>
            <Loader>
                <LayoutWrapper >
                    <PageHeader>
                        Dashboard
                    </PageHeader>
                    { content }
                </LayoutWrapper>
            </Loader>
        </DashboardLayout>
    );
  }
}

const mapStateToProps = state => ({
    App: state.App,
    role: state.ChoseRoleReducer.role,
    role_user: state.ProfileReducer.profile,
    dashboard: state.ProfileReducer.dashboard,
    get_profile_status: state.ProfileReducer.get_profile_status,
});

export default connect(mapStateToProps, null)(DashboardPage);
