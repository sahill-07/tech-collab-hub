import { getAuth } from "firebase/auth";
import '../config/firebase-config'
import { store } from '../store/index'
import axios, { AxiosError } from "axios"
import { setBasicUtilsSlice } from "../store/BasicUtilsSlice";
import { setUserSlice } from "../store/UserSlice";


const api = async (endpoint, data,method)=>{
    var idToken =  getAuth().currentUser;
    if(idToken) idToken = await idToken.getIdToken();
    if(!idToken) idToken = "bearer";
    const mainUrl = process.env.REACT_APP_BACKEND_URL;
        const instance = axios.create({
            baseURL: mainUrl,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: idToken
            }
        })

        try{
            if(method === 'post'){
                const response = await instance.post(endpoint, data);
                return response;
            }
            else if(method === 'get') {
                const response = await instance.get(endpoint);
                return response;
            }
        }catch(err){
            console.log("error aaya h" + err);
            store.dispatch(setBasicUtilsSlice({
                snackbar : {
                    msg: err.message,
                    severity: 'error'
                }
            }))
            return {
                status : 500,
                data: {
                    success: false
                }
            };
        }

}

export const getProjectListForLoggedOutUsers = async ()=> await api(`/project/projectlist/all`, '', 'get')
export const getProjectListForLoggedInUsers = async ()=> await api(`/project/projectlist/`, '', 'get')

export const postProject = async (json)=> await api(`/project/addproject`, json, 'post');
export const getFilters = async ()=> await api(`/project/getfilter`, '', 'get')
export const getProjectDetailsById = async (id)=> await api(`/project/projectid/${id}`, '', 'get')

export const postUser = async (data)=> await api('/user', data, 'post');
export const getUserDetails = async ()=> await api('/user/userDetail', '', 'get');
export const addToChatListApi = async (freinduid)=> await api(`/user/addToChatList/${freinduid}`, {}, 'post');
export const addToGroupChatListApi = async (freinduid)=> await api(`/user/addToGroupChatList/${freinduid}`, {}, 'post');
export const getFreindList = async ()=> await api('/user/getFreindList', '', 'get');

export const getUserDetailsUsingid = async (id)=> await api('/user/userDetail/' + id, "", 'get');
export const getUserRecommendation = async (id)=> await api('/user/getrecommendeduser', "", 'get');
export const getUserRecommendationForLoggedOutUser = async ()=> await api('/user/getrecommendeduserloggedout', "", 'get');
export const addRepoToSavedList = async (repo_link)=> await api(`/user/addSavedRepo`, {repo_link}, 'post');

