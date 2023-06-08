import React, { FC, useEffect, useState } from "react";
import { CopyOutlined, DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, Input, message, Modal, Space, Table, Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";
import { IAdsListItem } from "@/views/ads-reporting/index.interfaces";
import styles from '@/views/ads-reporting/index.module.scss';

interface IProps {
  loading: boolean;
  pageData: { page: number; pageSize: number; }
  dataSource: IAdsListItem[];
  total: number;
  onCopyAd: (detail: IAdsListItem, name: string) => void;
  onCheck: (detail: IAdsListItem) => void;
  getList: (pageInfo: { page: number; pageSize: number; }) => void;
  onDeleteAd: (id: string, name: string) => void;
}

const AdsReportingTable: FC<IProps> = ({ loading, dataSource, total, onCopyAd, getList, onDeleteAd, onCheck, pageData }) => {
  const [modal, contextHolder] = Modal.useModal();
  const [messageApi, contextMsgHolder] = message.useMessage();
  const [pageInfo, setPageInfo] = useState({
    ...pageData
  });
  const [adName, setAdName] = useState('');
  const [copyVisible, setCopyVisible] = useState(false);
  const [detail, setDetail] = useState<IAdsListItem>({} as IAdsListItem);

  useEffect(() => {
    getList(pageInfo);
  }, [pageInfo]);

  const columns = [
    { title: '报告名称', align: 'center', dataIndex: 'name', key: 'name', width: 200,
      ellipsis: {
        showTitle: false,
      },
      render: (name) => (
        <Tooltip arrow={false} color={'grey'} placement="topLeft" title={name}>
          {name}
        </Tooltip>
      ), },
    { title: '编辑时间', align: 'center', dataIndex: 'updateTime', key: 'updateTime', width: 160 },
    { title: '创建时间', align: 'center', dataIndex: 'createTime', key: 'createTime', width: 160 },
    { title: '操作', width: 160, align: 'center', key: 'operation', render: (value: any, record: IAdsListItem) => (
      <Space size="small">
        <Button
          size={'small'}
          icon={<CopyOutlined />}
          type={'text'}
          onClick={(e) => handleCopy(record, e)}
        >复制</Button>
        <Button
          size={'small'}
          icon={<DeleteOutlined />}
          onClick={(e) => handleDelete(record, e)}
          type={'text'}
          danger>删除</Button>
      </Space>)
    },
  ] as ColumnsType<IAdsListItem>;

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAdName(e.target.value);
  };

  // 复制
  const handleCopy = (record: IAdsListItem, e: any) => {
    e.stopPropagation();
    setAdName(record.name + '副本');
    setCopyVisible(true);
    setDetail(Object.assign({}, record));
  };

  // 删除
  const handleDelete = (record: IAdsListItem, e: any) => {
    e.stopPropagation();
    modal.confirm({
      bodyStyle: { padding: 20 },
      title: '删除报表',
      icon: <ExclamationCircleOutlined />,
      content: `确认删除「${record.name}」？此操作无法撤销`,
      okText: '删除',
      cancelText: '取消',
      okButtonProps: {
        type: "primary",
        danger: true,
      },
      onOk: () => onDeleteAd(record.id, record.name)
    });
    console.log('删除');
  };

  const onCloseModal = () => {
    setAdName('');
    setCopyVisible(false);
  };

  return (
    <>
      <Table<IAdsListItem>
        loading={loading}
        className={styles.adsReportingTable}
        // scroll={{ y: 600 }}
        bordered
        rowKey={'id'}
        size={'small'}
        onRow={(record) => {
          return {
            onClick: (event) => {
              onCheck(record);
            },
          };
        }}
        pagination={{
          position: ['bottomRight'],
          showSizeChanger: true,
          defaultCurrent: 1,
          defaultPageSize: 30,
          pageSize: pageInfo.pageSize,
          current: pageInfo.page + 1,
          total,
          showTotal:(total, range) => total ? `显示记录: ${range[0]} ~ ${range[1]},  总共 ${total} 条记录` : '',
          pageSizeOptions: [30, 50, 100],
          onChange: (page, pageSize) => {
            if (pageSize === pageInfo.pageSize) {
              setPageInfo({ page: page - 1, pageSize });
            }
          },
          onShowSizeChange: (current, size) => {
            setPageInfo({ page: 0, pageSize: size });
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
        onCancel={onCloseModal}
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
                  onCopyAd(detail, adName);
                  onCloseModal();
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
        <Input value={adName} showCount maxLength={100} onChange={(e) => onInputChange(e)} />
      </Modal>
    </>
  );
};

export default AdsReportingTable;
