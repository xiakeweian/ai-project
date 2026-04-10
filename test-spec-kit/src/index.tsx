import './public-path'; // 注意：先引入public-path
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import EmptyIcon from '@/images/empty.svg';
import reportWebVitals from './reportWebVitals';
import store from './store';
import { Provider } from 'react-redux';
import action from './hooks/action';
import { ConfigProvider,Empty,ThemeConfig } from 'antd';
import { KeepAliveProvider } from '@cos-power/cos-power-pc-ui';
import zhCN from 'antd/lib/locale/zh_CN';
import 'dayjs/locale/zh-cn';

let root: ReactDOM.Root | null = null;
/**
 * 全局主题样式
 */
const theme: ThemeConfig = {
  token: {
    // controlHeight:36,
    borderRadius:8,
    colorPrimary: '#2185FA',
  },
  components: {
    Button: {
      colorBorder:'transparent',
      colorPrimary: '#2185FA',
      colorText: '#2185FA',
      colorBgContainer:'#F3F7FF'
    }
  }
};
const renderEmpty = () => {
  return <Empty image={EmptyIcon} description={<span style={{ color:'#999' }}>暂无数据</span> } />;
};

const funcObj = {
  signOutListener: () =>{
    console.log('基座点击退出啦-----');
  }
};

function render(props: commonGlobal.commonAny = {}) {
  const { container,commonProps, navigate } = props;
  // commonProps
  console.log('props===',props);
  store.dispatch.microApp.updateMicroApp({ ...commonProps, navigate });

  if((window as commonGlobal.commonAny).__POWERED_BY_QIANKUN__){
    action.setActions(props);
  }
  commonProps?.mainListener(funcObj);

  const rootDom = container ? container.querySelector('#root') : document.querySelector('#root');

  root = ReactDOM.createRoot(
    rootDom as HTMLElement
  );
  root.render(
    <Provider store={store}>
      <KeepAliveProvider props={props}>
        <BrowserRouter>
          <ConfigProvider renderEmpty={renderEmpty} theme={theme} locale={zhCN}>
            <App />
          </ConfigProvider>
        </BrowserRouter>
      </KeepAliveProvider>
    </Provider>
  );

}

console.log((window as commonGlobal.commonAny).__POWERED_BY_QIANKUN__);

if (!(window as commonGlobal.commonAny).__POWERED_BY_QIANKUN__) {
  // eslint-disable-next-line no-undef

  render({});

  // (window as any).__webpack_public_path__ = (window as any).__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
} else {
  // 独立运行
}

/**
 * 启动
 * @param props
 */
export async function bootstrap(props: commonGlobal.commonAny) {
  console.log('bootstrap===', props);
}

/**
 * 渲染
 * @param props
 */
export async function mount(props: commonGlobal.commonAny) {
  console.log('mount===', props);
  render(props);
}

/**
 * 卸载
 */
export async function unmount() {
  if (root) {
    root.unmount();
  }
}

export async function update(props: commonGlobal.commonAny) {
  console.log('update===', props);

}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


