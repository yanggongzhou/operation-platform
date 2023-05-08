import React, { FC, useEffect, useMemo, useState } from 'react';
import { Table, Typography } from 'antd';
import { AnyObject } from "antd/es/table/Table";
import { FixedType } from "rc-table/lib/interface";
import styles from '@/components/table-drag/index.module.scss';
import { useAppSelector } from "@/store";
import { TableDragHeader } from "@/components/table-drag/table-drag-header";
const { Text } = Typography;

interface IProps {
  dataSource: AnyObject[];
  sumData: AnyObject;
  total: number;
}

export interface IColItem {
  title: string;
  dataIndex: string;
  key: string;
  width: number;
  fixed?: FixedType;
  ellipsis?: boolean;
}

export const TableDrag: FC<IProps> = ({ dataSource, sumData, total }) => {

  const groupColumns = useAppSelector(state => {
    const filterFieldList = state.app.detail.structure.filterFieldList;
    const groupData = state.app.searchList.group;
    return filterFieldList.map(val => {
      const groupItem = groupData.find(item => item.field === val) || { text: '-', filed: '-' };
      return { title: groupItem.text, dataIndex: val, key: val, width: 120, fixed: 'left' };
    });
  }) as IColItem[];

  const targetColumns = useAppSelector(state => {
    const indexColumnList = state.app.detail.structure.indexColumnList;
    const targetData = state.app.searchList.target;
    return indexColumnList.map(val => {
      const targetItem = targetData.find(item => item.field === val) || { text: '-', filed: '-' };
      return { title: targetItem.text, dataIndex: val, key: val, width: 120 };
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

  return (
    <>
      <TableDragHeader
        groupColumns={groupColumns}
        targetColumns={targetColumns}/>
      <Table
        size='small'
        rowKey={'uuId'}
        scroll={{ x: 'max-content' }}
        pagination={false}
        bordered
        columns={columns}
        dataSource={dataSource}
        summary={() => (
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
              </Table.Summary.Cell>
            })}

          </Table.Summary.Row>
        )}
      />
    </>
  );
};
