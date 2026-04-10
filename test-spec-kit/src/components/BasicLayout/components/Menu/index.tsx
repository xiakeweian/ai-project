import React, { useState, useEffect } from 'react';
import { Card, Layout, Menu, MenuProps } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { MenuUnfoldOutlined } from '@ant-design/icons';
import { routers } from '@/routes';
import styled from 'styled-components';
import { RouteObjectExtend } from '@cos-power/cos-power-pc-ui';

const { Sider } = Layout;

const MenuLogo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  justify-items: center;

  .Menu_logo {
    flex: 1;

    .Menu_logo_img {
      width: 50px;
      height: 50px;
    }

    .Menu_logo_img_text {
      width: 161px;
      height: 50px;
    }
  }

  .Menu_collapsed {
    width: 20px;
  }

`;

type MenuItemType = Required<MenuProps>['items'][number]
const MenuDom: React.FC = () => {

  type MenuItem = MenuItemType;
  const getItem = (
    key: React.Key,
    children?: MenuItem[],
  ): MenuItem => {
    return {
      key,
      children,
    } as MenuItem;
  };
  /**
   * 接口返回路径会带微应用路径前缀，我们子项目需要剔除
   */
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  const getItemFunc = (routers: string | any[], path: string | undefined): any => {
    for (let i = 0; i < routers.length; i++) {
      const oItem = routers[i];
      console.log(oItem.path , path);

      if (oItem.path === path) {
        return [];
      } else if (oItem?.children?.length > 0) {
        const result: any = getItemFunc(oItem.children, path);
        if (result) {
          return [oItem.path].concat(result);
        }
      }
    }
  };
  const getMenuItems = (routersT: RouteObjectExtend[]): MenuItemType[] => {
    return routersT.map((ele: RouteObjectExtend) => {
      return getItem(ele.path as string, ele?.children && getMenuItems(ele.children));
    });
  };
  const onSelect = ({ key }: { key: string }) => {
    navigate(key);
  };
  const onOpenChange = (keys: string[]) => {
    setOpenKeys(keys);
  };

  useEffect(() => {
    const pathnameStr = pathname ? pathname : '/';
    setSelectedKeys([pathnameStr]);
    setOpenKeys(getItemFunc((routers || []), pathname));
  }, [pathname]);
  console.log(getMenuItems);
  return (
    <Sider trigger={null} collapsible collapsed={collapsed} width={260} style={{ background: '#fff' }}>
      <Card style={{ borderRadius: 0, height: 120, border: 'none', borderBottom: '1px solid #dad7d7' }}>
        <MenuLogo>
          <div
            className='Menu_logo'
            onClick={() => setCollapsed(!collapsed)}
          >
            {
              collapsed
                ?
                <img className='Menu_logo_img' src='/img_1.png' alt=""/>
                :
                <img className='Menu_logo_img_text' src='/img.png' alt=""/>
            }
          </div>
          <div className='Menu_collapsed'>
            {
              !collapsed && <>
                {React.createElement(collapsed ? MenuUnfoldOutlined : MenuUnfoldOutlined, {
                  className: 'trigger',
                  onClick: () => setCollapsed(!collapsed),
                })}
              </>
            }
          </div>
        </MenuLogo>
      </Card>
      <Menu
        mode="inline"
        openKeys={openKeys}
        style={{ height: 'calc(100% - 120px)', borderRight: 0 }}
        selectedKeys={selectedKeys}
        onOpenChange={(key: string[]) => onOpenChange(key)}
        items={getMenuItems(routers)}
        onSelect={onSelect}
      />
    </Sider>
  );
};

export default MenuDom;


