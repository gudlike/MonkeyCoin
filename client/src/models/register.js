import { register } from '../services/auth';

export default {
  namespace: 'register',

  state: {
    status: undefined,
    info: undefined
  },

  effects: {
    *submit({payload}, { call, put }) {
      yield put({
        type: 'changeSubmitting',
        payload: true,
      });
      const response = yield call(register,payload);
      yield put({
        type: 'registerHandle',
        payload: response,
      });
      yield put({
        type: 'changeSubmitting',
        payload: false,
      });
    },
    *clear(_, { put }) {
      yield put({
        type: 'clearState'
      })
    }
  },

  reducers: {
    registerHandle(state, { payload }) {
      return {
        ...state,
        status: payload.status,
        info: payload.info
      };
    },
    changeSubmitting(state, { payload }) {
      return {
        ...state,
        submitting: payload,
      };
    },
    clearState(state) {
      return {
        ...state,
        status: undefined,
        info: undefined
      }
    }
  },
};
