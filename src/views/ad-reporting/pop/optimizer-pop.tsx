import React, { FC, useEffect, useState } from 'react';
import type { RadioChangeEvent } from 'antd';
import { Select, Radio, Space } from 'antd';
import { debounce } from 'throttle-debounce';
import { DefaultOptionType } from "rc-select/lib/Select";
import { EOperator, IFieldItem, ISearchFieldItem } from "@/views/ad-reporting/index.interfaces";
import SearchPop from "@/components/search-pop";
import { netOptimizerList } from "@/service/ads-reporting";
import styles from '@/views/ad-reporting/pop/pop.module.scss';

interface IProps {
  fieldItem: IFieldItem;
  onDelete: () => void;
  onConfirm: (params: ISearchFieldItem) => void;
  onCancel: () => void;
}

const OptimizerPop: FC<IProps> = ({ fieldItem, onDelete, onConfirm, onCancel }) => {
  const [data, setData] = useState<DefaultOptionType[]>([]);
  const [value, setValue] = useState<string[]>(fieldItem.fieldValue);
  const [operatorValue, setOperatorValue] = useState(fieldItem.operator || EOperator.In); // 包含不包含

  const handleFocus = () => {
    if (!data || data.length === 0) {
      getOptimizerList();
    }
  };
  // 获取优化师数据
  const getOptimizerList = debounce( 300, async () => {
    const list = await netOptimizerList();
    const _list = (list || []).map(val => ({ label: val, value: val }));
    setData(_list);
  }, { atBegin: true });

  const onOperatorChange = (e: RadioChangeEvent) => {
    setOperatorValue(e.target.value);
  };

  const handleChange = (newValue: string[]) => {
    setValue(newValue);
  };

  const handleConfirm = () => {
    onConfirm({
      fieldName: fieldItem.fieldName,
      fieldValue: value,
      operator: operatorValue,
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
      <Space className={styles.adPopBox}>
        <Radio.Group onChange={onOperatorChange} value={operatorValue}>
          <Radio value={EOperator.In}>包含</Radio>
          <Radio value={EOperator.Nin}>不包含</Radio>
        </Radio.Group>
        <Select
          className={styles.popSelect}
          mode="multiple"
          showSearch
          value={value}
          defaultActiveFirstOption={false}
          showArrow={false}
          filterOption={true}
          onChange={handleChange}
          onFocus={handleFocus}
          notFoundContent={null}
          options={data}
        />
      </Space>
    </SearchPop>
  );
};

export default OptimizerPop;
