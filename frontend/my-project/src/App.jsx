import Home from "./home"
import { BrowserRouter, Routes, Route } from "react-router"
function App() {
  

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
