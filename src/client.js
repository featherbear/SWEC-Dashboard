import * as sapper from '@sapper/app'

import './global.css'
import 'bulma/css/bulma.css'

sapper.start({
  target: document.querySelector('#sapper')
})
