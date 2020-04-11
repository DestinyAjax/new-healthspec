import styled from 'styled-components';
import WithDirection from '@iso/lib/helpers/rtl';

const HeaderStyleWrapper = styled.div`

    .navContainer {
        padding: 50px;
    }

    .navItem {
        font-family: "IBM Plex Sans", sans-serif !important;
        font-style: normal;
        font-weight: bold;
        font-size: 16px;
        line-height: 21px;
        margin-top: 15px;
        color: #15974b !important;
        display: inline-block;
        text-transform: uppercase;

        &:hover {
            color: #c5c5c5 !important
        }

        &:active {
            color: #15974b !important; 
        }
    }

        .navBtn {
            width: 150px;
            border: 1px solid #15974b;
            background-color: white;
            font-family: "IBM Plex Sans", sans-serif !important;
            padding: 10px;
            font-style: normal;
            font-weight: normal;
            font-size: 16px;
            margin-top: 10px;
            display: inline-block;
            color: #15974b;
            text-align: center;

            &:hover {
                text-decoration: none;
            }
        }
    

    @media (min-width: 320px) and (max-width: 767px){
        .navContainer {
            padding: 50px;
        }

        .navItem {
            font-family: "IBM Plex Sans", sans-serif !important;
            font-style: normal;
            font-weight: normal;
            font-size: 16px;
            line-height: 21px;
            color: #15974b !important;

            &:hover {
                color: #c5c5c5 !important
            }

            &:active {
                color: #15974b !important;
            }
        }

        .navBtn {
            width: 131px;
            height: 41px;
            border: 1px solid #15974b;
            background-color: white;
            font-family: "IBM Plex Sans", sans-serif !important;
            padding: 6px;
            font-style: normal;
            font-weight: normal;
            font-size: 14px;
            margin-top: 20px;
            color: #15974b;

            &:hover {
                text-decoration: none;
            }
        }
    }
`;

export default WithDirection(HeaderStyleWrapper);