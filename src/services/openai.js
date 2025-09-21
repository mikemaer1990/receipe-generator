import axios from 'axios'

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions'

class OpenAIError extends Error {
  constructor(message, type = 'unknown', status = null) {
    super(message)
    this.name = 'OpenAIError'
    this.type = type
    this.status = status
  }
}

const openaiClient = axios.create({
  baseURL: 'https://api.openai.com/v1',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
  },
  timeout: 30000 // 30 second timeout
})

// Add request interceptor for API key validation
openaiClient.interceptors.request.use(
  (config) => {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY
    if (!apiKey || apiKey === 'your_openai_api_key_here') {
      throw new OpenAIError(
        'OpenAI API key is not configured. Please set VITE_OPENAI_API_KEY in your .env file.',
        'auth',
        401
      )
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Add response interceptor for error handling
openaiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status, data } = error.response

      switch (status) {
        case 401:
          throw new OpenAIError(
            'Invalid API key. Please check your OpenAI API key.',
            'auth',
            401
          )
        case 429:
          throw new OpenAIError(
            'Rate limit exceeded. Please try again in a moment.',
            'rate_limit',
            429
          )
        case 402:
          throw new OpenAIError(
            'Insufficient quota. Please check your OpenAI account billing.',
            'quota',
            402
          )
        case 503:
          throw new OpenAIError(
            'OpenAI service is temporarily unavailable. Please try again later.',
            'service_unavailable',
            503
          )
        default:
          throw new OpenAIError(
            data?.error?.message || 'An error occurred while communicating with OpenAI.',
            'api_error',
            status
          )
      }
    } else if (error.code === 'ECONNABORTED') {
      throw new OpenAIError(
        'Request timed out. Please try again.',
        'timeout'
      )
    } else {
      throw new OpenAIError(
        'Network error. Please check your internet connection.',
        'network'
      )
    }
  }
)

export async function generateRecipeSuggestions(formData) {
  const { protein, proteinAmount, customProteinName, starch, extraIngredients, cookingStyle, preference, portions } = formData

  // Use custom protein name if "other" is selected, otherwise use the protein type
  const proteinName = protein === 'other' ? customProteinName : protein

  const prompt = `Generate 3 different recipe ideas using these ingredients:
- Protein: ${proteinName} (${proteinAmount}g)
${starch && starch !== 'none' ? `- Starch: ${starch}` : ''}
${extraIngredients?.length ? `- Additional ingredients: ${extraIngredients.join(', ')}` : ''}
- Portions: ${portions}
${cookingStyle ? `- Style: ${cookingStyle}` : ''}
${preference ? `- Preference: ${preference}` : ''}

For each recipe, provide:
1. A creative recipe title
2. A brief 1-2 sentence description

Format as:
**Recipe 1:** [Title]
[Description]

**Recipe 2:** [Title]
[Description]

**Recipe 3:** [Title]
[Description]`

  try {
    const response = await openaiClient.post('/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    })

    const content = response.data.choices[0]?.message?.content
    if (!content) {
      throw new OpenAIError('Empty response from OpenAI', 'empty_response')
    }

    return parseRecipeSuggestions(content)
  } catch (error) {
    if (error instanceof OpenAIError) {
      throw error
    }
    throw new OpenAIError('Failed to generate recipe suggestions', 'unknown')
  }
}

export async function generateFullRecipe(selectedTitle, formData) {
  const { protein, proteinAmount, customProteinName, starch, extraIngredients, cookingStyle, portions } = formData

  // Use custom protein name if "other" is selected, otherwise use the protein type
  const proteinName = protein === 'other' ? customProteinName : protein

  const prompt = `Create a detailed recipe for "${selectedTitle}" using:
- Protein: ${proteinName} (${proteinAmount}g)
${starch && starch !== 'none' ? `- Starch: ${starch}` : ''}
${extraIngredients?.length ? `- Additional ingredients: ${extraIngredients.join(', ')}` : ''}
- Portions: ${portions}
${cookingStyle ? `- Style: ${cookingStyle}` : ''}

Please provide:

INGREDIENTS:
- List all ingredients with exact measurements in metric units

INSTRUCTIONS:
- Clear, numbered step-by-step cooking instructions

NUTRITION (be accurate with calculations):
- Total calories and per serving
- Total protein (g) and per serving
- Total carbohydrates (g) and per serving
- Total fat (g) and per serving

Format the response clearly with these exact section headers.`

  try {
    const response = await openaiClient.post('/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1200
    })

    const content = response.data.choices[0]?.message?.content
    if (!content) {
      throw new OpenAIError('Empty response from OpenAI', 'empty_response')
    }

    return parseFullRecipe(content, selectedTitle)
  } catch (error) {
    if (error instanceof OpenAIError) {
      throw error
    }
    throw new OpenAIError('Failed to generate full recipe', 'unknown')
  }
}

