import { DialogOptions } from './base'

declare function Confirm(msg: string, options?: DialogOptions): Promise<void>

declare namespace Confirm {
  const confirm: (msg: string, options?: DialogOptions) => void;
  const config: (options: DialogOptions) => void;
}

export default Confirm
