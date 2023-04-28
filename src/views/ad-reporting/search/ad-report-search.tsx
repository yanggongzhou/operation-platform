import React, { FC, useState } from "react";
import { Select } from "antd";
import styles from "@/views/ad-reporting/search/ad-report-search.module.scss";
import SearchMenu from "@/components/search-menu";
import AdReportSearchTime from "@/views/ad-reporting/search/ad-report-search-time";
import {
  ConsumeOptions,
  EConsume,
  EGroupField,
  EOperator,
  ISearchFieldItem,
  NGroupField
} from "@/views/ad-reporting/index.interfaces";
import AdPop from "@/views/ad-reporting/pop/ad-pop";
import CheckedPop from "@/views/ad-reporting/pop/checked-pop";
import CountryPop from "@/views/ad-reporting/pop/country-pop";
import OptimizerPop from "@/views/ad-reporting/pop/optimizer-pop";
import AccountPop from "@/views/ad-reporting/pop/account-pop";

interface IProps {
  onSearch: () => void;
}

const AdReportSearch: FC<IProps> = ({ onSearch }) => {
  const [fieldList, setFieldList] = useState<ISearchFieldItem[]>([]);
  // 消耗过滤
  const consumeSearch = (value: string) => {
    console.log(`消耗过滤: ${value}`);
    onSearch();
  };

  // 日期范围搜索
  const onTimeSearch = (startDate: string, endDate: string) => {
    console.log('日期范围搜索 From: ', startDate, ', to: ', endDate);
    onSearch();
  };
  // 筛选类型
  const onChoose = (field: EGroupField) => {
    console.log(`筛选类型: ${field}`, NGroupField[field]);
    setFieldList(prevState => ([...prevState, {
      fieldName: field,
      fieldValue: [],
      operator: EOperator.In
    }]));
  };
  // 删除筛选条件
  const onDelete = (index: number) => {
    const list = fieldList.filter((_, ind) => ind !== index);
    setFieldList(list);
    onSearch();
  };

  return (
    <div className={styles.adSearchWrap}>
      <div className={styles.adSearchTop}>
        {fieldList.map((fieldItem, index) => {
          switch (fieldItem.fieldName) {
            case EGroupField.AdId:
              return <AdPop key={fieldItem.fieldName + index} fieldItem={fieldItem} onDelete={() => onDelete(index)}/>;
            case EGroupField.AccountId:
              return <AccountPop key={fieldItem.fieldName + index} fieldItem={fieldItem} onDelete={() => onDelete(index)}/>;
            case EGroupField.Optimizer:
              return <OptimizerPop key={fieldItem.fieldName + index} fieldItem={fieldItem} onDelete={() => onDelete(index)}/>;
            case EGroupField.Country:
              return <CountryPop key={fieldItem.fieldName + index} fieldItem={fieldItem} onDelete={() => onDelete(index)}/>;
            default:
              return <CheckedPop key={fieldItem.fieldName + index} fieldItem={fieldItem} onDelete={() => onDelete(index)}/>;
          }
        })}
        <SearchMenu onChoose={onChoose}/>
      </div>
      <div className={styles.adSearchBottom}>
        <div>
          <span>消耗过滤: </span>
          <Select
            defaultValue={EConsume.All}
            style={{ width: 150 }}
            onChange={consumeSearch}
            options={ConsumeOptions}
          />
        </div>
        <div className={styles.timeRange}>
          <span>时间范围: </span>
          <AdReportSearchTime onSearch={onTimeSearch}/>
        </div>
      </div>
    </div>
  );
};

export default AdReportSearch;
