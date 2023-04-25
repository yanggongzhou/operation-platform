import React, { FC, useState } from 'react';
import { Table } from 'antd';
import {
  arrayMove,
  SortableContainer,
  SortableContainerProps,
  SortableElement,
  SortableElementProps,
} from 'react-sortable-hoc';
import { AnyObject } from "antd/es/table/Table";
import { FixedType } from "rc-table/lib/interface";
import styles from '@/components/table-drag/index.module.scss';

interface IProps {
  dataSource: AnyObject[];
}

interface IColItem {
  title: string;
  dataIndex: string;
  key: string;
  width: number;
  fixed?: FixedType
}

// @ts-ignore
const SortableItem: React.ComponentClass<{ name: string } & SortableElementProps> = SortableElement(({ name }) => {
  return <tr className={styles.sortableItem}>{name}</tr>;
});

const SortableList: React.ComponentClass<{ cols: IColItem[] } & SortableContainerProps> =
  SortableContainer(({ cols }: { cols: IColItem[] }) => {
    return <thead className={styles.sortableBox}>
      { cols.map((val, ind) => {
        return <SortableItem key={val.dataIndex} name={val.title} index={ind} disabled={ind === 1}/>
      }) }
    </thead>;
  });

export const TableDrag:FC<IProps> = ({dataSource}) => {

  const [cols, setCols] = useState<IColItem[]>([
    { title: '名字', dataIndex: 'name', key: 'name', width: 200, fixed: 'left' },
    { title: '年龄', dataIndex: 'age', key: 'age', width: 200, fixed: 'left' },
    { title: '住址', dataIndex: 'address', key: 'address', width: 200, fixed: 'left' },
    { title: '名字1', dataIndex: 'name1', key: 'name1', width: 200, fixed: 'left' },
    { title: '年龄1', dataIndex: 'age1', key: 'age1', width: 200 },
    { title: '住址1', dataIndex: 'address1', key: 'address1', width: 200 },
  ]);

  const onSortEndHandle = ({ oldIndex, newIndex }: { oldIndex: number, newIndex: number }) => {
    console.log('onSortEndHandle: ', oldIndex, newIndex);
    setCols(cols => arrayMove(cols, oldIndex, newIndex));
  };

  return (
    <>
      <table>
        <SortableList axis="x" lockAxis="x" cols={cols} onSortEnd={onSortEndHandle}/>
      </table>
      <Table
        scroll={{x: 1000}}
        pagination={false}
        bordered
        columns={cols}
        dataSource={dataSource}/>
    </>
  );
};
