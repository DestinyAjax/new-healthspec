import styled from 'styled-components';
import WithDirection from '@iso/lib/helpers/rtl';

const SelectInputWrapper = styled.div`

    .formGroup {
        margin-bottom: 20px;
        display: block;
        width: 100%;

        .formControl {
            padding: 10px 15px;
            width: 100%;
            font-size: 12px;
            border-radius: 5px;
            color: #464a4c;
            background: #EBEBEB;

            border: 1px solid transparent;
        }

        .formControlValid {
            border: 1px solid #5CB85C;
        }

        .formControlError {
            border: 1px solid #d9534f;
        }

        .errorText {
            color: #d9534f;
            margin-top: 10px;
            font-size: 12px;
        }

        .formLabel {
            color: #80898A;
            font-size: 13px;
            display: block;
            margin-bottom: 10px;
        }

        .formSearchControl {
            width: 100%;
            padding: 5px 5px;
        }
    }
`;

export default WithDirection(SelectInputWrapper);