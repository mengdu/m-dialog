import Vue from 'vue'
import { DialogOptions } from './base'
import Alert from './alert'
import Confirm from './confirm'

export declare type CloseType = 'user' | 'esc' | 'button' | 'modal';
export declare type IconType = 'info' | 'warning' | 'danger' | 'success' | 'question';

declare class Dialog extends Vue {
  static install (vue: typeof Vue, options?: Object): void;
  static Alert: typeof Alert;
  static Confirm: typeof Confirm;
  width?: string;
  autoWidth: boolean;
  top?: string;
  show: boolean;
  title?: string;
  noHead: boolean;
  appendToBody: boolean;
  closeOnClickModal: boolean;
  closeOnPressEscape: boolean;
  showClose: boolean;
  beforeClose?: (type: CloseType) => void;
  marginTop?: string;
  fadeName?: string;
}

export {
  Dialog as default,
  Dialog,
  Alert,
  Confirm
}

declare module 'vue/types/vue' {
  interface Vue {
    $alert: typeof Alert;
    $confrim: typeof Confirm;
  }
}
