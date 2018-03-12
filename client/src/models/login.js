import { fakeAccountLogin, fakeMobileLogin } from '../services/api';
import { accountLogin, logout } from '../services/auth';

export default {
  namespace: 'login',

  state: {
    status: undefined,
    info: undefined
  },

  effects: {
    *accountSubmit({ payload }, { call, put }) {
      yield put({
        type: 'changeSubmitting',
        payload: true,
      });
      const response = yield call(accountLogin, payload);
      yield put({
        type: 'accountLoginHandle',
        payload: response,
      });
      yield put({
        type: 'changeSubmitting',
        payload: false,
      });
    },
    *mobileSubmit(_, { call, put }) {
      yield put({
        type: 'changeSubmitting',
        payload: true,
      });
      const response = yield call(fakeMobileLogin);
      yield put({
        type: 'loginHandle',
        payload: response,
      });
      yield put({
        type: 'changeSubmitting',
        payload: false,
      });
    },
    *logout({ payload, callback }, { call, put }) {
      const response = yield call(logout);
      yield put({
        type: 'logoutHandle',
        payload: response
      });
      if (callback) {
        callback();
      }
    },
  },

  reducers: {
    accountLoginHandle(state, { payload }) {
      return {
        ...state,
        status: payload.status,
        info: password.info,
        type: 'account',
      };
    },
    loginHandle(state, { payload }) {
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
    changeSubmitting(state, { payload }) {
      return {
        ...state,
        submitting: payload,
      };
    },
    logoutHandle(state, { payload }) {
      return {
        ...state,
        status: payload.status,
      };
    },
  },
};
