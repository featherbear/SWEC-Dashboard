import Modal from './Modal.svelte'
import { detach, insert, noop } from 'svelte/internal'

function createModal (Element, props) {
  let container = document.createElement('div')
  container.className = 'modal-content'

  const elem = new Element({
    target: container,
    props,
    intro: true
  })

  const modal = new Modal({
    target: document.body,
    props: {
      $$slots: {
        /* https://github.com/sveltejs/svelte/issues/2588#issuecomment-488343541 */
        launcherTarget: [
          function () {
            return {
              c: noop,

              m: function mount (target, anchor) {
                insert(target, container, anchor)
              },

              d: function destroy (detaching) {
                if (detaching) {
                  detach(container)
                }
              },

              l: noop
            }
          }
        ]
      },
      $$scope: {}
    }
  })

  modal.$on('destroy', () => {
    modal.$destroy()
  })

  return modal.promise
}

export default createModal
