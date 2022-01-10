import { createStore, combineReducers } from "redux";
import { reducer as rnReducer } from "redux/rn/reducer";

export const store = createStore(
    combineReducers({
        rn: rnReducer
    })
)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch