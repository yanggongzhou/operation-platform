import React, { FC } from "react";
import { Select } from "antd";
import styles from "@/views/ad-reporting/search/ad-report-search.module.scss";
import SearchPop from "@/components/search-pop";
import SearchMenu from "@/components/search-menu";
import AdReportSearchTime from "@/views/ad-reporting/search/ad-report-search-time";
import { ConsumeOptions, EConsume } from "@/views/ad-reporting/index.interfaces";

interface IProps {
  onSearch: () => void;
}

const AdReportSearch: FC<IProps> = ({ onSearch }) => {

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

  return (
    <div className={styles.adSearchWrap}>
      <div className={styles.adSearchTop}>
        <SearchPop/>
        <SearchMenu/>
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
