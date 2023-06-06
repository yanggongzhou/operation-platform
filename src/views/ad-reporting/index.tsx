import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Modal, message, Space } from "antd";
import { debounce } from "throttle-debounce";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import styles from "@/views/ad-reporting/index.module.scss";
import { TableDrag } from "@/views/ad-reporting/table-drag";
import AdReportHeader from "@/views/ad-reporting/header/ad-report-header";
import AdReportSearch from "@/views/ad-reporting/search/ad-report-search";
import { store, useAppDispatch, useAppSelector } from "@/store";
import {
  baseInfoAsync,
  searchListAsync, setDetail,
  setFilterFieldList,
  setIndexColumnList, setOrder, setSort,
  setTableLoading
} from "@/store/modules/app.module";
import { EFilterType, IRecordsItem } from "@/views/ad-reporting/index.interfaces";
import { netDetailAd, netDetailListAd, netListAd, netUpdateAd } from "@/service/ads-reporting";
import { INetDetailAd } from "@/service/index.interfaces";
import AdReportRight from "@/views/ad-reporting/right/ad-report-right";

const AdReporting = () => {
  const [modal, contextHolder] = Modal.useModal();
  const [isPaintData, setIsPaintData] = useState(false); // 初次渲染数据
  const [messageApi, contextMsgHolder] = message.useMessage();
  const navigate = useNavigate();
  const isNeedSave = useRef(false); // 是否需要保存
  const isRequesting = useRef(false); // 是否在请求中
  const dispatch = useAppDispatch();
  const routeParams = useParams();
  const id = useMemo(() => routeParams?.id as string, [routeParams]);
  const [rows, setRows] = useState<IRecordsItem[]>([]);
  const [sumData, setSumData] = useState<IRecordsItem>({} as IRecordsItem);
  const [pageNo, setPageNo] = useState(0);
  const [pageInfo, setPageInfo] = useState({ total: 0, pages: 1 });
  const adName = useAppSelector(state => state.app.detail.name ?? '');
  const showDetailedCondition = useAppSelector(state => state.app.detail.structure.showDetailedCondition);
  const bodyData = useAppSelector(state => {
    const data = JSON.parse(JSON.stringify(state.app.detail)) as INetDetailAd;
    Reflect.deleteProperty(data, 'updateTime');
    Reflect.deleteProperty(data, 'createTime');
    Reflect.deleteProperty(data, 'dataUpdateTime');
    return data;
  });
  const isExpansion = useAppSelector(state => (state.app.isExpansion));
  const sortName = useAppSelector(state => state.app.detail.structure.sort);
  const isOrderUp = useAppSelector(state => state.app.detail.structure.order === "desc");


  useEffect(() => {
    initData();
  }, []);
  const initData = debounce(300, () => {
    dispatch(baseInfoAsync());
    dispatch(searchListAsync(routeParams.id as string));
  }, { atBegin: true });

  // 报表详情(列表数据, 修改配置情况下)
  const getUnSaveList = debounce(300, async (page: number) => {
    isNeedSave.current = true;
    if (page === 0) {
      setRows([]);
    }
    try {
      dispatch(setTableLoading(true));
      const { records = [], total = 0, sumData, pages = 1 } = await netListAd(bodyData, page);
      if (page === 0) {
        setRows(records);
      } else {
        setRows(prevState => [...prevState, ...records]);
      }
      if (page >= pages - 1) {
        messageApi.info('已加载全部数据');
      }
      setSumData(sumData);
      setPageInfo({ total, pages });
    } catch (e) {
    } finally {
      dispatch(setTableLoading(false));
      isRequesting.current = false;
    }
  }, { atBegin: false });
  const filterFieldList = useAppSelector(state => state.app.detail.structure.filterFieldList);
  const fieldNames = useMemo(() => {
    const _fieldNames: string[] = [];
    filterFieldList.reduce((accumulator, currentValue) => {
      const sum = accumulator ? accumulator + ',' + currentValue : currentValue;
      _fieldNames.push(sum);
      return sum;
    }, '');
    return _fieldNames;
  }, [filterFieldList]);
  const getLength = (groupByFields: string, ind: number): number => {
    const arrRow = rows.slice(ind, rows.length);
    for (let i = 1; i < arrRow.length; i++) {
      if (arrRow[i].groupByFields === groupByFields || arrRow[i].groupByFields.length <= groupByFields.length) {
        return i;
      }
    }
    return arrRow.length;
  };
  const dataSource = useMemo(() => {
    if (!showDetailedCondition) {
      return rows;
    }
    if (rows.length > 0 && fieldNames.length > 0) {
      return rows.map((item, ind) => {
        const val = { ...item };

        const index = fieldNames.indexOf(val.groupByFields);
        if (index === -1) return val;
        for (let i = 0; i < fieldNames.length; i++) {
          Reflect.set(val, `a_row_${i}`, i < index ? 0 : 1);
          // 设置 "全部"
          if (i > val.groupByFields.split(',').length - 1) {
            Reflect.set(val, filterFieldList[i], '全部');
            Reflect.set(val, 'isAll', true);
          }
        }
        // 获取高度
        if (index === fieldNames.length - 1) {
          Reflect.set(val, `a_row_${fieldNames.length - 1}`, 1);
        } else {
          const height = getLength(val.groupByFields, ind);
          Reflect.set(val, `a_row_${index}`, height);
        }
        return val;
      });
    }
    return rows;
  }, [rows, fieldNames, showDetailedCondition]);

  // 报表详情(列表数据, 未修改配置情况下)
  const getList = debounce(300, async (page: number = 0) => {
    dispatch(setTableLoading(true));
    if (page === 0) {
      setRows([]);
    }
    try {
      const { records = [], total = 0, sumData, pages } = await netDetailListAd(id, page);
      setIsPaintData(true);
      if (page === 0) {
        setRows(records);
      } else {
        setRows(prevState => [...prevState, ...records]);
      }
      if (page >= pages - 1) {
        messageApi.info('已加载全部数据');
      }
      setSumData(sumData);
      setPageInfo({ total, pages });
    } catch (e) {
    } finally {
      dispatch(setTableLoading(false));
      isRequesting.current = false;
    }
  }, { atBegin: false });

  // 保存报表
  const onSave = (isBack?: boolean) => {
    if (!isBack) {
      modal.confirm({
        bodyStyle: { padding: 20 },
        title: '保存报表',
        direction: 'ltr',
        icon: <ExclamationCircleOutlined/>,
        content: `确认保存「${adName}」？原数据将被覆盖，无法撤销`,
        okText: '确认',
        cancelText: '取消',
        onOk: () => handleSave()
      });
    } else { // 修改未保存
      const modala = modal.confirm({
        bodyStyle: { padding: 20 },
        title: '修改未保存报表',
        direction: 'ltr',
        icon: <ExclamationCircleOutlined/>,
        content: `要保存对「${adName}」的修改吗`,
        footer: <div style={{ display: "flex", justifyContent: "space-between", padding: '10px 0 0 35px' }}>
          <Button type="primary" onClick={() => navigate('/adsReporting', { replace: true })}>不保存</Button>
          <Space>
            <Button onClick={() => modala.destroy()}>取消</Button>
            <Button type="primary" onClick={() => handleSave(isBack)}>保存</Button>
          </Space>
        </div>,
      });
    }
  };
  const handleSave = async (isBack?: boolean) => {
    setIsPaintData(false);
    await netUpdateAd(bodyData);
    isNeedSave.current = false;
    messageApi.success('已保存');
    if (isBack) {
      navigate('/adsReporting', { replace: true });
    } else {
      const detail = await netDetailAd(store.getState().app.detail.id);
      dispatch(setDetail(detail));
      isRequesting.current = true;
      getList();
    }
  };
  // 刷新数据
  const onRefresh = () => {
    if (pageNo !== 0) {
      setPageNo(0);
    } else {
      getUnSaveList(0);
    }
  };
  // 搜索
  const onSearch = () => {
    isNeedSave.current = true;
    onRefresh();
  };
  // 更多数据
  const getMoreList = () => {
    if (pageNo >= pageInfo.pages || store.getState().app.loading || isRequesting.current) return;
    setPageNo(prevState => ++prevState);
  };

  useEffect(() => {
    if (pageNo >= 0) {
      if (pageNo >= pageInfo.pages) return;
      isRequesting.current = true;
      if (isNeedSave.current) {
        getUnSaveList(pageNo);
      } else {
        getList(pageNo);
      }
    }
  }, [pageNo]);

  // 返回
  const onBackTo = () => {
    if (isNeedSave.current) {
      onSave(true);
    } else {
      navigate('/adsReporting', { replace: true });
    }
  };
  // 指标｜细分条件
  const onRightChange = (checkedValues: string[], filterType: EFilterType) => {
    isNeedSave.current = true;
    if (filterType === EFilterType.Group) {
      dispatch(setFilterFieldList(checkedValues));
    } else {
      dispatch(setIndexColumnList(checkedValues));
    }
  };
  // 拖拽 指标｜细分条件
  const onTableDrag = (oldIndex: number, newIndex: number, filterType: EFilterType) => {
    isNeedSave.current = true;
    if (filterType === EFilterType.Group) {
      const list = [...store.getState().app.detail.structure.filterFieldList];
      list.splice(newIndex, 0, list.splice(oldIndex, 1)[0]);
      dispatch(setFilterFieldList(list));
    } else {
      const list = [...store.getState().app.detail.structure.indexColumnList];
      list.splice(newIndex, 0, list.splice(oldIndex, 1)[0]);
      dispatch(setIndexColumnList(list));
    }
  };
  // 指标排序
  const onTargetSort = (key: string) => {
    isNeedSave.current = true;
    if (sortName === key) {
      dispatch(setOrder());
    } else {
      dispatch(setSort(key));
    }
  };

  // 拖拽细分条件刷新数据
  useEffect(() => {
    if (filterFieldList.length > 0 && isNeedSave.current) {
      if (pageNo !== 0) {
        setPageNo(0);
      } else {
        dispatch(setTableLoading(true));
        getUnSaveList(0);
        isRequesting.current = true;
      }
    }
  }, [filterFieldList, isOrderUp, sortName]);

  return <div className={styles.adReportWrap}>
    {contextHolder}
    {contextMsgHolder}
    <AdReportHeader
      onChange={() => isNeedSave.current = true}
      adName={adName}
      onSave={onSave}
      onBackTo={onBackTo}/>
    <AdReportSearch isPaintData={isPaintData} onSearch={onSearch} onRefresh={onRefresh}/>
    <div className={isExpansion ? styles.adReportMainExpansion : styles.adReportMain}>
      <div className={styles.adReportBox}>
        <TableDrag
          dataSource={dataSource}
          sumData={sumData}
          pageNo={pageNo}
          total={pageInfo.total}
          onMore={() => getMoreList()}
          onDrag={onTableDrag}
          onTargetSort={onTargetSort}
        />
      </div>
      <AdReportRight onRightChange={onRightChange}/>
    </div>
  </div>;
};

export default AdReporting;
