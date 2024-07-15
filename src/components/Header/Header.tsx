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
        items={items} />
      <Dropdown.Button
        menu={ dropdownMenuProps }
        className="header__dropdown-btn"
        icon={ <LanguageIcon /> }
      />
    </Flex>
  );
};

export default Header;
