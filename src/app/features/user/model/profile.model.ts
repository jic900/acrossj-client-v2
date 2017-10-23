/**
 * Created by LAE84266 on 16/08/2017.
 */
import { ISelectItem } from 'app/config/interfaces/select-element.interface';

export interface IProfile {
  personal: IPersonal;
  relevant: IEventRelated;
  transportation: ITransportation;
  group: IGroup;
}

export interface IPersonal {
  fullname?: string;
  // gender?: string;
  gender?: ISelectItem[];
  gender2?: ISelectItem[];
  gender3?: ISelectItem[];
  gender4?: ISelectItem[];
  birthday?: string;
  address?: string;
  postcode?: string;
  phonenumber?: string;
}

export interface ITransportation {
  subwayStation?: string;
}

export interface IEventRelated {
  general: IGeneral;
  ski: ISki;
  hiking: IHiking;
  running: IRunning;
  bicycling: IBicycling;
  camping: ICamping;
  others: IOthers;
}

export interface IGroup {
  data: string;
}

export interface IGeneral {
  data: string;
}

export interface ISki {
  data: string;
}

export interface IHiking {
  data: string;
}

export interface IRunning {
  data: string;
}

export interface IBicycling {
  data: string;
}

export interface ICamping {
  data: string;
}

export interface IOthers {
  data: string;
}

