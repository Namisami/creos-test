import { Link } from "react-router-dom";
import { HomeOutlined, FileDoneOutlined, HighlightOutlined } from "@ant-design/icons";
import type { MenuProps } from 'antd';


type MenuItem = Required<MenuProps>['items'][number];

const menuItems: MenuItem[] = [
  {
    label: <Link to="/">Главная</Link>,
    key: 'main',
    icon: <HomeOutlined />,
  },
  {
    label: <Link to="/tasks">Задачи</Link>,
    key: 'tasks',
    icon: <FileDoneOutlined />,
  },
  {
    label: <Link to="/designer">Дизайнеру</Link>,
    key: 'designer',
    icon: <HighlightOutlined />,
  },
];

export default menuItems;
