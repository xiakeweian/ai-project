/**
 * @Date: 2023/6/27
 * @Desc: form表单组件
 */
import React from 'react';
import { EFormSelect, EFormText } from '@cos-power/cos-power-pc-ui';
import { DatePicker } from 'antd';
interface IProps {
  /**
   * 名称
   */
  label: string;
  /**
   * 字段名
   */
  name: string;
  /**
   * 描述
   */
  placeholder?: string;
  /**
   * 选择器类型
   */
  type: string;
  /**
   * 是否展示搜索
   */
  showSearch?: boolean;
  /**
   * 展示清空
   */
  allowClear?: boolean;
  /**
   * 空数据描述
   */
  notFoundContent?: string;
  /**
   * option取值说明
   */
  fieldNames?: {
    label: string;
    value: string;
  }
  /**
   * 样式
   */
  style?: object;
  /**
   * option值
   */
  options?: CellSelectProps[];
  /**
   * 过滤
   */
  filterOption?: any
}

interface CellSelectProps {
  name?: string,
  code?: number
}
const Item = (item:IProps): JSX.Element => {
  switch (item.type) {
    case 'select':
      return <EFormSelect key={item.name}  {...item}/>;
    case 'input':
      return <EFormText key={item.name}  {...item} />;
    case 'edate':
      return <DatePicker key={item.name}  {...item} />;
    default:
      return<></>;
  }
};

const FromItem = (props:IProps)=> {
  return <React.Fragment>{Item(props)}</React.Fragment>;
};
export default FromItem;
