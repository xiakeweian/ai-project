/*
 * @Date: 2023/1/31
 * @Desc:
 */
import { isSubApp } from '@/utils/index';

// /src/qiankun/action.js
function emptyAction(...args: commonGlobal.commonAny) {
  console.log(args);
  // 提示当前使用的是空 Action
  console.warn('Current execute action is empty!');
}

class BaseAction {
  // 默认值为空 Action
  actions = {
    onGlobalStateChange: emptyAction,
    setGlobalState: emptyAction,
  };

  /**
   * 设置 actions
   */
  setActions(actions: {
    onGlobalStateChange: () => void;
    setGlobalState: () => void;
  }) {
    this.actions = actions;
    console.log('setActions===', this.actions);
  }

  /**
   * 映射
   */
  onGlobalStateChange(...args: commonGlobal.commonAny[]) {
    if (!isSubApp) {
      console.warn('！！！不在基座内无法通信');
      return () => null;
    }
    return this.actions.onGlobalStateChange(...args);
  }

  /**
   * 映射
   */
  setGlobalState(...args: commonGlobal.commonAny[]) {
    if (!isSubApp) {
      console.warn('！！！不在基座内无法通信');
      return () => null;
    }
    return this.actions.setGlobalState(...args);
  }
}

const baseAction = new BaseAction();
export default baseAction;

