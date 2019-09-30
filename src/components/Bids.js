import React, { useEffect, useState, Fragment } from 'react';
import { Auth, PageHeader, CRUD, StatusDot } from 'project-customer-portal-fe';
import { Table, notification, Tag, Icon, Tooltip, Spin, Select, Input, Button, Collapse } from 'antd';
import styled from 'styled-components';
import CrudStyle from './crudStyle';
import SpinStyles from './SpinStyle'
import _get from 'lodash.get';
import moment from 'moment';
import BidsModalStyled from './modalTwo.style';

const auth = new Auth();
const { Option } = Select;
const { TextArea } = Input;
const { Panel } = Collapse;

const RefreshBtnStyle = styled.div`
  .btn-group {
    justify-content: center;
    display: flex;
    margin-top: 10px;
  }
`;

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
`;

const Bids = () => {

  const [userDeatails, fetchDetails] = useState([]);
  const [userPDF, fetchPDF] = useState(undefined);
  const [optionStatus, getOptionStatus] = useState([]);
  const [isLoaded, dataLoaded] = useState(false);
  const [isVisible, showVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [isOption, showOption] = useState(false);
  const [{ reason }, setValue] = useState({ reason: '' });
  const [getId, setId] = useState(undefined);
  const [noteReason, showNote] = useState(false);

  const columns = [
    {
      title: 'Bid Number',
      width: 150,
      key: 'bt_bid_no',
      render: ({ bt_approval_status_id, bt_bid_no }) => (
        <div>
          <StatusDot status={bt_approval_status_id}/>
          <span style={{ left: 10, marginLeft: 10 }}>{bt_bid_no}</span>
        </div>
      )
    },
    {
      title: 'Bid Date',
      width: 200,
      key: 'bt_date',
      render: ({ bt_date }) => (
        <div>{moment(bt_date).format('l LTS')}</div>
      )
    },
    {
      title: 'Job Name',
      dataIndex: 'bt_job_name',
      width: 250,
      key: 'bt_job_name'
    },
    {
      title: 'Location',
      dataIndex: 'bt_location',
      width: 250,
      key: 'bt_location'
    },
    {
      title: 'Bid Status',
      dataIndex: 'status',
      render: status => (
        <Tag color={status.color}>
          {status.name}
        </Tag>
      ),
      key: 'status_name',
      width: 200,
    },
    {
      title: 'Actions',
      render: ({ bt_id, bid_rejection_reason, bt_approval_status_id }) => {
        const rejectReason = () => {
          return (
            <Fragment>
              <BidsModalStyled
                title="Reject Reason Note"
                visible={!!noteReason}
                okText="Okay"
                onOk={() => showNote(false)}
                onCancel={() => showNote(false)}
              >
                {bid_rejection_reason}
              </BidsModalStyled>
              <Tooltip placement="top" title='Reject Reason'>
                <a
                  className='action-btn'
                  onClick={() => showNote(true)}
                >
                  <Icon type='snippets' />
                </a>
              </Tooltip>
            </Fragment>
          );
        };
        return (
          <ActionsBtn>
            <Tooltip placement="top" title='View'>
              <a
                className='action-btn'
                onMouseEnter={() => {
                  getBidsPDFPreview(bt_id);
                }}
                href={userPDF}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon type='eye' />
              </a>
            </Tooltip>
            {
              bt_approval_status_id === 0 ? rejectReason() : null
            }
            <Tooltip placement="top" title='Approve'>
              <a
                className='action-btn'
                onClick={() => {
                  actionApproveDecline(bt_id, 'approve');
                }}
              >
                <Icon type='check-circle' />
              </a>
            </Tooltip>
            <Tooltip placement="top" title='Reject'>
              <a
                className='action-btn'
                onClick={() => {
                  handleShowModal();
                  setId({ getId: bt_id });
                }}
              >
                <Icon type='close-circle' />
              </a>
            </Tooltip>
          </ActionsBtn>
        );
      },
      key: 'actions',
      width: 100,
    },
  ];

  useEffect(() => {
    getUserBidsDetails();
  }, []);

  const getUserBidsDetails = async () => {
    try {
      const userDeatails = await auth.getUserBidsDetails();
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

  const actionApproveDecline = async (id, action) => {
    try {
      await auth.approveDeclineAction(id, action);
      notification.open({
        message: 'Success!',
        description: `Bid ${action}.`
      });
      getUserBidsDetails();
    } catch (err) {
      console.error('Error while fetching data:', err);
      notification.open({
        message: 'Something went wrong',
        description: `Error while fetching: ${err}`
      });
    };
  };
  
  const actionDeclineModal = async () => {
    try {
      await auth.declineModalAction(_get(getId, 'getId', ''), selectedValue, reason);
      notification.open({
        message: 'Success!',
        description: `Bid decline.`
      });
      getUserBidsDetails();
    } catch (err) {
      console.error('Error while decline data:', err);
      notification.open({
        message: 'Something went wrong',
        description: `Error while decline: ${err}`
      });
    };
  };

  const getBidsPDFPreview = async id => {
    try {
      const userPDF = await auth.getUserBidsPDFPreview(id);
      fetchPDF( userPDF );
    } catch (err) {
      console.error('Error while fetching data:', err);
      notification.open({
        message: 'Something went wrong',
        description: `Error while fetching: ${err}`
      });
    };
  };

  const getBidsOptionStatus = async () => {
    try {
      const optionStatus = await auth.getUserBidsStatusOption();
      getOptionStatus( optionStatus );
      showOption(true);
    } catch (err) {
      console.error('Error while fetching data:', err);
      notification.open({
        message: 'Something went wrong',
        description: `Error while fetching: ${err}`
      });
    };
    showOption(false);
  };

  const optionItem = item => {
    const { id, name } = item;
    return (
      <Option key={id} value={id} data-name={name}>
        {name}
      </Option>
    );
  };

  const resetModal = () => {
    showVisible(false);
    showOption(false);
    setSelectedValue(null);
    getOptionStatus(null);
  }

  const handleShowModal = () => {
    getBidsOptionStatus();
    showVisible(true);
  }

  const handleCancel = () => {
    resetModal();
  }

  const handleOk = () => {
    actionDeclineModal();
    resetModal();
  }

  const textChange = ({ target: { name, value } }) => {
    setValue({ [name]: value });
  };

  const selectChange = value => {
    setSelectedValue(value);
  };

  const collapseSearch = () => {
    const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
    return (
      <Collapse bordered={false} >
        <Panel header="This is panel header 1" key="1" >
            <div>{text}</div>
        </Panel>
      </Collapse>
    )
  }

  const renderListView = () => {
    const getData = _get(userDeatails, 'data', []);
    return (
      <Fragment>
        {isLoaded ? (
          <Fragment>
            <BidsModalStyled
              title="Reject Prompt"
              visible={!!isVisible}
              okText="Reject"
              onOk={handleOk}
              onCancel={handleCancel}
              okButtonProps={{ disabled: !selectedValue || !reason }}
            >
              <div id="select-area-organization" className="select-container">
                <h4>Status</h4>
                <Select
                  value={selectedValue}
                  showSearch
                  style={{ width: '100%' }}
                  placeholder="Please select status"
                  onChange={selectChange}
                  open
                  optionLabelProp="data-name"
                  filterOption={false}
                  getPopupContainer={() => document.getElementById('select-area-organization')}
                  notFoundContent={isOption ? <Spin size="small" /> : <span>None found</span>}
                >
                  {optionStatus && optionStatus.map(item => optionItem(item))}
                </Select>
              </div>
              <div className='text-area'>
                <h4>Reason</h4>
                <TextArea
                  value={reason}
                  placeholder='Please state your reason with more details'
                  onChange={textChange}
                  name='reason'
                />
              </div>
            </BidsModalStyled>
            <RefreshBtnStyle >
              <Table
                rowKey='bt_id'
                columns={columns}
                dataSource={getData}
                pagination={false}
                scroll={{ y: 650 }}
              />
              <Button.Group size='small' className='btn-group'>
                <Button type="primary">
                  <Icon type="left" />
                </Button>
                <Button type="primary">
                  <Icon type="right" />
                </Button>
              </Button.Group>
            </RefreshBtnStyle>
          </Fragment>
        ) : (
          <Spin size="large" style={SpinStyles}/>
        )}
      </Fragment>
    );
  };

  // console.log('User Bids ===', object);

  const renderHeader = controls => <PageHeader controls={controls}>Bids</PageHeader>;
  
    return (
      <CrudStyle>
        <CRUD
        CollapseSearch={collapseSearch}
          headerView={renderHeader}
          listView={renderListView}
        />
      </CrudStyle>
    );

};
 
export default Bids;
