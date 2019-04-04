import Icon from './icon'
import InfoIcon from './svgs/info'
import SuccessIcon from './svgs/success'
import ErrorIcon from './svgs/error'
import WarningIcon from './svgs/warning'
import LoadingIcon from './svgs/loading'
import QuestionIcon from './svgs/question'

Icon.add(InfoIcon.name, InfoIcon)
Icon.add(SuccessIcon.name, SuccessIcon)
Icon.add(ErrorIcon.name, ErrorIcon)
Icon.add('danger', ErrorIcon)
Icon.add(WarningIcon.name, WarningIcon)
Icon.add(LoadingIcon.name, LoadingIcon)
Icon.add(QuestionIcon.name, QuestionIcon)

export default Icon
