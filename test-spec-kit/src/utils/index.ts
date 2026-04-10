/*
 * @Date: 2023/1/26
 * @Desc: 全局工具类库
 */

/**
 * 是否框架内是子应用
 */
export const isSubApp = !!(window as commonGlobal.commonAny).__POWERED_BY_QIANKUN__;

const loaderComponent = (lazyComponent: commonGlobal.commonAny, attemptsLeft = 3, interval = 1000): Promise<commonGlobal.commonAny> => {
  return new Promise((resolve, reject) => {
    lazyComponent()
      .then(resolve)
      .catch((error: commonGlobal.commonAny) => {
        setTimeout(() => {
          if (attemptsLeft === 1) {
            reject(error);
            return;
          }
          loaderComponent(lazyComponent, attemptsLeft - 1, interval).then(
            resolve,
            reject
          );
        }, interval);
      });
  });
};


//封装操作localStorage本地储存的方法
class LocalStorage {
  public name?: string;
  protected content?: commonGlobal.commonAny;

  constructor(name?: string, content?: commonGlobal.commonAny) {
    this.name = name;
    this.content = content;
  }

  // 设置localStorage
  public setStore (name: string, content: commonGlobal.commonAny) {
    if (!name) return;
    if (typeof content !== 'string') {
      // eslint-disable-next-line no-param-reassign
      content = JSON.stringify(content);
    }
    window.localStorage.setItem(name, content);
  }

  // 获取localStorage
  public getStore (name: string) {
    if (!name) return;
    return window.localStorage.getItem(name);
  }

  // 删除localStorage
  public removeStore (name: string) {
    if (!name) return;
    window.localStorage.removeItem(name);
  }

}

// 实例化类
const lsgObj = new LocalStorage();

export default {
  lsgObj
};


export {
  loaderComponent
};



/**
 * 生成基础表单规制
 * @param key 规制类型
 * @param itemName 姓名名称
 * @returns
 */
export const getRules = (key: Array<'required' | 'noEmoji'|'noChinese'>, itemName: string) => {
  const noEmojiReg = /^((?!(\ud83c[\udf00-\udfff])|(\ud83d[\udc00-\ude4f\ude80-\udeff])|[\u2600-\u2B55]).)*$/g;
  const noChineseReg = /^((?![\u4e00-\u9fa5]).)*$/g;
  const ruleMap = {
    required: { required:true, message: `${itemName}不允许为空` },
    noEmoji: { pattern: noEmojiReg, message: `${itemName}不允许输入表情字符` },
    noChinese: { pattern: noChineseReg, message: `${itemName}不允许输入中文字符` }
  };
  return key.map((k:keyof typeof ruleMap) => ruleMap[k]);
};
