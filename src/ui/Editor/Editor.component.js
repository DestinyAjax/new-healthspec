import React from "react";

import { Field } from "redux-form";
import EditorFieldComponent from "./EditorField.component";

const EditorField = props => {
    return <Field {...props} component={EditorFieldComponent} />;
};

export default EditorField;