import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Button } from "../ui/button"

import { flag } from "../Store/store"
import CountDown from "./CountDown"

import { compareDates } from "@/lib/utils"
import { toast } from "react-toastify"

type Props = {
	_id: string
	title: string
	description: string
	date: Date
	status: string
}
const TaskCard = ({ _id, title, description, date, status }: Props) => {
	const handleDelete = async (id: string) => {
		try {
			await fetch(`http://localhost:8000/api/tasks/${id}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			})
		} catch (error) {
			let message
			if (error instanceof Error) message = error.message
		}

		flag.value = !flag.value
	}

	const statusCheck = () => {
		if (compareDates(new Date(date), new Date()) === -1) {
			return "Completed"
		} else {
			return CountDown({ date })
		}
	}

	return (
		<div className="p-1">
			<Card className="h-80 w-60 flex-col items-center justify-center overflow-hidden">
				<CardHeader>
					<CardTitle className="min-w-30 w-40 overflow-hidden">
						{title}
					</CardTitle>
					<CardDescription className="max-w-30">{description}</CardDescription>
				</CardHeader>
				<CardContent>{statusCheck()}</CardContent>
				<CardFooter>
					<Button variant="destructive" onClick={() => handleDelete(_id)}>
						Delete
					</Button>
				</CardFooter>
			</Card>
		</div>
	)
}

export default TaskCard
