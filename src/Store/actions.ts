export const FETCH_DATA_REQUEST = 'FETCH_DATA_REQUEST';
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE';
export const DELETE_PLAYER = 'DELETE_PLAYER';
export const ADD_PLAYER = 'ADD_PLAYER';
export const EDIT_PLAYER = 'EDIT_PLAYER';

export const fetchDataRequest = () => ({
  type: FETCH_DATA_REQUEST,
});

export const fetchDataSuccess = (data:any) => ({
  type: FETCH_DATA_SUCCESS,
  payload: data,
});

export const fetchDataFailure = (error:any) => ({
  type: FETCH_DATA_FAILURE,
  payload: error,
});

export const removePlayer = (id:number) => ({
  type: DELETE_PLAYER,
  payload: id,
});
export const addPlayer = (player:any) => ({
  type: ADD_PLAYER,
  payload: player,
});
export const editPlayer = (player_id:number,updatedPlayerData:any) => ({
  type: EDIT_PLAYER,
  payload: {
    player_id,
    updatedPlayerData,
  },
});