import React, { FC } from 'react';
import { ISearchFieldItem } from "@/views/ad-reporting/index.interfaces";
import SearchPop from "@/components/search-pop";

interface IProps {
  fieldItem: ISearchFieldItem
}

const AdReportSearchPop: FC<IProps> = ({ fieldItem }) => {


  return (
    <SearchPop field={fieldItem.fieldName}>
      <div>wqwqwqwqwqwq</div>
    </SearchPop>
  );
};

export default AdReportSearchPop;
