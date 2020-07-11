import userTypes from "../actionTypes/userTypes";

const INITIAL_STATE = { 
    userDetails : null,
    loader: false,
    isSuccess: false,
    isFailure: false  
};

export default ( state = INITIAL_STATE, action ) => {
    switch (action.type) {
        case userTypes.USER_LOGIN_DETAILS:
        return { ...state, 
            userDetails: action.userDetails, 
            loader: true, 
            isSuccess: false, 
            isFailure: false
         }

         case userTypes.USER_LOGIN_DETAILS_SUCCESS: 
         return { ...state,
            isSuccess: action.isSuccess,
            loader: false,
        }

        case userTypes.USER_LOGIN_DETAILS_FAILURE: 
        return { ...state,
            isFailure: action.isFailure,
            loader: false,
        }

        case userTypes.USER_LOGIN_DETAILS_lOADING: 
        return { ...state, 
            loader: action.loader
        }
        default: return state;
    }
}