import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Input, Form, Card, Spin, Button, Divider, Table, Icon, Avatar } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './Game2048.less';


@connect(state => ({
  currentUser: state.user.currentUser,
  blog: state.blog,
}))
@Form.create()
export default class Game2048 extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      failResult: '',
    }
  }

  componentDidMount() {
    
  }

  componentWillReceiveProps(nextProps) {
   
  }

  componentWillUnmount() {
  }

  render() {

    const { currentUser, blog } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { failResult } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };

    return (
      <PageHeaderLayout title="2048">
        
      </PageHeaderLayout>
    );
  }
}
