import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import styles from "@/views/ad-reporting/index.module.scss";
import { TableDrag } from "@/components/table-drag";
import AdReportHeader from "@/views/ad-reporting/header/ad-report-header";
import AdReportSearch from "@/views/ad-reporting/search/ad-report-search";

const AdReporting = () => {
  const [messageApi, contextMsgHolder] = message.useMessage();
  const navigate = useNavigate();
  const isNeedSave = useRef(true);
  const isPaint = useRef(true);
  useEffect(() => {
    windowBack();
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
        messageApi.warning('提示保存')
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

  const [rows, setRows] = useState([
    { key: '1', name: '胡彦斌', age: 32, address: '西湖区湖底公园1号' },
    { key: '2', name: '胡彦祖', age: 42, address: '西湖区湖底公园1号' },
  ]);

  // 保存报表
  const onSave = (name: string) => {
    console.log('保存报表:', name);
    isNeedSave.current = false;
    messageApi.success('已保存')
  };
  // 搜索
  const onSearch = () => {

  };
  // 返回
  const onBackTo = () => {
    if (isNeedSave.current) {
      messageApi.warning('提示保存')
    } else {
      navigate('/adsReporting', { replace: true });
    }
  };

  return (
    <div className={styles.adReportWrap}>
      {contextMsgHolder}
      <AdReportHeader title={'未命名广告'} onSave={onSave} onBackTo={onBackTo}/>
      <AdReportSearch onSearch={onSearch}/>
      <div className={styles.adReportBox}>
        <TableDrag dataSource={rows}/>
      </div>
    </div>
  );
};

export default AdReporting;
