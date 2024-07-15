import { HomeOutlined, FileDoneOutlined, HighlightOutlined } from "@ant-design/icons";
import type { MenuProps } from 'antd';


type MenuItem = Required<MenuProps>['items'][number];

const menuItems: MenuItem[] = [
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

export default menuItems;
