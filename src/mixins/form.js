import { ModalsContainer, useModal } from 'vue-final-modal'

export default {
  name: '#form',
  data() {
      return {
          mainResidentModal: null
      }
  },
  methods: {
    initModal (formType, title, slot, confirmFunction) {
      if(formType === undefined || title === undefined || slot === undefined || confirmFunction === undefined) return null
      this.mainResidentModal = useModal({
        component: formType,
        attrs: {
          title: title,
          onConfirm() {
            confirmFunction()
          },
        },
        slots: {
          default: slot
        }
      })
    },
    openModal () {
      this.mainResidentModal.open()
    },
    closeModal () { 
      this.mainResidentModal.close()
    }
  }
}