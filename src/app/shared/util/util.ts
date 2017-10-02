/**
 * Created by qiz264 on 2017-04-20.
 */
import { FormGroup } from '@angular/forms';

import { IMessageElement } from 'app/config/interfaces';
import { AppConstant, MediaQueryBreakPoint } from 'app/config/common/app.config';


export enum KeyCode {
  BACKSPACE = 8,
  TAB = 9,
  ENTER = 13,
  ESC = 27,
  SPACE = 32,
  PAGE_UP = 33,
  PAGE_DOWN = 34,
  END = 35,
  HOME = 36,
  LEFT_ARROW = 37,
  UP_ARROW = 38,
  RIGHT_ARROW = 39,
  DOWN_ARROW = 40,
  DELETE = 46
}

export class Util {

  private static PLATFORM_IOS_PATTERN = /(iPhone|iPad)/i;
  private static APPVERSION_IOS_PATTERN = /(iPhone|iPad)/i;
  private static PLATFORM_ANDROID_PATTERN = /(Linux armv)/i;
  private static APPVERSION_ANDROID_PATTERN = /(Android)/i;
  private static USERAGENT_ANDROID_PATTERN = /(Android)/i;

  // public static deviceType() {
  //   if (window.navigator.platform.match(this.PLATFORM_IOS_PATTERN)) {
  //     return 'ios';
  //   } else if (window.navigator.platform.match(this.PLATFORM_ANDROID_PATTERN) ||
  //     window.navigator.userAgent.match(this.USERAGENT_ANDROID_PATTERN)) {
  //     return 'android';
  //   } else {
  //     return 'desktop';
  //   }
  // }
  //
  // public static isDeviceSimulator() {
  //   const appVersion = window.navigator.appVersion;
  //   const platform = window.navigator.platform;
  //   if ((appVersion.match(this.APPVERSION_IOS_PATTERN) && !platform.match(this.PLATFORM_IOS_PATTERN)) ||
  //         (appVersion.match(this.APPVERSION_ANDROID_PATTERN) && !platform.match(this.PLATFORM_ANDROID_PATTERN))) {
  //     return true;
  //   }
  // }
  //
  // public static isPhoneOrTablet(): boolean {
  //   if (window.navigator.platform.match(this.PLATFORM_IOS_PATTERN) ||
  //       window.navigator.platform.match(this.PLATFORM_ANDROID_PATTERN) ||
  //       window.navigator.userAgent.match(this.USERAGENT_ANDROID_PATTERN) ||
  //       window.navigator.appVersion.match(this.APPVERSION_IOS_PATTERN) ||
  //       window.navigator.appVersion.match(this.APPVERSION_ANDROID_PATTERN)) {
  //     return true;
  //   }
  // }

  public static currentMediaQueryBreakPoint(): MediaQueryBreakPoint {
    const width = window.innerWidth;
    if (width < AppConstant.PHONE_TOGGLE_BREAKPOINT) {
      return MediaQueryBreakPoint.EXTRA_SMALL;
    } else if (width >= AppConstant.PHONE_TOGGLE_BREAKPOINT && width < AppConstant.TABLET_TOGGLE_BREAKPOINT) {
      return MediaQueryBreakPoint.SMALL;
    } else {
      return MediaQueryBreakPoint.MEDIUM;
    }
  }

  public static isBreakPointOf(winSize: number, expectedBreakPoint: MediaQueryBreakPoint): boolean {
    switch (expectedBreakPoint) {
      case MediaQueryBreakPoint.EXTRA_SMALL: {
        return winSize < AppConstant.PHONE_TOGGLE_BREAKPOINT;
      }
      case MediaQueryBreakPoint.GREATER_THAN_EXTRA_SMALL: {
        return winSize >= AppConstant.PHONE_TOGGLE_BREAKPOINT;
      }
      case MediaQueryBreakPoint.SMALL: {
        return winSize >= AppConstant.PHONE_TOGGLE_BREAKPOINT && winSize < AppConstant.TABLET_TOGGLE_BREAKPOINT;
      }
      case MediaQueryBreakPoint.MEDIUM: {
        return winSize >= AppConstant.TABLET_TOGGLE_BREAKPOINT;
      }
      case MediaQueryBreakPoint.LESS_THAN_MEDIUM: {
        return winSize < AppConstant.TABLET_TOGGLE_BREAKPOINT;
      }
    }
  }

  public static sortByProperty(prop: string) {
    return (a, b) =>
      a[prop].toLowerCase() !== b[prop].toLowerCase() ? a[prop].toLowerCase() < b[prop].toLowerCase() ? -1 : 1 : 0;
  }

  public static createErrorMessage(name: string, error: string): IMessageElement {
    return {
      name: name,
      message: {
        display: error,
        type: 'error',
        icon: {
          class: 'fa-times-circle',
          type: 'fa'
        }
      }
    };
  }
}
