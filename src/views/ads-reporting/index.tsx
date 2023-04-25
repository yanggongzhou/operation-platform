import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "@/views/ads-reporting/index.module.scss";
import { IAdsDataType } from "@/views/ads-reporting/index.interfaces";
import AdsReportingTable from "@/views/ads-reporting/components/ads-reporting-table";
import AdsReportingHeader from "@/views/ads-reporting/components/ads-reporting-header";

const AdsReporting = () => {
  const navigate = useNavigate();
  const [total, setTotal] = useState(1000);
  const [pageInfo, setPageInfo] = useState({ page: 1, pageSize: 30 });


  const [rows, setRows] = useState<IAdsDataType[]>([
    { key: '1', name: '胡彦斌', updateTime: '32', createTime: '西湖区湖底公园1号' },
    { key: '2', name: '胡彦祖', updateTime: '42', createTime: '西湖区湖底公园1号' },
    { key: '3', name: '胡彦祖', updateTime: '42', createTime: '西湖区湖底公园1号' },
  ]);
  // 创建报表
  const onCreate = (name: string) => {
    console.log('创建报表', name);
    getList(pageInfo);
  };
  // 复制报表
  const onCopyAd = (detail: IAdsDataType, name: string) => {
    console.log('复制报表：', name, detail);
    getList(pageInfo);
  };
  // 删除报表
  const onDeleteAd = (id: string) => {
    console.log('删除报表：', id);
    getList(pageInfo);
  };
  // 查看报表
  const onCheck = (detail: IAdsDataType) => {
    console.log('查看报表：', detail);
    navigate('/adReporting');
  };
  // 获取报表列表
  const getList = (pageData: { page: number; pageSize: number; }) => {
    console.log('获取报表列表：', pageData.page, pageData.pageSize);
    setPageInfo({ ...pageData })
    setTotal(1000);
    setRows(prevState => prevState);
  };

  return (
    <div className={styles.adsReportingWrap}>
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
