import React, { FC, useEffect, useRef, useState } from 'react';
import { Button, Popover, Space } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { EGroupField, NGroupField } from "@/views/ad-reporting/index.interfaces";
import styles from '@/components/search-pop/index.module.scss';
interface IProps {
  field: EGroupField;
  children: React.ReactNode;
  onDelete: () => void;
}

const SearchPop: FC<IProps> = ({ field, children, onDelete }) => {
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

  return (
    <Space.Compact className={styles.popShowBox}>
      <Popover
        className={styles.searchPopWrap}
        trigger={'click'}
        destroyTooltipOnHide
        placement={'bottomLeft'}
        defaultOpen={true}
        title={<div className={styles.popTitle}>{NGroupField[field]}</div>}
        content={<div className={styles.popBox}>
          <div className={styles.popMain}>
            {children}
          </div>
          <div className={styles.popFooter}>
            <Space>
              <Button onClick={() => setIsOpen(false)}>取消</Button>
              <Button type="primary" onClick={() => setIsOpen(false)}>应用</Button>
            </Space>
          </div>
        </div>}
        open={isOpen}
        onOpenChange={handleOpenChange}
      >
        <div className={styles.popName} onClick={() => setIsOpen(true)}>{NGroupField[field]}</div>
      </Popover>
      <div className={styles.popCancel} onClick={() => onDelete()}><CloseOutlined /></div>
    </Space.Compact>
  );
};

export default SearchPop;
