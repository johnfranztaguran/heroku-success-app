import React from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';
import JobsContentTab from './jobsContentTab';
import JobsNOCContentTab from './jobsNocContentTab';

const { TabPane } = Tabs;

const JobsTab = ({ userDeatails }) => {
  return (
    <Tabs defaultActiveKey='1'>
      <TabPane tab="Dates" key="1">
        <JobsContentTab userDeatails={userDeatails}/>
      </TabPane>
      <TabPane tab="NOC's" key="2">
        <JobsNOCContentTab />
      </TabPane>
    </Tabs>
  );
};
JobsTab.propTypes = {
  userDeatails: PropTypes.array.isRequired
};

export default JobsTab;
