import { FETCH_DATA_REQUEST, FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE, DELETE_PLAYER, ADD_PLAYER, EDIT_PLAYER } from './actions';

const initialState = {
  data: [],
  loading: false,
  error: null,
};

export const playerReducer = (state = initialState, action:any) => {

    switch (action.type) {
      case FETCH_DATA_REQUEST:
        return {
          ...state,
          loading: true,
        };
  
      case FETCH_DATA_SUCCESS:
        return {
          ...state,
          loading: false,
          data: action.payload, 
          error: null,
        };
  
      case FETCH_DATA_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case DELETE_PLAYER:
        return {
          ...state,
          loading: false,
          data: Array.isArray(state.data) ? state.data.filter((p:any) => p.player_id !== action.payload) : [],
          error: null,
        };
        case ADD_PLAYER:
          return {
            ...state,
            loading: false,
            data: Array.isArray(state.data) ? [action.payload, ...state.data] : [action.payload],
            error: null,
          };
          case EDIT_PLAYER: {
            const { player_id, updatedPlayerData } = action.payload;
            const playerIndex = state.data.findIndex((player:any) => player.player_id === player_id);
            if (playerIndex !== -1) {
              const newData:any = [...state.data];
              newData[playerIndex] = {
                ...newData[playerIndex],
                ...updatedPlayerData,
              };
          
              return {
                ...state,
                loading: false,
                data: newData,
                error: null,
              };
            }
          break;
          }
      default:
        return state;
    }
  };