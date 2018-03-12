import request from '../utils/request';

export async function queryGithubNews() {
  return request('/spider/github/repo_list');
}

export async function queryToutiaoNews() {
  return request('/spider/toutiao/posts');
}

export async function queryHackerNews() {
  return request('/spider/hacker/news');
}

export async function querySegmentNews() {
  return request('/spider/segmentfault/blogs');
}

export async function queryJobboleNews() {
  return request('/spider/jobbole/news');
}