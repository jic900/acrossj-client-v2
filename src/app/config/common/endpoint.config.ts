/**
 * Created by LAE84266 on 05/07/2017.
 */

const ENDPOINT_BASE = 'http://127.0.0.1:10007/api/';
// const ENDPOINT_BASE = 'http://68.149.121.215:8080/api/';

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
    changePassword: 'profile/changepassword'
  }
}

export class EndPoint {
  static getUrl = (urlKey: string) => {
    return ENDPOINT_BASE + urlKey.split('.').reduce((previous, current) => {
      return previous[current];
    }, EndPointConfig);
  }
}
