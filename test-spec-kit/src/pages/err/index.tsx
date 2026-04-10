import React, { FC } from 'react';
import { EErrorPage } from '@cos-power/cos-power-pc-ui';
import { useNavigate } from 'react-router-dom';

const Err404: FC = () => {
  const navigate = useNavigate();
  return <EErrorPage onTapHome={()=>navigate('/')} />;
};

export default Err404;
