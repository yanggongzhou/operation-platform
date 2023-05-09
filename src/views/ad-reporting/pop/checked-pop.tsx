import React, { FC, useState } from 'react';
import { Checkbox } from 'antd';
import { CheckboxValueType } from "antd/es/checkbox/Group";
import { EGroupField, EOperator, ISearchFieldItem } from "@/views/ad-reporting/index.interfaces";
import SearchPop from "@/components/search-pop";
import styles from '@/views/ad-reporting/pop/pop.module.scss';
import { useAppSelector } from "@/store";

interface IProps {
  fieldItem: ISearchFieldItem
  onDelete: () => void;
  onCancel: () => void;
  onConfirm: (params: ISearchFieldItem) => void;
}

const CheckedPop: FC<IProps> = ({ fieldItem, onDelete, onCancel, onConfirm }) => {

  const [value, setValue] = useState<string[]>(fieldItem.fieldValue);

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

  const handleChange = (checkedValues: CheckboxValueType[]) => {
    setValue(checkedValues as string[]);
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
    <SearchPop
      disabled={value.length === 0}
      fieldItem={fieldItem}
      onDelete={onDelete}
      onConfirm={handleConfirm}
      onCancel={handleCancel}>
      <Checkbox.Group
        value={value}
        className={styles.checkedPop}
        options={options}
        onChange={handleChange} />
    </SearchPop>
  );
};

export default CheckedPop;
