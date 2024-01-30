import "./App.css";
import LoadingSpinner from "./LoadingSpinner";

import List from "./Components/List";
import { useToast } from '@chakra-ui/react'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { FETCH_DATA_FAILURE, FETCH_DATA_REQUEST, FETCH_DATA_SUCCESS, fetchDataFailure, fetchDataRequest, fetchDataSuccess } from "./Store/actions";
import { store } from "./Store/store";
import axios from "axios";


//Api Endpoint
const API_ENDPOINT = "https://api.chess.com/pub/leaderboards";

const App: React.FC = () => {






  //redux

  const dispatch = useDispatch();


  const { data: test, loading, error } = useSelector((state: any) => state.players);

  const fetchDataFromApi = async () => {
    dispatch(fetchDataRequest());

    try {
      const response = await axios.get(API_ENDPOINT);
      const data = response.data;
      console.log("data ", data)

      dispatch(fetchDataSuccess(data.daily));

      console.log("store content", store.getState().players)
    } catch (error: any) {
      dispatch(fetchDataFailure(error?.message));
    }
  };

  useEffect(() => {

    fetchDataFromApi();

  }, [dispatch]);




  return (
    <>
      <div className="container">
        <h1 className="d-flex justify-content-center ">Chess Leaderboards</h1>


        <hr />

        {/* If the error variable is truthy (i.e., not null, undefined, or false), the code renders a <p> element with the text "Something went wrong ...". */}
        {error && <p data-testid="error">Something went wrong ...</p>}

        {/* If the isLoading variable is true, indicating that data is being loaded, the code renders a <LoadingSpinner /> component. */}
        {/* If the isLoading variable is false, indicating that data has finished loading, the code renders a <List> component. */}
        {loading ? (
          <LoadingSpinner />
        ) : (
          <List />
        )}
      </div>

    </>
  );
};



export default App;
