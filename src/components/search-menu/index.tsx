import React, { FC, useState } from 'react';
import { Button, Popover, Space, TreeSelect } from "antd";
import { CloseOutlined } from "@ant-design/icons";

interface IProps {}


const treeData = [
  {
    value: 'xxx',
    title: '广告',
    disabled: true,
    children: [
      {
        value: 'leaf1',
        title: '广告组',
      },
      {
        value: 'leaf2',
        title: '广告系列',
      },
      {
        value: 'parent 1-1',
        title: '广告组',
      },
    ],
  },
  {
    value: 'parent 1-22',
    title: 'App',
    disabled: true,
    children: [
      {
        value: 'appId',
        title: <b style={{ color: '#08c' }}>App</b>,
      },
    ],
  },
];

const SearchMenu: FC<IProps> = () => {

  const [value, setValue] = useState<string>();

  const onChange = (newValue: string) => {
    console.log(newValue);
    setValue(newValue);
  };

  return (
    <TreeSelect
      showSearch
      style={{ width: '278px' }}
      value={value}
      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
      treeData={treeData}
      placeholder="Please select"
      treeDefaultExpandAll
      onChange={onChange}
    />
  );
};

export default SearchMenu;
