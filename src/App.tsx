import AllTaskList from "./components/myComponents/AllTaskList"
import { CreateTaskForm } from "./components/myComponents/CreateTaskForm"

function App() {
	return (
		<>
			<div className="w-full bg-slate-100">
				<div className="text-xxl flex h-20 w-full items-center justify-center bg-slate-200 font-mono text-2xl">
					Task Manager
				</div>
				<div className="flex h-20 w-full items-center justify-center">
					<CreateTaskForm />
				</div>
				<div className="flex w-full items-center justify-center">
					<AllTaskList />
				</div>
			</div>
		</>
	)
}

export default App
