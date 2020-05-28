import Modal from './Modal.svelte'
import { detach, insert, noop } from 'svelte/internal'

function createModal (Element, props) {
  let container = document.createElement('div')
  container.className = 'modal-card'

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

  const elem = new Element({
    target: container,
    props: { ...props, dispatch: modal.$$.ctx.dispatch },
    intro: true
  })

  modal.$on('destroy', () => {
    modal.$destroy()
  })

  return modal.promise || modal
}

export default createModal
