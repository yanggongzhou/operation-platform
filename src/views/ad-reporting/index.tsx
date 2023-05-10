import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { message } from "antd";
import { debounce } from "throttle-debounce";
import styles from "@/views/ad-reporting/index.module.scss";
import { TableDrag } from "@/components/table-drag";
import AdReportHeader from "@/views/ad-reporting/header/ad-report-header";
import AdReportSearch from "@/views/ad-reporting/search/ad-report-search";
import { useAppDispatch, useAppSelector } from "@/store";
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
  const isNeedSave = useRef(true);
  const isPaint = useRef(true);
  const dispatch = useAppDispatch();
  const routeParams = useParams();
  const id = useMemo(() => routeParams?.id as string, [routeParams]);
  const [rows, setRows] = useState<IRecordsItem[]>([]);
  const [sumData, setSumData] = useState<IRecordsItem>({} as IRecordsItem);
  const [totalRows, setTotalRows] = useState(0);
  const [pageNo, setPageNo] = useState(0);
  const [pageInfo, setPageInfo] = useState({ page: 0, total: 0, pages: 1 });

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
    getList(routeParams.id as string, 0);
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
    dispatch(setTableLoading(true));
    const { offset, records = [], total = 0, sumData, pages } = await netListAd(bodyData, page);
    setRows(records);
    setSumData(sumData);
    setPageInfo(prevState => ({ ...prevState, total, pages }));
    dispatch(setTableLoading(false));
  });

  // 报表详情(列表数据, 未修改配置情况下)
  const getList = debounce(300, async (id: string, page: number) => {
    dispatch(setTableLoading(true));
    const { records = [], total = 0, sumData, pages } = await netDetailListAd(id, page);
    setRows(prevState => [...prevState, ...records]);
    setSumData(sumData);
    setPageInfo(prevState => ({ ...prevState, total, pages }));
    dispatch(setTableLoading(false));
  }, { atBegin: true });

  // 保存报表
  const onSave = async () => {
    console.log('保存报表', bodyData);
    await netUpdateAd(bodyData);
    isNeedSave.current = false;
    messageApi.success('已保存');
    getList(id, 0);
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
      getList(id, pageNo);
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
    if (filterType === EFilterType.Group) {
      console.log('checked = ', checkedValues, filterType);
      dispatch(setFilterFieldList(checkedValues));
    } else {
      console.log('checked = ', checkedValues, filterType);
      dispatch(setIndexColumnList(checkedValues));
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
