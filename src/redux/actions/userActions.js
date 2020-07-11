import userTypes from "../actionTypes/userTypes";


export const userLoginStart = ( payload ) => {
    return { 
        type: userTypes.USER_LOGIN_DETAILS,
        userDetails: payload,
     }
}

export const isSuccess = ( isSuccess ) => {
    return {
        type: userTypes.USER_LOGIN_DETAILS_SUCCESS,
        isSuccess //in ES6 if the letter of the object property is the same as the value then we don't have to repeat it.
    }
}

export const isFailure = ( isFailure ) => {
    return {
        type: userTypes.USER_LOGIN_DETAILS_FAILURE,
        isFailure 
    }
}

export const loader = ( loader ) => {
    return {
        type: userTypes.USER_LOGIN_DETAILS_lOADING,
        loader 
    }
}

export const userLoggingAction = (payload) => {
    return async (dispatch) => {
        dispatch(loader(true))
        try {
            const res = await fetch("https://platr-staging.herokuapp.com/auth/customers/signin", { 
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                  method: "POST",
                  body: JSON.stringify(payload)
             })
             if ( !res.data ) { 
                 return setTimeout(() => {
                    dispatch(isFailure(true))
                },3000)
             }
             dispatch(userLoginStart(res.data))
             dispatch(isSuccess(true))
        } catch(error) {
            console.log(error);
            setTimeout(() => {
                dispatch(isFailure(true))
            },3000)
        }
    }
}