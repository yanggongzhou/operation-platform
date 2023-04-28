import React, { FC, useState } from 'react';
import { Select } from 'antd';
import { CheckboxValueType } from "antd/es/checkbox/Group";
import { ISearchFieldItem } from "@/views/ad-reporting/index.interfaces";
import SearchPop from "@/components/search-pop";
import styles from '@/views/ad-reporting/pop/pop.module.scss';
import { useAppSelector } from "@/store";

interface IProps {
  fieldItem: ISearchFieldItem
}

const CountryPop: FC<IProps> = ({ fieldItem }) => {
  const [value, setValue] = useState<CheckboxValueType[]>();
  const options = useAppSelector(state => {
    return state.app.country;
  });

  const handleChange = (checkedValues: CheckboxValueType[]) => {
    setValue(checkedValues);
    console.log('checked = ', checkedValues);
  };

  return (
    <SearchPop field={fieldItem.fieldName}>
      <Select
        fieldNames={{
          label: "countryName",
          value: "countryCode2"
        }}
        mode="multiple"
        optionFilterProp="countryName"
        allowClear
        style={{ width: '100%' }}
        onChange={handleChange}
        options={options}
      />
    </SearchPop>
  );
};

export default CountryPop;
