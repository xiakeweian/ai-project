/*
 * @Description: 
 * @Author: wuyanxia
 * @Date: 2026-04-10 22:49:13
 * @LastEditors: wuyanxia
 * @LastEditTime: 2026-04-11 00:28:43
 */
import React from 'react';
import { Outlet } from 'react-router-dom';
import AntDesignTheme from '../AntDesignTheme';
import useAntDesignConfig from '@/hooks/useAntdConfig';
import { useKeepAlive } from '@cos-power/cos-power-pc-ui';
import { routers } from '@/routes';

const QianKunOutlet = () => {
  useKeepAlive({ routers });

  return <Outlet />;
};

const BasicLayout: React.FC = () => {
  const { dataTheme } = useAntDesignConfig();
  console.log(dataTheme);
  return (
    <AntDesignTheme>
      <>
        {
          (window as commonGlobal.commonAny).__POWERED_BY_QIANKUN__
            ?
            <QianKunOutlet />
            :
            <div style={{ width: 500, height: 200, position: 'fixed', top: 0, left: 0, bottom: 0, right: 0, margin: 'auto' }}>
              <h1>这是一个独立运行的页面</h1>
            </div>
        }
      </>
    </AntDesignTheme>
  );
};

export default BasicLayout;
