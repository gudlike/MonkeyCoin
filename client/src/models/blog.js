import { queryArticles, articleSubmit } from '../services/blog';

export default {
  namespace: 'blog',

  state: {
    status: undefined,
    info: undefined,
    articles: [],
  },

  effects: {
    *articleSubmit({ payload }, { call, put }) {
      yield put({
        type: 'changeSubmitting',
        payload: true,
      });
      const response = yield call(articleSubmit, payload);
      yield put({
        type: 'articleSubmitHandle',
        payload: response,
      });
      yield put({
        type: 'changeSubmitting',
        payload: false,
      });
    },
    *fetchArticles(_, { call, put }) {
      const response = yield call(queryArticles);
      yield put({
        type: 'saveArticles',
        payload: response,
      });
    },
    *clear(_, { put }) {
      yield put({
        type: 'clearState'
      })
    }
  },

  reducers: {
    articleSubmitHandle(state, { payload }) {
      return {
        ...state,
        status: payload.status,
        info: payload.info,
      };
    },
    changeSubmitting(state, { payload }) {
      return {
        ...state,
        submitting: payload,
      };
    },
    saveArticles(state, action) {
      let content = action.payload.content;
      for(let count in content) {
        let key = count + 1;
        content[count].key = key;
      }
      return {
        ...state,
        articles: action.payload.content,
      };
    },
    clearState(state) {
      return {
        ...state,
        status: undefined,
        info: undefined,
        articles: []
      }
    }
  },
};
