import React, { FC, useState } from 'react';
import { TreeSelect } from "antd";
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
    setValue(undefined);
  };

  return (
    <TreeSelect
      showSearch
      style={{ width: '278px', marginLeft: '20px' }}
      value={value}
      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
      treeData={treeData}
      placeholder="请搜索和筛选"
      treeDefaultExpandAll
      onChange={onChange}
    />
  );
};

export default SearchMenu;
