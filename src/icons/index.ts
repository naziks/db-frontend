/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import * as solid from '@fortawesome/free-solid-svg-icons'
import * as regular from '@fortawesome/free-regular-svg-icons'
import * as brands from '@fortawesome/free-brands-svg-icons'

/* add icons to the library */
library.add(solid.faDashboard)
library.add(solid.faUser)
library.add(solid.faUsers)
library.add(solid.faBeer)
library.add(solid.faUserShield)
library.add(solid.faBed)
library.add(solid.faRightFromBracket)
library.add(solid.faRightToBracket)
library.add(solid.faPersonRunning)
library.add(solid.faSkullCrossbones)
library.add(solid.faArrowRightArrowLeft)
library.add(solid.faInfoCircle)
library.add(solid.faSpinner)

export default library;