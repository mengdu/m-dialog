import { DialogOptions } from './base'

declare function Alert(msg: string, options?: DialogOptions): void;

declare namespace Alert {
  const alert: (msg: string, options?: DialogOptions) => void;
  const config: (options: DialogOptions) => void;
}

export default Alert
