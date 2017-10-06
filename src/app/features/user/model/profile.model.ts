/**
 * Created by LAE84266 on 16/08/2017.
 */

export interface IProfile {
  personal: IPersonal;
  relevant: IEventRelatedInfo;
  group: IGroupInfo;
}

export interface IPersonal {
  fullname?: string;
  gender?: string;
  birthday?: string;
  address?: string;
  postcode?: string;
  phonenumber?: string;
}

export interface IEventRelatedInfo {
  general: IGeneralInfo;
  ski: ISkiInfo;
  hiking: IHikingInfo;
  running: IRunningInfo;
  bicycling: IBicyclingInfo;
  camping: ICampingInfo;
  others: IOthersInfo;
}

export interface IGroupInfo {
  data: string;
}

export interface IGeneralInfo {
  data: string;
}

export interface ISkiInfo {
  data: string;
}

export interface IHikingInfo {
  data: string;
}

export interface IRunningInfo {
  data: string;
}

export interface IBicyclingInfo {
  data: string;
}

export interface ICampingInfo {
  data: string;
}

export interface IOthersInfo {
  data: string;
}

