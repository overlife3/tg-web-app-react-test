import React, { useState } from 'react'
import "./ProductList.css"
import ProductItem from '../ProductItem/ProductItem'
import { useTelegram } from '../hooks/useTelegram'

const products = [
	{id: '1', title: "Джинсы", price: 5000, description: "Синего цвета, прямые"},
	{id: '2', title: "Куртка", price: 15000, description: "Зеленого цвета, теплая"},
	{id: '3', title: "Джинсы 2", price: 2000, description: "Красного цвета, прямые"},
	{id: '4', title: "КУртка 2", price: 3000, description: "Розового цвета, теплая"},
	{id: '5', title: "Джинсы 3", price: 2000, description: "Серого цвета, прямые"},
	{id: '6', title: "Куртка 3", price: 15000, description: "Белого цвета, теплая"},
	{id: '7', title: "Джинсы 4", price: 12000, description: "Черного цвета, прямые"},
	{id: '8', title: "Куртка 4", price: 13000, description: "Голубого цвета, теплая"},
]

const getTotalPrice = (items = []) => {
	return items.reduce((acc, item) => {
		return acc += item.price
	}, 0)
}

export default function ProductList() {
	const [addedItems, setAddedItems] = useState([])
	const {tg, queryId} = useTelegram()

	const onAdd = (product) => {
		const alreadyAdded = addedItems.find(item => item.id === product.id);
		let newItems = []
		if (alreadyAdded) {
			newItems = addedItems.filter(item => item.id !== product.id)
		} else {
			newItems = [...addedItems, product]
		}

		setAddedItems(newItems)

		if(newItems.length === 0) {
			tg.MainButton.hide()
		} else {
			tg.MainButton.show()
			tg.MainButton.setParams({
				text: `Купить ${getTotalPrice(newItems)}`
			})
		}
	}

	const onSendData = useCallback(() => {
		const data =  {
			products: addedItems,
			totalPrice: getTotalPrice(addedItems),
			queryId
		}
		fetch("http://localhost:8000", {
			method: "POST",
			headers: {
				"Content-Type":"application/json"
			},
			body: JSON.stringify(data)
		})
			
	}, [tg, country, street, subject])

	useEffect(() => {
		tg.onEvent("mainButtonClicked", onSendData)
		return () => {
			tg.offEvent("mainButtonClicked", onSendData)
		}
	}, [tg, onSendData])


	return (
		<div className='list'>
			{products.map(item => (
				<ProductItem 
					product={item}
					onAdd={onAdd}
					className={"item"}				
				/>
			))}
		</div>
	)
}
