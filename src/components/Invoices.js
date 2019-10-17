import React, { useEffect, useState, Fragment } from 'react';
import { notification, Spin } from 'antd';
import { Auth, PageHeader, CRUD, Pagination, fetchPagination } from 'project-customer-portal-fe';
import CrudStyle from './crudStyle';
import SpinStyles from './SpinStyle'
import InvoicesTab from './invoicesTab';

const auth = new Auth();


const Invoices = () => {
  const [userDetails, fetchDetails] = useState([]);
  const [isLoaded, dataLoaded] = useState(false);

  useEffect(() => {
    getInvoicesDetails();
  }, []);

  const getInvoicesDetails = async () => {
    try {
      const userDetails = await auth.fetchInvoicesDetails();
      fetchDetails(userDetails);
      dataLoaded(true);
    } catch (err) {
      console.error('Error while fetching data:', err);
      notification.open({
        message: 'Something went wrong',
        description: `Error while fetching: ${err}`
      });
    };
  };

  const setPagingUrl = async pageNumber => {
    try {
      const userDetails = await fetchPagination('finances/invoices', pageNumber);
      fetchDetails(userDetails);
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
          <Fragment>
            <InvoicesTab userDetails={userDetails}/>
            <Pagination
              postsPerPage={userDetails.per_page}
              totalPosts={userDetails.total}
              setPagingUrl={setPagingUrl}
              currentPage={userDetails.current_page}
            />
          </Fragment>
        ) : (
          <Spin size="large" style={SpinStyles}/>
        )}
      </React.Fragment>
    );
  };

  const renderHeader = controls => <PageHeader controls={controls}>Invoices</PageHeader>;

  console.log('invoice====', userDetails);

  return (
    <CrudStyle>
      <CRUD
        headerView={renderHeader}
        listView={renderListView}
      />
    </CrudStyle>
  );
};
 
export default Invoices;
