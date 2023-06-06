import React, { FC, useEffect, useState } from "react";
import { Tabs, TabsProps, Checkbox, Button, Tag, Tooltip } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import styles from "@/views/ad-reporting/right/ad-report-right.module.scss";
import { useAppDispatch, useAppSelector } from "@/store";
import { EFilterType } from "@/views/ad-reporting/index.interfaces";
import { setIsExpansion } from "@/store/modules/app.module";
const { CheckableTag } = Tag;

interface IProps {
  onRightChange: (checkedValues: string[], filterType: EFilterType) => void;
}

interface IItemChildProps {
  onChange: (checkedValues: string[]) => void;
  list: {field: string; text: string;}[];
  defaultValue: string[];
}
const ItemChild: FC<IItemChildProps> = ({ list = [], defaultValue, onChange }) => {
  const [value, setValue] = useState(defaultValue);
  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);
  const itemChange = (checkedValues: string[]) => {
    setValue(checkedValues);
    onChange(checkedValues);
  };

  return <Checkbox.Group value={value} className={styles.rightCheckBox} onChange={e => itemChange(e as string[])}>
    {list.map(val => {
      return <Checkbox className={styles.rightCheckBoxItem} key={val.field} value={val.field}>{val.text}</Checkbox>;
    })}
  </Checkbox.Group>;
};


const ItemChild2: FC<IItemChildProps> = ({ list = [], defaultValue = [] , onChange }) => {
  const [value, setValue] = useState(defaultValue);
  const isExpansion = useAppSelector(state => (state.app.isExpansion));
  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);
  const itemChange = (checkedValues: string, checked: boolean) => {
    const _value = checked ? [...value, checkedValues] : value.filter(val => val !== checkedValues);
    setValue(_value);
    onChange(_value);
  };

  return <div className={isExpansion ? styles.checkableBox : styles.checkableBox2}>
    {list.map((val) => (
      <CheckableTag
        style={{ fontSize: '12px', padding: '2px 7px', marginRight: 0, textAlign: "center" }}
        key={val.field}
        checked={value.indexOf(val.field) !== -1}
        onChange={(checked) => itemChange(val.field, checked)}
      >
        {val.text}
      </CheckableTag>
    ))}
  </div>;
};


// 细分条件指标
const AdReportRight: FC<IProps> = ({onRightChange}) => {
  const targetDefault = useAppSelector(state => state.app.detail.structure.indexColumnList || []);
  const targetList = useAppSelector(state => state.app.searchList.target);
  const groupDefault = useAppSelector(state => state.app.detail.structure.filterFieldList || []);
  const groupList = useAppSelector(state => (state.app.searchList.group));
  const isExpansion = useAppSelector(state => (state.app.isExpansion));
  const dispatch = useAppDispatch();
  const items: TabsProps['items'] = [
    {
      key: EFilterType.Group,
      label: '细分条件',
      children: (<ItemChild2 list={groupList} defaultValue={groupDefault} onChange={e => onRightChange(e, EFilterType.Group)}/>)
    },
    {
      key: EFilterType.Target,
      label: '指标',
      children: <ItemChild2 list={targetList} defaultValue={targetDefault} onChange={e => onRightChange(e, EFilterType.Target)}/>
    },
  ];

  const tabChange = (key: string) => {
    console.log(key);
  };

  return (
    <div className={styles.rightBox}>
      <Tooltip color={'grey'} placement="top" title={isExpansion ? '收起' : '展开'} arrow={false}>
        <Button
          icon={isExpansion ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => {
            dispatch(setIsExpansion());
          }}/>
      </Tooltip>

      {/*<div className={styles.expansion} onClick={() => {*/}
      {/*  dispatch(setIsExpansion());*/}
      {/*}}>*/}
      {/*  <LeftCircleOutlined className={isExpansion ? styles.expansionIcon2 : styles.expansionIcon} />*/}
      {/*</div>*/}

      <Tabs
        className={styles.rightBoxTabs}
        defaultActiveKey={EFilterType.Group}
        items={items}
        onChange={tabChange} />
    </div>
  );
};

export default AdReportRight;
