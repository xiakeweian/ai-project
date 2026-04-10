import React from 'react';
import { Button } from 'antd';
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
              请您跳转到
              <Button type="link" href="https://ccs.costrip.cn" style={{ fontSize: 30 }}>光宇出行后台管理系统</Button>
            </div>
        }
      </>
    </AntDesignTheme>
  );
};

export default BasicLayout;
