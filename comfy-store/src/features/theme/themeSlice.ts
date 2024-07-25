import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { applyTheme } from '@/utils'

export type Theme = 'light' | 'dark' | 'system'

type ThemeState = {
  theme: Theme
}

// Get theme from local storage or set as 'system'
const initialiseTheme = (): Theme => {
  const theme = (localStorage.getItem('theme') as Theme) || 'system'
  applyTheme(theme)
  return theme
}

// Initialiose theme from local storage
const initialState: ThemeState = {
  theme: initialiseTheme(),
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload
      applyTheme(action.payload)
      localStorage.setItem('theme', action.payload)
    },
  },
})

export const { setTheme } = themeSlice.actions

export default themeSlice.reducer
