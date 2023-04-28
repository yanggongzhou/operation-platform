import React, { FC, useState } from 'react';
import { Checkbox } from 'antd';
import { CheckboxValueType } from "antd/es/checkbox/Group";
import { EGroupField, ISearchFieldItem } from "@/views/ad-reporting/index.interfaces";
import SearchPop from "@/components/search-pop";
import styles from '@/views/ad-reporting/pop/pop.module.scss';
import { useAppSelector } from "@/store";

interface IProps {
  fieldItem: ISearchFieldItem
}

const CheckedPop: FC<IProps> = ({ fieldItem }) => {
  const [value, setValue] = useState<CheckboxValueType[]>();
  const options = useAppSelector(state => {
    let arr: any[] = [];
    switch (fieldItem.fieldName) {
      case EGroupField.AdId:
        arr = state.app.app;
        break;
      case EGroupField.Device:
        arr = state.app.device;
        break;
      case EGroupField.Media:
        arr = state.app.media;
        break;
      case EGroupField.AdType:
        arr = state.app.type;
        break;
      case EGroupField.Pline:
        arr = state.app.pline;
        break;
      default:
        arr = [];
        break;
    }
    return arr.map(val => ({ label: val.text, value: val.field }));
  });

  const handleChange = (checkedValues: CheckboxValueType[]) => {
    setValue(checkedValues);
    console.log('checked = ', checkedValues);
  };

  return (
    <SearchPop field={fieldItem.fieldName}>
      <Checkbox.Group className={styles.checkedPop} options={options} onChange={handleChange} />
    </SearchPop>
  );
};

export default CheckedPop;
