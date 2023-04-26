import React, { FC, useState } from 'react';
import { Button, Popover, Space } from "antd";
import { CloseOutlined } from "@ant-design/icons";

interface IProps {}

const SearchPop: FC<IProps> = () => {
  const [isOpen, setIsOpen] = useState(true);

  const confirm = () => {
    setIsOpen(false)
    return new Promise((resolve) => {
      setTimeout(() => resolve(null), 3000);
    });
  };

  const handleOpenChange = (newOpen: boolean) => {
    setIsOpen(newOpen);
  };

  return <Popover
    trigger={'click'}
    destroyTooltipOnHide
    placement={'bottom'}
    defaultOpen={true}
    title="Delete the task"
    content="Are you sure to delete this task?"
    open={isOpen}
    onOpenChange={handleOpenChange}
  >
    <Space.Compact>
      <Button type={'default'} onClick={() => setIsOpen(true)}>Combine input and button</Button>
      <Button type="primary" icon={<CloseOutlined />} />
    </Space.Compact>
  </Popover>;
};

export default SearchPop;
