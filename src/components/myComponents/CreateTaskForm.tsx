import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus } from "lucide-react"
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from "react"
import { toast } from "react-toastify"
import { flag, taskList } from "../Store/store"

export function CreateTaskForm() {
	const [title, setTitle] = useState<string>("")
	const [description, setDescription] = useState<string>("")
	const [scheduleDate, setScheduleDate] = useState<Date>(new Date())

	const handleCreateTask = async () => {
		const newTask = {
			title: title,
			description: description,
			date: scheduleDate,
		}

		try {
			const response = await fetch(`http://localhost:8000/api/tasks/`, {
				method: "POST",
				mode: "cors",
				cache: "no-cache",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newTask),
			})

			flag.value = !flag.value
			const res = await response.json()

			if (!response.ok) {
				toast(JSON.stringify(res))
			} else {
				toast("Data Updated Successfully")
			}
		} catch (error) {
			let message

			if (error instanceof Error) message = error.message
			toast(message)
		}
	}
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="outline">
					New Task
					<span className="pb-1 pl-3 font-mono">
						<Plus size={13} />
					</span>
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-100">
				<div className="grid gap-4">
					<div className="space-y-2">
						<h4 className="font-medium leading-none">New Task</h4>
						<p className="text-sm text-muted-foreground">
							Set the Task Values to schedule it.
						</p>
					</div>
					<div className="grid gap-2">
						<div className="grid grid-cols-3 items-center gap-4">
							<Label htmlFor="width">Title</Label>
							<Input
								id="width"
								className="col-span-2 h-8"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
							/>
						</div>
						<div className="grid grid-cols-3 items-center gap-4">
							<Label htmlFor="maxWidth">Description</Label>
							<Input
								id="maxWidth"
								className="col-span-2 h-8"
								value={description}
								onChange={(e) => setDescription(e.target.value)}
							/>
						</div>
						<div className="grid grid-cols-3 items-center gap-4">
							<Label htmlFor="height">Date Time</Label>
							<Input
								id="height"
								defaultValue="25px"
								className="col-span-2 h-8"
								type="datetime-local"
								min={new Date().toDateString()}
								onChange={(e) => setScheduleDate(new Date(e.target.value))}
							/>
						</div>

						<div className="items-right m-2 flex justify-end p-3">
							<Button
								variant="default"
								onClick={() => {
									handleCreateTask()
								}}
							>
								Create
							</Button>
						</div>
					</div>
				</div>
			</PopoverContent>
		</Popover>
	)
}
