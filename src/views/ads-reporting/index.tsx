import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { debounce } from "throttle-debounce";
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
  const [loading, setLoading] = useState(true);
  // 创建报表
  const onCreate = async (name: string) => {
    const data = await netAddAd(name);
    if (data) navigate(`/adReporting/${data}`);
  };
  // 复制报表
  const onCopyAd = async (detail: IAdsListItem, name: string) => {
    const data = await netCopyAd(detail.id, name);
    if (data) navigate(`/adReporting/${data}`);
  };
  // 删除报表
  const onDeleteAd = async (id: string, name: string) => {
    await netDeleteAd([id]);
    messageApi.info(`已删除「${name}」报告。`);
    await getList(pageInfo);
  };
  // 查看报表
  const onCheck = (detail: IAdsListItem) => {
    navigate(`/adReporting/${detail.id}`);
  };
  // 获取报表列表
  const getList = debounce(300, async (pageData: { page: number; pageSize: number; }) => {
    setLoading(true);
    setPageInfo({ ...pageData });
    try {
      const { total = 0, rows = [] } = await netAdsList(pageData.page, pageData.pageSize);
      setRows(rows);
      setTotal(total);
    } catch (e) {} finally {
      setLoading(false);
    }
  }, { atBegin: true });

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
            loading={loading}
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
