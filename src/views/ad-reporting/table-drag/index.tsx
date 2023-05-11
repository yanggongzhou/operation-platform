import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import { Table, Typography } from 'antd';
import { AnyObject } from "antd/es/table/Table";
import { FixedType } from "rc-table/lib/interface";
import { throttle } from "throttle-debounce";
import styles from '@/views/ad-reporting/table-drag/index.module.scss';
import { useAppSelector } from "@/store";
import { SortableList, TableDragHeader } from "@/views/ad-reporting/table-drag/table-drag-header";
import { EFilterType } from "@/views/ad-reporting/index.interfaces";

const { Text } = Typography;

interface IProps {
  dataSource: AnyObject[];
  sumData: AnyObject;
  total: number;
  onMore: () => void;
  onDrag: (oldIndex: number, newIndex: number, filterType: EFilterType) => void;
  onOrderSort: (dataIndex: string) => void;
}

export interface IColItem {
  title: string;
  dataIndex: string;
  key: string;
  width: number;
  fixed?: FixedType;
  ellipsis?: boolean;
}

export const TableDrag: FC<IProps> = ({ dataSource, sumData, total, onMore, onDrag, onOrderSort }) => {
  const loading = useAppSelector(state => state.app.loading);
  const tableRef = useRef<HTMLTableElement | null>(null);
  const tbodyOnscroll = throttle(300, (e: Event) => {
    const { scrollHeight = 0, scrollTop = 0, offsetHeight = 0 } = (e.target as HTMLDivElement) || {};
    if (scrollTop > scrollHeight - offsetHeight - 30) {
      console.log('==========距离底部距离低于 30===========>');
      onMore();
    }
  });

  const [scrollY, setScrollY] = useState(300);

  useEffect(() => {
    if (tableRef.current) {
      const tbodyDom = (tableRef.current as HTMLTableElement)?.querySelector(".ant-table-body");
      // scroll 在手机端不起作用 addEventListener('touchmove', scrollHandle, false);
      tbodyDom && tbodyDom?.addEventListener('scroll', tbodyOnscroll);
    }
    if (tableRef.current) {
      // @ts-ignore
      setScrollY(tableRef.current?.parentNode?.offsetHeight - 200 || 300);
    }
    return () => {
      const tbodyDom = (tableRef.current as HTMLTableElement)?.querySelector(".ant-table-body");
      tbodyDom && tbodyDom?.removeEventListener('scroll', tbodyOnscroll);
    };
  }, []);
  const groupColumns = useAppSelector(state => {
    const filterFieldList = state.app.detail.structure.filterFieldList;
    const groupData = state.app.searchList.group;
    return filterFieldList.map(val => {
      const groupItem = groupData.find(item => item.field === val) || { text: '-', filed: '-' };
      return { title: groupItem.text, dataIndex: val, key: val, width: 160, fixed: 'left' };
    });
  }) as IColItem[];

  const targetColumns = useAppSelector(state => {
    const indexColumnList = state.app.detail.structure.indexColumnList;
    const targetData = state.app.searchList.target;
    return indexColumnList.map(val => {
      const targetItem = targetData.find(item => item.field === val) || { text: '-', filed: '-' };
      return { title: targetItem.text, dataIndex: val, key: val, width: 160 };
    });
  });

  const targetSum = useAppSelector(state => {
    const indexColumnList = state.app.detail.structure.indexColumnList;
    const targetData = state.app.searchList.target;
    return indexColumnList.map(val => {
      const targetItem = targetData.find(item => item.field === val) || { text: '-', filed: '-' };
      return { key: val, label: targetItem.text, sum: sumData?.[val] ?? '-' };
    });
  });

  const columns = useMemo(() => {
    return [...groupColumns, ...targetColumns];
  }, [groupColumns, targetColumns]);


  const MenuBox = () => {
    return <tr className={styles.moreMenu}>
      { columns.map((val, ind) => {
        return <th key={val.title} className={styles.moreItem} onClick={() => onOrderSort(val.dataIndex)}>
          {val.title}
        </th>;
      })}
    </tr>;
  };

  return (
    <Table
      className={styles.tableBox}
      ref={tableRef}
      components={{
        header: {
          row: () => (
            <>
              <MenuBox/>
              <tr>
                <TableDragHeader
                  onOrderSort={() => onOrderSort('test')}
                  getContainer={() => {
                    return document.querySelector('.ant-table-thead') as HTMLElement;
                  }}
                  columns={groupColumns}
                  onSortEnd={({ oldIndex, newIndex }) => onDrag(oldIndex, newIndex, EFilterType.Group)}/>
                <TableDragHeader
                  onOrderSort={() => onOrderSort('test')}
                  getContainer={() => {
                    return document.querySelector('.ant-table-thead') as HTMLElement;
                  }}
                  isSort={true}
                  columns={targetColumns}
                  onSortEnd={({ oldIndex, newIndex }) => onDrag(oldIndex, newIndex, EFilterType.Target)}/>
              </tr>
            </>
          )
        }
      }}
      size='small'
      rowKey={'uuId'}
      scroll={{ x: 'max-content', y: scrollY }}
      loading={loading}
      pagination={false}
      bordered
      columns={columns}
      dataSource={dataSource}
      summary={() => (
        <Table.Summary fixed>
          <Table.Summary.Row>
            <Table.Summary.Cell index={0} colSpan={groupColumns.length}>
              <Text strong>{total}</Text>
              <br/>
              <Text type={'secondary'}>总行数</Text>
            </Table.Summary.Cell>
            {targetSum.map(tar => {
              return <Table.Summary.Cell key={tar.key} index={groupColumns.length}>
                <div>
                  <Text strong>{tar.sum}</Text>
                  <br/>
                  <Text type={'secondary'}>{tar.label}</Text>
                </div>
                {/*'secondary' | 'success' | 'warning' | 'danger';*/}
              </Table.Summary.Cell>;
            })}
          </Table.Summary.Row>
        </Table.Summary>
      )}
    />
  );
};
