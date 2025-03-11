<template lang="pug">
	.home__container
		button.home__button(@click="open()") Стать резидентом
		
		ModalsContainer
</template>

<script lang="ts">
import ResidentForm from '@/components/Home/ResidentForm/index.vue'
import { ModalsContainer } from 'vue-final-modal'
import MainForm from '@/components/UI/Form/index.vue'


import form from '@/mixins/form.js'

export default {
	mixins: [form],
		components: {
			ModalsContainer
	},
	data () {
		return {
		}
	},
	created () {
		this.initModal(MainForm, 'Заполните заявку, чтобы стать резидентом', ResidentForm, this.close)
	},
	methods: {
		open () {
			this.openModal()
		},
		close() {
			this.closeModal()
		}
	}
}
</script>

<style lang="sass">
.home__button
	background: var(--main-color)
	font-weight: 500
	font-size: 1.4rem
	border: none
	color: white
	padding: 1.2rem 4rem
	outline: none
	border-radius: 100rem
	cursor: pointer
	position: fixed
	top: 50%
	left: 50%
	transform: translate(-50%, -50%)
</style>



