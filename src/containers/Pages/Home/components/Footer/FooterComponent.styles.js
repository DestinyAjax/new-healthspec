import styled from 'styled-components';
import WithDirection from '@iso/lib/helpers/rtl';

const FooterStyleWrapper = styled.div`
    .footer {
        background-color: #273746 !important;
        color: #fff;
        padding: 30px;
    }

    .socialLink {
        margin-right: 15px;
        color: #ffffff;
        font-size: 20px;
    }

    .p {
        font-style: normal;
        font-weight: 500;
        font-size: 18px;
        line-height: 30px;
        color: #FFFFFF;
    }

    .scroll {
        width: 60px;
        height: 60px;
        background: #15974b;
        color: #fff;
        text-align: center;
        padding: 10px;
        font-size: 20px;
        border-radius: 50%

        &:hover {
            cursor: pointer;
        }
    }

    .footerTop {
        background-color: #F1F3F2;
        color: #fff;
        padding: 50px;
    }

    .formContent {
        padding-left: 60px;
    }

    .bar {
        display: inline-block;
        width: 70px;
        height: 5px;
        background-color: #15974b;
    }

    .formInput {
        background: #FFFFFF;
        border: 1px solid #C3BDBD;
        box-sizing: border-box;
        height: 60px;
        padding: 10px;
    }

    .bottomFooter {
        background-color: #17202A;
        padding: 20px;
        color: #fff
    }

    @media (min-width: 320px) and (max-width: 767px){
        .footer {
            background-color: #273746 !important;
            color: #fff;
            padding: 10px;
        }

        .socialLink {
            margin-right: 15px;
            color: #ffffff;
            font-size: 15px;
            text-align: center;
            float: left;
        }

        .logo {
            margin-bottom: 30px;
            display: inline-block;
        }

        .p {
            font-style: normal;
            font-size: 13px;
            line-height: 30px;
            color: #FFFFFF;
            text-align: center;
            margin-bottom: 20px;
        }

        .scroll {
            width: 60px;
            height: 60px;
            background: #36AEFC;
            color: #fff;
            text-align: center;
            padding: 10px;
            font-size: 30px;
            float: right;
        }

        .scroll:hover {
            cursor: pointer;
        }

        .footerTop {
            background-color: #006DB3;
            color: #fff;
            padding: 50px;
            display: none;
        }

        .bar {
            display: inline-block;
            width: 70px;
            height: 5px;
            background-color: #0099FF;
        }

        .formInput {
            background: #FFFFFF;
            border: 1px solid #C3BDBD;
            box-sizing: border-box;
            height: 60px;
            padding: 10px;
        }

        .bottomFooter {
            background-color: #17202A;
            padding: 20px;
            color: #fff
        }
    }
`;

export default WithDirection(FooterStyleWrapper);