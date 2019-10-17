import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Collapse, Col, Row, Icon, Tag, Layout, Empty } from 'antd';
import { KeyValueList } from 'project-customer-portal-fe';
import PaginationPage from './customElement/PaginationPage';
import ModalStyled from './modalTwo.style';
import moment from 'moment';
import CollapseHeaderStyle from './styledComponents/collapseHeaderStyle';

const { Panel } = Collapse;
const { Content } = Layout;

const JobsContentTab = ({ userDeatails }) => {

  const [activePanel, setActivePanel] = useState('');
  const [isVisible, showVisible] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const handleShowModal = () => {
    showVisible(true);
  }

  const handleCancel = () => {
    showVisible(false);
  }

  const handleOk = () => {
    showVisible(false);
  }

  const collapseChange = key => {
    setActivePanel(key);
  }

  const formatForShowView = jobs => {
    const keyValueItems = {};
    keyValueItems.Contact = jobs.jo_contact_person;
    keyValueItems.Address = jobs.jo_billing_address;
    keyValueItems.Email = jobs.jo_contact_email;
    return keyValueItems;
  };

  const formatJoblineSchedule = job => {
    const keyValueItems = {};
    keyValueItems.OFA = moment(job.jobline_schedule.jlss_ofa_pe_date).format('L');
    keyValueItems['Ret FA'] = moment(job.jobline_schedule.jlss_rfa_pe_date).format('L');
    keyValueItems.RFF = moment(job.jobline_schedule.jlss_rts_pe_date).format('L');
    return keyValueItems;
  }
  const formatJoblineScheduleSecond = job => {
    const keyValueItems = {};
    keyValueItems.OFA = moment(job.jobline_schedule.jlss_ofa_ps_date).format('L');
    keyValueItems['Ret FA'] = moment(job.jobline_schedule.jlss_rfa_ps_date).format('L');
    keyValueItems.RFF = moment(job.jobline_schedule.jlss_rts_ps_date).format('L');
    return keyValueItems;
  }

  const childCollapseHeader = job => {
    const itemOne = formatJoblineSchedule(job);
    const itemTwo = formatJoblineScheduleSecond(job);
    return (
      <React.Fragment>
        <Row key={job.jo_line_id}>
          <Col span={3} lg={4}>
            <h4>{job.jo_line_desc}</h4>
            <div className='child-header'>
              <Tag color="#4CAF50">OPEN</Tag>
            </div>
          </Col>
          <Col span={3}>
            <p><b>Taxable: </b>{job.jo_line_has_taxed === 0 ? (<span>No</span>) : job.jo_line_has_taxed}</p>
          </Col>
          <Col span={6}>
            <KeyValueList items={itemOne}/>
          </Col>
          <Col span={6}>
            <KeyValueList items={itemTwo}/>
          </Col>
          <Col span={6} lg={4}>
            <p><b><i>Jobline Notes</i></b></p>
          </Col>
        </Row>
      </React.Fragment>
    )
  }

  const contentJobSublines = sublines => {
    return (
      <React.Fragment>
        {sublines.length ? (
            sublines.map(sub => (
              <Layout key={sub.jo_sline_id} className="isoCrudBoxWrapper">
                <Content className="isoCrudBox">
                <Row>
                  <Col span={3} lg={5}>
                    <h4>{sub.jo_sline_desc}</h4>
                    <div className='child-header'>
                      <Tag color="#4CAF50">OPEN</Tag>
                    </div>
                  </Col>
                  {/* <Col span={3}>
                    <p><b>Taxable: </b>{job.jo_line_has_taxed === 0 ? (<span>No</span>) : job.jo_line_has_taxed}</p>
                  </Col> */}
                  {/* <Col span={4}>
                    <p><b>PO #: </b>{job.jo_po}</p>
                  </Col>
                  <Col span={7}>
                    <KeyValueList items={items}/>
                  </Col> */}
                </Row>
                  {/* <Empty/> */}
                </Content>
              </Layout>
            ))
          ) : (
            <Empty/>
          )}
      </React.Fragment>
    )
  }

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const childCustomPanel = jobs => {
    return (
      <React.Fragment>
        <Collapse expandIconPosition='right'>
          {
            jobs.length ? (
              jobs && jobs.length > 0 && jobs
              .slice(indexOfFirstPost, indexOfLastPost)
              .map(job => (
              <Panel
                className='isoCustomCollapse'
                header={childCollapseHeader(job)}
                key={job.jo_line_id.toString()}
              >
                {contentJobSublines(job.sublines)}
              </Panel>
            ))
            ) : (
              <span>No Joblines</span>
            )
          }
        </Collapse>
        <PaginationPage
          postsPerPage={postsPerPage}
          totalPosts={jobs.length}
          paginate={paginate}
        />
      </React.Fragment>
    );
  };

  const renderCollapseHeader = jobs => {
    const items = formatForShowView(jobs);
    return (
      <React.Fragment>
        <Row>
          <Col span={3} lg={4}>
            <h4>{jobs.jo_name}</h4>
            <span><h1>{jobs.jo_location}</h1></span>
            <div className='bottom-header'>
              <a
                onClick={() => {
                  handleShowModal();
                }}
                className='icon-setting'
              >
                <Icon type='setting'/>
              </a>
              <Tag color="#4CAF50">OPEN</Tag>
            </div>
          </Col>
          <Col span={3}>
            <p><b>Net: </b>{!jobs.jo_net ? (<span><i style={{ color:'gray', fontSize: 10}}>no data</i></span>) : jobs.jo_net}</p>
          </Col>
          <Col span={4}>
            <p><b>PO #: </b>{!jobs.jo_po ? (<span><i style={{ color:'gray', fontSize: 10}}>no data</i></span>) : jobs.jo_po}</p>
          </Col>
          <Col span={10}>
            <KeyValueList items={items}/>
          </Col>
        </Row>
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      <ModalStyled
        title="Jobs"
        visible={!!isVisible}
        okText="Okay"
        onOk={handleOk}
        // okButtonProps={{ disabled: !role }}
        onCancel={handleCancel}
      >
        Something Here
      </ModalStyled>
        <CollapseHeaderStyle>
          <Collapse
            expandIcon={({ isActive }) => <Icon style={{ color: 'gray'}} type="caret-right" rotate={isActive ? 90 : 0} />}
            onChange={collapseChange}
            style={{ backgroundColor: '#fcf4e8'}}
            expandIconPosition='right'
            activeKey={activePanel}
          >
            {
              userDeatails.map(jobs => {
                return (
                    <Panel
                      className='isoPanel'
                      header={renderCollapseHeader(jobs)}
                      key={jobs.jo_id.toString()}
                    >
                      {childCustomPanel(jobs.joblines)}
                    </Panel>
                )
              })
            }
          </Collapse>
        </CollapseHeaderStyle>
    </React.Fragment>
  );
}

JobsContentTab.propTypes = {
  userDeatails: PropTypes.array.isRequired
};

export default JobsContentTab;