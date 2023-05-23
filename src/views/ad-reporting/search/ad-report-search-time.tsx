import React, { FC, useRef } from "react";
import { DatePicker, Tag } from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from "@/store";
import { setFormRelatedDynamicDate, setRangeDate } from "@/store/modules/app.module";
import styles from "@/views/ad-reporting/search/ad-report-search.module.scss";
import { EFormRelatedDynamicDate } from "@/service/index.interfaces";
const { CheckableTag } = Tag;

type RangeValue = [Dayjs | null, Dayjs | null] | null;

interface IProps {
  formRelatedDynamicDate: EFormRelatedDynamicDate;
}

const AdReportSearchTime: FC<IProps> = ({ formRelatedDynamicDate }) => {
  const dispatch = useAppDispatch();

  const dates: RangeValue = useAppSelector(state => {
    const startDate = state.app.detail.structure.startDate;
    const s = startDate ? dayjs(startDate) : null;
    const endDate = state.app.detail.structure.endDate;
    const e = startDate ? dayjs(endDate) : null;
    return (s || e) ? [s, e] : null;
  });
  const isFormRelatedDynamicDate = useRef(formRelatedDynamicDate !== EFormRelatedDynamicDate.normal); // 是否修改
  const onCalendarChange = () => {
    if (isFormRelatedDynamicDate.current) {
      isFormRelatedDynamicDate.current = false;
    } else {
      dispatch(setFormRelatedDynamicDate(EFormRelatedDynamicDate.normal));
    }
  };
  // 改动时切记数据变化
  const onPresetsLabelClick = (dateCode: EFormRelatedDynamicDate) => {
    isFormRelatedDynamicDate.current = true;
    dispatch(setFormRelatedDynamicDate(dateCode));
  };
  const PresetsLabel = ({ title, dateCode }: { title: string; dateCode: EFormRelatedDynamicDate; }) => {
    return  <CheckableTag
      className={styles.searchTimePopLabel}
      checked={dateCode === formRelatedDynamicDate}
      onChange={() => onPresetsLabelClick(dateCode)}
    >
      {title}
    </CheckableTag>;
  };

  const rangePresets: { label: React.ReactNode; value: [Dayjs, Dayjs]; }[] = [
    { label: <PresetsLabel dateCode={EFormRelatedDynamicDate.today} title="今天" />, value: [dayjs(), dayjs()] },
    { label: <PresetsLabel dateCode={EFormRelatedDynamicDate.lastDay} title="昨天" />, value: [dayjs().add(-1, 'd'), dayjs().add(-1, 'd')] },
    { label: <PresetsLabel dateCode={EFormRelatedDynamicDate.lastSeven} title="过去7天" />, value: [dayjs().add(-7, 'd'), dayjs().add(-1, 'd')] },
    { label: <PresetsLabel dateCode={EFormRelatedDynamicDate.lastFourteen} title="过去14天" />, value: [dayjs().add(-14, 'd'), dayjs().add(-1, 'd')] },
  ];
  const onRangeChange = (dates: null | (Dayjs | null)[], dateStrings: string[]) => {
    console.log('日期范围搜索 From: ', dateStrings);
    if (dates) {
      dispatch(setRangeDate(dateStrings));
    } else {
      dispatch(setRangeDate(dateStrings));
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
      onCalendarChange={onCalendarChange}
      onChange={onRangeChange}
      disabledDate={disabledDate}
    />
  );
};

export default AdReportSearchTime;
