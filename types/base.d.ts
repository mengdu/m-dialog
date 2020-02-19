export interface DialogOptions {
  title?: string;
  width?: string;
  iconType?: IconType;
  iconImg?: string;
  showClose: boolean;
  isMiddle: boolean;
  closeOnClickModal: boolean;
  closeOnPressEscape: boolean;
  controlButtonCenter: boolean;
  confirmButtonText?: string;
  cancelButtonText?: string;
  cancelButtonClassName?: string;
  confirmButtonClassName?: string;
  supportHTMLString?: string;
  callback?: () => void;
  fadeName?: 'scale-fade' | 'slide-fade' | string
}
