/*
 * @Date: 2023/1/31
 * @Desc:
 */

import { Dispatch } from '@/store';

interface CommonState {
  userInfo: object,
  jumpPage: (path:string) => void
  toLogin: () => void
}

const initialState = {
  userInfo: {},
  jumpPage: () => {
    console.log('');
  },
  toLogin: () => {
    console.log('toLogin');
  },
};

export default {
  state: initialState,
  reducers: {
    updateState(state: CommonState, payload: commonGlobal.commonAny) {
      return {
        ...state,
        ...payload
      };
    }
  },
  effects: (dispatch: Dispatch) => ({
    async updateMicroApp(payload: commonGlobal.commonAny) {
      dispatch.microApp.updateState(payload);
    }
  })
};
