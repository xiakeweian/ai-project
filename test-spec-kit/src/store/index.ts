/*
 * @Date: 2023/1/26
 * @Desc:
 */

import { init, RematchRootState } from '@rematch/core';
import models from './loader';

const store = init({ models });

export type Store = typeof store;
export type Dispatch = typeof store.dispatch;
export type RootState = RematchRootState<typeof models>;


export default store;
