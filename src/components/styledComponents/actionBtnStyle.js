import styled from 'styled-components';

const ActionsBtn = styled.div`
  .action-btn {
    color: #40a9ff;
    opacity: 1;
    border: 0 none;
    box-shadow: none;
    background: transparent;
    display: flex;
    padding: 5px;
    margin-left: 5px;

    &:hover,
    &:focus {
      opacity: 2;
      color: #0e4aed;
      &.danger {
        color: #f5222d;
      }
    }
  }

  .anticon {
    color: #40a9ff;
  }
`;

export default ActionsBtn;
