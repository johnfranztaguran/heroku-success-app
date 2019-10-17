import React from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';
import InvoicesDetails from './invoiceDetails';
import InvoiceSummary from './invoiceSummary';

const { TabPane } = Tabs;

const InvoicesTab = ({ userDetails }) => {
  return (
    <Tabs defaultActiveKey='1'>
      <TabPane tab="Details" key="1">
        <InvoicesDetails userDetails={userDetails.data} />
      </TabPane>
      <TabPane tab="Summary" key="2">
        <InvoiceSummary userDetails={userDetails.data} />
      </TabPane>
    </Tabs>
  );
};
InvoicesTab.propTypes = {
  userDetails: PropTypes.object.isRequired
};

export default InvoicesTab;
