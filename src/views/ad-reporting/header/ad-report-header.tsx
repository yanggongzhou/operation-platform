import React, { FC, useEffect, useState } from "react";
import { Button, Input, Space, Tooltip } from "antd";
import { LeftOutlined, SaveOutlined } from "@ant-design/icons";
import styles from "@/views/ad-reporting/header/ad-report-header.module.scss";
import { useAppSelector } from "@/store";

interface IProps {
  onSave: (name: string) => void;
  onBackTo: () => void;
}

const AdReportHeader: FC<IProps> = ({ onSave, onBackTo }) => {
  const title = useAppSelector(state => state.app.detail.name ?? '');
  const updateTime = useAppSelector(state => state.app.detail.updateTime ?? '-');

  const [isFocus, setIsFocus] = useState(false);
  const [adName, setAdName] = useState(title);
  useEffect(() => {
    setAdName(title);
  }, [title]);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAdName(e.target.value);
  };

  return (
    <div className={styles.adHeaderBox}>
      <Space.Compact className={styles.adHeaderLeft}>
        <Button icon={<LeftOutlined/>} onClick={() => onBackTo()}>所有报告</Button>
        <Tooltip placement="bottom" title={adName}>
          <Input
            bordered={false}
            className={isFocus ? styles.adHeaderInputFocus : styles.adHeaderInput}
            value={adName}
            showCount={false}
            maxLength={100}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(e) => onInputChange(e)}/>
        </Tooltip>
        <Button type={'primary'} icon={<SaveOutlined/>} onClick={() => onSave(adName)}>保存</Button>
      </Space.Compact>

      <div className={styles.adHeaderRight}>
        <div className={styles.adHeaderUpdateTime}>更新时间: {updateTime}</div>
      </div>

    </div>
  );
};

export default AdReportHeader;
