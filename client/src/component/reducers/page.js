import {ADD_PAGE, PAGE_ERROR, CLEAR_PAGE_DATA, REMOVE_MODAL,SORT_PAGE, GET_PAGE} from '../actions/type'

const initialState = {

  loading: true,
  pages: [],
  error: {}
}
export default function (state = initialState, action) {
  const {type, payload} = action
  switch (type) {
    case CLEAR_PAGE_DATA:
      return {
        ...state,
        pages:[],
        loading: false
      }
      case SORT_PAGE:
    case ADD_PAGE:
      return {
        ...state,
        pages:payload,
        loading:true
      }
    case GET_PAGE:
      return {
        ...state,
        pages:payload,
        loading: false
      }
    case PAGE_ERROR:
      console.log(payload)
   
      return {
        ...state,
        error: payload,
        loading: false
      }
    // case REMOVE_MODAL:
    //   return state.filter(page => page.id !== payload)
    default:
      return state
  }
}