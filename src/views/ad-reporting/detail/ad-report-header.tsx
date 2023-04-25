import React, { FC, useState } from "react";
import { Button } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import styles from "@/views/ad-report/index.module.scss";

interface IProps {

}

const AdReportHeader: FC<IProps> = () => {

  const [rows, setRows] = useState([
    { key: '1', name: '胡彦斌', age: 32, address: '西湖区湖底公园1号' },
    { key: '2', name: '胡彦祖', age: 42, address: '西湖区湖底公园1号' },
  ]);

  return (
    <div className={styles.adReportHeaderBox}>
      <Button type="primary" shape="round" icon={<LeftOutlined />} size={'small'}>
        Download
      </Button>
    </div>
  );
};

export default AdReportHeader;
