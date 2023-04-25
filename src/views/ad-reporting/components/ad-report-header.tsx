import React, { FC, useState } from "react";
import { Button, Input, Tooltip } from "antd";
import { LeftOutlined, SaveOutlined } from "@ant-design/icons";
import styles from "@/views/ad-reporting/components/ad-report-header.module.scss";

interface IProps {
  title: string;
  onSave: (name: string) => void;
  onBackTo: () => void;
}

const AdReportHeader: FC<IProps> = ({ title = '', onSave, onBackTo }) => {
  const [isFocus, setIsFocus] = useState(false);
  const [adName, setAdName] = useState(title);
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAdName(e.target.value);
  };

  return (
    <div className={styles.adHeaderBox}>
      <div className={styles.adHeaderLeft}>
        <Button icon={<LeftOutlined/>} onClick={() => onBackTo()}>所有报告</Button>
        <Tooltip placement="bottom" title={adName}>
          <Input
            className={isFocus ? styles.adHeaderInputFocus : styles.adHeaderInput}
            defaultValue={title}
            showCount={false}
            maxLength={100}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(e) => onInputChange(e)}/>
        </Tooltip>
        <Button type={'primary'} icon={<SaveOutlined/>} onClick={() => onSave(adName)}>保存</Button>
      </div>

      <div className={styles.adHeaderRight}>
        <div className={styles.adHeaderUpdateTime}>更新时间: 2023-04-25 12:00:00</div>

      </div>

    </div>
  );
};

export default AdReportHeader;
