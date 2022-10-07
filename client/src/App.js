import React from 'react';
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import {ThemeProvider, createTheme} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import {HomePage} from "./features/home/HomePage";
import {ToLearn} from "./features/tolearn/ToLearn";
import {Learned} from "./features/learned/Learned";
import {NewWordForm} from "./features/newword/NewWordForm";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage/>
  },
  {
    path: '/to-learn',
    element: <ToLearn/>
  },
  {
    path: '/learned',
    element: <Learned/>
  },
  {
    path: '/new-word',
    element: <NewWordForm/>
  }
])

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline/>
      <RouterProvider router={router}/>
    </ThemeProvider>
  );
}

export default App;
