<template lang="pug">
	.form__container
		.form__main
			DynamicForm(:schema="formSchema")
</template>

<script lang="ts">
import DynamicForm from '@/components/Home/ResidentForm/DynamicForm.vue';
import * as yup from 'yup';


export default {
	components: {
		DynamicForm
	},
	data () {
		return {
			formSchema: {
				fields: [
					{
						label: 'Наименование организации / ИП',
						name: 'name',
						as: 'input',
						semantic: 'single',
						rules: yup.string().min(6, 'Минимум 6 символов').required('Поле должно быть действительным наименованием организации / ИП'),
						fieldValue: ''
					},
					{
						label: 'Контактный телефон',
						name: 'phone',
						as: 'input',
						semantic: 'single',
						rules: yup.string().min(18, 'Минимум 11 символов').max(18, 'Максимум 11 символов').required('Поле должно быть действительным контактным телефон'),
						fieldValue: ''
					},
					{
						label: 'Тип помещения',
						name: 'type',
						as: 'input',
						semantic: 'single',
						rules: yup.string(),
						fieldValue: '',
						children: [
							{
								tag: 'option',
								value: 'work',
								text: 'Производственная площадь',
							},
							{
								tag: 'option',
								value: 'tea',
								text: 'Жилые помещение',
							},
							{
								tag: 'option',
								value: 'coke',
								text: 'Помещения для обслуживающего персонала',
							},
						],
					},
					{
						label: 'Адрес',
						name: 'address',
						semantic: 'single',
						as: 'input',
						type: 'text',
						rules: yup.string().min(6, 'Минимум 6 символов').required('Поле должно быть действительным адресом'),
						fieldValue: '',
					},
					{
						label: 'Площадь помещения (м2)',
						name: 'square',
						type: 'number',
						semantic: 'double',
						as: 'input',
						prepositions: ['от', 'до'],
						fieldValue: ['', ''],
					},
					{
						label: 'Дата начала аренды',
						name: 'date',
						type: 'date',
						semantic: 'double',
						as: 'input',
						prepositions: ['с', 'по'],
						fieldValue: [null, null],
					},
				],
			}
		}
	},
}

</script>