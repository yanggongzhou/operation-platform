import React, { FC, useState } from 'react';
import { Checkbox } from 'antd';
import { CheckboxValueType } from "antd/es/checkbox/Group";
import { EGroupField, ISearchFieldItem } from "@/views/ad-reporting/index.interfaces";
import SearchPop from "@/components/search-pop";
import styles from '@/views/ad-reporting/pop/pop.module.scss';
import { useAppSelector } from "@/store";

interface IProps {
  fieldItem: ISearchFieldItem
  onDelete: () => void;
}

const CheckedPop: FC<IProps> = ({ fieldItem, onDelete }) => {
  const [value, setValue] = useState<CheckboxValueType[]>();
  const options = useAppSelector(state => {
    let arr: any[] = [];
    switch (fieldItem.fieldName) {
      case EGroupField.AppId:
        arr = state.app.baseInfoList.app;
        break;
      case EGroupField.Device:
        arr = state.app.baseInfoList.device;
        break;
      case EGroupField.Media:
        arr = state.app.baseInfoList.media;
        break;
      case EGroupField.AdType:
        arr = state.app.baseInfoList.type;
        break;
      case EGroupField.Language:
        arr = state.app.baseInfoList.language;
        break;
      case EGroupField.Pline:
        arr = state.app.baseInfoList.pline;
        break;
      default:
        arr = [];
        break;
    }
    return arr.map(val => ({ label: val.text, value: val.field }));
  });

  console.log(options);

  const handleChange = (checkedValues: CheckboxValueType[]) => {
    setValue(checkedValues);
    console.log('checked = ', checkedValues);
  };

  return (
    <SearchPop field={fieldItem.fieldName} onDelete={onDelete}>
      <Checkbox.Group className={styles.checkedPop} options={options} onChange={handleChange} />
    </SearchPop>
  );
};

export default CheckedPop;
