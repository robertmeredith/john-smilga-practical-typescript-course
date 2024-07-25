import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { store } from './store.ts'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// REACT QUERY SETUP
// const queryClient = new QueryClient()

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <QueryClientProvider client={queryClient}>
//     <App />
//   </QueryClientProvider>
// )

// REDUX TOOLKIT SETUP
ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>
)
