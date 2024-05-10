import storageService from "@/service/storageService.js";

const userModule={
    namespaced: true,
    state:{
        token:storageService.get(storageService.USER_TOKEN),
        userInfo: JSON.parse(storageService.get(storageService.USER_INFO)),
    },
    mutations:{
        //更新本地缓存服务
        SET_TOKEN(state,token){
            storageService.set(storageService.USER_TOKEN, token);
            //更新state
        state.token = token;
        },
        SET_USER_INFO(state,userInfo){
            storageService.set(storageService.USER_INFO,JSON.stringify(userInfo));
            //更新state
            state.userInfo = userInfo;
        },

    }
}
export default userModule