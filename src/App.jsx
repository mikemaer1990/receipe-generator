import { useState } from 'react'
import { Box, Container, Heading, Text, VStack } from "@chakra-ui/react"
import { ChefHat } from "lucide-react"

import { RecipeBuilder } from './components/RecipeBuilder/RecipeBuilder'
import { RecipeSuggestions } from './components/RecipeSuggestions/RecipeSuggestions'
import { FullRecipe } from './components/FullRecipe/FullRecipe'
import { generateRecipeSuggestions, generateFullRecipe } from './services/openai'

const APP_STATES = {
  BUILDER: 'builder',
  SUGGESTIONS: 'suggestions',
  FULL_RECIPE: 'full_recipe'
}

function App() {
  const [appState, setAppState] = useState(APP_STATES.BUILDER)
  const [formData, setFormData] = useState(null)
  const [recipeSuggestions, setRecipeSuggestions] = useState([])
  const [selectedRecipe, setSelectedRecipe] = useState(null)
  const [fullRecipe, setFullRecipe] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleGenerateRecipes = async (data) => {
    setIsLoading(true)
    setError(null)
    setFormData(data)

    try {
      const suggestions = await generateRecipeSuggestions(data)
      setRecipeSuggestions(suggestions)
      setAppState(APP_STATES.SUGGESTIONS)
    } catch (err) {
      console.error('Error generating recipes:', err)
      setError(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRecipeSelect = async (recipe) => {
    setIsLoading(true)
    setError(null)
    setSelectedRecipe(recipe)

    try {
      const fullRecipeData = await generateFullRecipe(recipe.title, formData)
      setFullRecipe(fullRecipeData)
      setAppState(APP_STATES.FULL_RECIPE)
    } catch (err) {
      console.error('Error generating full recipe:', err)
      setError(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleStartOver = () => {
    setAppState(APP_STATES.BUILDER)
    setFormData(null)
    setRecipeSuggestions([])
    setSelectedRecipe(null)
    setFullRecipe(null)
    setError(null)
  }

  const handleTryAgain = () => {
    if (appState === APP_STATES.SUGGESTIONS) {
      handleGenerateRecipes(formData)
    } else if (appState === APP_STATES.FULL_RECIPE && selectedRecipe) {
      handleRecipeSelect(selectedRecipe)
    }
  }

  const handleGenerateNew = () => {
    setAppState(APP_STATES.BUILDER)
    setRecipeSuggestions([])
    setSelectedRecipe(null)
    setFullRecipe(null)
    setError(null)
  }

  const handleTryDifferent = () => {
    setAppState(APP_STATES.SUGGESTIONS)
    setSelectedRecipe(null)
    setFullRecipe(null)
    setError(null)
  }

  return (
    <Box minH="100vh" bg="neutral.50" display="flex" flexDirection="column">
      {/* App Header */}
      <Box
        bg="linear-gradient(135deg, #FF8C42 0%, #D2001F 100%)"
        color="white"
        py={8}
        textAlign="center"
        position="relative"
        overflow="hidden"
      >
        {/* Background decorations */}
        <Box
          position="absolute"
          top={-20}
          right={-20}
          w={60}
          h={60}
          bg="whiteAlpha.100"
          borderRadius="full"
          transform="rotate(45deg)"
        />
        <Box
          position="absolute"
          bottom={-10}
          left={-10}
          w={30}
          h={30}
          bg="whiteAlpha.100"
          borderRadius="full"
        />

        <Container maxW="6xl" position="relative" zIndex={1}>
          <VStack spacing={4}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap={4}
            >
              <Box
                p={3}
                bg="whiteAlpha.200"
                borderRadius="full"
                backdropFilter="blur(10px)"
              >
                <ChefHat size={32} />
              </Box>
              <Heading size="2xl" fontFamily="heading">
                Recipe Generator
              </Heading>
            </Box>
            <Text fontSize="xl" color="whiteAlpha.900" maxW="2xl" textAlign="center">
              Create personalized recipes using AI based on your ingredients and preferences
            </Text>
          </VStack>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxW="6xl" py={4} flex={1} display="flex" flexDirection="column">
        {appState === APP_STATES.BUILDER && (
          <RecipeBuilder
            onGenerateRecipes={handleGenerateRecipes}
            isLoading={isLoading}
          />
        )}

        {appState === APP_STATES.SUGGESTIONS && (
          <RecipeSuggestions
            recipes={recipeSuggestions}
            isLoading={isLoading}
            error={error}
            formData={formData}
            onRecipeSelect={handleRecipeSelect}
            onStartOver={handleStartOver}
            onTryAgain={handleTryAgain}
            onRetry={handleTryAgain}
          />
        )}

        {appState === APP_STATES.FULL_RECIPE && (
          <FullRecipe
            recipe={fullRecipe}
            isLoading={isLoading}
            error={error}
            formData={formData}
            onGenerateNew={handleGenerateNew}
            onTryDifferent={handleTryDifferent}
            onRetry={handleTryAgain}
          />
        )}
      </Container>

      {/* Footer */}
      <Box as="footer" bg="neutral.800" color="white" py={6} mt="auto">
        <Container maxW="6xl">
          <VStack spacing={2} textAlign="center">
            <Text fontSize="sm" color="neutral.300">
              Recipe Generator powered by OpenAI • Built with React & Chakra UI
            </Text>
            <Text fontSize="xs" color="neutral.400">
              Generate delicious recipes tailored to your ingredients and preferences
            </Text>
          </VStack>
        </Container>
      </Box>
    </Box>
  )
}

export default App