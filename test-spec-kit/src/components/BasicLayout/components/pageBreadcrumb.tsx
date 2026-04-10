
import React from 'react';
import { Breadcrumb } from 'antd';
import { FC } from 'react';
import {
  Link,
  matchRoutes,
  useLocation,
} from 'react-router-dom';
import { routeObjectType } from '../../../types/antDesign/antDesignConfigType';
import { routers } from '../../../routes';


const PageBreadcrumb: FC = () => {
  const location = useLocation();
  const match = matchRoutes(routers as any, location);
  console.log(match);
  const breadcrumbs =
    (match || []).reduce((total: any[], current) => {
      if ((current.route as routeObjectType).name) {
        total.push(current.route);
      }
      return total;
    }, []);

  return (
    <Breadcrumb separator='>' style={{ padding: '10px 10px' }}>
      {breadcrumbs.map((i, index) => (
        <Breadcrumb.Item key={i.path}>
          {index === breadcrumbs.length - 1 ? (
            i.name
          ) : (
            <Link to={i.path as string}>{i.name}</Link>
          )}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  )
}
export default PageBreadcrumb
