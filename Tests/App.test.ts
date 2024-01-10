import { describe, it, expect, beforeEach } from "vitest";
import {addPlayer, removePlayer} from "../src/Store/actions"
import {store} from "../src/Store/store"
import {fetchDataSuccess} from "../src/Store/actions"
import { playerReducer } from "../src/Store/reducer";


describe('PlayerReducer', () => {

//***********************************INTEGRATION TEST*********************************** والله أعلم*/
    beforeEach(async () => {
      await fetch("https://api.chess.com/pub/leaderboards")
        .then((res: any) => res.json())
        .then((data: any) => {
          store.dispatch(fetchDataSuccess(data));
        });
    });
  
    it('Removes a player from all Players', () => {
      const playerIdToRemove = 140243655;
      store.dispatch(removePlayer(playerIdToRemove));
      const newState = store.getState().players;
      expect(newState?.data.some((player: any) => player.player_id === playerIdToRemove)).toBe(false);
      expect(newState?.loading).toBe(false);
      expect(newState?.error).toBe(null);
    });
  
    it('Adds a player to the Players', () => {
      const newPlayerData = { player_id: 123, username: "bo7", score: 1000, rank: 1000, win_count: 1000, loss_count: 1000, draw_count: 1000, title: "GM", status: "premium" };
      store.dispatch(addPlayer(newPlayerData));
      const newState = store.getState().players;
      expect(newState?.data.some(player => player.player_id === newPlayerData.player_id)).toBe(true);
      expect(newState?.loading).toBe(false);
      expect(newState?.error).toBe(null);
    });


 //***********************************UNIT TEST*********************************** والله أعلم*/

    it('Removes a player from all players', () => {
        const initialState:any = {
          loading: false,
          data: [
            {
                "player_id":2305524,
                "username":"Zgorl",
                "score":2578,
                "rank":1,
                "status":"premium",
                "win_count":487,
                "loss_count":205,
                "draw_count":61
             },
             {
                "player_id":140243655,
                "username":"V5K",
                "score":2555,
                "rank":2,
                "status":"basic",
                "win_count":3,
                "loss_count":2,
                "draw_count":0
             },
          ],
          error: null,
        };
        const playerToRemoveId = 2305524;
        const action = removePlayer(playerToRemoveId);
        const newState = playerReducer(initialState, action);
        const expectedState = {
          loading: false,
          data: [
            {
                "player_id":140243655,
                "username":"V5K",
                "score":2555,
                "rank":2,
                "status":"basic",
                "win_count":3,
                "loss_count":2,
                "draw_count":0
             },
          ],
          error: null,
        };
        expect(newState).toEqual(expectedState);
      });
    
      it('َََAdds a player to the players', () => {

        const initialState:any = {
          loading: false,
          data: [
            {
                "player_id":2305524,
                "username":"Zgorl",
                "score":2578,
                "rank":1,
                "status":"premium",
                "win_count":487,
                "loss_count":205,
                "draw_count":61
             },
          ],
          error: null,
        };
    
        const newPlayerData = {
            "player_id":140243655,
            "username":"V5K",
            "score":2555,
            "rank":2,
            "status":"basic",
            "win_count":3,
            "loss_count":2,
            "draw_count":0
         };
        const action = addPlayer(newPlayerData);
        const newState = playerReducer(initialState, action);
        const expectedState = {
          loading: false,
          data: [
            {
                "player_id":140243655,
                "username":"V5K",
                "score":2555,
                "rank":2,
                "status":"basic",
                "win_count":3,
                "loss_count":2,
                "draw_count":0
             },
            {
                "player_id":2305524,
                "username":"Zgorl",
                "score":2578,
                "rank":1,
                "status":"premium",
                "win_count":487,
                "loss_count":205,
                "draw_count":61
             },
          ],
          error: null,
        };
    
        expect(newState).toEqual(expectedState);
      });
  });
