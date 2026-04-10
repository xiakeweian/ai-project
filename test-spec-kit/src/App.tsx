
import { routers } from './routes';

import 'antd/dist/reset.css';
import { useRoutes, RouteObject } from 'react-router-dom';

import { keepAliveLeafRoutes } from '@cos-power/cos-power-pc-ui';
const keepaliveRoutes = keepAliveLeafRoutes(routers);



function App() {
  return (
    useRoutes(keepaliveRoutes as RouteObject[])
  );
}

export default App;
