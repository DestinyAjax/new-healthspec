import React from "react";
import { reduxForm } from "redux-form";
import EditorField from "../../Editor";
import styles from './NoteForm.component.module.css';


class NoteForm extends React.Component {

    handleForm = values => {
        return this.props.getNote(values.editorText);
    }

    render() {
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.handleForm)}>
                <EditorField
                    key="field"
                    name="editorText"
                    id="inputEditorText"
                    disabled={false}
                    placeholder="Type here"
                    className={styles.editor}
                />

                <button className={"btn btn-success"} key="submit" type="submit">
                    Save Note
                </button>
            </form>
        );
    }
}

export default reduxForm({
    form: "draft"
})(NoteForm);
