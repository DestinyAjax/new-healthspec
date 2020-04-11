import React from 'react';
import swal from 'sweetalert';
import { Table, Tag } from 'antd';
// import Filter from './Filter.component';
import { withRouter } from 'react-router-dom';
import SearchForm from './SearchForm.component';
import customswal from '@sweetalert/with-react';
import { getStorage } from '../../shared/utils/storage';
import { url } from './../../config';

import DatatableStyleWrapper from './Datatable.style';

class Datatable extends React.Component {

    state = {
        data: [],
        per_page: 20,
        last_page: 0,
        loading: true,
        total_pages: 0,
        current_page: 0,
        active_data: null,
        show_actions: false,
        query: ''
    };

    get = async end_point => {
        let token = await getStorage('ohis:auth_token');

        return fetch(url + end_point, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "AuthorizationHeader": "Bearer OSUN_1234567890987654321",
                'AuthToken': token
            },
        });
    }

    handleSearch = async value => {
        let searchable = this.props.columns.filter(column => column.searchable).map(column => column.search_key).join("*");
        let query = `${searchable}:${value}`;

        let response = await this.get(`${this.props.url}?search=${query}`);
        const data = await response.json();

        this.reset(data);
    }

    detectQueryString = (url) => {
        // get the current URL

        // regex pattern for detecting ? character
        var pattern = new RegExp(/\?.+=.*/g);

        return pattern.test(url);
    }

    fetchData = async (url, page_number) => {
        let request;
        this.setState({ loading: true });
        if (this.detectQueryString(url)) request = this.get(`${url}&page=${page_number}`);
        else request = this.get(`${url}?page=${page_number}`);
        //make http request
        let response = await request;
        const data = await response.json();

        this.reset(data);
    }

    reset = data => {
        let newData, total_pages, last_page, current_page;
        let tableData = [];
        
        if (data.data) {
            newData = data.data.map(data => {
                data['is_selected'] = false;
                return data;
            });
            newData.map((table,index) => {
                table['key'] = table.id
                tableData.push(table);
            });
            total_pages = data.meta.total;
            last_page = data.meta.last_page;
            current_page = data.meta.current_page;
        } else {
            newData = [];
            total_pages = 0;
            last_page = 0;
            current_page = 0;
        }

        this.setState({
            data: tableData,
            loading: false,
            total_pages: total_pages,
            last_page: last_page,
            current_page: current_page
        });
    }

    componentDidMount() {
        this.fetchData(this.props.url, 1);
    }

    getPaginated = page_number => {
        this.fetchData(this.props.url, page_number);
    }

    selected = row => {
        console.log(JSON.stringify(row));
        let tableData = [];
        let newData = this.state.data.map(data => {
            data['is_selected'] = false;

            if (row.id === data.id) {
                data['is_selected'] = true;
            }

            return data;
        });

        newData.map((table,index) => {
            table['key'] = table.id
            tableData.push(table);
        });

        this.setState({
            data: tableData,
            active_data: row,
            show_actions: true
        }, async () => {
            if (this.props.actions.length) {
                let actions = this.props.actions.map((action, index) => {

                    let classes = `action delete`;

                    if (action.type === 'edit') {
                        classes = `action edit`;
                    }

                    if (action.type === 'view') {
                        classes = `action view`;
                    }


                    return (
                        <div key={index} className={classes} onClick={() => this.handle(action)}>
                            {action.title}
                        </div>
                    )
                });

                customswal({
                    content: (
                        <div>
                            <h1>Action List(s)</h1>
                            <div className="actions2">
                                {actions}
                            </div>
                        </div>
                    ),
                    buttons: false,
                });
            }
        });
    }

    delete = async (key, url) => {
        //set is deleting status on the particular table
        // let newData = data.data.map(data => {
        //     data['is_selected'] = false;
        //     return data;
        // });
        // this.setState({
        //     data: newData,
        // });

        let param = this.state.active_data[key];

        let response = await this.get(`${url}${param}`);
        const data = await response.json();


        if (data.status === 200) {
            let newData = [...this.state.data].filter(data => {
                return param !== data[key]
            });

            this.setState({
                data: newData,
            });
        }
    }

    handle = async ({ type, url, key }) => {
        let alert = await swal({
            title: `Are you sure you want to ${type}`,
            type: 'warning',
            buttons: [
                'No',
                'Yes, I am sure!'
            ],
        });
        if (alert) {
            if (type === 'delete') {
                this.delete(key, url);
            }
            //edit
            if (type === 'edit') {
                let param = this.state.active_data[key];
                return this.props.history.push(`${url}${param}`);
            }
            if (type === 'view') {
                let param = this.state.active_data[key];
                return this.props.history.push(`${url}${param}`);
            }
        }
    }

    tableList = () => {
        let values = [];

        if (this.state.data.length) {
            return this.state.data.map(row => {
                let icon = <i className="fa fa-circle-thin" aria-hidden="true"></i>

                if (row.is_selected) {
                    icon = <i className="fa fa-circle" aria-hidden="true"></i>
                }

                return (
                    <tr key={row.id} onClick={() => this.selected(row)}>
                        <td>{icon}</td>
                        {this.props.columns.map(col =>
                            <td key={col.key}>
                                {row[col.key]}
                            </td>
                        )}
                    </tr>
                )
            });
        }

        let container = (
            <tr>
                <td colSpan={this.props.columns.length + 1} className="center">No Records Found.</td>
            </tr>
        )

        if (this.state.loading) {
            container = (
                <tr>
                    <td colSpan={this.props.columns.length + 1} className="center">Slow network, Loading...</td>
                </tr>
            )
        }

        return (
            <React.Fragment>
                {container}
            </React.Fragment>
        )
    }

    render() {
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(this.state.total_pages / this.state.per_page); i++) {
            pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
            let classes = this.state.current_page === number ? 'active' : '';

            if (number == 1 || number == this.state.total_pages || (number >= this.state.current_page - 2 && number <= this.state.current_page + 2)) {
                return (
                    <span key={number} className={classes} onClick={() => this.getPaginated(number)}>{number}</span>
                );
            }
        });

        let searchForm;

        if (!this.props.hideSearch) {
            searchForm = (
                <SearchForm onChangeHandler={this.handleSearch} />
            )
        }

        return (
            <React.Fragment>
                <DatatableStyleWrapper className="iosDatatableWrapper">
                    {searchForm}
                    <Table 
                        onRow={(record, rowIndex) => {
                            return {
                                onClick: event => {this.selected(record)},
                            };
                        }}                
                        columns={this.props.columns} 
                        dataSource={this.state.data} 
                        pagination={false}
                    />
                    
                    {/* <table className={['table', 'table-striped', 'table-hover'].join(' ')}>
                        <thead>
                            <tr>
                            <th></th>
                            {this.props.columns.map((column, index) => <th key={index}>{column.title}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {this.tableList()}
                        </tbody>
                    </table> */}
                    <div className="pagination">
                        <span onClick={() => this.getPaginated(1)}>&laquo;</span>
                        {renderPageNumbers}
                        <span onClick={() => this.getPaginated(this.props.last_page)}>&raquo;</span>
                    </div>
                </DatatableStyleWrapper>
            </React.Fragment>
        );
    };
}

Datatable.defaultProps = {
    hideSearch: false
}

export default withRouter(Datatable);