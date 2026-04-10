import React, { FC } from 'react';
import { ConfigProvider } from 'antd';
import useAntDesignConfig from '../../hooks/useAntdConfig';

interface AntDesignThemeProps {
  children: JSX.Element | JSX.Element[];
}

const AntDesignTheme: FC<AntDesignThemeProps> = (props) => {
  /**
   * 设置修改 and 主题
   */
  const {  dataTheme } = useAntDesignConfig();
  return (
    <>
      <ConfigProvider
        theme={dataTheme}
      >
        {props.children}
      </ConfigProvider>
    </>
  );
};

export default AntDesignTheme;

