import { AnyAction } from 'redux'

const initialState = { isRN: false }

export const reducer = (state = initialState, action: AnyAction) => {
    let nextState
    switch (action.type){
        case 'SET_IS_RN':
            nextState = {
                ...state,
                isRN: action.value
            }
            return nextState
        default:
            return state
    }
}