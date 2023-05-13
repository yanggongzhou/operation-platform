import React, { FC, useState } from "react";
import { FileAddOutlined } from "@ant-design/icons";
import { Button, Input, Modal } from "antd";

interface IProps {
  onCreate: (name: string) => void;
}

const AdsReportingHeader: FC<IProps> = ({ onCreate }) => {
  const [createVisible, setCreateVisible] = useState(false);
  const [adName, setAdName] = useState('');
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAdName(e.target.value);
  };
  const onClose = () => {
    setAdName('');
    setCreateVisible(false);
  };
  return (
    <>
      <Button type="primary" icon={<FileAddOutlined/>} onClick={() => setCreateVisible(true)}>创建报告</Button>
      <Modal
        destroyOnClose
        width={400}
        open={createVisible}
        title="创建报告"
        onCancel={onClose}
        okText="创建"
        cancelText="取消"
        onOk={() => {
          onCreate(adName);
          onClose();
        }}
      >
        <h4>报告名称</h4>
        <Input defaultValue={adName} showCount maxLength={100} onChange={(e) => onInputChange(e)}/>
      </Modal>
    </>
  );
};

export default AdsReportingHeader;
