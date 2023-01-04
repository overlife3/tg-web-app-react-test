import React from "react";
import Button from "../Button/Button";
import { useTelegram } from "../hooks/useTelegram";

export function Header() {
	const {user, onClose} = useTelegram();

	return (
		<div className={"header"}>
			<Button onClick={onClose}>Закрыть</Button>
			<span className={"username"}>
				{user?.first_name + " топ"}
			</span>
		</div>
	)
}