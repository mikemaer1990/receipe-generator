// Shared cuisine display utilities

// Normalize cuisine strings for consistent display
export const normalizeCuisineDisplay = (cuisine, fallback = 'American') => {
  if (!cuisine || cuisine === null || cuisine === undefined) {
    return fallback
  }

  // Handle common AI variations
  const normalized = cuisine.toLowerCase().trim()

  // Map common AI responses to our standard names
  const cuisineMap = {
    'italian': 'Italian',
    'italian-inspired': 'Italian',
    'italian style': 'Italian',
    'mediterranean': 'Mediterranean',
    'mediterranean-style': 'Mediterranean',
    'asian': 'Asian',
    'asian-inspired': 'Asian',
    'asian fusion': 'Asian',
    'mexican': 'Mexican',
    'mexican-inspired': 'Mexican',
    'tex-mex': 'Mexican',
    'american': 'American',
    'american-style': 'American',
    'comfort food': 'American',
    'french': 'French',
    'french-inspired': 'French'
  }

  return cuisineMap[normalized] || cuisine
}