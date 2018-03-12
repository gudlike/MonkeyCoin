import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Input, Form, Card, Spin, Button, Divider, Table, Icon, Avatar } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './Articles.less';

const FormItem = Form.Item;
const { TextArea } = Input;
const columns = [{
  dataIndex: 'username',
  width: 150,
  render: () => <Avatar shape="square" size="large" icon="user" />,
}, {
  render: (record) => (
    <div>
      <p>{record.username}</p>
      <p>{record.body}</p>
    </div>
  )
}, {
  dataIndex: 'date',
  width: 360
}];

@connect(state => ({
  currentUser: state.user.currentUser,
  blog: state.blog,
}))
@Form.create()
export default class Articles extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      failResult: '',
    }
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'blog/fetchArticles',
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.blog.status === 'error') {
      this.setState({ failResult: '提交失败！'+ nextProps.blog.info});
    } else if (nextProps.blog.status === 'success') {
      this.props.dispatch( {type: 'blog/clear'} );
      this.props.dispatch({type: 'blog/fetchArticles'});
    } else {
      this.setState({ failResult: '' });
    }
  }

  componentWillUnmount() {
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields({ force: true },
      (err, values) => {
        if (!err) {
          this.props.dispatch({
            type: 'blog/articleSubmit',
            payload: values,
          });
        }
      }
    );
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
      <PageHeaderLayout title="文章列表">
        <Card bordered={false}>
          <p style={{ color: 'red', }}>{failResult}</p>
          <Form
            onSubmit={this.handleSubmit}
            hideRequiredMark
            style={{ marginTop: 8 }}
          >
            <FormItem
              {...formItemLayout}
              label="在想些什么呢:"
            >
              {getFieldDecorator('body', {
                rules: [{
                  required: true, message: '请输入想法',
                }],
              })(
                <TextArea style={{ minHeight: 32 }} placeholder="请输入你的想法" rows={4} />
              )}
            </FormItem>
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={blog.submitting}>
                提交
              </Button>
            </FormItem>
          </Form>
          <Divider style={{ margin: '40px 0 24px' }} />
          <Table showHeader={false} columns={columns} dataSource={blog.articles} />
        </Card>
      </PageHeaderLayout>
    );
  }
}
