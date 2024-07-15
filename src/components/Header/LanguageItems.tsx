import type { MenuProps } from 'antd';


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

const languageItems = {
  items: dropdownItems,
  onClick: handleMenuClick,
};

export default languageItems;
