import React, { FC } from "react";
import { DatePicker } from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { debounce } from "throttle-debounce";
import { useAppDispatch, useAppSelector } from "@/store";
import { setFormRelatedDynamicDate, setRangeDate } from "@/store/modules/app.module";
import styles from "@/views/ad-reporting/search/ad-report-search.module.scss";
import { EFormRelatedDynamicDate } from "@/service/index.interfaces";

type RangeValue = [Dayjs | null, Dayjs | null] | null;

interface IProps {
  onSearch: (startDate: string, endDate: string) => void;
}

const AdReportSearchTime: FC<IProps> = ({ onSearch }) => {
  const dispatch = useAppDispatch();
  const dates: RangeValue = useAppSelector(state => {
    const startDate = state.app.detail.structure.startDate;
    const s = startDate ? dayjs(startDate) : null;
    const endDate = state.app.detail.structure.endDate;
    const e = startDate ? dayjs(endDate) : null;
    return (s || e) ? [s, e] : null;
  });

  // 利用防抖延迟修改formRelatedDynamicDate, 改动时切记数据变化
  const onPresetsLabelClick = debounce(500,(title: string) => {
    switch (title) {
      case "今天":
        dispatch(setFormRelatedDynamicDate(EFormRelatedDynamicDate.today));
        break;
      case "昨天":
        dispatch(setFormRelatedDynamicDate(EFormRelatedDynamicDate.lastDay));
        break;
      case "过去7天":
        dispatch(setFormRelatedDynamicDate(EFormRelatedDynamicDate.lastSeven));
        break;
      case "过去14天":
        dispatch(setFormRelatedDynamicDate(EFormRelatedDynamicDate.lastFourteen));
        break;
    }
  });

  const PresetsLabel = ({ title }: { title: string; }) => {
    return <div className={styles.searchTimePopLabel} onClick={() => onPresetsLabelClick(title)}>{title}</div>;
  };

  const rangePresets: { label: React.ReactNode; value: [Dayjs, Dayjs]; }[] = [
    { label: <PresetsLabel title="今天" />, value: [dayjs(), dayjs()] },
    { label: <PresetsLabel title="昨天" />, value: [dayjs().add(-1, 'd'), dayjs().add(-1, 'd')] },
    { label: <PresetsLabel title="过去7天" />, value: [dayjs().add(-8, 'd'), dayjs().add(-1, 'd')] },
    { label: <PresetsLabel title="过去14天" />, value: [dayjs().add(-15, 'd'), dayjs().add(-1, 'd')] },
  ];
  const onRangeChange = (dates: null | (Dayjs | null)[], dateStrings: string[]) => {
    if (dates) {
      dispatch(setRangeDate(dateStrings));
      onSearch(dateStrings[0], dateStrings[1]);
    } else {
      dispatch(setRangeDate(dateStrings));
      onSearch(dateStrings[0], dateStrings[1]);
    }
  };
  // 限制动态的日期区间选择
  const disabledDate = (current: Dayjs) => {
    return current.isAfter(dayjs(), 'days');
    // const range = current.isAfter(dayjs(), 'days');
    // if (!rangeDates || (!rangeDates[0] && !rangeDates[1])) {
    //   return range;
    // }
    // const tooLate = rangeDates && rangeDates?.[0] && current.diff(rangeDates[0], 'days') >= 15;
    // const tooEarly = rangeDates && rangeDates?.[1] && (dayjs(rangeDates[1])).diff(current, 'days') >= 15;
    // return range || !!tooEarly || !!tooLate;
  };

  return (
    <DatePicker.RangePicker
      value={dates}
      popupClassName={styles.searchTimePopBox}
      presets={rangePresets}
      format={'YYYY-MM-DD'}
      onChange={onRangeChange}
      disabledDate={disabledDate}
    />
  );
};

export default AdReportSearchTime;
