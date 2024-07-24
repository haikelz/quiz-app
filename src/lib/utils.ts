import Axios, { AxiosRequestConfig } from "axios";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const env = {
  API_URL: import.meta.env.VITE_API_URL,
};

const config: AxiosRequestConfig = {
  responseType: "json",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

export const axios = Axios.create(config);
