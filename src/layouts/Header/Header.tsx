import { useEffect, useState } from 'react';
import { SunOutlined, MoonOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Menu, Flex, Switch } from "antd";
import { useLocation } from 'react-router-dom';

import LanguageIcon from '../../components/Icons/LanguageIcon';
import getWeekOfMonth from '../../utils/getWeekOfMonth';
import menuItems from './MenuItems';
import languageItems from './LanguageItems';

import './Header.css';


const Header = () => {
  const location = useLocation();
  const [current, setCurrent] = useState('mail');

  useEffect(() => {
    if (location.pathname === "/") return setCurrent("main");
    return setCurrent(location.pathname.slice(1));
  }, [location]);

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
  };

  return (
    <Flex
      className='header'
      align='middle'
      justify='space-between'
    >
      <Menu 
        className='header__menu'
        onClick={onClick} 
        selectedKeys={[current]} 
        mode="horizontal" 
        items={ menuItems } 
      />
      <Flex gap={ 12 }>
        <p className='header__week'>{ getWeekOfMonth() } неделя</p>
        <Switch
          className='header__theme-switch'
          checkedChildren={<MoonOutlined />}
          unCheckedChildren={<SunOutlined />}
        />
        <Dropdown.Button
          className="header__dropdown-btn"
          menu={ languageItems }
          icon={ <LanguageIcon /> }
        />
      </Flex>
    </Flex>
  );
};

export default Header;
