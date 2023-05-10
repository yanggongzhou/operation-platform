import React, { FC, useState } from "react";
import { Button, Input, Space, Tooltip } from "antd";
import { LeftOutlined, SaveOutlined } from "@ant-design/icons";
import styles from "@/views/ad-reporting/header/ad-report-header.module.scss";
import { useAppDispatch, useAppSelector } from "@/store";
import { setAdName } from "@/store/modules/app.module";

interface IProps {
  onSave: () => void;
  onBackTo: () => void;
}

const AdReportHeader: FC<IProps> = ({ onSave, onBackTo }) => {
  const adName = useAppSelector(state => state.app.detail.name ?? '');
  const updateTime = useAppSelector(state => state.app.detail?.updateTime ?? '-');
  const dispatch = useAppDispatch();
  const [isFocus, setIsFocus] = useState(false);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setAdName(e.target.value));
  };

  return (
    <div className={styles.adHeaderBox}>
      <Space.Compact className={styles.adHeaderLeft}>
        <Button type="text" icon={<LeftOutlined/>} onClick={() => onBackTo()}>所有报告</Button>
        <Tooltip placement="bottom" title={adName}>
          <Input
            style={{ marginLeft: '20px' }}
            // bordered={false}
            // className={isFocus ? styles.adHeaderInputFocus : styles.adHeaderInput}
            value={adName}
            showCount={false}
            maxLength={100}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(e) => onInputChange(e)}/>
        </Tooltip>
        <Button type={'primary'} icon={<SaveOutlined/>} onClick={() => onSave()}>保存</Button>
      </Space.Compact>

      <div className={styles.adHeaderRight}>
        <div className={styles.adHeaderUpdateTime}>更新时间: {updateTime}</div>
      </div>

    </div>
  );
};

export default AdReportHeader;
