export function useTelegram() {
	const tg = window.Telegram.WebApp;
	const onClose = () => {
		tg.close();
	}
	const onToggleButton = () => {
		if (tg.MainButton.isVisivle) {
			tg.MainButton.hide();
		} else {
			tg.MainButton.show();
		}
	}

	return {
		onClose,
		onToggleButton,
		tg,
		user: tg.initDataUnsafe?.user,
	}
}