<template lang="pug">
	Form.dynamic__input-main(@submit="onSubmit" immediate)
		.dynamic__input-container(
			v-for="{ as, name, label, semantic, fieldValue, children, ...attrs }, index in schema.fields"
			:key="name"
		)
			.dynamic__input-area(v-if="semantic == 'single'")
				label.dynamic__input-label(:class="{'dynamic__input-label-active': activeIndex === index || schema.fields[index].fieldValue.length > 0}" :for="name") {{ label }}

				Field.dynamic__input(
					v-if="name == 'phone'"
					:as="as"
					:id="name" 
					:name="name"
					v-model="schema.fields[index].fieldValue"
					@focus="activeIndex = index" 
					@blur="activeIndex = -1, showAddress = false"
					type="tel"
					v-bind="attrs"
					v-phonemask
				)
				Field.dynamic__input.dynamic__input-type(
					v-if="name == 'type'"
					:as="as"
					:id="name"
					:name="name"
					v-model="schema.fields[index].fieldValue"
					@focus="activeIndex = index, showTypes = true" 
					@blur="onBlur('types')"
					readonly
					:rules="validateType"
					@click="showTypes = true"
					@mouseover="listModalActive = true" 
					@mouseleave="listModalActive = false"
				)
				Field.dynamic__input(
					v-else-if="name != 'type' && name != 'phone'"
					:as="as" 
					:id="name" 
					:name="name"
					v-model="schema.fields[index].fieldValue"
					v-bind="attrs"
					@focus="onFocus(name, index)" 
					@blur="onBlur()"
				)


				img.dynamic__input-chevron(v-if="name == 'type'" src="@/assets/icons/chevron.svg" :class="{'dynamic__input-chevron-rotated': children && children.length && activeIndex == index && listModalActive|| showTypes}")

				.dynamic__input-options(
					v-if="children && children.length && activeIndex == index && listModalActive|| showTypes"
					@mouseover="listModalActive = true" 
					@mouseleave="listModalActive = false"
				)
					component.dynamic__input-children(
						v-for="({ tag, text, ...childAttrs }, idx) in children"
						:key="idx"
						:is="tag"
						v-bind="childAttrs"
						@click="name == 'type'? chooseType(text) : ''"
					) {{ text }}


				.dynamic__input-options(
					v-if="name == 'address' && showAddress && !addressChoosen" 
					@mouseover="addressModalActive = true" 
					@mouseleave="addressModalActive = false"
				)
					.dynamic__input-children(
						v-for="(value, key) in address"
						:key="index"
						@click="chooseAddress(value.value)"
					) {{value.value}}
				.dynamic__options-loading(v-if="loadingQuery && name == 'address'") Загрузка..

				

			.dynamic__input-double(v-else)
				label.dynamic__double-label(:for="name") {{ label }}

				.dynamic__double-container
					.dynamic__double-main
						label.dynamic__double-prepositions {{schema.fields[index].prepositions[0]}}
						Field.dynamic__double-input(
							:as="as"
							:id="name + '_1'" 
							:name="name"
							:rules="validateRangeField"
							v-model="schema.fields[index].fieldValue[0]"
							v-bind="attrs"
						)
					.dynamic__double-main
						label.dynamic__double-prepositions {{schema.fields[index].prepositions[1]}}
						Field.dynamic__double-input(
							:as="as"
							:id="name + '_2'" 
							:name="name + '_2'" 
							v-model="schema.fields[index].fieldValue[1]"
							v-bind="attrs"
						)

			ErrorMessage.dynamic__input-error(:name="name")

		button.form__button(type="submit") Отправить 
</template>

<script lang="ts">
import { Form, Field, ErrorMessage } from 'vee-validate';
import phonemask from "@/directives/phonemask";

