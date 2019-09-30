import styled from 'styled-components'; // eslint-disable-line import/no-unresolved
import { palette } from 'styled-theme';
import { Modal } from 'antd';

const ModalStyled = styled(Modal)`
  .ant-btn-primary {
    background-color: ${palette('primary', 0)};
    border-color: ${palette('primary', 0)};
  }
  .ant-btn-primary:hover {
    background-color: ${palette('primary', 0)};
    border-color: ${palette('primary', 0)};
  }
  .ant-btn {
    border-color: ${palette('primary', 0)};
  }
  .ant-btn:hover {
    border-color: ${palette('primary', 0)};
  }
  .ant-modal-body {
    height: 330px;
    padding-bottom: 0;
  }
  .ant-select-dropdown {
    position: static !important;
  }
  .ant-select-dropdown-menu-item:hover,
  .ant-select-dropdown-menu-item-active {
    background-color: ${palette('border', 2)};
  }
  .ant-select-dropdown-menu-item {
    white-space: normal;
    padding-right: 30px;
    h3 {
      margin-bottom: 0;
    }
  }
  .ant-select-dropdown.ant-select-dropdown--multiple .ant-select-dropdown-menu-item .ant-select-selected-icon {
    right: 18px;
  }
  .ant-select-open + div {
    overflow-x: hidden;
  }
  .text-area {
    
  }
  .select-container {
    position: relative;
    display: flex;
    overflow: hidden;
    flex-direction: column;
    height: 190px;
    .ant-select {
      width: 100%;
      flex-grow: 0;
      flex-shrink: 0;
      + div {
        position: relative !important;
        overflow-y: auto;
        width: 100% !important;
        flex-grow: 0;
        .ant-select-dropdown-menu {
          max-height: none;
        }
      }
    }
  }
`;

export default ModalStyled;
