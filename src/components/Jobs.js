import React, { useEffect, useState } from 'react';
import { notification, Spin } from 'antd';
import { Auth, PageHeader, CRUD } from 'project-customer-portal-fe';
import CrudStyle from './crudStyle';
import SpinStyles from './SpinStyle'
import JobsTab from './jobsTab';

const auth = new Auth();


const Jobs = () => {
  const [userDeatails, fetchDetails] = useState([]);
  const [isLoaded, dataLoaded] = useState(false);

  useEffect(() => {
    getUserJobsDetails();
  }, []);

  const getUserJobsDetails = async () => {
    try {
      const userDeatails = await auth.getUserJobsDetails();
      fetchDetails( userDeatails );
      dataLoaded(true);
    } catch (err) {
      console.error('Error while fetching data:', err);
      notification.open({
        message: 'Something went wrong',
        description: `Error while fetching: ${err}`
      });
    };
  };

  const renderListView = () => {
    return (
      <React.Fragment>
        {isLoaded ? (
          <JobsTab userDeatails={userDeatails}/>
        ) : (
          <Spin size="large" style={SpinStyles}/>
        )}
      </React.Fragment>
    );
  };

  console.log('User Jobs ===', userDeatails);
  const renderHeader = controls => <PageHeader controls={controls}>Jobs</PageHeader>;

  return (
    <CrudStyle>
      <CRUD
        headerView={renderHeader}
        listView={renderListView}
      />
    </CrudStyle>
  );
};
 
export default Jobs;
