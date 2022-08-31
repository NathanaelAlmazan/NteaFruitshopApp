import React from 'react'
import { HashRouter } from "react-router-dom"
import { Provider } from 'react-redux'

// Redux
import store from "./redux/store"

// Router
import ThemeProvider from './theme'
import Router from "./Router"

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <HashRouter>
          <Router />
        </HashRouter>
      </ThemeProvider>
    </Provider>
  );
}