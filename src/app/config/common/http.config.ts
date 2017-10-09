export const HttpConfig = {
  HTTP_TIMEOUT: 10000,           // in millisecond
  HTTP_RETRY_DELAY: 1000,        // in millisecond
  HTTP_RETRY_MAX: 3,
  ERROR: {
    SYSTEM_UNAVAILABLE: 'ERRORS.GENERIC.SYSTEM_UNAVAILABLE',
    GATEWAY_TIMEOUT: 'ERRORS.GENERIC.GATEWAY_TIMEOUT',
    GENERIC: 'ERRORS.GENERIC.OTHERS'
  }
};

// const ENDPOINT_BASE = 'http://127.0.0.1:10007/api/';
const ENDPOINT_BASE = 'http://68.149.121.215:8080/api/';

const EndPointConfig = {
  auth: {
    signup: 'auth/signup',
    signin: 'auth/signin',
    forgotPassword: 'auth/forgotpassword',
    resetPassword: 'auth/resetpassword',
    sendVerifyEmail: 'auth/sendverifyemail',
    verifyEmail: 'auth/verifyemail',
    refreshToken: 'auth/refreshtoken'
  },
  profile: {
    changePassword: 'profile/changepassword',
    getProfile: 'profile/userprofile',
    saveProfile: 'profile/userprofile'
  }
};

export class EndPoint {
  static getUrl = (urlKey: string) => {
    return ENDPOINT_BASE + urlKey.split('.').reduce((previous, current) => {
      return previous[current];
    }, EndPointConfig);
  }
}
