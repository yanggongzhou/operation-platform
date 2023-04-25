import React, { useState } from "react";
import styles from "@/views/ad-reporting/index.module.scss";
import { TableDrag } from "@/components/table-drag";

const AdReporting = () => {

  const [rows, setRows] = useState([
    { key: '1', name: '胡彦斌', age: 32, address: '西湖区湖底公园1号' },
    { key: '2', name: '胡彦祖', age: 42, address: '西湖区湖底公园1号' },
  ]);

  return (
    <div className={styles.adReportWrap}>

      <div className={styles.adReportBox}>
        <TableDrag dataSource={rows}/>
      </div>
    </div>
  );
};

export default AdReporting;
