/*
 * @Date: 2023/2/3
 * @Desc:
 */

import { Dispatch } from '@/store';

const initialState = {
  cnt: 0
};

export type demoState = typeof initialState;


export default {
  state: initialState,
  reducers: {
    updateState(state: demoState, payload: number) {
      return {
        ...state,
        cnt: state.cnt + payload
      };
    },
  },
  effects: (dispatch: Dispatch) => ({
    async addCnt(payload: number) {
      dispatch.demo.updateState(payload);
    }
  })
};
