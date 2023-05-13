import React, { FC, useState } from 'react';
import { Select } from "antd";
import { EGroupField, NGroupField } from "@/views/ad-reporting/index.interfaces";

interface IProps {
  onChoose: (field: EGroupField) => void;
}

const treeData = Object.keys(NGroupField).map((field) => (
  { label: NGroupField[field as EGroupField], value: field }
));

const SearchMenu: FC<IProps> = ({ onChoose }) => {

  const [value, setValue] = useState<EGroupField>();

  const onChange = (newValue: EGroupField) => {
    onChoose(newValue);
    console.log('value', value);
  };

  return (
    <Select
      bordered={false}
      style={{ width: '200px', marginLeft: '20px' }}
      showSearch
      value={value}
      placeholder="请搜索和筛选"
      onChange={onChange}
      options={treeData}
    />
  );
};

export default SearchMenu;
