
const token = localStorage.getItem('authUser')  //checking user is login or not and set default value to store 
const initialState={  //storing value in store 
    isLogin:token ? true : false,
    assess_token:'',
    currentNav:'',
    updateMoment:''
}

const reducer= (state = initialState, action )=>{  // fun that recive reducer acction 
    console.log(action)
    if(action.type == 'login'){
        return {
            ...state,
            isLogin:true,
            assess_token:action.data.access_token
        }
    }
    if(action.type == 'logout'){
        return{
            ...state,
            isLogin:false
        }
    }
    if(action.type == 'NavChange'){
        return {
            ...state,
            currentNav:action.data
        }
    }
    if(action.type == 'UpdateMoment'){
        return {
            ...state,
            updateMoment:action.data
        }
    }
    if(action.type == 'UpdateSuccess'){
        return {
            ...state,
            updateMoment:''
        }
    }
    if(action.type == 'Auth'){
        return {
            ...state,
            isLogin:false
        }
    }
        return state
}

export default reducer