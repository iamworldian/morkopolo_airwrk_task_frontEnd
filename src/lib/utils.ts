import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function compareDates(date1: Date, date2: Date) {
	if (date1 < date2) {
		return -1
	} else if (date1 > date2) {
		return 1
	} else {
		return 0
	}
}
