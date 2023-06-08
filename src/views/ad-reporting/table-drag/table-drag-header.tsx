import React, { FC, useState } from 'react';
import {
  SortableContainer,
  SortableContainerProps,
  SortableElement,
  SortableElementProps,
} from 'react-sortable-hoc';
import { HolderOutlined, ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import styles from '@/views/ad-reporting/table-drag/index.module.scss';
import { IColItem } from "@/views/ad-reporting/table-drag/index";
import { useAppSelector } from "@/store";

interface IItemProps extends SortableElementProps {
  left: number;
  name: string;
  isSort?: boolean;
  isSortServer: boolean;
  isOrderUp: boolean;
  isGroupLast?: boolean;
  changeSort: () => void;
  changeDisable: (flag: boolean) => void;
}

// @ts-ignore
const SortableItem: React.ComponentClass<IItemProps> = SortableElement(({ name, isSortServer, isSort, isOrderUp, isGroupLast, left, changeSort, changeDisable }) => {

  return <th
    data-title={isGroupLast ? 'group' : ''}
    style={isSort ? {} : { left: left + 'px' }}
    className={isSort ? styles.sortableTargetItem : styles.sortableItem}>
    <HolderOutlined
      className={styles.sortableDragIcon}
      onMouseLeave={() => changeDisable(true)}
      onTouchEnd={() => changeDisable(true)}
      onTouchStart={() => changeDisable(false)}
      onMouseEnter={() => changeDisable(false)}
    />
    <div className={styles.sortableName} onClick={changeSort}>
      {name}
    </div>
    {
      isSortServer ? <>
        {isOrderUp ? <ArrowUpOutlined className={styles.sortableSortIcon}/> : <ArrowDownOutlined className={styles.sortableSortIcon}/>}
      </> : null
    }

  </th>;
});


interface IProps extends SortableContainerProps {
  columns: IColItem[];
  changeSort?: (key: string) => void;
  isSort: boolean;
  isGroup?: boolean;
}

export const SortableList: React.ComponentClass<IProps> = SortableContainer((props: IProps) => {
  const sort = useAppSelector(state => state.app.detail.structure.sort);
  const isOrderUp = useAppSelector(state => state.app.detail.structure.order === "desc");
  const [isDisable, setIsDisable] = useState(true);

  const changeDisable = (flag: boolean) => {
    setIsDisable(flag);
  };

  let w = 0;
  return (<>
    {props.columns.map((val, ind) => {
      w += val.width;
      return <SortableItem
        changeDisable={changeDisable}
        changeSort={() => props.changeSort && props.changeSort(val.key)}
        disabled={isDisable}
        isGroupLast={props.isGroup && ind === props.columns.length - 1}
        key={val.dataIndex}
        name={val.title}
        isSort={props.isSort}
        isSortServer={sort === val.key}
        isOrderUp={isOrderUp}
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
