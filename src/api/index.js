/* eslint-disable */
import {get,post} from "./http"


export const getAllData=(name)=>get(`/getTenData?name=${name}`);