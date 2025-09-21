const STORAGE_KEYS = {
  PREFERENCES: 'recipe_app_preferences',
  FORM_STATE: 'recipe_app_form_state'
}

export const storage = {
  getPreferences: () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PREFERENCES)
      return saved ? JSON.parse(saved) : {}
    } catch (error) {
      console.error('Error reading preferences from localStorage:', error)
      return {}
    }
  },

  savePreferences: (preferences) => {
    try {
      localStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(preferences))
    } catch (error) {
      console.error('Error saving preferences to localStorage:', error)
    }
  },

  getFormState: () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.FORM_STATE)
      return saved ? JSON.parse(saved) : null
    } catch (error) {
      console.error('Error reading form state from localStorage:', error)
      return null
    }
  },

  saveFormState: (formState) => {
    try {
      localStorage.setItem(STORAGE_KEYS.FORM_STATE, JSON.stringify(formState))
    } catch (error) {
      console.error('Error saving form state to localStorage:', error)
    }
  },

  clearFormState: () => {
    try {
      localStorage.removeItem(STORAGE_KEYS.FORM_STATE)
    } catch (error) {
      console.error('Error clearing form state from localStorage:', error)
    }
  }
}