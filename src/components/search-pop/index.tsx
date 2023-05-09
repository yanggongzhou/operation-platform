import React, { FC, useEffect, useRef, useState } from 'react';
import { Button, Popover, Space, Tag } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { EOperator, IFieldItem, NGroupField } from "@/views/ad-reporting/index.interfaces";
import styles from '@/components/search-pop/index.module.scss';

interface IProps {
  fieldItem: IFieldItem;
  children: React.ReactNode;
  onDelete: () => void;
  onConfirm: () => void;
  onCancel: () => void;
  disabled?: boolean;
}

const SearchPop: FC<IProps> = (
  { fieldItem, children, onDelete, onConfirm, onCancel, disabled }) => {
  const [isOpen, setIsOpen] = useState(fieldItem.defaultOpen && fieldItem.fieldValue.length === 0);
  const isUseful = useRef(false);

  useEffect(() => {
    if (fieldItem.defaultOpen) {
      setIsOpen(true);
    }
  }, [fieldItem.defaultOpen]);

  useEffect(() => {
    setTimeout(() => isUseful.current = true, 1000);
  }, []);

  const handleOpenChange = (newOpen: boolean) => {
    if (isUseful.current) {
      setIsOpen(newOpen);
      if (!newOpen) {
        onCancel();
      }
    }
  };

  return (
    <Space.Compact className={styles.popShowBox}>
      <Popover
        arrow={false}
        className={styles.searchPopWrap}
        trigger={'click'}
        destroyTooltipOnHide
        placement={'bottomLeft'}
        title={<div className={styles.popTitle}>{NGroupField[fieldItem.fieldName]}</div>}
        content={<div className={styles.popBox}>
          <div className={styles.popMain}>
            {children}
          </div>
          <div className={styles.popFooter}>
            <Space>
              <Button onClick={() => {
                setIsOpen(false);
                onCancel();
              }}>取消</Button>
              <Button type="primary" disabled={disabled} onClick={() => {
                setIsOpen(false);
                onConfirm();
              }}>应用</Button>
            </Space>
          </div>
        </div>}
        open={isOpen}
        onOpenChange={handleOpenChange}
      >
        <div className={styles.popName} onClick={() => setIsOpen(true)}>
          <Space size={8}>
            <span>{NGroupField[fieldItem.fieldName]}</span>
            <span>{fieldItem.operator === EOperator.In ? '是' : '非'}</span>
            <Space size={3} className={styles.popTagBox}>
              {fieldItem.fieldValue.slice(0, 3).map(val => {
                return <Tag key={val} bordered={false} className={styles.popTag}>{val}</Tag>;
              })}
            </Space>
          </Space>


        </div>
      </Popover>
      <div className={styles.popCancel} onClick={() => onDelete()}><CloseOutlined/></div>
    </Space.Compact>
  );
};

export default SearchPop;
