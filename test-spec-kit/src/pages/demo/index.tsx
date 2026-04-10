import React, { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Button } from 'antd';

const mapDispatch = {
}

const mapState = (state: { demo: { cnt: number; }; }) => {
  return {
    cnt: state.demo.cnt
  };
};

const connector = connect(mapState, mapDispatch)
type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {
  name?: string
}

const Index: FC<Props> = props => {
  const { cnt } = props;
  const handleClick = () => {
    console.log('handleClick')
  }

  return <div>
    { cnt }
    <Button onClick={handleClick}>点我</Button>
  </div>;
};

export default connector(Index);
