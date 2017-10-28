export interface IProfile {
  personal: IPersonal;
  relevant: IEventRelated;
  transportation: ITransportation;
  group: IGroup;
}


export interface IPersonal {
  fullname?: string;
  gender?: any;
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
  language?: any;
  height?: number;
  weight?: number;
  organizational?: any;
}

export interface ISki {
  data: string;
}

export interface IHiking {
  data: string;
}

export interface IRunning {
  shoeSize?: any;
  tShirtSize?: any;
  runnetId?: string;
  marathon?: any;
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