export default {
	name: 'DynamicForm',
	components: { 
		Form, Field, ErrorMessage
	},
	directives: {
       phonemask
    },
    computed: {
		address () {
			return this.$store.state.address.address
		}
	},
	data () {
		return {
			activeIndex: -1,
			queryTimeout: null,
			loadingQuery: false,
			showAddress: false,
			showType: false,
			addressModalActive: false,
			listModalActive: false,
			addressChoosen: false,
			showTypes: false
		}
	},
	props: {
		schema: {
			type: Object,
			required: true,
		},
	},
	methods: {
		validateType (value) {	
			if(value.length > 0) {
				return true
			}
			return 'Минимум 1 тип помещения'
		},
		validateRangeField (e, val) {
			let arr = [new Date(val.form[val.field]), new Date(val.form[val.field + '_2'])]

			if(arr[0] < arr[1] && val.form[val.field] != '' && val.form[val.field + '_2'] != '') return true
			return 'Недопустимые значения'
		},
		
		onFocus (name, index) {	
			this.activeIndex = index
			if(name == 'phone') this.showAddress = true
		},
		onBlur (name) {
			this.activeIndex = -1
			if(name == 'types' && !this.listModalActive) {
				this.showTypes = false
			}

			if(!this.addressModalActive && !this.loadingQuery) {
				this.showAddress = false
			}
		},
		onSubmit (values) {
			alert('Спасибо за заявку. Данные отправлены!')
			this.$store.dispatch('SEND_DATA', values)
		},
		chooseType (value) {
			let str = this.schema.fields[2].fieldValue
			
			let arr = []

			if(str.length == 0) {
				arr.push(value)
			}
			else {
				arr = str.split(', ')
				if (arr.indexOf(value) != -1) {
					arr.splice(arr.indexOf(value), 1)
				}
				else {
					arr.push(value)
				}
			}
			this.schema.fields[2].fieldValue = ''
			this.schema.fields[2].fieldValue += arr.join(', ')
			document.getElementById("type").focus();
		},
		chooseAddress (value) {
			this.schema.fields[3].fieldValue = value
			this.showAddress = false
			this.addressModalActive = false
			this.addressChoosen = true
		}
	},
	watch: {
		'schema.fields.3.fieldValue': {
			handler: function (val, oldVal) {
				clearTimeout(this.queryTimeout)
				if(this.addressChoosen) {
					this.addressChoosen = false
					return
				}
				this.loadingQuery = true
				this.showAddress = false
				this.queryTimeout = setTimeout(()=>{
					this.loadingQuery = false
					this.addressModalActive = true
					this.showAddress = true
					this.$store.dispatch('GET_ADDRESS', val)
				}, 1500)
			},
			deep: true
		}
			
	}
};
</script>

<style scoped lang="sass">
.dynamic__input-main
	display: flex
	gap: 2rem
	flex-direction: column
	flex-wrap: nowrap
	.dynamic__input-container
		position: relative
		.dynamic__input-area
			position: relative
			.dynamic__input-type
				caret-color: transparent
				cursor: pointer
				padding: 3.35rem 5rem 1.05rem 2rem
			.dynamic__input-chevron
				transition: 0.3s ease all
				right: 2rem
				position: absolute
				top: 50%
				transform: translateY(-50%)
			.dynamic__input-chevron-rotated
				transform: rotate(180deg) translateY(50%);
		.dynamic__input-label
			position: absolute
			top: 50%
			left: 2rem
			transform: translateY(-50%)
			font-size: 1.4rem
			font-weight: 300
			color: var(--main-color)
			transition: 0.3s ease all
		.dynamic__input-label-active
			top: 0;
			transform: translateY(1.05rem);
		.dynamic__input
			width: 100%
			border: 0.2rem solid rgba(247, 248, 248, 1)
			padding: 3.35rem 2rem 1.05rem 2rem
			font-size: 1.8rem
			color: rgba(23, 75, 124, 1)
			font-weight: 500
			outline: none
		.dynamic__input-error
			padding-top: 2rem
			display: block
			font-size: 1.4rem
			font-weight: 300
			color: red
		.dynamic__input-double
			.dynamic__double-label
				font-size: 1.4rem
				margin-bottom: 2rem
				font-weight: 300
				color: var(--main-color)
				transition: 0.3s ease all
				display: inline-block
			.dynamic__double-container
				display: flex
				flex-direction: row
				gap: 0.8rem
				flex-wrap: nowrap
				.dynamic__double-main
					position: relative
					width: 100%
					.dynamic__double-prepositions
						position: absolute
						padding: 0 2rem
						transform: translateY(-50%)
						top: 50%
						font-size: 1.4rem
						font-weight: 300
						color: var(--main-color)
					.dynamic__double-input
						width: 100%
						border: 0.2rem solid rgba(247, 248, 248, 1)
						padding: 2rem 2.2rem 2rem 5rem
						text-align: right
						font-size: 1.8rem
						color: rgba(23, 75, 124, 1)
						font-weight: 500
						outline: none
.form__button
	font-weight: 500
	font-size: 1.4rem
	border: none
	color: white
	padding: 1.2rem 4rem
	outline: none
	border-radius: 100rem
	cursor: pointer
	background: var(--main-color)
	margin-top: 2rem
	width: fit-content
	align-self: center
.dynamic__input-options
	position: absolute
	display: flex
	flex-direction: column
	width: 100%
	overflow-y: scroll
	max-height: 21rem
	z-index: 2
	.dynamic__input-children
		border: 0.2rem solid #f7f8f8
		width: 100%
		cursor: pointer
		background-color: white
		padding: 2.4rem 2rem
		font-size: 1.4rem;
		color: var(--main-color);
		font-weight: 600;
.dynamic__options-loading
	border: 0.2rem solid #f7f8f8
	width: 100%
	position: absolute
	background-color: white
	padding: 2.4rem 2rem
	font-size: 1.4rem
	color: var(--main-color)
	font-weight: 600
	z-index: 2
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button
	-webkit-appearance: none
	margin: 0
input::-webkit-calendar-picker-indicator
	display: none
</style>