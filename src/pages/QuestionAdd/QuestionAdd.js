import React, { Component } from 'react';
import swal from 'sweetalert';
import {connect} from 'react-redux';
import {Card} from 'antd';
import { reset } from 'redux-form';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import LayoutContent from '@iso/components/utility/layoutContent';
import DashboardLayout from '../../containers/Dashboard/Dashboard';
import Loader from '../../ui/Loader/Loader.Component';
import Breadcrumb from '../../ui/Breadcrumb';
import QuestionForm from '../../ui/forms/QuestionForm';
import { storeQuestion, resetStore } from '../../shared/actions/Question.action';
import CustomButton from '../../ui/CustomButton';

class QuestionAdd extends Component {

    state = {
        options: [],
        question: null,
        show_options: false,
        submittingForm: false,
    }

    handleSubmit = formData => {
        this.setState({
            show_options: true,
            question: formData.value
        });
    }

    handleOptionSubmit = formData => {
        let option = {};

        option['is_answer'] = false;
        option['value'] = formData.value;
        option['id'] = Math.floor(Math.random()) + new Date().getTime();

        this.setState({
            options: [...this.state.options].concat(option)
        });
        this.props.reset('QuestionForm');
    }

    removeSelectedOptionHandler = selected_option => {
        this.setState(prevState => ({
            options: [...prevState.options].filter(option => {
                return option.id != selected_option.id;
            })
        }));
    }

    answerHandler = (option, index) => {
        let options = [...this.state.options].map(option => {
            option.is_answer = false;
            return option;
        });

        option.is_answer = true;
        options[index] = option;

        this.setState({
            options: options
        });
    }

    showNotification = async () => {
        let alert = await swal({
            title: "Opps!",
            text: `Please you need to pick an answer!`,
            icon: "error",
            closeOnClickOutside: true
        });

        if (alert) {
            console.dir('close');
        }
    }

    submitHandler = () => {
        let option = this.state.options.find(option => {
            return option.is_answer == true
        });

        if (option == undefined) {
            return this.showNotification();
        }

        let form = {};

        form['question'] = this.state.question;
        form['options'] = this.state.options;
        form['answer'] = option.id;

        this.setState({
            submittingForm: true
        }, () => {
            this.props.storeQuestion(form);
        });
    }

    async componentDidUpdate(prevState, prevProps) {
        if (prevState.store_question_status !== this.props.store_question_status) {
            if (this.props.store_question_status === 200) {
                let alert = await swal({
                    title: "Good job!",
                    text: `Question was created successfully!`,
                    icon: "success",
                    closeOnClickOutside: false
                });

                if (alert) {
                    this.setState({
                        options: [],
                        question: null,
                        show_options: false,
                        submittingForm: false
                    });
                    this.props.reset('QuestionForm');
                    this.props.resetStore();
                }
            }
        }
    }

    render() {

        let selected_options;

        let container = (
            <Card style={{width: '100%'}}>
                <QuestionForm
                    label={"Your Question"}
                    onSubmit={this.handleSubmit}
                />
            </Card>
        );


        if (this.state.options.length) {
            let options = this.state.options.map((option, index) => {
                let checked = <i className="fa fa-circle-o" aria-hidden="true"></i>

                if (option.is_answer) {
                    checked = <i className="fa fa-circle" aria-hidden="true"></i>
                }

                return (
                    <tr key={option.id}>
                        <td onClick={() => this.answerHandler(option, index)}>{checked}</td>
                        <td>{option.value}</td>
                        <td onClick={() => this.removeSelectedOptionHandler(option)}><i className={"fa fa-trash-o"}></i></td>
                    </tr>
                )
            });

            selected_options = (
                <Card style={{width: '100%'}}>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Select an Answer</th>
                                <th>Option</th>
                            </tr>
                        </thead>
                        <tbody>{ options }</tbody>
                    </table><hr/>

                    <div className="row col-md-12">
                        <CustomButton onClick={this.submitHandler} submittingForm={this.state.submittingForm}>Submit</CustomButton>
                    </div>
                </Card>
            );
        }


        if (this.state.show_options) {
            container = (
                <div className="">
                    <div>{this.state.question}</div>
                    <Card style={{width: '100%'}}>
                        <QuestionForm
                            placeholder={"Your Options"}
                            onSubmit={this.handleOptionSubmit}
                        />
                    </Card><br/>
                    
                    { selected_options }
                </div>
            );
        }

        return (
            <DashboardLayout>
                <Loader>
                    <LayoutContentWrapper>
                        <LayoutContent>
                            <div className="row">
                                <div className="col-md-12">
                                    <Breadcrumb links={[
                                    {
                                        url: '/dashboard/question_add',
                                        name: 'Condition'
                                    },
                                    ]} />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-12">
                                    {container}
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
    store_question_status: state.QuestionReducer.store_question_status,
});

const mapDispatchToProps = dispatch => ({
    resetStore: () => dispatch(resetStore()),
    reset: payload => dispatch(reset(payload)),
    storeQuestion: payload => dispatch(storeQuestion(payload) ),
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionAdd);