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
  left: number;
  name: string;
  isSort?: boolean;
  isGroupLast?: boolean;
}

// @ts-ignore
const SortableItem: React.ComponentClass<IItemProps> = SortableElement(({ name, isSort, isGroupLast, left}) => {
  return <th
    data-title={isGroupLast ? 'group' : ''}
    style={isSort ? {} : { left: left + 'px' }}
    className={isSort ? styles.sortableTargetItem : styles.sortableItem}>
    {name}
  </th>;
});

interface IProps extends SortableContainerProps {
  columns: IColItem[];
  isSort?: boolean;
  isGroup?: boolean;
}

export const SortableList: React.ComponentClass<IProps> = SortableContainer((props: IProps) => {
  let w = 0;
  return (<>
    {props.columns.map((val, ind) => {
      w += val.width;
      return <SortableItem
        isGroupLast={props.isGroup && ind === props.columns.length - 1}
        key={val.dataIndex}
        name={val.title}
        isSort={props.isSort}
        index={ind}
        left={w - val.width}
      />;
    })}
  </>);
});

export const TableDragHeader: FC<IProps> = (props) => {
  return <SortableList
    {...props}
    axis="x"
    lockAxis="x"/>;
};
