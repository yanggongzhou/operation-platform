import React, { FC, useEffect, useState } from "react";
import { Button, Select, Space, Tooltip } from "antd";
import styles from "@/views/ad-reporting/search/ad-report-search.module.scss";
import SearchMenu from "@/components/search-menu";
import AdReportSearchTime from "@/views/ad-reporting/search/ad-report-search-time";
import {
  ConsumeOptions,
  EConsume,
  EGroupField,
  EOperator,
  IFieldItem,
  ISearchFieldItem,
  NGroupField
} from "@/views/ad-reporting/index.interfaces";
import CheckedPop from "@/views/ad-reporting/pop/checked-pop";
import CountryPop from "@/views/ad-reporting/pop/country-pop";
import OptimizerPop from "@/views/ad-reporting/pop/optimizer-pop";
import AccountPop from "@/views/ad-reporting/pop/account-pop";
import { useAppDispatch, useAppSelector } from "@/store";
import { setCostType, setSearchFieldList } from "@/store/modules/app.module";

interface IProps {
  onSearch: () => void;
}

const AdReportSearch: FC<IProps> = ({ onSearch }) => {
  const [fieldList, setFieldList] = useState<IFieldItem[]>([]);
  const costType = useAppSelector(state => state.app.detail.structure.costType);
  const searchFieldList = useAppSelector(state => state.app.detail.structure.searchFieldList || []);
  const [isShowMenu, setIsShowMenu] = useState(true);
  useEffect(() => {
    setFieldList(searchFieldList);
  }, [searchFieldList]);

  const dispatch = useAppDispatch();
  // 确认：优化师 | 账户
  const onOptimizerConfirm = (params: ISearchFieldItem) => {
    const data = searchFieldList.filter(val => val.fieldName !== params.fieldName);
    dispatch(setSearchFieldList([...data, params]));
    setIsShowMenu(true);
    onSearch();
  };
  //
  // 消耗过滤
  const consumeSearch = (value: EConsume) => {
    dispatch(setCostType(value));
    onSearch();
    setIsShowMenu(true);
  };
  // 日期范围搜索
  const onTimeSearch = (startDate: string, endDate: string) => {
    console.log('日期范围搜索 From: ', startDate, ', to: ', endDate);
    onSearch();
    setIsShowMenu(true);
  };
  // 筛选类型
  const onChoose = (field: EGroupField) => {
    console.log(`筛选类型: ${field}`, NGroupField[field]);
    setIsShowMenu(false);
    let isExist = false; // 是否存在
    const list = fieldList.map((val) => {
      if(val.fieldName === field) {
        isExist = true;
        return { ...val, defaultOpen: true };
      }
      return val;
    });
    if (isExist) {
      setFieldList(list);
    } else  {
      setFieldList(prevState => ([...prevState, {
        fieldName: field,
        fieldValue: [],
        operator: EOperator.In,
        defaultOpen: true,
      }]));
    }
  };
  // 删除筛选条件
  const onDelete = (index: number) => {
    const list = fieldList.filter((_, ind) => ind !== index);
    setFieldList(list);
    setIsShowMenu(true);
    onSearch();
  };
  // 取消
  const onCancel = (fieldItem: ISearchFieldItem, index: number) => {
    if (fieldList[index].fieldValue.length === 0) {
      const list = fieldList.filter((_, ind) => ind !== index);
      setFieldList(list);
    }
    setIsShowMenu(true);
  };
  // 取消组合条件
  const onCancelAll = () => {
    dispatch(setSearchFieldList([]));
    onSearch();
    setIsShowMenu(true);
  };

  return (
    <div className={styles.adSearchWrap}>
      <div className={styles.adSearchTop}>
        <div className={styles.topDetail}>
          {fieldList.map((fieldItem, index) => {
            const popProps = {
              fieldItem,
              onConfirm: onOptimizerConfirm,
              onDelete: () => onDelete(index),
              onCancel: () => onCancel(fieldItem, index),
            };
            if (fieldItem.fieldName === EGroupField.Optimizer) {
              return <OptimizerPop key={fieldItem.fieldName + index} { ...popProps }/>;
            }
            if (fieldItem.fieldName === EGroupField.AccountId
              || fieldItem.fieldName === EGroupField.AdId
              || fieldItem.fieldName === EGroupField.BookId
              || fieldItem.fieldName === EGroupField.Url
              || fieldItem.fieldName === EGroupField.Pixel
            ) {
              return (<AccountPop key={fieldItem.fieldName + index} { ...popProps }/>);
            }
            if (fieldItem.fieldName === EGroupField.Country) {
              return <CountryPop key={fieldItem.fieldName + index} { ...popProps }/>;
            }
            return <CheckedPop key={fieldItem.fieldName + index} { ...popProps }/>;
          })}
          {isShowMenu ? <SearchMenu onChoose={onChoose}/> : null}
        </div>
        <Tooltip color={'grey'} placement="top" title={'清除组合条件'} arrow={false}>
          <Button type="link" size="small" onClick={onCancelAll}>清除</Button>
        </Tooltip>
      </div>
      <div className={styles.adSearchBottom}>
        <Space.Compact>
          <div className={styles.adSearchBottomLabel}>消耗过滤: </div>
          <Select<EConsume>
            value={costType}
            style={{ width: 150 }}
            onChange={consumeSearch}
            options={ConsumeOptions}
          />
        </Space.Compact>
        <Space.Compact className={styles.timeRange}>
          <div className={styles.adSearchBottomLabel}>时间范围: </div>
          <AdReportSearchTime onSearch={onTimeSearch}/>
        </Space.Compact>
      </div>
    </div>
  );
};

export default AdReportSearch;
