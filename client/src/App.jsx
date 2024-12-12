import { useState, useReducer } from "react"
  import { postReducer, INITIAL_STATE } from "../src/postreducer.js";

  const App = () => {


    const [id, setId] = useState(1);
    const [state, dispatch] = useReducer(postReducer, INITIAL_STATE)


    const getData = async () => {
      dispatch({ type: "FETCH_START" })

      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/photos/${id}`)
        const json = await response.json()

        if (response.status === 200) {
          dispatch({ type: "FETCH_SUCCESS", payload: json })
        }

        else {
          dispatch({ type: "FETCH_ERROR" })
        }

      }
      catch (error) {
        console.log(error)
      }

    }

    return (
      <>
        <h1>Reducer</h1>
        <input placeholder="photo id" onChange={(e) => setId(e.target.value)} />
        <p>{state.loading ? "Loading" : "GET DATA"}</p>
        <button onClick={getData}>{state.loading ? "Loading" : "Get Data"}</button>
        <h2>{state.data?.title}</h2>
        <h2>{state.error && "FETCH error"}</h2>
      </>
    )

  }

  export default App