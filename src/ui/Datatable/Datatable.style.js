import styled from 'styled-components';
import WithDirection from '@iso/lib/helpers/rtl';

const DatatableStyleWrapper = styled.div`
  
  .pagination {
    margin-top: 25px !important;
  }

  .pagination span {
    cursor: pointer;
    color: black;
    float: left;
    padding: 8px 16px;
    text-decoration: none;
    transition: background-color .3s;
    border: 1px solid #ddd;
  }

  .pagination span.active {
    background-color: #15974b;
    color: white;
    border: 1px solid #15974b;
  }

.center {
  text-align: center;
}
.actions {
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
}
.actions2 {
  width: 50%;
  margin: 15px auto;
}

.action {
    opacity: 1;
    display: block;
    font-size: 12px;
    cursor: pointer;
    padding: 10px 10px;

    color: #FFFFFF;
    border-radius: 5px;
    letter-spacing: 0.29px;
    transition: all 0.3s ease 0s;
    border: 1px solid transparent;

    margin-bottom: 15px;
}
.delete {
  opacity: .8;
  background: #e43829;
}
.edit {
  opacity: .8;
  background: #ffca28;
}
.view {
  opacity: .8;
  background: #15974b;
}
.search {
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  padding: 5px 5px;
  /* background: #eceeef; */
  margin-bottom: 15px;
}
.field,
.comparison {
  width: 14%;
}
.form {
  width: 30%;
}
.filter {
  width: 10%;
}
.button {
  width: 100%;
  display: block;
  background: #eceeef;
  padding: 5px 5px;
  border-radius: 5px;
  text-align: center;
  margin-top: 7px;
}

`;

export default WithDirection(DatatableStyleWrapper);
