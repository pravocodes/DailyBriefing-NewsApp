import React from 'react'
import NavBar from './components/NavBar'
import News from "./components/News";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

function App() {
  const [progress, setProgress] = React.useState(0);
  const [mode,setmode] = React.useState("light");
  const apiKey = process.env.REACT_APP_NEWS_API;

  const ChangeMode = ()=>{
    console.log(mode);
    if(mode==="light"){
      setmode("dark");
    }
    else{
      setmode("light");
    }
  }

  return (
    <BrowserRouter>
      <div>
        <NavBar mode = {mode} ChangeMode = {ChangeMode}/>
        <LoadingBar
          color="#f11946"
          progress={progress}
        />
        <Routes>
          <Route
            path="/"
            element={<News setProgress={setProgress} apiKey={apiKey} mode = {mode} key="general" pagesize={6} category="general" />}
          />
          <Route
            path="/business"
            element={<News setProgress={setProgress} apiKey={apiKey} mode = {mode} key="business" pagesize={6} category="business" />}
          />
          <Route
            path="/entertainment"
            element={
              <News setProgress={setProgress} apiKey={apiKey} mode = {mode} key="entertainment" pagesize={6} category="entertainment" />
            }
          />
          <Route
            path="/general"
            element={<News setProgress={setProgress} apiKey={apiKey} mode = {mode} key="general" pagesize={6} category="general" />}
          />
          <Route
            path="/health"
            element={<News setProgress={setProgress} apiKey={apiKey} mode = {mode} key="health" pagesize={6} category="health" />}
          />
          <Route
            path="/science"
            element={<News setProgress={setProgress} apiKey={apiKey} mode = {mode} key="science" pagesize={6} category="science" />}
          />
          <Route
            path="/sports"
            element={<News setProgress={setProgress} apiKey={apiKey} mode = {mode} key="sports" pagesize={6} category="sports" />}
          />
          <Route
            path="/technology"
            element={
              <News setProgress={setProgress} apiKey={apiKey} mode = {mode} key="technology" pagesize={6} category="technology" />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App
