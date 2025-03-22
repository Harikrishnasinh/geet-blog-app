import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {ThemeProvider} from './components/ui/theme-provider.tsx'
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit"
import rootReducer from './store/store.tsx'

const store = configureStore({
  reducer: rootReducer
})
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <App />
    </ThemeProvider>
    </Provider>
  </StrictMode>
);
