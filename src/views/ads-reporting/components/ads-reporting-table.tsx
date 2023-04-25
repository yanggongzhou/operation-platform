import React, { FC, useEffect, useState } from "react";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, Input, message, Modal, Space, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { IAdsDataType } from "@/views/ads-reporting/index.interfaces";
import styles from '@/views/ads-reporting/index.module.scss';

interface IProps {
  pageData: { page: number; pageSize: number; }
  dataSource: IAdsDataType[];
  total: number;
  onCopyAd: (detail: IAdsDataType, name: string) => void;
  onCheck: (detail: IAdsDataType) => void;
  getList: (pageInfo: { page: number; pageSize: number; }) => void;
  onDeleteAd: (id: string) => void;
}

const AdsReportingTable: FC<IProps> = ({ dataSource, total, onCopyAd, getList, onDeleteAd, onCheck, pageData }) => {
  const [modal, contextHolder] = Modal.useModal();
  const [messageApi, contextMsgHolder] = message.useMessage();
  const [pageInfo, setPageInfo] = useState({
    ...pageData
  });
  const [adName, setAdName] = useState('');
  const [copyVisible, setCopyVisible] = useState(false);
  const [detail, setDetail] = useState<IAdsDataType>({} as IAdsDataType);

  useEffect(() => {
    getList(pageInfo);
  }, [pageInfo]);

  const columns = [
    { title: '报告名称', align: 'center', dataIndex: 'name', key: 'name' },
    { title: '编辑时间', align: 'center', dataIndex: 'updateTime', key: 'updateTime' },
    { title: '创建时间', align: 'center', dataIndex: 'createTime', key: 'createTime' },
    { title: '操作', width: 200, align: 'center', key: 'operation', render: (value: any, record: IAdsDataType) => (
      <Space size="small">
        <Button
          type={'primary'}
          onClick={(e) => handleCopy(record, e)}
        >复制</Button>
        <Button
          onClick={(e) => handleDelete(record, e)}
          type={'primary'}
          danger>删除</Button>
      </Space>)
    },
  ] as ColumnsType<IAdsDataType>;

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAdName(e.target.value);
  };

  // 复制
  const handleCopy = (record: IAdsDataType, e: any) => {
    e.stopPropagation();
    setAdName(record.name + '副本');
    setCopyVisible(true);
    setDetail(Object.assign({}, record));
  };

  // 删除
  const handleDelete = (record: IAdsDataType, e: any) => {
    e.stopPropagation();
    modal.confirm({
      title: '删除报表',
      icon: <ExclamationCircleOutlined />,
      content: `确认删除「${record.name}」？此操作无法撤销`,
      okText: '删除',
      cancelText: '取消',
      okButtonProps: {
        type: "primary",
        danger: true,
      },
      onOk: () => onDeleteAd(record.key)
    });
    console.log('删除');
  };

  return (
    <>
      <Table<IAdsDataType>
        bordered
        size={'small'}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              onCheck(record);
            },
          };
        }}
        pagination={{
          position: ['bottomCenter'],
          defaultCurrent: 1,
          defaultPageSize: 30,
          pageSize: pageInfo.pageSize,
          current: pageInfo.page,
          total,
          pageSizeOptions: [30, 50, 100],
          onChange: (page, pageSize) => {
            if (pageSize === pageInfo.pageSize) {
              setPageInfo({ page, pageSize });
            }
          },
          onShowSizeChange: (current, size) => {
            setPageInfo({ page: 1, pageSize: size });
          }
        }}
        columns={columns}
        dataSource={dataSource}/>
      {contextHolder}
      {contextMsgHolder}
      <Modal
        width={400}
        open={copyVisible}
        title="复制报告"
        onCancel={() => {
          setAdName('');
          setCopyVisible(false);
        }}
        footer={
          <div className={styles.copyModelBtnBox}>
            <Space>
              <Button
                onClick={() => {
                  setAdName('');
                  setCopyVisible(false);
                }}>取消</Button>
              <Button
                type={'primary'}
                disabled={!adName}
                onClick={() => {
                  if (!adName) {
                    messageApi.open({
                      type: 'error',
                      content: '请输入报表名称',
                    });
                    return;
                  }
                  onCopyAd(detail, adName)
                }}>复制</Button>
            </Space>
          </div>
        }
        okText="确认"
        cancelText="取消"
        okButtonProps={{
          type: "primary",
          disabled: !adName,
        }}
      >
        <h4>报告名称</h4>
        <Input defaultValue={adName} showCount maxLength={100} onChange={(e) => onInputChange(e)} />
      </Modal>
    </>
  );
};

export default AdsReportingTable;