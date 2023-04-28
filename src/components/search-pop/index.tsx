import React, { FC, useEffect, useRef, useState } from 'react';
import { Button, Popover, Space } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { EGroupField, NGroupField } from "@/views/ad-reporting/index.interfaces";
import styles from '@/components/search-pop/index.module.scss';
interface IProps {
  field: EGroupField;
  children: React.ReactNode;
}

const SearchPop: FC<IProps> = ({ field, children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const isUseful = useRef(false);

  const confirm = () => {
    setIsOpen(false);
    return new Promise((resolve) => {
      setTimeout(() => resolve(null), 3000);
    });
  };

  useEffect(() => {
    setTimeout(() => isUseful.current = true, 1000);
  }, []);

  const handleOpenChange = (newOpen: boolean) => {
    if (isUseful.current) {
      setIsOpen(newOpen);
    }
  };

  // return <Popover
  //   trigger={'click'}
  //   destroyTooltipOnHide
  //   placement={'bottom'}
  //   defaultOpen={true}
  //   title={<div>{NGroupField[field]}</div>}
  //   content={children}
  //   open={isOpen}
  //   onOpenChange={handleOpenChange}
  // >
  //   <Space.Compact>
  //     <Button type={'default'} onClick={() => setIsOpen(true)}>{NGroupField[field]}</Button>
  //     <Button type="primary" icon={<CloseOutlined />} />
  //   </Space.Compact>
  // </Popover>;


  return (
    <div className={styles.searchPopWrap}>
      <Space.Compact>
        <Button type={'default'} onClick={() => setIsOpen(true)}>{NGroupField[field]}</Button>
        <Button type="primary" icon={<CloseOutlined/>}/>
      </Space.Compact>

      {isOpen ? <div className={styles.popBox}>
        <div className={styles.popTitle}>{NGroupField[field]}</div>
        <div className={styles.popMain}>
          {children}
          <div className={styles.popFooter}>
            <Space>
              <Button onClick={() => setIsOpen(false)}>取消</Button>
              <Button type="primary" onClick={() => setIsOpen(false)}>应用</Button>
            </Space>
          </div>
        </div>
      </div> : null}
    </div>
  );
};

export default SearchPop;
