import React, { FC, useEffect, useState } from 'react';
import {
  arrayMove,
  SortableContainer,
  SortableContainerProps,
  SortableElement,
  SortableElementProps,
} from 'react-sortable-hoc';
import styles from '@/components/table-drag/index.module.scss';
import { IColItem } from "@/components/table-drag/index";

interface IProps {
  groupColumns: IColItem[];
  targetColumns: IColItem[];
}

// @ts-ignore
const SortableItem: React.ComponentClass<{ name: string } & SortableElementProps> = SortableElement(({ name }) => {
  return (
    <div className={styles.sortableItem}>{name}</div>
  );
});

// disabled={ind === 1}
const SortableList: React.ComponentClass<{ cols: IColItem[] } & SortableContainerProps> =
  SortableContainer(({ cols }: { cols: IColItem[] }) => {
    return <div className={styles.sortableBox}>
      <>
        {cols.map((val, ind) => {
          return <SortableItem key={val.dataIndex} name={val.title} index={ind} />;
        })}
      </>
    </div>;
  });

export const TableDragHeader: FC<IProps> = ({ groupColumns, targetColumns }) => {
  const [groupCols, setGroupCols] = useState<IColItem[]>(groupColumns);
  const [targetCols, setTargetCols] = useState<IColItem[]>(targetColumns);

  useEffect(() => {
    setGroupCols(groupColumns);
    setTargetCols(targetColumns);
  }, [groupColumns, targetColumns]);

  const onSortEndGroup = ({ oldIndex, newIndex }: { oldIndex: number, newIndex: number }) => {
    console.log('onSortEndGroup: ', oldIndex, newIndex);
    setGroupCols(cols => arrayMove(cols, oldIndex, newIndex));
  };
  const onSortEndTarget = ({ oldIndex, newIndex }: { oldIndex: number, newIndex: number }) => {
    console.log('onSortEndTarget: ', oldIndex, newIndex);
    setTargetCols(cols => arrayMove(cols, oldIndex, newIndex));
  };

  return (
    <div className={styles.tableHeaderBox}>
      <div className={styles.groupHeader}>
        <SortableList axis="x" lockAxis="x" cols={groupCols} onSortEnd={onSortEndGroup}/>
      </div>
      <div
        style={{
          paddingLeft: groupCols.length * 120 + 'px'
        }}
        className={styles.targetHeader}>
        <SortableList axis="x" lockAxis="x" cols={targetCols} onSortEnd={onSortEndTarget}/>
      </div>
    </div>
  );
};
