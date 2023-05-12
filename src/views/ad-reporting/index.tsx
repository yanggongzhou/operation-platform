import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { message } from "antd";
import { debounce } from "throttle-debounce";
import styles from "@/views/ad-reporting/index.module.scss";
import { TableDrag } from "@/views/ad-reporting/table-drag";
import AdReportHeader from "@/views/ad-reporting/header/ad-report-header";
import AdReportSearch from "@/views/ad-reporting/search/ad-report-search";
import { store, useAppDispatch, useAppSelector } from "@/store";
import {
  baseInfoAsync,
  searchListAsync,
  setFilterFieldList,
  setIndexColumnList,
  setTableLoading
} from "@/store/modules/app.module";
import AdReportRight from "@/views/ad-reporting/right/ad-report-right";
import { EFilterType, IRecordsItem } from "@/views/ad-reporting/index.interfaces";
import { netDetailListAd, netListAd, netUpdateAd } from "@/service/ads-reporting";
import { INetDetailAd } from "@/service/index.interfaces";

const AdReporting = () => {
  const [messageApi, contextMsgHolder] = message.useMessage();
  const navigate = useNavigate();
  const isNeedSave = useRef(false); // 是否需要保存
  const isPaint = useRef(true);
  const dispatch = useAppDispatch();
  const routeParams = useParams();
  const id = useMemo(() => routeParams?.id as string, [routeParams]);
  const [rows, setRows] = useState<IRecordsItem[]>([]);
  const [sumData, setSumData] = useState<IRecordsItem>({} as IRecordsItem);
  const [pageNo, setPageNo] = useState(0);
  const [pageInfo, setPageInfo] = useState({ page: 0, total: 0, pages: 1 });
  const showDetailedCondition = useAppSelector(state => state.app.detail.structure.showDetailedCondition);
  const bodyData = useAppSelector(state => {
    const data = JSON.parse(JSON.stringify(state.app.detail)) as INetDetailAd;
    Reflect.deleteProperty(data, 'updateTime');
    Reflect.deleteProperty(data, 'createTime');
    return data;
  });

  useEffect(() => {
    dispatch(baseInfoAsync());
    dispatch(searchListAsync(routeParams.id as string));
    windowBack();
    getList(0);
    return () => {
      if (isPaint.current) { // 初次渲染回执行销毁，故做拦截处理
        isPaint.current = false;
        return;
      }
      window.onpopstate = null;
    };
  }, []);

  // 保存挽留
  const windowBack = () => {
    window.onpopstate = function () {
      if (isNeedSave.current) {
        messageApi.warning('提示保存');
        window.history.pushState('forward', '', '');
        window.history.forward();
      } else {
        window.onpopstate = null;
        window.history.go(-2);
        // navigate('/adsReporting', { replace: true });
      }
    };
    window.history.pushState('forward', '', '');
    window.history.forward();
  };

  // 报表详情(列表数据, 修改配置情况下)
  const getUnSaveList = debounce(500,async (page: number) => {
    isNeedSave.current = true;
    dispatch(setTableLoading(true));
    const { offset, records = [], total = 0, sumData, pages } = await netListAd(bodyData, page);
    setRows(records);
    setSumData(sumData);
    setPageInfo(prevState => ({ ...prevState, total, pages }));
    dispatch(setTableLoading(false));
  });

  const filterFieldList = useAppSelector(state => state.app.detail.structure.filterFieldList);

  // 报表详情(列表数据, 未修改配置情况下)
  const getList = debounce(300, async (page: number = 0) => {
    dispatch(setTableLoading(true));
    const { records = [], total = 0, sumData, pages } = await netDetailListAd(id, page);

    // 数据处理
    const fieldNames = new Map();
    filterFieldList.reduce((accumulator, currentValue, currentIndex, array) => {
      const sum = accumulator ? accumulator + ',' + currentValue : currentValue;
      fieldNames.set(sum, 0);
      return sum;
    }, '');
    console.log(fieldNames);
    let tagIndex = 0;
    const _rows = [...rows, ...records];
    _rows.forEach((val, ind) => {
      console.log('=================>', val.groupByFields, val.appName, val.RowSpan);
      if (val.groupByFields === filterFieldList[0]) {
        _rows[tagIndex].RowSpan = fieldNames.get(val.groupByFields);
        fieldNames.set(val.groupByFields, 1);
        tagIndex = ind;
      }
      if (fieldNames.has(val.groupByFields)) {
        fieldNames.set(val.groupByFields, fieldNames.get(val.groupByFields) + 1);
      }
    });
    console.log(_rows);
    setRows(prevState => [...prevState, ...records]);
    setSumData(sumData);
    setPageInfo(prevState => ({ ...prevState, total, pages }));
    dispatch(setTableLoading(false));
  }, { atBegin: false });

  // 保存报表
  const onSave = async () => {
    console.log('保存报表', bodyData);
    await netUpdateAd(bodyData);
    isNeedSave.current = false;
    messageApi.success('已保存');
    getList();
  };
  // 搜索
  const onSearch = () => {
    getUnSaveList(0);
  };

  const getMoreList = () => {
    setPageNo(prevState => ++prevState);
  };

  useEffect(() => {
    if (pageNo > 0) {
      if (pageNo >= pageInfo.pages) {
        return messageApi.info('已加载全部数据');
      }
      console.log("pageNo=================>:", pageNo);
      getList(pageNo);
    }
  }, [pageNo]);


  // 返回
  const onBackTo = () => {
    if (isNeedSave.current) {
      messageApi.warning('提示保存');
    } else {
      navigate('/adsReporting', { replace: true });
    }
  };
  // 指标｜细分条件
  const onChange = (checkedValues: string[], filterType: EFilterType) => {
    isNeedSave.current = true;
    if (filterType === EFilterType.Group) {
      console.log('checked = ', checkedValues, filterType);
      dispatch(setFilterFieldList(checkedValues));
      if(showDetailedCondition) {
        getUnSaveList(0);
      }
    } else {
      console.log('checked = ', checkedValues, filterType);
      dispatch(setIndexColumnList(checkedValues));
    }
  };

  // 拖拽 指标｜细分条件
  const onTableDrag = (oldIndex: number, newIndex: number, filterType: EFilterType) => {
    isNeedSave.current = true;
    if (filterType === EFilterType.Group) {
      const list = [ ...store.getState().app.detail.structure.filterFieldList ];
      list.splice(newIndex, 0, list.splice(oldIndex, 1)[0]);
      dispatch(setFilterFieldList(list));
      if(showDetailedCondition) {
        getUnSaveList(0);
      }
    } else {
      const list = [ ...store.getState().app.detail.structure.indexColumnList ];
      list.splice(newIndex, 0, list.splice(oldIndex, 1)[0]);
      dispatch(setIndexColumnList(list));
    }
  };

  return (
    <div className={styles.adReportWrap}>
      {contextMsgHolder}
      <AdReportHeader onSave={onSave} onBackTo={onBackTo}/>
      <AdReportSearch onSearch={onSearch}/>
      <div className={styles.adReportMain}>
        <div className={styles.adReportBox}>
          <TableDrag
            dataSource={rows}
            sumData={sumData}
            total={pageInfo.total}
            onMore={() => getMoreList()}
            onDrag={onTableDrag}
          />
        </div>
        <div className={styles.adReportRight}>
          <AdReportRight onChange={onChange}/>
        </div>
      </div>
    </div>
  );
};

export default AdReporting;
