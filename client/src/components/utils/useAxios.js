import axios from "axios"
import { makeUseAxios } from "axios-hooks";
import config from "../../config";

const { baseURL } = config;

export const useAxios = makeUseAxios({
	axios: axios.create({baseURL})
});
