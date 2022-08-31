import React from 'react'
import { HashRouter } from "react-router-dom"

// Router
import ThemeProvider from './theme'
import Router from "./Router"

export default function App() {
  return (
    <ThemeProvider>
      <HashRouter>
        <Router />
      </HashRouter>
    </ThemeProvider>
  );
}