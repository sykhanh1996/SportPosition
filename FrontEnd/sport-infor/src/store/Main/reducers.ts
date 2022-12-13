import { MainActionTypes, MainState, MAIN_REQUEST } from './types';

const initialState: MainState ={
    mainInfor: null,
    loading: false,
    error:  null
}
const mainReducer = (
    state: MainState = initialState,
    action: MainActionTypes
) : MainState =>{
    switch (action.type) {
        case MAIN_REQUEST: {
          return {
            ...state,
            loading: true,
          };
        }
        default:
          return state;
      }
}
export { mainReducer };