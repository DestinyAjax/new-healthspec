import React from 'react';
import swal from 'sweetalert';
import { connect } from 'react-redux';
import { closeModal } from '../Modal.action';
import styles from './ClaimQuestion.component.module.css';
import CustomButton from '../../CustomButton';

class ClaimQuestion extends React.Component {

    state = {
        selected_service: null
    }

    componentDidMount() {
        this.setState({
            selected_service: this.props.selected_service
        });
    }

    answerHandler = (plan_service_question_key, option, optionKey) => {

        let copied_selected_service = { ...this.state.selected_service };

        let copied_plan_service_questions = copied_selected_service.plan_service_questions;
        let copied_plan_service_question = copied_plan_service_questions[plan_service_question_key];

        let copied_question = copied_plan_service_question.question;
        copied_question['is_answered'] = true;

        if (option.is_answer) {
            copied_question['is_correct'] = true;
        } else {
            copied_question['is_correct'] = false;
        }

        let copied_options = copied_question.options;
        let new_copied_options = copied_options.map(copied_option => {
            copied_option['is_picked'] = false;
            return copied_option;
        });

        let active_option = option;

        active_option['is_picked'] = true;
        new_copied_options[optionKey] = active_option;

        this.setState({
            selected_service: copied_selected_service
        });
    }

    submitQuestionHandler = async () => {

        //ensure every question is answered before submitting and if done, set is_checked to true
        let answeredQuestions = this.state.selected_service.plan_service_questions.filter(plan_service_question => {
            return plan_service_question.question.is_answered == true
        });
        if (this.state.selected_service.plan_service_questions.length !== answeredQuestions.length) {
            let alert = await swal({
                title: "Opps!",
                text: `You must answer all questions!`,
                icon: "error",
                closeOnClickOutside: true
            });

            if (alert) {
                console.dir('close');
            }
            return;
        }


        //check the correct status and update selected_service
        let status = this.state.selected_service.plan_service_questions.find(plan_service_question => {
            return plan_service_question.question.is_correct === false;
        });

        if (status === undefined) {
            this.state.selected_service['is_passed'] = true;
        } else {
            this.state.selected_service['is_passed'] = false;
        }

        this.props.questionHandler(this.state.selected_service);
    }

    render() {

        let questions;

        if (this.state.selected_service !== null) {
            questions = this.state.selected_service.plan_service_questions.map((plan_service_question, plan_service_question_key) => {

                let options = plan_service_question.question.options.map((option, key) => {

                    let checked = <i className="fa fa-circle-o" aria-hidden="true"></i>

                    if (option.is_picked) {
                        checked = <i className="fa fa-circle" aria-hidden="true"></i>
                    }

                    return (
                        <div className={styles.option} onClick={() => this.answerHandler(plan_service_question_key, option, key)} key={option.id}>
                            <span className={styles.optionIcon}>{checked}</span>
                            <span className={styles.optionValue}>{option.value}</span>
                        </div>
                    )
                });

                return (
                    <ol className={styles.questionGroup} key={plan_service_question.id}>
                        <div className={styles.question}>{plan_service_question.question.question}</div>
                        <div className={styles.options}>
                            {options}
                        </div>
                    </ol>
                )
            });
        }


        return (
            <div className={styles.modal}>
                <div className={styles.body}>
                    <div>
                        <div className={styles.action}>
                            <div className={styles.goBack} onClick={this.props.closeQuestion}>
                                <i className="fa fa-arrow-left" aria-hidden="true"></i>  Go Back
                            </div>
                        </div>

                        <div className={'h3'} >We need to answer the following questions</div>

                        <div>
                            {questions}
                        </div>

                        <div className={styles.button}>
                            <CustomButton onClick={this.submitQuestionHandler}>Submit</CustomButton>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
    }
}

const mapDispatchToProps = dispatch => {
    return {
        closeModal: () => dispatch(closeModal()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClaimQuestion);