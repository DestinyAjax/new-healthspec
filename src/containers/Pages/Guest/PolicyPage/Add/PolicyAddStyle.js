import styled from 'styled-components';
import { palette } from 'styled-theme';
import WithDirection from '@iso/lib/helpers/rtl';

const PolicyStyleWrapper = styled.div`

    .container {
        width: 90%;
        margin: 55px auto;
    }

    .header {
        font-family: Playfair Display;
        font-weight: bold;
        line-height: 48px;
        font-size: 24px;
        color: #0099FF;
    }

    .policies {
        margin-top: 35px;
    }

    .datatable{
        margin-bottom: 60px;
    }

    .button {
        opacity: 1;
        padding: 10px;
        font-size: 16px;
        cursor: pointer;
        margin-bottom: 10px;
        float: right;
        color: #FFFFFF;
        border-radius: 5px;
        background: #15974b;
        letter-spacing: 0.29px;
        transition: all 0.3s ease 0s;
        border: 1px solid transparent;

        &:hover {
            opacity: 0.75;
            color: #FFF;
            background-color: #e43829;
        }
    }

    .sliderContainer {
        border-radius: 20px;
        border: 1px solid #EBEBEB;

        margin-bottom: 65px;
    }

    .slider {
        height: 10px;
        border-radius: 20px;
        background-color: #15974b;
    }

    @media screen and (min-width: 900px) {
        .container {
            width: 75%;
            margin: 55px auto;
        }

        .policies {
            width: 80%;
            display: flex;
            flex-wrap: wrap;
        }
    }
`;

export default WithDirection(PolicyStyleWrapper);
