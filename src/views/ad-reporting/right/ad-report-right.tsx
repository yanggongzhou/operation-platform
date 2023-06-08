import React, { FC, useEffect, useState } from "react";
import { Button, Tabs, TabsProps, Tag, Tooltip, Space } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined, ReloadOutlined } from "@ant-design/icons";
import styles from "@/views/ad-reporting/right/ad-report-right.module.scss";
import { useAppSelector } from "@/store";
import { EFilterType } from "@/views/ad-reporting/index.interfaces";
import { ExpandTargetAndGroupType } from "@/service/index.interfaces";

const { CheckableTag } = Tag;

interface IProps {
  onRightChange: (checkedValues: string[], filterType: EFilterType) => void;
  onRightExpend: (isExpansion: boolean) => void;
  onRefresh: () => void;
}

interface IItemChildProps {
  onChange: (checkedValues: string[]) => void;
  list: {field: string; text: string;}[];
  defaultValue: string[];
}
// const ItemChild: FC<IItemChildProps> = ({ list = [], defaultValue, onChange }) => {
//   const [value, setValue] = useState(defaultValue);
//   useEffect(() => {
//     setValue(defaultValue);
//   }, [defaultValue]);
//   const itemChange = (checkedValues: string[]) => {
//     setValue(checkedValues);
//     onChange(checkedValues);
//   };
//
//   return <Checkbox.Group value={value} className={styles.rightCheckBox} onChange={e => itemChange(e as string[])}>
//     {list.map(val => {
//       return <Checkbox className={styles.rightCheckBoxItem} key={val.field} value={val.field}>{val.text}</Checkbox>;
//     })}
//   </Checkbox.Group>;
// };

const ItemChild2: FC<IItemChildProps> = ({ list = [], defaultValue = [] , onChange }) => {
  const [value, setValue] = useState(defaultValue);
  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);
  const itemChange = (checkedValues: string, checked: boolean) => {
    const _value = checked ? [...value, checkedValues] : value.filter(val => val !== checkedValues);
    setValue(_value);
    onChange(_value);
  };

  return <>
    {list.map((val) => (
      <CheckableTag
        style={{ fontSize: '12px', padding: '2px 7px', marginRight: 0, textAlign: "center" }}
        key={val.field}
        checked={value.indexOf(val.field) !== -1}
        onChange={(checked) => itemChange(val.field, checked)}>
        {val.text}
      </CheckableTag>
    ))}
  </>;
};

// 细分条件指标
const AdReportRight: FC<IProps> = ({ onRightChange, onRightExpend, onRefresh }) => {
  const targetDefault = useAppSelector(state => state.app.detail.structure.indexColumnList || []);
  const targetList = useAppSelector(state => state.app.searchList.target);
  const groupDefault = useAppSelector(state => state.app.detail.structure.filterFieldList || []);
  const groupList = useAppSelector(state => (state.app.searchList.group));
  const isExpansion = useAppSelector(state => (state.app.detail.expandTargetAndGroup !== ExpandTargetAndGroupType.noExpand));
  const [refreshLoading, setRefreshLoading] = useState(false);
  const items: TabsProps['items'] = [
    {
      key: EFilterType.Group,
      label: '细分条件',
      children: <div className={isExpansion ? styles.checkableBox : styles.checkableBox2}>
        <ItemChild2 list={groupList} defaultValue={groupDefault} onChange={e => onRightChange(e, EFilterType.Group)}/>
      </div>
    },
    {
      key: EFilterType.Target,
      label: '指标',
      children: <div className={isExpansion ? styles.checkableBox : styles.checkableBox2}>
        <ItemChild2 list={targetList} defaultValue={targetDefault} onChange={e => onRightChange(e, EFilterType.Target)}/>
      </div>,
    },
  ];

  return (
    <div className={styles.rightBox}>
      <Space.Compact>
        <Tooltip color={'grey'} placement="top" title={isExpansion ? '收起' : '展开'} arrow={false}>
          <Button
            icon={isExpansion ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => onRightExpend(isExpansion)}>{isExpansion ? '收起' : ''}</Button>
        </Tooltip>

        <Button
          // className={styles.rightColumn}
          style={{ fontWeight: "bold" }}
          icon={<ReloadOutlined />}
          loading={refreshLoading}
          disabled={refreshLoading}
          onClick={() => {
            setRefreshLoading(true);
            onRefresh();
            setTimeout(() => {
              setRefreshLoading(false);
            }, 800);
          }}
        >{isExpansion ? '刷新' : ''}</Button>
      </Space.Compact>


      {/*<div className={styles.expansion} onClick={() => {*/}
      {/*  dispatch(setExpandTargetAndGroup());*/}
      {/*}}>*/}
      {/*  <LeftCircleOutlined className={isExpansion ? styles.expansionIcon2 : styles.expansionIcon} />*/}
      {/*</div>*/}
      <Tabs
        className={styles.rightBoxTabs}
        defaultActiveKey={EFilterType.Group}
        items={items}/>
    </div>
  );
};

export default AdReportRight;
