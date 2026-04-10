import React, { FC, useEffect, useState } from 'react';
import action from '../../hooks/action';
import { EPagination } from '@cos-power/cos-power-pc-ui';
import { connect, ConnectedProps } from 'react-redux';
import { Button } from 'antd';

const mapState = (state: { microApp: { navigate: any; }; }) => {
  return {
    navigate: state.microApp.navigate
  };
};

const connector = connect(mapState, null);
type PropsFromRedux = ConnectedProps<typeof connector>



const Home: FC<PropsFromRedux> = (props) => {
  const { navigate } = props;
  const [baseData, setBaseData] = useState(null);

  useEffect(() => {
    action.onGlobalStateChange((state: any) => {
      setBaseData(state);
    }, true);
  }, []);



  const setCurrentPageFn = (val: any) => {
    console.log(val);
  };

  const handleJump = () =>{
    navigate('/');
  };

  const handleJumpFunc = () =>{
    navigate('/permission/user');
  };



  return <>
    <EPagination totalCounts={100} pageCounts={5} setCurrentPageFn={setCurrentPageFn} currentPages={1} groupCounts={1}/>
    {`子应用react中显示-主应用的数据：${JSON.stringify(baseData)}`}1

    <Button onClick={handleJump}>跳转主应用首页</Button>
    <Button onClick={handleJumpFunc}>子跳转子应用首页</Button>
    <br/>
    <h2>长租运营中心页面</h2>
  </>;
};

export default connector(Home);
