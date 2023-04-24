import React, { FC, useState } from 'react';
import { Table } from 'antd';
import {
  arrayMove,
  SortableContainer,
  SortableContainerProps,
  SortableElement,
  SortableElementProps
} from 'react-sortable-hoc';

interface IProps {

}

interface IColItem {
  title: any;
  dataIndex: string;
  key: string
}

interface IRowItem {
  key: string;
  name: string;
  age: number;
  address: string
}

// @ts-ignore
const SortableItem: React.ComponentClass<{ name: string } & SortableElementProps> = SortableElement(({ name }) =>
  <span>{name}</span>);

const SortableList: React.ComponentClass<{ rows: IRowItem[]; cols: IColItem[] } & SortableContainerProps> =
  SortableContainer(({ rows, cols }: { rows: IRowItem[]; cols: IColItem[] }) => <Table columns={cols} dataSource={rows}/>);

export const TableDrag: FC<IProps> = () => {

  const [cols, setCols] = useState([
    {
      title: <SortableItem name={'ceshi'} index={0}/>,
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: <SortableItem name={'年龄'} index={1}/>,
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: <SortableItem name={'住址'} index={2}/>,
      dataIndex: 'address',
      key: 'address',
    },
  ]);

  const [rows, setRows] = useState([
    {
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号',
    },
    {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    },
  ]);


  const onSortEnd = ({ oldIndex, newIndex }: { oldIndex: number, newIndex: number }) => {
    console.log('onSortEnd: ', oldIndex, newIndex);
    setCols(cols => {
      // const data = JSON.parse(JSON.stringify(cols));
      return arrayMove(cols, oldIndex, newIndex);
    });
  };

  return (
    <SortableList cols={cols} rows={rows} onSortEnd={onSortEnd}/>
  );
};
