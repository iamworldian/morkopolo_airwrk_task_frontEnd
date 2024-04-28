import { effect, signal, useComputed, useSignal } from "@preact/signals-react"

import { flag } from "../Store/store"
import { toast } from "react-toastify"

type Props = {
	date: Date
}
const CountDown = ({ date }: Props) => {
	const getReturnValues = (countDown) => {
		const days = Math.floor(countDown / (1000 * 60 * 60 * 24))
		const hours = Math.floor(
			(countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
		)
		const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60))
		const seconds = Math.floor((countDown % (1000 * 60)) / 1000)

		return { days, hours, minutes, seconds }
	}
	const countDownDate = new Date(date).getTime()

	const countDown = signal(0)
	const days = signal(0)
	const hours = signal(0)
	const minutes = signal(0)
	const seconds = signal(0)

	const interValId = signal(
		setInterval(() => {
			countDown.value = countDownDate - new Date().getTime()
			timerState.value = getReturnValues(countDown.value)
			hours.value = timerState.value.hours
			minutes.value = timerState.value.minutes
			days.value = timerState.value.days
			seconds.value = timerState.value.seconds
			if (countDown.value < 1) {
				toast("Task Completed")
				clearInterval(interValId.value)
			}
		}, 1000),
	)

	const timerState = signal({})

	effect(() => {})

	return (
		<div className="w-50 h-30 flex items-center justify-center">
			<p className="m-1 rounded-lg bg-purple-100 p-3">{days}</p>
			<p className="m-1 rounded-lg bg-purple-100 p-3">{hours}</p>
			<p className="m-1 rounded-lg bg-purple-100 p-3">{minutes}</p>
			<p className="m-1 rounded-lg bg-purple-100 p-3">{seconds}</p>
		</div>
	)
}

export default CountDown
