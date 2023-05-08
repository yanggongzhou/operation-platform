import { IAdsListItem } from "@/views/ads-reporting/index.interfaces";

export interface INetAdsList {
  rows: IAdsListItem[];
  total: number;
}

interface IItem { code: string; field: string; text: string; }

export interface INetBaseInfoList {
  app: IItem[];
  country: { countryName: string; countryCode2: string; }[];
  pline: IItem[];
  language: IItem[];
  media: IItem[];
  type: IItem[];
  device: IItem[];
}

export interface INetSearchList {
  target: IItem[];
  group: IItem[];
}
