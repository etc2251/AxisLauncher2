import axios from "axios";
import { useSettings } from "../state/settings";

const dev = axios.create({
    baseURL: "http://127.0.0.1:3551"
})

const prod = axios.create({
    baseURL: "http://127.0.0.1:3551"
})

const isProd = useSettings().localhost