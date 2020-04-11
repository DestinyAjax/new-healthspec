import styled from 'styled-components';
import { palette } from 'styled-theme';
import WithDirection from '@iso/lib/helpers/rtl';

const ChoseRoleStyleWrapper = styled.div`
    .container {
        display: flex;
        flex-direction: column;
        height: 100vh;
        
        .content-div {
            text-align: center;

            h3 {
                font-weight: bold;
                margin-bottom: 20px;
            }
        }
    }

    .content {
        flex: 1;
        width: 90%;
        margin: 55px auto;
    }

    .header {
        text-align: center;
    }

    .title {
        font-size: 20px;
        color: #333333;
        font-weight: bold;
        line-height: 72px;
    }

    .description {
        width: 65%;
        margin: 0 auto;
        font-size: 16px;
        ine-height: 29px;
        font-family: Lato;
        line-height: 29px;
        color: #80898A;
    }

    .roles {
        margin-top: 55px;

        .role {
            width: 100%;
            display: flex;
            cursor: pointer;
            border-radius: 10px;
            justify-content: space-between;
            margin-bottom: 25px;
        }

        .roleDescription {
            background: #FFF;
            border-top-left-radius: 10px;
            border-bottom-left-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            border: 1px solid #c5c5c5;
            padding: 25px 25px;
            width: 100%;
        }

        .enter {
            background: #15974b;
            padding: 25px 25px;
            border-top-right-radius: 10px;
            border-bottom-right-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .companyLogo {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            border: 1px solid #80898A;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 25px;

            img {
                width: 50%;
                max-width: 50%;
            }
        }
    }
    
    
    
    @media screen and (min-width: 1200px) {
        .container {
            background: #e7eff5;
        }
        .title {
            font-size: 36px;
            color: #333333;
            font-weight: bold;
            line-height: 72px;
        }
        .description {
            width: 28%;
            margin: 0 auto;
        }
        .roles {
            width: 50%;
            margin: 75px auto;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
        }

        .role {
            width: 48%;
        }
    }
`;

export default WithDirection(ChoseRoleStyleWrapper);