import Icon from './icon'
import InfoIcon from './svgs/info'
import SuccessIcon from './svgs/success'
import ErrorIcon from './svgs/error'
import WarningIcon from './svgs/warning'
import LoadingIcon from './svgs/loading'
<<<<<<< HEAD
=======
import QuestionIcon from './svgs/question'
>>>>>>> dev

Icon.add(InfoIcon.name, InfoIcon)
Icon.add(SuccessIcon.name, SuccessIcon)
Icon.add(ErrorIcon.name, ErrorIcon)
<<<<<<< HEAD
Icon.add(WarningIcon.name, WarningIcon)
Icon.add(LoadingIcon.name, LoadingIcon)
=======
Icon.add('danger', ErrorIcon)
Icon.add(WarningIcon.name, WarningIcon)
Icon.add(LoadingIcon.name, LoadingIcon)
Icon.add(QuestionIcon.name, QuestionIcon)
>>>>>>> dev

export default Icon
