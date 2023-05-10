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
  onOrderSort: () => void;
  isSort?: boolean;
}

// @ts-ignore
const SortableItem: React.ComponentClass<IItemProps> = SortableElement(({ name, isSort, onOrderSort, index }) => {

  return <th className={isSort ? styles.sortableTargetItem : styles.sortableItem}>
    {name}
    {isSort ? <div style={{ padding: '5px', background: "red" }} onTouchStart={(e) => {
      e.stopPropagation();
      onOrderSort();
    }}>
      2121
    </div> : null}
  </th>;
});

interface IProps extends SortableContainerProps {
  columns: IColItem[];
  isSort?: boolean;
  onOrderSort: () => void;
}

export const SortableList: React.ComponentClass<IProps> = SortableContainer((props: IProps) => (
  <>
    {props.columns.map((val, ind) => {
      return <SortableItem
        key={val.dataIndex}
        name={val.title}
        isSort={props.isSort}
        onOrderSort={() => props.onOrderSort()}
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
