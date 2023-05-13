import React, { FC, useState } from 'react';
import { Space, Tag, } from 'antd';
import { EGroupField, EOperator, ISearchFieldItem } from "@/views/ad-reporting/index.interfaces";
import SearchPop from "@/components/search-pop";
import styles from '@/views/ad-reporting/pop/pop.module.scss';
import { useAppSelector } from "@/store";
const { CheckableTag } = Tag;

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

  // const handleChange = (checkedValues: CheckboxValueType[]) => {
  //   setValue(checkedValues as string[]);
  // };

  const tagChange = (item: string, checked: boolean) => {
    if (checked) {
      setValue(prevState => [...prevState, item]);
    } else {
      setValue(prevState => prevState.filter(val => val !== item));
    }
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
      {/*<Checkbox.Group*/}
      {/*  value={value}*/}
      {/*  className={styles.checkedPop}*/}
      {/*  options={options}*/}
      {/*  onChange={handleChange} />*/}
      <Space size={8} wrap>
        {options.map((tag) => (
          <CheckableTag
            style={{ fontSize: '14px', padding: '2px 7px' }}
            key={tag.value}
            checked={value.includes(tag.value)}
            onChange={(checked) => tagChange(tag.value, checked)}
          >
            {tag.label}
          </CheckableTag>
        ))}
      </Space>

    </SearchPop>
  );
};

export default CheckedPop;
