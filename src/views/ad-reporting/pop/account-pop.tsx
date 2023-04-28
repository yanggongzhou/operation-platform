import React, { FC, useState } from 'react';
import type { RadioChangeEvent, SelectProps } from 'antd';
import { Select, Radio, Space } from 'antd';
import { debounce } from 'throttle-debounce';
import { EOperator, ISearchFieldItem } from "@/views/ad-reporting/index.interfaces";
import SearchPop from "@/components/search-pop";
import { netAccountList } from "@/service/ads-reporting";
import styles from '@/views/ad-reporting/pop/pop.module.scss';

interface IProps {
  fieldItem: ISearchFieldItem;
  onDelete: () => void;
}

const AccountPop: FC<IProps> = ({ fieldItem, onDelete }) => {
  const [data, setData] = useState<SelectProps['options']>([]);
  const [value, setValue] = useState<string>();

  const [operatorValue, setOperatorValue] = useState(EOperator.In); // 包含不包含

  const onOperatorChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setOperatorValue(e.target.value);
  };

  const handleFocus = () => {

  };
  // 获取广告账户数据
  const getAccountList = async (search: string) => {
    const accountList = await netAccountList(search);
    console.log('accountList:', accountList);
  };

  const handleSearch = debounce(500, (newValue: string) => {
    getAccountList(newValue);
    console.log('121221');
  });

  const handleChange = (newValue: string) => {
    setValue(newValue);
    console.log('handleChange');
  };

  return (
    <SearchPop field={fieldItem.fieldName} onDelete={onDelete}>
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
          filterOption={false}
          onFocus={handleFocus}
          onSearch={handleSearch}
          onChange={handleChange}
          notFoundContent={null}
          options={(data || []).map((d) => ({
            value: d.value,
            label: d.text,
          }))}
        />
      </Space>
    </SearchPop>
  );
};

export default AccountPop;
