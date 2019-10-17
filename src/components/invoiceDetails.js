import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { KeyValueList, Auth } from 'project-customer-portal-fe';
import { Menu, Dropdown, Icon, Button, Tooltip, Table, Tabs, notification } from 'antd';
import moment from 'moment';
import Download from '@axetroy/react-download';
import _get from 'lodash.get';
import ActionsBtn from './styledComponents/actionBtnStyle';
import styled from 'styled-components';
import InvoiceReadInfoStyle from './modalTwo.style';

const auth = new Auth();

const DetailsButtons = styled.div`
  .dp-down-btn {
    margin: 0 8px 8px 0;
    background-color: #26a69a;
    color: white;
  }
`;

const { TabPane } = Tabs;

const InvoicesDetails = ({ userDetails }) => {
  const [readInfo, showReadInfo] = useState(false);
  const [listData, setListData] = useState({});
  const [{ selectedTableRow, selectedTableRowId }, setSelectedTableRow] = useState({
    selectedTableRow: [],
    selectedTableRowId: undefined
  });
  const [{ boolFile, dataFile, viewFile }, setBundleFile] = useState({
    boolFile: false,
    dataFile: '',
    viewFile: ''
  });

  const handleShowModal = () => {
    showReadInfo(true);
  }

  const formatForShowViewBillingAddress = () => {
    const keyValueItems = {};
    keyValueItems.Primary = _get(listData, 'cu_billing_address1', '');
    keyValueItems.Current = _get(listData, 'cu_billing_address2', '');
    keyValueItems.City = _get(listData, 'cu_billing_city', '');
    keyValueItems.Country = _get(listData, 'cu_billing_country', '');
    keyValueItems.State = _get(listData, 'cu_billing_state', '');
    keyValueItems.Zip = _get(listData, 'cu_billing_zip', '');
    keyValueItems.Code = _get(listData, 'cu_code', '');
    return keyValueItems;
  };

  const formatForShowViewDetails = () => {
    const keyValueItems = {};
    keyValueItems.Name = _get(listData, 'cu_name', '');
    keyValueItems.Address1 = _get(listData, 'cu_main_address1', '');
    keyValueItems.Address2 = _get(listData, 'cu_main_address2', '');
    keyValueItems.City = _get(listData, 'cu_main_city', '');
    keyValueItems.Country = _get(listData, 'cu_main_country', '');
    keyValueItems.State = _get(listData, 'cu_main_state', '');
    keyValueItems.Zip = _get(listData, 'cu_main_zip', '');
    return keyValueItems;
  };

  const formatForShowViewContacts = () => {
    const keyValueItems = {};
    keyValueItems.Contacts = _get(listData, 'cu_contacts', '');
    keyValueItems['Contact Person'] = _get(listData, 'cu_contact_person', '');
    keyValueItems['Country Code'] = _get(listData, 'cu_deac_flag', '');
    keyValueItems.Phone = _get(listData, 'cu_phone', '');
    return keyValueItems;
  };

  const formatForShowViewEmails = () => {
    const keyValueItems = {};
    keyValueItems.Email = _get(listData, 'cu_email', '');
    return keyValueItems;
  };

  const columns = [
    {
      title: 'Invoice',
      width: 200,
      key: 'inv_no',
      dataIndex: 'inv_no'
    },
    {
      title: 'Job Name',
      dataIndex: 'job.jo_name',
      width: 200,
      key: 'job.jo_name'
    },
    {
      title: 'Issue Date',
      width: 200,
      key: 'inv_date',
      render: ({ inv_date }) => (
        <div>{moment(inv_date).format('L')}</div>
      )
    },
    {
      title: 'Payment Due',
      width: 200,
      key: 'inv_due_date',
      render: ({ inv_due_date }) => (
        <div>{moment(inv_due_date).format('L')}</div>
      )
    },
    {
      title: 'Amount',
      dataIndex: 'inv_total_amount',
      width: 200,
      key: 'inv_total_amount',
      render: inv_total_amount => (
        <div>{`$${inv_total_amount}`}</div>
      )
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 200,
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 100,
      render: ({ customer }, data) => {
        return (
          <Fragment>
            <ActionsBtn>
              <Tooltip placement="left" title='View PDF'>
                <a
                  className='action-btn'
                  onMouseEnter={() => {
                    handleFileView(data.id, data.inv_jo_id);
                  }}
                  href={viewFile}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon type='eye' />
                </a>
              </Tooltip>
              <Tooltip placement="left" title='View Info'>
                <a
                  className='action-btn'
                  onClick={() => {
                    setListData(customer);
                    handleShowModal();
                  }}
                >
                  <Icon type='read' />
                </a>
              </Tooltip>
            </ActionsBtn>
          </Fragment>
        );
      },
    },
  ];

  const itemBillingAddress = formatForShowViewBillingAddress();
  const itemCustomerDetails = formatForShowViewDetails();
  const itemEmail = formatForShowViewEmails();
  const itemContacts = formatForShowViewContacts();

  const modalInsideTabSide = () => {
    return (
      <Tabs defaultActiveKey='1' tabPosition='left'>
        <TabPane tab="Details" key="1">
          <KeyValueList items={itemCustomerDetails}/>
        </TabPane>
        <TabPane tab="Billing Address" key="2">
          <KeyValueList items={itemBillingAddress}/>
        </TabPane>
        <TabPane tab="Contacts" key="3">
          <KeyValueList items={itemContacts}/>
        </TabPane>
        <TabPane tab="Emails" key="4">
          <KeyValueList items={itemEmail}/>
        </TabPane>
      </Tabs>
    );
  };

  const dropdownMenu = () => {
    return (
      <Menu>
        <Menu.Item key='excel' onClick={e => handleButtonClick(e)}>
          Excel
        </Menu.Item>
        <Menu.Item key='pdf' onClick={e => handleButtonClick(e)}>
          PDF
        </Menu.Item>
      </Menu>
    );
  };

  const handleFinanceExportDownload = async format => {
    try {
      const storeFile = await auth.financesExportDownloadFiles(selectedTableRow, format, boolFile);
      const convertString = storeFile.toString();
      setBundleFile({ dataFile: convertString })
    } catch (err) {
      console.error('Error while decline data:', err);
      notification.open({
        message: 'Something went wrong',
        description: `Error while decline: ${err}`
      });
    };
  };

  const handleFileView = async (id, inv_id) => {
    try {
      const getFile = await auth.financesViewFiles(id, inv_id);
      const convertString = getFile.toString();
      setBundleFile({ viewFile: convertString })
    } catch (err) {
      console.error('Error while decline data:', err);
      notification.open({
        message: 'Something went wrong',
        description: `Error while decline: ${err}`
      });
    };
  }

  const handleButtonClick = (e) => {
    handleFinanceExportDownload(e.key);
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRowss) => {
      setSelectedTableRow({ selectedTableRow: selectedRowss, selectedTableRowId: selectedRowKeys })
    },
  };

  const tableHeight = window.innerHeight < 650 ? 250 : 500

  const clearDataFile = () => {
    setTimeout(() => {
      setBundleFile({ dataFile: [] });
      setSelectedTableRow({ selectedTableRow: [] });
    }, 1000)
  }

  return (
    <Fragment>
      <InvoiceReadInfoStyle
        title="Invoices View Details"
        visible={!!readInfo}
        okText="Okay"
        onOk={() => {
          showReadInfo(false);
          setListData('');
        }}
        onCancel={() => {
          showReadInfo(false);
          setListData('');
        }}
      >
        {modalInsideTabSide()}
      </InvoiceReadInfoStyle>
      <DetailsButtons>
      <Tooltip placement="left" title='Single'>
        <Dropdown className='dp-down-btn' overlay={dropdownMenu}>
          <Button onClick={() => setBundleFile(false)}>
            Export to File <Icon type="down" />
          </Button>
        </Dropdown>
      </Tooltip>
      <Tooltip placement="right" title='Multiple'>
        <Dropdown className='dp-down-btn' overlay={dropdownMenu}>
          <Button onClick={() => setBundleFile(true)}>
            Download in Zip <Icon type="down" />
          </Button>
        </Dropdown>
      </Tooltip>
        {
          dataFile && dataFile.length ? (
            <Download file={dataFile} content={dataFile}>
              <Button onClick={() => clearDataFile()} className='dp-down-btn' type="button">Save</Button>
            </Download>
          ) : ''
        }
      </DetailsButtons>
      <Table
        rowKey='id'
        rowSelection={rowSelection}
        columns={columns}
        dataSource={userDetails}
        pagination={false}
        scroll={{ y: tableHeight }}
      />
    </Fragment>
  );
};

InvoicesDetails.propTypes = {
  userDetails: PropTypes.array.isRequired
};

export default InvoicesDetails;
