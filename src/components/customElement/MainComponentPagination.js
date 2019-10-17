import React from 'react';
import { Icon, Button } from 'antd';

const MainComponentPagination = () => {
  return (
    <Button.Group size='small' style={{ justifyContent: 'center', display: 'flex', marginTop: '10px' }}>
      <Button type="primary">
        <Icon type="left" />
      </Button>
      <Button type="primary">
        <Icon type="right" />
      </Button>
    </Button.Group>
  );
};

export default MainComponentPagination;
