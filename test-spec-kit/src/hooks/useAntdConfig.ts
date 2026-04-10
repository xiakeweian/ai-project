import { useState } from 'react';
import { ThemeData, parameterTheme } from '@/types/antDesign/antDesignConfigType';
import { theme } from 'antd';

/**
 * 默认 and 主题颜色
 */
const defaultData: ThemeData = {
  algorithm: theme.defaultAlgorithm,
  algorithmStr: 'defaultAlgorithm',
  token: {
    colorPrimary: '#1677ff',
  },
};

/**
 * 设置 获取当前 and 主题颜色
 */
const useAntDesignConfig = () => {
  // 主题配置数据
  const [dataTheme, setDataTheme] = useState<ThemeData>(defaultData);
  /**
   * 设置 antd 的主题参数
   * algorithm 分为 默认defaultAlgorithm 和 暗黑模式darkAlgorithm
   * @param algorithm
   * @param colorPrimary
   */
  const setAntDesignConfigFunc = ({ algorithm = 'defaultAlgorithm', colorPrimary }: parameterTheme) => {
    setDataTheme(
      {
        algorithmStr: algorithm,
        algorithm: theme[algorithm],
        token: {
          colorPrimary,
        }
      }
    );
  };

  /**
   * 获取主题档期啊主题颜色
   */
  const getAntDesignConfigFunc = () => {
    return dataTheme;
  };

  return {
    setAntDesignConfigFunc,
    getAntDesignConfigFunc,
    dataTheme
  };
};

export default useAntDesignConfig;
