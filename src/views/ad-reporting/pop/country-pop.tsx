import React, { FC, useState } from 'react';
import { Select } from 'antd';
import { EOperator, ISearchFieldItem } from "@/views/ad-reporting/index.interfaces";
import SearchPop from "@/components/search-pop";
import styles from '@/views/ad-reporting/pop/pop.module.scss';
import { useAppSelector } from "@/store";

interface IProps {
  fieldItem: ISearchFieldItem;
  onDelete: () => void;
  onCancel: () => void;
  onConfirm: (params: ISearchFieldItem) => void;
}

const CountryPop: FC<IProps> = ({ fieldItem, onDelete, onCancel, onConfirm }) => {
  const [value, setValue] = useState<string[]>(fieldItem.fieldValue);
  const options = useAppSelector(state => {
    return state.app.baseInfoList.country;
  });
  const handleChange = (checkedValues: string[]) => {
    setValue(checkedValues);
    console.log('checked = ', checkedValues);
  };
  const handleConfirm = () => {
    onConfirm({
      fieldName: fieldItem.fieldName,
      fieldValue: value,
      operator: EOperator.In,
    });
  };

  const handleCancel = () => {
    setValue(fieldItem.fieldValue);
    onCancel();
  };

  return (
    <SearchPop disabled={value.length === 0} fieldItem={fieldItem} onDelete={onDelete} onConfirm={handleConfirm} onCancel={handleCancel}>
      <Select
        fieldNames={{
          label: "countryName",
          value: "countryCode2"
        }}
        value={value}
        mode="multiple"
        optionFilterProp="countryName"
        allowClear
        style={{ width: '100%', maxWidth: '200px' }}
        onChange={handleChange}
        options={options}
      />
    </SearchPop>
  );
};

export default CountryPop;
