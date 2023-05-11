import React, { FC } from 'react';
import {
  SortableContainer,
  SortableContainerProps,
  SortableElement,
  SortableElementProps,
} from 'react-sortable-hoc';
import styles from '@/views/ad-reporting/table-drag/index.module.scss';
import { IColItem } from "@/views/ad-reporting/table-drag/index";

interface IItemProps extends SortableElementProps {
  name: string;
  isSort?: boolean;
}

// @ts-ignore
const SortableItem: React.ComponentClass<IItemProps> = SortableElement(({ name, isSort}) => {
  return <th className={isSort ? styles.sortableTargetItem : styles.sortableItem}>
    {name}
  </th>;
});

interface IProps extends SortableContainerProps {
  columns: IColItem[];
  isSort?: boolean;
}

export const SortableList: React.ComponentClass<IProps> = SortableContainer((props: IProps) => (
  <>
    {props.columns.map((val, ind) => {
      return <SortableItem
        key={val.dataIndex}
        name={val.title}
        isSort={props.isSort}
        index={ind} />;
    })}
  </>
));

export const TableDragHeader: FC<IProps> = (props) => {
  return <SortableList
    {...props}
    axis="x"
    lockAxis="x"/>;
};
