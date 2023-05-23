import React, { FC, useState } from "react";
import { Button, Input, Space, Tooltip } from "antd";
import { LeftOutlined, ReloadOutlined, SaveOutlined } from "@ant-design/icons";
import styles from "@/views/ad-reporting/header/ad-report-header.module.scss";
import { useAppDispatch, useAppSelector } from "@/store";
import { setAdName } from "@/store/modules/app.module";

interface IProps {
  adName: string;
  onSave: () => void;
  onBackTo: () => void;
  onChange: () => void;
  onRefresh: () => void;
}

const AdReportHeader: FC<IProps> = ({ adName = '', onSave, onBackTo, onChange, onRefresh }) => {
  const dataUpdateTime = useAppSelector(state => state.app.detail?.dataUpdateTime ?? '-');
  const dispatch = useAppDispatch();
  const [refreshLoading, setRefreshLoading] = useState(false);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setAdName(e.target.value));
    onChange();
  };
  return (
    <div className={styles.adHeaderBox}>
      <Space.Compact className={styles.adHeaderLeft}>
        <Button type="text" icon={<LeftOutlined/>} onClick={() => onBackTo()}>所有报告</Button>
        <Tooltip placement="bottom" arrow={false} title={adName} color={'grey'}>
          <Input
            style={{ marginLeft: '20px' }}
            value={adName}
            showCount={false}
            maxLength={100}
            onChange={(e) => onInputChange(e)}/>
        </Tooltip>
        <Button type={'primary'} icon={<SaveOutlined/>} onClick={() => onSave()}>保存</Button>
      </Space.Compact>

      <div className={styles.adHeaderRight}>
        <Button
          style={{ fontWeight: "bold", marginRight: 10 }}
          size="small"
          type="primary"
          icon={<ReloadOutlined />}
          loading={refreshLoading}
          disabled={refreshLoading}
          onClick={() => {
            setRefreshLoading(true);
            onRefresh();
            setTimeout(() => {
              setRefreshLoading(false);
            }, 800);
          }}
        >刷新</Button>
        <div className={styles.adHeaderUpdateTime}>更新时间: {dataUpdateTime}</div>
      </div>

    </div>
  );
};

export default AdReportHeader;
