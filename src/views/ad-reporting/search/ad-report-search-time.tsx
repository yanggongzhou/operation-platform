import React, { FC, useState } from "react";
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';

const { RangePicker } = DatePicker;

interface IProps {
  onSearch: (startDate: string, endDate: string) => void;
}

type RangeValue = [Dayjs | null, Dayjs | null] | null;

const AdReportSearchTime: FC<IProps> = ({ onSearch }) => {
  const [dates, setDates] = useState<RangeValue>(null);
  const rangePresets: {
    label: string;
    value: [Dayjs, Dayjs];
  }[] = [
    { label: '今天', value: [dayjs(), dayjs()] },
    { label: '昨天', value: [dayjs().add(-1, 'd'), dayjs().add(-1, 'd')] },
    { label: '过去7天（不包含今天）', value: [dayjs().add(-8, 'd'), dayjs().add(-1, 'd')] },
    { label: '过去14天（不包含今天）', value: [dayjs().add(-15, 'd'), dayjs().add(-1, 'd')] },
  ];
  const onRangeChange = (dates: null | (Dayjs | null)[], dateStrings: string[]) => {
    if (dates) {
      onSearch(dateStrings[0], dateStrings[1]);
    } else {
      console.log('Clear');
    }
  };
  // 限制动态的日期区间选择
  const disabledDate = (current: Dayjs) => {
    const range = current.isAfter(dayjs(), 'days');
    if (!dates) {
      return range;
    }
    const tooLate = dates[0] && current.diff(dates[0], 'days') >= 15;
    const tooEarly = dates[1] && (dates[1] as Dayjs).diff(current, 'days') >= 15;
    return range || !!tooEarly || !!tooLate;
  };

  const onOpenChange = (open: boolean) => {
    if (open) {
      setDates([null, null]);
    } else {
      setDates(null);
    }
  };

  return (
    <RangePicker
      presets={rangePresets}
      onCalendarChange={(val) => setDates(val)}
      onChange={onRangeChange}
      disabledDate={disabledDate}
      onOpenChange={onOpenChange}
    />
  );
};

export default AdReportSearchTime;

