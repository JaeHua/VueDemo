import request from '@/utils/request'
import {ElMessage} from "element-plus";

const sendVerifyCode = ({mail}) =>{
    return request.post('auth/email',{mail}).then(response => {
        // 请求成功
        return response
    })
        .catch(error => {
            // 请求失败
            return Promise.reject(error)
        })
}

//验证验证码
const verifyTheCode = ({mail,vcode}) =>{

    return request.post('auth/verify',{mail,vcode}).then(response => {
        // 请求成功
        return response
    })
        .catch(error => {
            // 请求失败
            return Promise.reject(error)
        })
}
export default {
    sendVerifyCode,
    verifyTheCode
}