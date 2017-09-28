/**
 * Created by LAE84266 on 20/03/2017.
 */

export const AppConfig = {
  HOME_LOGO: '/assets/images/home_logo.png',
  HOME_BACKGROUND: '/assets/images/home_bg.png',
  USER_BACKGROUND: '/assets/images/user_bg.png',
  PLACE_SEARCH_RESULT_LIMIT: 5
};

export const AppConstant = {
  PHONE_TOGGLE_BREAKPOINT: 600,
  TABLET_TOGGLE_BREAKPOINT: 960
};

export const LOCALE = {
  CHINESE: 'zh',
  JAPANESE: 'ja',
  ENGLISH: 'en'
}

export const MOMENT_LOCALE = {
  CHINESE: 'zh-cn',
  JAPANESE: 'ja',
  ENGLISH: 'en'
}

export const DEFAULT_LOCALE = LOCALE.ENGLISH;
export const DEFAULT_MOMENT_LOCALE = MOMENT_LOCALE.ENGLISH;

export enum MediaQueryBreakPoint {
  EXTRA_SMALL,
  GREATER_THAN_EXTRA_SMALL,
  SMALL,
  MEDIUM,
  LESS_THAN_MEDIUM
}
