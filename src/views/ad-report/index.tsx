import React, { useState } from "react";
import styles from "@/views/ad-report/index.module.scss";
import { TableDrag } from "@/components/table-drag";

const AdReport = () => {
  return (
    <div className={styles.adReportWrap}>
      <div className={styles.adReportBox}>
        <TableDrag />
      </div>
    </div>
  );
};

export default AdReport;
