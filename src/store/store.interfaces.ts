export enum EDevice {
  mobile = 1,
  pc = 2,
}

export interface IAppStore {
  device: EDevice;
  footerAdVisible: boolean;
}
