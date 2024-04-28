import { flag, taskList } from "../Store/store"
import { toast } from "react-toastify"
import TaskCard from "./TaskCard"

import { useSignalEffect, useSignals } from "@preact/signals-react/runtime"

const AllTaskList = () => {
	useSignals()
	useSignalEffect(() => {
		const fetchTasks = async () => {
			try {
				const response = await fetch(`http://localhost:8000/api/tasks/`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				})

				let data = await response.json()
				taskList.value = [...data]
			} catch (error) {
				let message
				if (error instanceof Error) message = error.message
				toast(message)
			}
		}
		console.log(flag.value)
		fetchTasks()
	})

	return (
		<div className="flex h-3/4 w-5/6 flex-wrap items-center justify-center">
			{taskList.value.map((task: any) => {
				return TaskCard(task)
			})}
		</div>
	)
}

export default AllTaskList
