import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { message } from "antd";
import { debounce } from "throttle-debounce";
import styles from "@/views/ad-reporting/index.module.scss";
import { TableDrag } from "@/components/table-drag";
import AdReportHeader from "@/views/ad-reporting/header/ad-report-header";
import AdReportSearch from "@/views/ad-reporting/search/ad-report-search";
import { useAppDispatch, useAppSelector } from "@/store";
import { baseInfoAsync, searchListAsync, setFilterFieldList, setIndexColumnList } from "@/store/modules/app.module";
import AdReportRight from "@/views/ad-reporting/right/ad-report-right";
import { EFilterType, IRecordsItem } from "@/views/ad-reporting/index.interfaces";
import { netDetailListAd, netListAd, netUpdateAd } from "@/service/ads-reporting";

const AdReporting = () => {
  const [messageApi, contextMsgHolder] = message.useMessage();
  const navigate = useNavigate();
  const isNeedSave = useRef(true);
  const isPaint = useRef(true);
  const dispatch = useAppDispatch();
  const routeParams = useParams();
  const id = useMemo(() => routeParams?.id as string, [routeParams]);
  const [page, setPage] = useState(0);
  const bodyData = useAppSelector(state => {
    const data = JSON.parse(JSON.stringify(state.app.detail));
    Reflect.deleteProperty(data, 'updateTime');
    Reflect.deleteProperty(data, 'createTime');
    return data;
  });

  useEffect(() => {
    dispatch(baseInfoAsync());
    dispatch(searchListAsync(routeParams.id as string));
    windowBack();
    return () => {
      if (isPaint.current) { // 初次渲染回执行销毁，故做拦截处理
        isPaint.current = false;
        return;
      }
      window.onpopstate = null;
    };
  }, []);

  useEffect(() => {
    getList(routeParams.id as string, page);
  }, [page]);
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
  const [rows, setRows] = useState<IRecordsItem[]>([]);
  const [sumData, setSumData] = useState<IRecordsItem>({} as IRecordsItem);
  const [totalRows, setTotalRows] = useState(0);
  // 报表详情(列表数据, 修改配置情况下)
  const getUnSaveList = debounce(300,async (page: number) => {
    const data = await netListAd(bodyData, page);
  });

  // 报表详情(列表数据, 未修改配置情况下)
  const getList = debounce(500, async (id: string, page: number) => {
    const { offset, records = [], total = 0, sumData, pages } = await netDetailListAd(id, page);
    setRows(prevState => [ ...prevState, ...records ]);
    setSumData(sumData);
    setTotalRows(total);
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
          <TableDrag dataSource={rows} sumData={sumData} total={totalRows}/>
        </div>
        <div className={styles.adReportRight}>
          <AdReportRight onChange={onChange}/>
        </div>
      </div>
    </div>
  );
};

export default AdReporting;
