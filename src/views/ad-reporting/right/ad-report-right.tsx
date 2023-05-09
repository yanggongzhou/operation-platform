import React, { FC, useEffect, useState } from "react";
import { Tabs, TabsProps, Checkbox, Row, Col, } from "antd";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import styles from "@/views/ad-reporting/right/ad-report-right.module.scss";
import { useAppSelector } from "@/store";
import { EFilterType } from "@/views/ad-reporting/index.interfaces";

interface IProps {
  onChange: (checkedValues: CheckboxValueType[], filterType: EFilterType) => void;
}

interface IItemChildProps {
  onChange: (checkedValues: CheckboxValueType[]) => void;
  list: {field: string; text: string;}[];
  defaultValue?: CheckboxValueType[];
}
const ItemChild: FC<IItemChildProps> = ({ list = [], defaultValue, onChange }) => {
  const [value, setValue] = useState(defaultValue);
  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);
  const itemChange = (checkedValues: CheckboxValueType[]) => {
    setValue(checkedValues);
    onChange(checkedValues);
  };
  return <Checkbox.Group value={value} onChange={itemChange}>
    <Row>
      {list.map(val => {
        return <Col key={val.field} span={24}>
          <Checkbox value={val.field}>{val.text}</Checkbox>
        </Col>;
      })}
    </Row>
  </Checkbox.Group>;
};


// 细分条件指标
const AdReportRight: FC<IProps> = ({onChange}) => {
  const targetDefault = useAppSelector(state => state.app.detail.structure.indexColumnList || []);
  const targetList = useAppSelector(state => state.app.searchList.target);
  const groupDefault = useAppSelector(state => state.app.detail.structure.filterFieldList || []);
  const groupList = useAppSelector(state => (state.app.searchList.group));

  const items: TabsProps['items'] = [
    {
      key: EFilterType.Group,
      label: '细分条件',
      children: (<ItemChild list={groupList} defaultValue={groupDefault} onChange={e => onChange(e, EFilterType.Group)}/>)
    },
    {
      key: EFilterType.Target,
      label: '指标',
      children: <ItemChild list={targetList} defaultValue={targetDefault} onChange={e => onChange(e, EFilterType.Target)}/>
    },
  ];

  const tabChange = (key: string) => {
    console.log(key);
  };

  return (
    <div className={styles.rightBox}>
      <Tabs
        className={styles.rightBoxTabs}
        defaultActiveKey={EFilterType.Group}
        items={items}
        onChange={tabChange} />
    </div>
  );
};

export default AdReportRight;
