import React, { useState, useEffect } from "react";
import { 
  createBrowserRouter, 
  createRoutesFromElements, 
  Route, 
  RouterProvider 
} from 'react-router-dom'
import axios from "axios";
import { API_URL } from "./utils";
import { Button } from "@nextui-org/react";
import RootLayout from "./layout/RootLayout";
import Home from "./pages/Home";

function App() {

  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const { data } = await axios.get(API_URL);
      console.log('malakian app.js 1', data)

      setTasks(data);
    } catch (err) {
      console.log(err);
    }
  };

  // router and routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      {/* <Route path="create" element={<Create />} action={createAction} />
      <Route path="mySubmissions" element={<MySubmissions />} /> */}
    </Route>
  )
)

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
