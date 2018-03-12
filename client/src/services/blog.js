import request from '../utils/request';

export async function queryArticles() {
  return request('/blog/articles');
}

export async function articleSubmit(params) {
  return request('/blog/submit-article', {
    method: 'POST',
    body: params,
  });
}