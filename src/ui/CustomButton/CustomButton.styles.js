import styled from 'styled-components';
import WithDirection from '@iso/lib/helpers/rtl';

const ButtonWrapper = styled.div`

.button {
  padding: 10px;
  border: 1px solid transparent;
  letter-spacing: 0.29px;
  color: #FFFFFF;
  background-color: #15974b;
  width: 100% !important;

  font-size: 16px;
  border-radius: 5px;

  opacity: 1;
  transition: all 0.3s ease 0s;
}

.button:hover {
  color: #FFF;
  background-color: #e43829;

  opacity: 0.75;
}

.button:disabled {
    background: rgba(56,91,160, .8);
}

`;

export default WithDirection(ButtonWrapper);