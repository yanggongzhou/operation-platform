import React, { FC, useRef, useState } from "react";
import { Button, Popconfirm, TreeSelect } from 'antd';
import styles from "@/views/ad-reporting/search/ad-report-search.module.scss";

const treeData = [
  {
    title: 'Node1',
    value: '0-0',
    children: [
      {
        title: 'Child Node1',
        value: '0-0-1',
      },
      {
        title: 'Child Node2',
        value: '0-0-2',
      },
    ],
  },
  {
    title: 'Node2',
    value: '0-1',
  },
];


interface IProps {
  onSearch: () => void;
}

const AdReportSearch: FC<IProps> = ({ onSearch }) => {
  const [value, setValue] = useState<string>();
  const [isOpen, setIsOpen] = useState(false);

  const ceshiRef = useRef<HTMLDivElement>({} as HTMLDivElement);
  const onChange = (newValue: string) => {
    console.log(newValue);
    setValue(newValue);
  };

  return (
    <div  className={styles.adSearchWrap}>
      <TreeSelect
        style={{ width: '100%' }}
        value={value}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        treeData={treeData}
        placeholder="Please select"
        treeDefaultExpandAll
        onChange={onChange}
      />

      <div ref={ceshiRef} className={styles.adSearchModalBox}>
        <Button onClick={() => setIsOpen(true)}>ceshimodal</Button>
        <Popconfirm
          title="Delete the task"
          description="Are you sure to delete this task?"
          open={isOpen}
          onConfirm={() => setIsOpen(false)}
          onCancel={() => setIsOpen(false)}
          okText="Yes"
          cancelText="No"
        >
          <h4>报告名称</h4>
        </Popconfirm>
      </div>

    </div>
  );
};

export default AdReportSearch;
