import React, { FC, useEffect, useRef, useState } from 'react';
import { Button, Popover, Space, Tag } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { EGroupField, EOperator, IFieldItem, NGroupField } from "@/views/ad-reporting/index.interfaces";
import styles from '@/components/search-pop/index.module.scss';
import { useAppSelector } from "@/store";
import { IItem } from "@/service/index.interfaces";

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


  const options = useAppSelector(state => {
    switch (fieldItem.fieldName) {
      case EGroupField.AppId:
        return state.app.baseInfoList.app;
      case EGroupField.Device:
        return state.app.baseInfoList.device;
      case EGroupField.Media:
        return state.app.baseInfoList.media;
      case EGroupField.AdType:
        return state.app.baseInfoList.type;
      case EGroupField.Language:
        return state.app.baseInfoList.language;
      case EGroupField.Pline:
        return state.app.baseInfoList.pline;
      case EGroupField.Country:
        return state.app.baseInfoList.country.map(val => ({ code: '', field: val.countryCode2, text: val.countryName })) as IItem[];
      default:
        return undefined;
    }
  });


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
        overlayClassName={styles.popCardBox}
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
              {fieldItem.fieldValue.slice(0, 2).map(val => {
                if (fieldItem.fieldName === EGroupField.AdType
                  || fieldItem.fieldName === EGroupField.Language
                  || fieldItem.fieldName === EGroupField.AppId
                  || fieldItem.fieldName === EGroupField.Device
                  || fieldItem.fieldName === EGroupField.Media
                  || fieldItem.fieldName === EGroupField.Pline
                  || fieldItem.fieldName === EGroupField.Country
                ) {
                  const baseInfo = options && options.find(item => (item.field as string) === val);
                  if (baseInfo) {
                    return <Tag key={val} bordered={false} className={styles.popTag}>{baseInfo.text}</Tag>;
                  }
                }
                return <Tag key={val} bordered={false} className={styles.popTag}>{val}</Tag>;
              })}
            </Space>
          </Space>
        </div>
      </Popover>
      <div className={styles.popCancel} onClick={() => onDelete()} title={'删除此项'}><CloseOutlined/></div>
    </Space.Compact>
  );
};

export default SearchPop;
