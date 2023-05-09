import React, { FC, useState } from 'react';
import type { RadioChangeEvent, SelectProps } from 'antd';
import { Select, Radio, Space } from 'antd';
import { debounce } from 'throttle-debounce';
import { EGroupField, EOperator, ISearchFieldItem } from "@/views/ad-reporting/index.interfaces";
import SearchPop from "@/components/search-pop";
import { netAccountList, netBookList, netCampaignList, netLandPageConf, netPixelList } from "@/service/ads-reporting";
import styles from '@/views/ad-reporting/pop/pop.module.scss';

interface IProps {
  fieldItem: ISearchFieldItem;
  onDelete: () => void;
  onCancel: () => void;
  onConfirm: (params: ISearchFieldItem) => void;
}

const AccountPop: FC<IProps> = ({ fieldItem, onDelete, onCancel, onConfirm }) => {
  const [data, setData] = useState<SelectProps['options']>([]);
  const [value, setValue] = useState<string[]>(fieldItem.fieldValue);
  const [operatorValue, setOperatorValue] = useState(EOperator.In); // 包含不包含

  const onOperatorChange = (e: RadioChangeEvent) => {
    setOperatorValue(e.target.value);
  };

  const handleFocus = () => {
    if (!data || data.length === 0) {
      getAccountList();
    }
  };
  // 获取广告账户数据
  const getAccountList = debounce( 300, async (search?: string) => {
    let list: SelectProps['options'] = [];

    switch (fieldItem.fieldName) {
      case EGroupField.AccountId:
        const accountData = await netAccountList(search);
        list = (accountData.rows || []).map(val => ({ label: val.adAccountName, value: val.adAccountId }));
        break;
      case EGroupField.AdId:
        const adData = await netCampaignList(search);
        list = (adData.rows || []).map(val => ({ label: val.campaignName, value: val.campaignId })) || [];
        break;
      case EGroupField.BookId:
        const bookData = await netBookList(search);
        list = (bookData.rows || []).map(val => ({ label: val.bookName, value: val.bookId }));
        break;
      case EGroupField.Url:
        const urlData = await netLandPageConf(search);
        list = (urlData.rows || []).map(val => ({ label: val.url, value: val.url }));
        break;
      case EGroupField.Pixel:
        const pixelData = await netPixelList(search);
        list = (pixelData.rows || []).map(val => ({ label: val.number, value: val.number }));
        break;
    }
    setData(list);
  }, { atBegin: false });

  const handleSearch = debounce(500, (search: string) => {
    getAccountList(search);
  });

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

  return (
    <SearchPop disabled={value.length === 0} fieldItem={fieldItem} onDelete={onDelete} onConfirm={handleConfirm} onCancel={onCancel}>
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
          options={data}
        />
      </Space>
    </SearchPop>
  );
};

export default AccountPop;
