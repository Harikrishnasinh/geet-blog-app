import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const addElipsis = (str: any, limit: any) =>{
  return str.length > limit ? str.substring(0,limit) + '...' : str;
}