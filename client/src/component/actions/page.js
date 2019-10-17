import axios from 'axios'
import { ADD_PAGE,PAGE_ERROR,CLEAR_PAGE_DATA ,REMOVE_MODAL,GET_PAGE} from './type'
import uuid from 'uuid'
import {setAlert} from './alert'
export const addPage = (formData,history)=>async dispatch=>{
   
    try {
        console.log('addpage')
        const config = {
            headers: {
                'Content-Type':'application/json'
            }
        }
        
       
        const res = await axios.post('/admin/pages/add-page',formData,config)
        console.log('addpage res',res,'formdata',formData)
        dispatch({
            type:ADD_PAGE,
            payload:res.data
        })
        dispatch(setAlert('資料上傳成功','success'))
        history.push('/page')
        console.log('res data',res.data)
      
    } catch (err) {
        console.log('addpage err',err)
        const errors = err.response.data.errors
        if(errors){
            console.log('errors',errors)
            errors.forEach(error=>dispatch(setAlert(error.msg,'danger')))
        }
        dispatch({
            type:PAGE_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        })
    }
}
export const getPage = ()=>async dispatch =>{
    try {
        console.log('try getpage')
        
        const res = await axios.get('/admin/pages/add-page')
        console.log('getpage res.data',res.data)
        dispatch({
            type:GET_PAGE,
            payload:res.data
        })
    } catch (err) {
        console.log('getpage err',err)
        const errors = err.response.data.errors
        if(errors){
            console.log('get page error',errors)
            errors.forEach(error=>dispatch(setAlert(error.msg,'danger')))
        }
        dispatch({
            type:PAGE_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        })
    }
}