function parseRecipeSuggestions(content) {
  const recipes = []
  const recipePattern = /\*\*Recipe \d+:\*\*\s*([^\n]+)\n([^\n]+(?:\n[^*]+)*)/g

  let match
  while ((match = recipePattern.exec(content)) !== null) {
    recipes.push({
      title: match[1].trim(),
      description: match[2].trim()
    })
  }

  // Fallback parsing if regex doesn't work
  if (recipes.length === 0) {
    const lines = content.split('\n').filter(line => line.trim())
    for (let i = 0; i < lines.length - 1; i += 2) {
      if (lines[i].includes('Recipe') && lines[i + 1]) {
        recipes.push({
          title: lines[i].replace(/\*\*Recipe \d+:\*\*\s*/, '').trim(),
          description: lines[i + 1].trim()
        })
      }
    }
  }

  return recipes.slice(0, 3) // Ensure we only return 3 recipes
}

function parseFullRecipe(content, title) {
  const sections = {
    title,
    ingredients: [],
    instructions: [],
    nutrition: {}
  }

  const lines = content.split('\n')
  let currentSection = null

  for (const line of lines) {
    const trimmedLine = line.trim()
    if (!trimmedLine) continue

    if (trimmedLine.toUpperCase().includes('INGREDIENTS')) {
      currentSection = 'ingredients'
      continue
    } else if (trimmedLine.toUpperCase().includes('INSTRUCTIONS')) {
      currentSection = 'instructions'
      continue
    } else if (trimmedLine.toUpperCase().includes('NUTRITION')) {
      currentSection = 'nutrition'
      continue
    }

    if (currentSection === 'ingredients' && (trimmedLine.startsWith('-') || trimmedLine.startsWith('•'))) {
      sections.ingredients.push(trimmedLine.substring(1).trim())
    } else if (currentSection === 'instructions' && /^\d+\./.test(trimmedLine)) {
      sections.instructions.push(trimmedLine)
    } else if (currentSection === 'nutrition') {
      // Parse nutrition info with flexible patterns
      const lowerLine = trimmedLine.toLowerCase()

      if (lowerLine.includes('calories')) {
        // Handle: "Total calories: 450", "Calories: 450", "450 calories", "Calories per serving: 225"
        const match = trimmedLine.match(/(\d+(?:\.\d+)?)/i)
        if (match) {
          sections.nutrition.calories = Math.round(parseFloat(match[1]))
        }
      } else if (lowerLine.includes('protein')) {
        // Handle: "Total protein: 25g", "Protein: 25g", "25g protein"
        const match = trimmedLine.match(/(\d+(?:\.\d+)?)/i)
        if (match) {
          sections.nutrition.protein = Math.round(parseFloat(match[1]))
        }
      } else if (lowerLine.includes('carb')) {
        // Handle both "carbohydrates" and "carbs": "Total carbs: 30g", "Carbohydrates: 30g"
        const match = trimmedLine.match(/(\d+(?:\.\d+)?)/i)
        if (match) {
          sections.nutrition.carbohydrates = Math.round(parseFloat(match[1]))
        }
      } else if (lowerLine.includes('fat')) {
        // Handle: "Total fat: 15g", "Fat: 15g", "15g fat"
        const match = trimmedLine.match(/(\d+(?:\.\d+)?)/i)
        if (match) {
          sections.nutrition.fat = Math.round(parseFloat(match[1]))
        }
      }
    }
  }

  return sections
}