import { useState } from 'react';
import { HomeOutlined, FileDoneOutlined, HighlightOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Menu, Flex } from "antd";

import LanguageIcon from '../Icons/LanguageIcon';

import './Header.css';


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
        items={items} />
      <Dropdown.Button 
        className="header__dropdown-btn"
        disabled 
        icon={ <LanguageIcon /> }
      />
    </Flex>
  );
};

export default Header;
