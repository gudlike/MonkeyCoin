import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Card, Spin, Select, Divider } from 'antd';

import styles from './NewsBoard.less';

@connect(state => ({
  githubNews: state.spider.githubNews,
  toutiaoNews: state.spider.toutiaoNews,
  hackerNews: state.spider.hackerNews,
  segmentNews: state.spider.segmentNews,
  jobboleNews: state.spider.jobboleNews,
}))
export default class NewsBoard extends PureComponent {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      newsType: 'Github'
    }
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'spider/fetchGithubNews',
    });
  }

  componentWillUnmount() {
  }

  handleChange(value) {
    switch (value) {
      case 'Github':
        this.setState({newsType: 'Github'})
        this.props.dispatch({
          type: 'spider/fetchGithubNews',
        });
        break;
      case 'Hacker News':
        this.setState({newsType: 'Hacker News'})
        this.props.dispatch({
          type: 'spider/fetchHackerNews',
        });
        break;
      case 'Segment Fault':
        this.setState({newsType: 'Segment Fault'})
        this.props.dispatch({
          type: 'spider/fetchSegmentNews',
        });
        break;
      case '开发者头条':
        this.setState({newsType: '开发者头条'})
        this.props.dispatch({
          type: 'spider/fetchToutiaoNews',
        });
        break;
      case '伯乐头条':
        this.setState({newsType: '伯乐头条'})
        this.props.dispatch({
          type: 'spider/fetchJobboleNews',
        });
        break;
      default:
        break;
    }
  }

  render() {

    const { githubNews, toutiaoNews, hackerNews, segmentNews, jobboleNews } = this.props;
    let load = true;
    switch (this.state.newsType) {
      case "Github":
        load = githubNews.data ? false : true;
        break;
      case "Hacker News":
        load = hackerNews.data ? false : true;
        break;
      case "Segment Fault":
        load = segmentNews.data ? false : true;
        break;
      case "开发者头条":
        load = toutiaoNews.data ? false : true;
        break;
      case "伯乐头条":
        load = jobboleNews.data ? false : true;
        break;
      default:
        break;
    }

    return (
      <div>
        <Select defaultValue="Github" style={{ width: 160 }} onChange={this.handleChange}>
          <Select.Option value="Github">Github</Select.Option>
          <Select.Option value="Hacker News">Hacker News</Select.Option>
          <Select.Option value="Segment Fault">Segment Fault</Select.Option>
          <Select.Option value="开发者头条">开发者头条</Select.Option>
          <Select.Option value="伯乐头条">伯乐头条</Select.Option>
        </Select>
        <Card title="信息聚合阅读" loading={load}>
          {this.state.newsType === 'Github' && githubNews.data ? (
            <ul>
            {
              githubNews.data.map((post, i) => {
                return (
                  <div key={i}>
                      <a href={post.url} target="_blank">{post.title}</a>
                    {
                      post.desc ?
                        <div>
                          <div>
                            <p>{post.desc}</p>
                          </div>
                        </div>
                        : null
                    }
                    <Divider style={{ marginBottom: 32 }} />
                  </div>
                );
              }, this)
            }
            </ul>) : null}

          {this.state.newsType === 'Hacker News' && hackerNews.data ? (
            <ul>
            {
              hackerNews.data.map((post, i) => {
                return (
                  <div key={i}>
                      <a href={post.url} target="_blank">{post.title}</a>
                    {
                      post.desc ?
                        <div>
                          <div>
                            <p>{post.desc}</p>
                          </div>
                        </div>
                        : null
                    }
                    <Divider style={{ marginBottom: 32 }} />
                  </div>
                );
              }, this)
            }
            </ul>) : null}
        
         {this.state.newsType === 'Segment Fault' && segmentNews.data ? (
            <ul>
            {
              segmentNews.data.map((post, i) => {
                return (
                  <div key={i}>
                      <a href={post.url} target="_blank">{post.title}</a>
                    {
                      post.desc ?
                        <div>
                          <div>
                            <p>{post.desc}</p>
                          </div>
                        </div>
                        : null
                    }
                    <Divider style={{ marginBottom: 32 }} />
                  </div>
                );
              }, this)
            }
            </ul>) : null}
          
          {this.state.newsType === '开发者头条' && toutiaoNews.data ? (
            <ul>
            {
              toutiaoNews.data.map((post, i) => {
                return (
                  <div key={i}>
                      <a href={post.url} target="_blank">{post.title}</a>
                    {
                      post.desc ?
                        <div>
                          <div>
                            <p>{post.desc}</p>
                          </div>
                        </div>
                        : null
                    }
                    <Divider style={{ marginBottom: 32 }} />
                  </div>
                );
              }, this)
            }
            </ul>) : null}

          {this.state.newsType === '伯乐头条' && jobboleNews.data ? (
            <ul>
            {
              jobboleNews.data.map((post, i) => {
                return (
                  <div key={i}>
                      <a href={post.url} target="_blank">{post.title}</a>
                    {
                      post.desc ?
                        <div>
                          <div>
                            <p>{post.desc}</p>
                          </div>
                        </div>
                        : null
                    }
                    <Divider style={{ marginBottom: 32 }} />
                  </div>
                );
              }, this)
            }
            </ul>) : null}

        </Card>
      </div>
    );
  }
}
