import React, { useEffect, useState, Fragment } from 'react';
// import PropTypes from 'prop-types';
import { notification, Tooltip, Icon, Table, Input } from 'antd';
import { Auth, StatusDotBaseNoc } from 'project-customer-portal-fe';
import ActionsBtn from './styledComponents/actionBtnStyle';
import NocModalStyled from './modalTwo.style';

const auth = new Auth();

const { TextArea } = Input;

const JobsNOCContentTab = () => {

  const [nocDetails, getNocDetails] = useState([]);
  const [nocLoaded, nocDetailsLoaded] = useState(false);
  const [userPDF, fetchPDF] = useState(undefined);
  const [nocReasonId, getId] = useState(undefined);
  const [{ modalReason, enterModalReason}, getReason] = useState({
    modalReason: '',
    enterModalReason: ''
  });
  const [{ noteReason, enterReason }, showNote] = useState({
    noteReason: false,
    enterReason: false
  });

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

  const columns = [
    {
      title: 'Subline Name',
      key: 'jo_sline_desc',
      width: 300,
      render: ({ noc_approval_status_id, jo_sline_desc }) => (
        <div>
          <StatusDotBaseNoc status={noc_approval_status_id}/>
          <span style={{ left: 10, marginLeft: 10 }}>{jo_sline_desc}</span>
        </div>
      )
    },
    {
      title: 'CR#',
      width: 150,
      dataIndex: 'jo_sline_cr_no',
      key: 'jo_sline_cr_no',
    },
    {
      title: 'RP#',
      dataIndex: 'jo_sline_rp_no',
      width: 150,
      key: 'jo_sline_rp_no'
    },
    {
      title: 'RFI#',
      dataIndex: 'jo_sline_rfi_no',
      width: 150,
      key: 'jo_sline_rfi_no'
    },
    {
      title: 'Comments',
      dataIndex: 'jo_sline_comments',
      width: 150,
      key: 'jo_sline_comments'
    },
    {
      title: 'FW#',
      dataIndex: 'jo_sline_fw_no',
      width: 150,
      key: 'jo_sline_fw_no'
    },
    {
      title: 'Other',
      dataIndex: 'jo_sline_other',
      width: 150,
      key: 'jo_sline_other'
    },
    {
      title: '#PC Affected',
      dataIndex: 'jo_sline_no_of_pc_affected',
      width: 150,
      key: 'jo_sline_no_of_pc_affected'
    },
    {
      title: 'Actions',
      render: ({ noc_approval_status_id, noc_reject_reason, id }) => {
        const rejectReason = () => {
          return (
            <Fragment>
              <Tooltip placement="left" title='Reject Reason'>
                <a
                  className='action-btn'
                  onClick={() => {
                    getReason({ modalReason: noc_reject_reason })
                    showNote({ noteReason: true })
                  }}
                >
                  <Icon type='snippets' />
                </a>
              </Tooltip>
            </Fragment>
          );
        };
        return (
          <ActionsBtn>
            <Tooltip placement="left" title='View'>
              <a
                className='action-btn'
                onMouseEnter={() => {
                  dummyPDFViewer('87');
                }}
                href={userPDF}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon type='eye' />
              </a>
            </Tooltip>
            {
              noc_approval_status_id === 2 ? rejectReason() : null
            }
            <Tooltip placement="left" title='Approve'>
              <a
                className='action-btn'
                onClick={() => {
                  nocApproveAction(id);
                }}
              >
                <Icon type='check-circle' />
              </a>
            </Tooltip>
            <Tooltip placement="left" title='Reject'>
              <a
                className='action-btn'
                onClick={() => {
                  showNote({ enterReason: true })
                  getId(id)
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

  const dummyPDFViewer = async id => {
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

  const nocApproveAction = async id => {
    try {
      await auth.jobsNocApproveAction(id);
      notification.open({
        message: 'Success!',
        description: `Noc Approve.`
      });
      getUserNocDetails();
    } catch (err) {
      console.error('Error while fetching data:', err);
      notification.open({
        message: 'Something went wrong',
        description: `Error while fetching: ${err}`
      });
    };
  };

  const nocDeclineAction = async () => {
    try {
      await auth.jobsNocDeclineAction(nocReasonId, enterModalReason);
      notification.open({
        message: 'Success!',
        description: `Noc Decline.`
      });
      getUserNocDetails();
    } catch (err) {
      console.error('Error while fetching data:', err);
      notification.open({
        message: 'Something went wrong',
        description: `Error while fetching: ${err}`
      });
    };
  };

  const textChange = ({ target: { name, value } }) => {
    getReason({ [name]: value });
  };

  const tableHeight = window.innerHeight < 650 ? 250 : 500

  const handleOkReasonModal = () => {
    showNote({ enterReason: false });
    nocDeclineAction();
  }

  return (
    <Fragment>
      <NocModalStyled
        title="Reject Reason Note"
        visible={!!noteReason}
        okText="Okay"
        onOk={() => showNote({ noteReason: false })}
        onCancel={() => showNote({ noteReason: false })}
      >
        {modalReason}
      </NocModalStyled>
      <NocModalStyled
        title="Please enter your reason"
        visible={!!enterReason}
        okText="Okay"
        onOk={handleOkReasonModal}
        onCancel={() => showNote({ enterReason: false })}
      >
        <div className='text-area'>
          <h4>Reason</h4>
          <TextArea
            value={enterModalReason}
            placeholder='Please state your reason with more details'
            onChange={textChange}
            name='enterModalReason'
          />
        </div>
      </NocModalStyled>
      <Table
        rowKey='id'
        columns={columns}
        dataSource={nocDetails}
        scroll={{ y: tableHeight }}
        pagination={false}
      />
    </Fragment>
  );
}

JobsNOCContentTab.propTypes = {
};

export default JobsNOCContentTab;
