import { useState } from 'react';
import { HomeOutlined, FileDoneOutlined, HighlightOutlined, SunOutlined, MoonOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Menu, Flex, Switch } from "antd";

import LanguageIcon from '../Icons/LanguageIcon';

import './Header.css';
import getWeekOfMonth from '../../utils/getWeekOfMonth';


type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    label: 'Главная',
    key: 'main',
    icon: <HomeOutlined />,
  },
  {
    label: 'Задачи',
    key: 'tasks',
    icon: <FileDoneOutlined />,
  },
  {
    label: 'Дизайнеру',
    key: 'design',
    icon: <HighlightOutlined />,
  },
];

const dropdownItems: MenuProps['items'] = [
  {
    key: '1',
    label: "Русский"
  },
  {
    key: '2',
    label: "English"
  },
];

const handleMenuClick: MenuProps['onClick'] = (e) => {
  console.log('click', e);
};

const dropdownMenuProps = {
  items: dropdownItems,
  onClick: handleMenuClick,
};

const Header = () => {
  const [current, setCurrent] = useState('mail');

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
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
        items={items} 
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
          menu={ dropdownMenuProps }
          icon={ <LanguageIcon /> }
        />
      </Flex>
    </Flex>
  );
};

export default Header;
