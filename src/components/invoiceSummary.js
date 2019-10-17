import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Table, Tooltip, Icon } from 'antd';
import InvoiceSummaryModal from './modalTwo.style';
import ActionsBtn from './styledComponents/actionBtnStyle';

const InvoiceSummary = ({ userDetails }) => {
  const [modalData, showModalData] = useState(false);
  const [rowData, setRowData] = useState({});

  const columns = [
    {
      title: 'Job Name',
      dataIndex: 'job.jo_name',
      key: 'job.jo_name',
      width: 250,
    },
    {
      title: 'Invoice Amount',
      dataIndex: 'inv_amount',
      key: 'inv_amount',
      width: 200,
      render: inv_amount => (
        <div>{`$${inv_amount}`}</div>
      )
    },
    {
      title: 'Paid Amount',
      dataIndex: 'inv_paid_amount',
      key: 'inv_paid_amount',
      width: 200,
      render: inv_paid_amount => (
        <div>{`$${inv_paid_amount}`}</div>
      )
    },
    {
      title: 'Balance Amount',
      dataIndex: 'inv_open_amount',
      key: 'inv_open_amount',
      width: 200,
      render: inv_open_amount => (
        <div>{`$${inv_open_amount}`}</div>
      )
    },
    {
      title: 'Action',
      key: 'action',
      width: 200,
      render: data => (
        <ActionsBtn>
          <Tooltip placement="right" title='Show Summary'>
          <a
            className='action-btn'
            onClick={() => {
              setRowData(data);
              showModalData(true)
            }}
          >
            <Icon type='hdd' />
          </a>
        </Tooltip>
        </ActionsBtn>
      ),
    },
  ];

  const tableHeight = window.innerHeight < 650 ? 250 : 500

  return (
    <Fragment>
      <InvoiceSummaryModal
        title="Summary Details"
        visible={!!modalData}
        onOk={() => showModalData(false)}
        onCancel={() => showModalData(false)}
      >
        Yey
      </InvoiceSummaryModal>
      <Table
        rowKey='id'
        columns={columns}
        dataSource={userDetails}
        scroll={{ y: tableHeight }}
        pagination={false}
      />
    </Fragment>
  );
};

InvoiceSummary.propTypes = {
  userDetails: PropTypes.array.isRequired
};

export default InvoiceSummary;
