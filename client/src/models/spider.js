import { queryGithubNews, queryToutiaoNews, queryHackerNews, querySegmentNews, queryJobboleNews } from '../services/spider';

export default {
  namespace: 'spider',

  state: {
    loading: false,
    githubNews: {},
    toutiaoNews: {},
    hackerNews: {},
    segmentNews: {},
    jobboleNews: {},
  },

  effects: {
    *fetchGithubNews(_, { call, put }) {
      const response = yield call(queryGithubNews);
      yield put({
        type: 'saveGithubNews',
        payload: response,
      });
    },
    *fetchToutiaoNews(_, { call, put }) {
      const response = yield call(queryToutiaoNews);
      yield put({
        type: 'saveToutiaoNews',
        payload: response,
      });
    },
    *fetchHackerNews(_, { call, put }) {
      const response = yield call(queryHackerNews);
      yield put({
        type: 'saveHackerNews',
        payload: response,
      });
    },
    *fetchSegmentNews(_, { call, put }) {
      const response = yield call(querySegmentNews);
      yield put({
        type: 'saveSegmentNews',
        payload: response,
      });
    },
    *fetchJobboleNews(_, { call, put }) {
      const response = yield call(queryJobboleNews);
      yield put({
        type: 'saveJobboleNews',
        payload: response,
      });
    },
  },

  reducers: {
    saveGithubNews(state, action) {
      return {
        ...state,
        githubNews: action.payload,
      };
    },
    saveToutiaoNews(state, action) {
      return {
        ...state,
        toutiaoNews: action.payload,
      };
    },
    saveHackerNews(state, action) {
      return {
        ...state,
        hackerNews: action.payload,
      };
    },
    saveSegmentNews(state, action) {
      return {
        ...state,
        segmentNews: action.payload,
      };
    },
    saveJobboleNews(state, action) {
      return {
        ...state,
        jobboleNews: action.payload,
      };
    },
  },
};
