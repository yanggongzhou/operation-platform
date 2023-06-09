import React, { FC, useEffect, useRef, useState } from 'react';
import { Table, Tag, Tooltip, Typography } from 'antd';
import { AnyObject } from "antd/es/table/Table";
import { FixedType } from "rc-table/lib/interface";
import { throttle } from "throttle-debounce";
import { ColumnsType } from "antd/es/table/interface";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import styles from '@/views/ad-reporting/table-drag/index.module.scss';
import { useAppSelector } from "@/store";
import { TableDragHeader } from "@/views/ad-reporting/table-drag/table-drag-header";
import { EFilterType, IRecordsItem } from "@/views/ad-reporting/index.interfaces";

const { Text } = Typography;

interface IProps {
  pageNo: number;
  dataSource: IRecordsItem[];
  sumData: AnyObject;
  total: number;
  onMore: () => void;
  onDrag: (oldIndex: number, newIndex: number, filterType: EFilterType) => void;
  onTargetSort: (key: string) => void;
}

export interface IColItem {
  title: string;
  dataIndex: string;
  key: string;
  width: number;
  fixed?: FixedType;
  ellipsis?: boolean;
  rowScope?: string;
  render: (text: string, record: IRecordsItem, index: number) => React.ReactNode;
}

export const TableDrag: FC<IProps> = ({ dataSource = [], sumData, total, onMore, onDrag, pageNo, onTargetSort }) => {
  const loading = useAppSelector(state => state.app.loading);
  const [isFixed, setIsFixed] = useState(true); // 是否粘性布局
  const tableRef = useRef<HTMLTableElement | null>(null);
  const showDetailedCondition = useAppSelector(state => state.app.detail.structure.showDetailedCondition);
  const tbodyOnscroll = throttle(300, (e: Event) => {
    const { scrollHeight = 0, scrollTop = 0, offsetHeight = 0 } = (e.target as HTMLDivElement) || {};
    if (scrollTop > scrollHeight - offsetHeight - 50) {
      console.log('==========距离底部距离低于 50===========>');
      onMore();
    }
  }, { noLeading: false });
  // 切换透视返回顶部
  useEffect(() => {
    if (pageNo === 0) {
      if (tableRef.current) {
        const tbodyDom = (tableRef.current as HTMLTableElement)?.querySelector(".ant-table-body");
        tbodyDom && tbodyDom?.scrollTo({ top: 0 });
      }
    }
  }, [pageNo]);


  const [scrollY, setScrollY] = useState(300);

  useEffect(() => {
    if (tableRef.current) {
      const tbodyDom = (tableRef.current as HTMLTableElement)?.querySelector(".ant-table-body");
      // scroll 在手机端不起作用 addEventListener('touchmove', scrollHandle, false);
      tbodyDom && tbodyDom?.addEventListener('scroll', tbodyOnscroll);
    }
    if (tableRef.current) {
      setTimeout(() => {
        // @ts-ignore
        setScrollY(tableRef.current?.parentNode?.offsetHeight - 120 || 500);
      }, 200);
    }
    return () => {
      const tbodyDom = (tableRef.current as HTMLTableElement)?.querySelector(".ant-table-body");
      tbodyDom && tbodyDom?.removeEventListener('scroll', tbodyOnscroll);
    };
  }, []);

  const groupColumns = useAppSelector((state) => {
    const filterFieldList = state.app.detail.structure.filterFieldList;
    const groupData = state.app.searchList.group;
    if (filterFieldList.length === 0 || groupData.length === 0) {
      return [] as IColItem[];
    }
    // 列 fieldInd 横 index
    return filterFieldList.map((field, fieldInd) => {
      const groupItem = groupData.find(item => item.field === field) || { text: '-', filed: '-' };
      return {
        title: groupItem.text,
        dataIndex: field,
        key: field,
        width: (field === 'bookId' || field === 'accountId' || field === 'campaignId') ? 240 : 120,
        fixed: isFixed ? 'left' : undefined,
        onCell: (record: IRecordsItem, index: number) => {
          if (showDetailedCondition) {
            const groupByFieldsArr = record.groupByFields.split(',');
            const fieldIndex = groupByFieldsArr.indexOf(field);
            return {
              rowSpan: record[`a_row_${fieldIndex}`] ?? 1,
            };
          }
        },
        render: (text: string, record: IRecordsItem) => {
          const groupByFieldsArr = record.groupByFields.split(',');
          const fieldIndex = groupByFieldsArr.indexOf(field);
          const backgroundColor = `rgba(231, 231, 231, ${1 - Math.floor(groupByFieldsArr.length / (filterFieldList.length + 1) * 100) / 100})`;
          const borderRight = (fieldInd === filterFieldList.length - 1) ? '2px solid #ddd' : "none";

          if (record[field] === '全部') {
            return <div
              style={{ backgroundColor, fontWeight: 500, borderRight }}
              className={styles.tbodyThItem} title={text}>{text}</div>;
          }
          const content = field === 'campaignId' ? `${record.campaignName} (${text})` :
            (field === 'accountId' ? `${record.accountName} (${text})` :
              (field === 'bookId' ? `${record.bookName} (${text})` : text));

          const TagCom = () => (<>
            { field === 'campaignId' && record.campaignName ?
              <>
                <CopyToClipboard text={record.campaignName} onCopy={() => {}}>
                  <Tag color="#a1c2bc" className={styles.tdTag} bordered={false} title='复制'>{record.campaignName}</Tag>
                </CopyToClipboard>
                <br/>
              </> : null}
            { field === 'accountId' && record.accountName ?
              <>
                <CopyToClipboard text={record.accountName} onCopy={() => {}}>
                  <Tag color="#a1c2bc" className={styles.tdTag} bordered={false} title='复制'>{record.accountName}</Tag>
                </CopyToClipboard>
                <br/>
              </>
              : null}
            { field === 'bookId' && record.bookName ?
              <>
                <CopyToClipboard text={record.bookName} onCopy={() => {}}>
                  <Tag color="#a1c2bc" className={styles.tdTag} bordered={false} title='复制'>{record.bookName}</Tag>
                </CopyToClipboard>
                <br/>
              </> : null}
            {text ?
              <CopyToClipboard text={text} onCopy={() => {}}>
                <Tag className={styles.tdTagNormal} bordered={false} title='复制'>{text}</Tag>
              </CopyToClipboard>
              : <span style={{ fontSize: 12 }}>-</span>}
          </>);
          // 最后一项
          if ((record[`a_row_${fieldIndex}`] ?? 1) === 1) {
            return <Tooltip title={content} color={'#1ab394'}>
              <div className={(fieldInd === filterFieldList.length - 1) ? styles.tbodyTdItemLast : styles.tbodyTdItemLast2}>
                <TagCom/>
              </div>
            </Tooltip>;
          }
          return <Tooltip title={content} color={'#1ab394'}>
            <div
              // style={{ backgroundColor }}
              className={styles.tbodyTdItem}>
              <TagCom/>
            </div>
          </Tooltip>;
        },
      };
    }) as IColItem[];
  });

  useEffect(() => {
    if (tableRef.current) {
      if (tableRef.current?.clientWidth) {
        const width = groupColumns.reduce(( prev, next) => {
          return prev + next.width;
        }, 0);
        if (tableRef.current?.clientWidth/1.5 < width) {
          if (isFixed) {
            setIsFixed(false);
          }
        } else {
          if (!isFixed) {
            setIsFixed(true);
          }
        }
      }
    }
  }, [groupColumns.length]);


  const targetColumns = useAppSelector(state => {
    const indexColumnList = state.app.detail.structure.indexColumnList;
    const targetData = state.app.searchList.target;
    return indexColumnList.map(val => {
      const targetItem = targetData.find(item => item.field === val) || { text: '-', filed: '-' };
      return {
        title: targetItem.text,
        dataIndex: val,
        key: val,
        width: 100,
        render: (text: string | number, record) => {
          if (record.isAll) {
            const groupByFieldsArr = record.groupByFields.split(',');
            const filterFieldList = state.app.detail.structure.filterFieldList;
            return <div
              style={{
                backgroundColor: `rgba(231, 231, 231, ${1 - Math.floor(groupByFieldsArr.length / (filterFieldList.length + 1) * 100) / 100})`,
                fontWeight: 500
              }}
              className={styles.tbodyTdTarget}>{!text && text !== 0 ? '-' : text}</div>;
          }
          return <div className={styles.tbodyTdTarget}>{!text && text !== 0 ? '-' : text}</div>;
        }
      };
    }) as IColItem[];
  });

  const targetSum = useAppSelector(state => {
    const indexColumnList = state.app.detail.structure.indexColumnList;
    const targetData = state.app.searchList.target;
    return indexColumnList.map(val => {
      const targetItem = targetData.find(item => item.field === val) || { text: '-', filed: '-' };
      return { key: val, label: targetItem.text, sum: sumData?.[val] || '-' };
    });
  });

  // const changeTargetSort = (key: string) => {
  //   console.log('生序 & 降序', key);
  //   changeTargetSort();
  // };

  return (
    <Table
      className={styles.tableBox}
      ref={tableRef}
      components={{
        header: {
          row: () => (
            <tr>
              {/*<th style={{ position: "sticky", left: 0, textAlign: "center", zIndex: 100 }}>#</th>*/}
              <TableDragHeader
                getContainer={() => {
                  return document.querySelector('.ant-table-thead') as HTMLElement;
                }}
                isGroup={true}
                isSort={!isFixed}
                columns={groupColumns}
                onSortEnd={({ oldIndex, newIndex }) => onDrag(oldIndex, newIndex, EFilterType.Group)}/>
              <TableDragHeader
                changeSort={onTargetSort}
                getContainer={() => {
                  return document.querySelector('.ant-table-thead') as HTMLElement;
                }}
                isSort={true}
                columns={targetColumns}
                onSortEnd={({ oldIndex, newIndex }) => onDrag(oldIndex, newIndex, EFilterType.Target)}/>
            </tr>
          )
        }
      }}
      size='small'
      rowKey={'uuId'}
      scroll={{ x: 'max-content', y: scrollY }}
      loading={loading}
      pagination={false}
      bordered
      columns={[
        // { key: "index", title: '#', width: 40, fixed: "left", render: (_, __, index) => <div className={styles.antTableRowIndex}>{index + 1}</div> },
        ...groupColumns,
        ...targetColumns
      ] as ColumnsType<IRecordsItem>}
      dataSource={dataSource}
      summary={() => (
        <Table.Summary fixed>
          {(groupColumns.length > 0 || targetSum.length > 0) ?
            <Table.Summary.Row>
              {groupColumns.length > 0 ? <Table.Summary.Cell className={styles.summaryTotal} index={0} colSpan={groupColumns.length}>
                <Text strong><span style={{ color: "#A1C2BC" }}>{dataSource.length}</span> / {total}</Text>
                <br/>
                <Text type={'secondary'}>已加载 / 总行数</Text>
              </Table.Summary.Cell> : null}
              {targetSum.map(tar => {
                return <Table.Summary.Cell key={tar.key} index={groupColumns.length}>
                  <div style={{ textAlign: "center" }}>
                    <Text strong>{tar.sum}</Text>
                    <br/>
                    <Text type={'secondary'}>{tar.label}</Text>
                  </div>
                  {/*'secondary' | 'success' | 'warning' | 'danger';*/}
                </Table.Summary.Cell>;
              })}
            </Table.Summary.Row>
            : null
          }

        </Table.Summary>
      )}
    />
  );
};
