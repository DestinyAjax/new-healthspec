import React, { Component } from 'react';
import swal from 'sweetalert';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import LayoutContent from '@iso/components/utility/layoutContent';
import DashboardLayout from '../../../containers/Dashboard/Dashboard';
import Breadcrumb from "../../../ui/Breadcrumb";
import Datatable from '../../../ui/Datatable';
import Loader from '../../../ui/Loader/Loader.Component';
import { getPlans, resetStorePlan, deletePlan } from '../../../shared/actions/Plan.action';

class PlanAll extends Component {

    state = {
        meta: {},
        current_page: 1,
    }

    componentDidMount() {
        this.props.getPlans(1);
    }

    showNotificationFrom = async nextProps => {
        if (nextProps.delete_plan_status === 200) {
            let alert = await swal({
                title: "Good job!",
                text: `Plan deleted successfully!`,
                icon: "success",
                closeOnClickOutside: false
            });


            if (alert) {
                this.props.resetStorePlan();
            }
        }
        if (nextProps.delete_plan_status === 522) {
            let alert = await swal({
                title: "No internet!",
                text: `Plan was not deleted!`,
                icon: "error",
                closeOnClickOutside: false
            });

            if (alert) {
                this.props.resetStorePlan();
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        this.showNotificationFrom(nextProps);
        this.setState({
            meta: nextProps.meta,
            current_page: nextProps.meta.current_page
        });
    }


    getNewPlansWith = page_number => {
        this.props.getPlans(page_number);
    }

    delete = async plan => {
        let alert = await swal({
            title: `Are you sure you want to delete [${plan.name}]`,
            type: 'warning',
            buttons: [
                'No',
                'Yes, I am sure!'
            ],
            dangerMode: true,
        });

        if (alert) {
            this.props.deletePlan({
                slug: plan.slug,
            });
        }
    }

    edit = plan => {
        this.props.history.push(`/dashboard/plan_edit_${plan.slug}`);
    }

    render() {

        return (
            <DashboardLayout>
                <Loader>
                    <LayoutContentWrapper>
                        <LayoutContent>  
                            <div className="row">
                                <div className="col-md-6">
                                    <h4>All Plans</h4>
                                </div>
                                <div className="col-md-6 text-right">
                                    <Link className="" to="/dashboard/plan_add">
                                        <button className="btn btn-sm btn-success" type="button">Add Plan</button>
                                    </Link>
                                </div> 
                            </div><hr/>
                            <div className="row">
                                <div className="col-md-12">
                                    <Datatable
                                        columns={[
                                            {
                                                key: 'id',
                                                title: 'ID',
                                                cell: 'Default',
                                                dataIndex: 'id',
                                                searchable: false,
                                            },
                                            {
                                                cell: 'Default',
                                                searchable: true,
                                                key: 'name',
                                                title: 'Name',
                                                dataIndex: 'name',
                                                search_key: 'name',
                                                sorter: (a,b) => a.name.length - b.name.length
                                            },
                                            {
                                                cell: 'Default',
                                                key: 'code',
                                                searchable: true,
                                                title: 'Code',
                                                search_key: 'code',
                                                dataIndex: 'code'
                                            },
                                            {
                                                key: 'is_active',
                                                title: 'Status',
                                                cell: 'Default',
                                                searchable: false,
                                                dataIndex: 'is_active'
                                            },
                                        ]}
                                        url={'plan/index'}
                                        actions={[
                                            // {
                                            //     key: 'slug',
                                            //     type: 'view',
                                            //     title: 'View',
                                            //     url: 'plan_view_'
                                            // },
                                            {
                                                key: 'slug',
                                                type: 'edit',
                                                title: 'Edit',
                                                url: 'dashboard/plan_edit_'
                                            },
                                            {
                                                key: 'slug',
                                                type: 'delete',
                                                title: 'Delete',
                                                url: 'dashboard/plan/delete/'
                                            },
                                        ]}
                                    />
                                </div>
                            </div>
                        </LayoutContent>
                    </LayoutContentWrapper>
                </Loader>
            </DashboardLayout>
        );
    }
}

const mapStateToProps = state => ({
    meta: state.PlanReducer.meta,
    plans: state.PlanReducer.plans,
    status: state.PlanReducer.get_plans_status,
    delete_plan_status: state.PlanReducer.delete_plan_status,
});

const mapDispatchToProps = dispatch => ({
    getPlans: payload => dispatch( getPlans(payload) ),
    resetStorePlan: () => dispatch( resetStorePlan() ),
    deletePlan: payload => dispatch( deletePlan(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(PlanAll);