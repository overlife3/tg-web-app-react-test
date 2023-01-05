import React, { useEffect } from 'react'
import "./Form.css"
import { useState } from 'react'
import { useTelegram } from '../hooks/useTelegram'

export default function Form() {
	const [country, setCountry] = useState('')
	const [street, setStreet] = useState('')
	const [subject, setSubject] = useState('physical')
	const {tg} = useTelegram()	

	useEffect(() => {
		tg.MainButton.setParams({
			text: "Отправить данные"
		})
	}, [tg])

	useEffect (() => {
		if (!street || !country) {
			tg.MainButton.hide();
		} else {
			tg.MainButton.show();
		}
	}, [country, street, tg])

	const onChangeCountry = (e) => {
		setCountry(e.target.value);
	}

	const onChangeStreet = (e) => {
		setStreet(e.target.value);
	}

	const onChangeSubject = (e) => {
		setSubject(e.target.value);
	}
	return (
		<div className='form'>
			<h3>Введите ваши данные</h3>
			<input 
				className='input' 
				type="text" 
				placeholder='Страна' 
				value={country}
				onChange={onChangeCountry}
			/>
			<input 
				className='input' 
				type="text" 
				placeholder='Улица' 
				value={street}
				onChange={onChangeStreet}
			/>

			<select className='select' value={subject} onChange={onChangeSubject}>
				<option value={"legal"}>
					Юр. лицо
				</option>
				<option value={"physical"}>
					Физ. лицо
				</option>
			</select>
		</div>
	)
}
