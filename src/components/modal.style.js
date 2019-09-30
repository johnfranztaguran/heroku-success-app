import styled from 'styled-components';
import { Modal } from 'antd';

const BidsModalStyled = styled(Modal)`
  .modal-footer-extra-link {
    margin-top: 10px;
    margin-bottom: 0;
    button {
      border: 0 none;
      display: inline;
      padding: 0;
      text-decoration: underline;
      color: #002d40;
    }
  }
  .ant-btn-primary {
    background-color: #154258;
    border-color: #154258;
  }
  .ant-form-item-label {
    text-align: left;
  }
`;

export default BidsModalStyled;
