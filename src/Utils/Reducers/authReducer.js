export const authReducer = (state, {type, payload}) => {
    switch(type) {
        case "LOGIN_SUCCESS":
            return{...state, toastData:{display: true, data:payload.toastMessage, status: "success"}, signedIn: true, userName: payload.name, userEmail: payload.email, userID: payload.id}
        
        case "LOGIN_ERROR":
            return{...state, toastData:{display: true, data:payload.toastMessage, status: "alert"}}
        
        case "HANDLER_ERROR":
            return{...state, toastData:{display: true, data:payload.toastMessage, status: "alert"}}

        case "REMOVE_TOAST":
            return{...state, toastData: {...state.toastData, display: false}}

        case "LOGOUT":
            return{...state, toastData:{display: true, data:payload.toastMessage, status: "alert"}, signedIn: false, userName: payload.name, userEmail: payload.email, userID: payload.id}
        
        default:
            return{...state}
    }
}