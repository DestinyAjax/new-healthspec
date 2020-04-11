import styled from 'styled-components';
import { palette } from 'styled-theme';
import WithDirection from '@iso/lib/helpers/rtl';

const HeaderStyleWrapper = styled.div`
    
    .mobile {
        padding: 25px 1px 25px 25px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .logo {
            img {
                width: 50%;
                max-width: 50%;
                margin-right: 0;
            }
        }

        .menu {
            padding-right: 25px;
        }
    }

    .button {
        padding: 10px;
        border: 1px solid transparent;
        letter-spacing: 0.29px;
        color: #FFFFFF;
        background: #15974b;
        width: 100%;
        font-size: 16px;
        border-radius: 5px;
        opacity: 1;
        transition: all 0.3s ease 0s;

        &:hover {
            color: #FFF;
            background-color: #e43829;
            opacity: 0.75;
        }

        &:disabled {
            background: rgba(56,91,160, .8);
        }
    }


    .container {
        background: #FFFFFF;
        border-bottom: 1px solid #C4C4C4;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .web {
        display: none;
    }

    @media screen and (min-width: 1200px) {

        .container {
            /* padding: 25px 25px 25px 25px; */
            border-bottom: 0.01px solid #C4C4C4;
        }

        .mobile {
            display: none;
        }

        .web {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;

            img {
                width: 100%;
                max-width: 100%;
            }

            .webMenu {
                padding: 25px 1px 25px 25px;
                
                img {
                    width: 75px;
                }
            }

            .rightMenu {
                display: flex;
                align-items: center;
                justify-content: space-between;

                .supportUs {
                    margin-right: 25px;

                    .button {
                        opacity: 1;
                        width: 100%;
                        font-size: 12px;
                        cursor: pointer;
                        color: #FFFFFF;
                        padding: 5px 10px;
                        font-weight: bold;
                        border-radius: 5px;
                        background: #15974b;
                        letter-spacing: 0.29px;
                        border: 1px solid transparent;
                        transition: all 0.3s ease 0s;
                    }
                }

                .profile {
                    color: #80898A;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-left: 15px;
                    padding: 25px 1px 25px 25px;
                    border-left: 1px solid #E5E5E5;
                    cursor: pointer;

                    .setting {
                        margin-left: 15px;
                        margin-right: 15px;
                    }
                }
            }
        }
       
        
        .user {
            margin-left: 15px;
        }

        .user img {
            width: 100%;
        }

        .button {
            &:hover {
                color: #FFF;
                opacity: 0.75;
                background-color: #e43829;
            }
        }
    }
`;

export default WithDirection(HeaderStyleWrapper);