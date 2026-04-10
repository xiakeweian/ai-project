/*
 * @Date: 2023-06-16 11:48:07
 * @Description:
 */
import React from 'react';
import BasicLayout from '@/components/BasicLayout/index';
import { RouteObjectExtend } from '@cos-power/cos-power-pc-ui';
import { isSubApp } from '@/utils';
const Home = React.lazy(() => import('@/pages/home'));
const ErrorPage = React.lazy(() => import('@/pages/err'));
export const routers: RouteObjectExtend[] = [
  {
    path: isSubApp ? '/business' : '',
    element: <BasicLayout />,
    children: [
      {
        index: false,
        path: 'index',
        meta: {
          name: '测试',
        },
        element: <Home />,
      },
      // {
      //   index: false,
      //   path: '/basic',
      //   name: '工具中心',
      //   key: '/basic',
      //   auth: '1',
      //   // element: <BasicLayout/>,
      //   children: [
      //     {
      //       index: false,
      //       path: '/basic/index',
      //       name: '维修工单',
      //       element: <SignIn/>,
      //       key: '/basic/index',
      //       auth: '1',
      //     },
      //   ]
      // }
    ],
  },
  {
    path: 'error',
    element: (<ErrorPage />),
  },
];
