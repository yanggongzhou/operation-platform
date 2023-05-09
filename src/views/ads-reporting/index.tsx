import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import styles from "@/views/ads-reporting/index.module.scss";
import { IAdsListItem } from "@/views/ads-reporting/index.interfaces";
import AdsReportingTable from "@/views/ads-reporting/components/ads-reporting-table";
import AdsReportingHeader from "@/views/ads-reporting/components/ads-reporting-header";
import { netAddAd, netAdsList, netCopyAd, netDeleteAd } from "@/service/ads-reporting";

const AdsReporting = () => {
  const navigate = useNavigate();
  const [messageApi, contextMsgHolder] = message.useMessage();
  const [total, setTotal] = useState(0);
  const [pageInfo, setPageInfo] = useState({ page: 0, pageSize: 30 });
  const [rows, setRows] = useState<IAdsListItem[]>([]);
  // 创建报表
  const onCreate = async (name: string) => {
    await netAddAd(name);
    console.log('创建报表', name);
    await getList(pageInfo);
  };
  // 复制报表
  const onCopyAd = async (detail: IAdsListItem, name: string) => {
    await netCopyAd(detail.id, name);
    messageApi.success(`复制成功: ${name}`);
    await getList(pageInfo);
  };
  // 删除报表
  const onDeleteAd = async (id: string) => {
    await netDeleteAd([id]);
    console.log('删除报表：', id);
    await getList(pageInfo);
  };
  // 查看报表
  const onCheck = (detail: IAdsListItem) => {
    console.log('查看报表：', detail);
    navigate(`/adReporting/${detail.id}`);
  };
  // 获取报表列表
  const getList = async (pageData: { page: number; pageSize: number; }) => {
    setPageInfo({ ...pageData });
    const { total = 0, rows = [] } = await netAdsList(pageData.page, pageData.pageSize);
    console.log('获取报表列表:', pageData.page, pageData.pageSize, total, rows);
    setRows(rows);
    setTotal(total);
  };

  return (
    <div className={styles.adsReportingWrap}>
      {contextMsgHolder}
      <h3 className={styles.adsTitle}>广告报告</h3>
      <div className={styles.adsMain}>
        <div className={styles.adsHeader}>
          <AdsReportingHeader onCreate={onCreate}/>
        </div>
        <div className={styles.adsBox}>
          <AdsReportingTable
            pageData={pageInfo}
            dataSource={rows}
            total={total}
            onCopyAd={onCopyAd}
            getList={getList}
            onDeleteAd={onDeleteAd}
            onCheck={onCheck}
          />
        </div>
      </div>
    </div>
  );
};

export default AdsReporting;
