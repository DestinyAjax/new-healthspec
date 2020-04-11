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

class ServiceAll extends Component {
    render() {

        let actions = [];
        let addNew, breadcrumb;

        if (this.props.active.role.name === "ADMIN") {
            actions = [
                {
                    key: "slug",
                    type: "delete",
                    title: "Delete",
                    url: "dashboard/service/delete/"
                },
                {
                    key: "slug",
                    type: "edit",
                    title: "Edit",
                    url: "dashboard/service_edit_"
                }
            ];
            breadcrumb = (
                <Breadcrumb
                    links={[
                        {
                            url: "/dashboard/service_all",
                            name: "All Services"
                        }
                    ]}
                />
            )
        }

        return (
            <DashboardLayout>
                <Loader>
                    <LayoutContentWrapper>
                        <LayoutContent>  
                            <div className="row">
                                <div className="col-md-6">
                                    <h4>All Services</h4>
                                </div>
                                {this.props.active.role.name === "ADMIN" && (
                                    <div className="col-md-6 text-right">
                                        <Link className="" to="/dashboard/service_add">
                                            <button className="btn btn-sm btn-success" type="button">Add Service</button>
                                        </Link>
                                    </div>
                                )}
                            </div><hr/>
                            <div className="row">
                                <div className="col-md-12">
                                    <Datatable
                                        columns={[
                                            {
                                                key: "id",
                                                dataIndex: 'id',
                                                title: "ID",
                                                cell: "Default",
                                                searchable: false
                                            },
                                            {
                                                cell: "Default",
                                                searchable: true,
                                                key: "name",
                                                title: "Name",
                                                search_key: "name",
                                                dataIndex: "name",
                                                sorter: (a,b) => a.name.length - b.name.length
                                            },
                                            {
                                                cell: "Default",
                                                dataIndex: 'service_category',
                                                searchable: true,
                                                title: "Category",
                                                key: "service_category",
                                                search_key: "service_category"
                                            },
                                            {
                                                title: 'Type',
                                                cell: 'Default',
                                                key: 'full_type',
                                                searchable: false,
                                                search_key: 'type',
                                                dataIndex: 'full_type'
                                            },
                                            {
                                                cell: "Default",
                                                searchable: false,
                                                key: "price",
                                                title: "Price",
                                                dataIndex: 'price'
                                            }
                                        ]}
                                        url={`service/index`}
                                        actions={actions}
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
    active: state.ChoseRoleReducer.role
});

export default connect(mapStateToProps, null)(ServiceAll);