import styled from 'styled-components';

const HeaderStyle = styled.div`
  h4 {
    color: #2195F3;
    font-weight: 700;
    font-size: 12px;
    margin-bottom: 6px;
  }

  h1 {
    font-size: 11px;
  }

  .icon-setting {
    margin-right: 15px;
  }

  .isoCustomCollapse {
    &:hover {
      background-color: #deedfa;
    }
  }

  .pagination{
    justify-content: center;
    margin-top: 10px;
  }

  .isoPanel {
    &:hover {
      background-color: #faebd7
    }
  }

  .child-header {
    margin-top: 10px;
  }
  
  .ant-empty-image {
    margin-bottom: 0px;
  }

  li {
    &:focus {
      border-color: blue;
    }
  }
`;

export default HeaderStyle;
