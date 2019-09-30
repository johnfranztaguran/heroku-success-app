import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import { notification } from 'antd';
import { Auth } from 'project-customer-portal-fe';
// import styled from 'styled-components';
// import PaginationPage from './customElement/PaginationPage';
// import SpinStyles from './SpinStyle'
// import ModalStyled from './modalTwo.style';

// const { Panel } = Collapse;
// const { Content } = Layout;
const auth = new Auth();

// const HeaderStyle = styled.div`
//   h4 {
//     color: #2195F3;
//     font-weight: 700;
//     font-size: 12px;
//     margin-bottom: 6px;
//   }

//   h1 {
//     font-size: 11px;
//   }

//   .icon-setting {
//     margin-right: 15px;
//   }

//   .isoCustomCollapse {
//     &:hover {
//       background-color: #deedfa;
//     }
//   }

//   .pagination{
//     justify-content: center;
//     margin-top: 10px;
//   }

//   .isoPanel {
//     &:hover {
//       background-color: #faebd7
//     }
//   }

//   .child-header {
//     margin-top: 10px;
//   }
  
//   .ant-empty-image {
//     margin-bottom: 0px;
//   }

//   li {
//     &:focus {
//       border-color: blue;
//     }
//   }
// `;

const JobsNOCContentTab = () => {

  const [nocDetails, getNocDetails] = useState([]);
  const [nocDetailsLoaded] = useState(false);

  useEffect(() => {
    getUserNocDetails();
  }, []);

  const getUserNocDetails = async () => {
    try {
      const nocDetails = await auth.getUserNOCDetails();
      getNocDetails( nocDetails );
      nocDetailsLoaded(true);
    } catch (err) {
      console.error('Error while fetching data:', err);
      notification.open({
        message: 'Something went wrong',
        description: `Error while fetching: ${err}`
      });
    };
  };

  console.log('noc details ===', nocDetails);

  return (
    <React.Fragment>
      <div>NOC</div>
    </React.Fragment>
  );
}

JobsNOCContentTab.propTypes = {
};

export default JobsNOCContentTab;