import React, { FC, useState } from "react";
import { Tabs, TabsProps, Checkbox, Row, Col, } from "antd";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import styles from "@/views/ad-reporting/right/ad-report-right.module.scss";
import { useAppSelector } from "@/store";
import { EFilterType } from "@/views/ad-reporting/index.interfaces";

interface IProps {
  onChange: (checkedValues: CheckboxValueType[], filterType: EFilterType) => void;
}

const ItemChild: FC<{list: {field: string; text: string;}[]}> = ({ list = [] }) => (
  <Row>
    {list.map(val => {
      return <Col key={val.field} span={24}>
        <Checkbox  value={val.field}>{val.text}</Checkbox>
      </Col>;
    })}
  </Row>
);


// 细分条件指标
const AdReportRight: FC<IProps> = ({onChange}) => {
  const targetList = useAppSelector(state => state.app.searchList.target);
  const groupList = useAppSelector(state => state.app.searchList.group);

  const items: TabsProps['items'] = [
    {
      key: EFilterType.Group,
      label: '细分条件',
      children: <Checkbox.Group onChange={e => onChange(e, EFilterType.Group)}>
        <ItemChild list={groupList}/>
      </Checkbox.Group>
    },
    {
      key: EFilterType.Target,
      label: '指标',
      children: <Checkbox.Group onChange={e => onChange(e, EFilterType.Target)}>
        <ItemChild list={targetList}/>
      </Checkbox.Group>
    },
  ];

  const tabChange = (key: string) => {
    console.log(key);
  };

  return (
    <div className={styles.rightBox}>
      <Tabs
        className={styles.rightBoxTabs}
        defaultActiveKey="1"
        items={items}
        onChange={tabChange} />
    </div>
  );
};

export default AdReportRight;
