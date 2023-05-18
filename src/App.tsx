import {connectWithWebSocket} from "./utils/wssConnection/wssConnection.ts";
import {useEffect} from "react";

function App() {
    useEffect(()=>{
        connectWithWebSocket()
    },[])
  return (
    <>
     Hello this i react app
    </>
  )
}

export default App
