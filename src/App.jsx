import { useState } from 'react'
import { Box, Container, Heading, Text, VStack, HStack } from "@chakra-ui/react"
import { ChefHat, Utensils, Cookie, Flame, Leaf, Coffee } from "lucide-react"

import { RecipeBuilder } from './components/RecipeBuilder/RecipeBuilder'
import { RecipeSuggestions } from './components/RecipeSuggestions/RecipeSuggestions'
import { FullRecipe } from './components/FullRecipe/FullRecipe'
import { AppBreadcrumb } from './components/shared/Breadcrumb'
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
        py={{ base: 4, md: 8 }}
        textAlign="center"
        position="relative"
        overflow="hidden"
      >
        {/* Cooking-themed background decorations with subtle animations */}
        <Box
          position="absolute"
          top={4}
          right={8}
          color="whiteAlpha.300"
          transform="rotate(15deg)"
          animation="float 6s ease-in-out infinite"
          animationDelay="0s"
        >
          <Utensils size={48} />
        </Box>
        <Box
          position="absolute"
          top={8}
          left={12}
          color="whiteAlpha.200"
          transform="rotate(-20deg)"
          animation="float 5s ease-in-out infinite"
          animationDelay="1s"
        >
          <Cookie size={32} />
        </Box>
        <Box
          position="absolute"
          bottom={4}
          right={16}
          color="whiteAlpha.250"
          transform="rotate(25deg)"
          animation="flicker 3s ease-in-out infinite"
          animationDelay="0.5s"
        >
          <Flame size={36} />
        </Box>
        <Box
          position="absolute"
          bottom={6}
          left={8}
          color="whiteAlpha.300"
          transform="rotate(-15deg)"
          animation="float 7s ease-in-out infinite"
          animationDelay="2s"
        >
          <Leaf size={28} />
        </Box>
        <Box
          position="absolute"
          top="50%"
          right={4}
          color="whiteAlpha.150"
          transform="translateY(-50%) rotate(45deg)"
          animation="float 4s ease-in-out infinite"
          animationDelay="3s"
        >
          <Coffee size={24} />
        </Box>

        <Container maxW={{ base: "full", sm: "6xl" }} px={{ base: 4, md: 0 }} position="relative" zIndex={1}>
          <VStack spacing={6}>
            {/* Enhanced title section with cooking theme */}
            <VStack spacing={2}>
              <HStack spacing={3} align="center">
                <Box
                  p={4}
                  bg="whiteAlpha.250"
                  borderRadius="xl"
                  backdropFilter="blur(15px)"
                  border="1px solid"
                  borderColor="whiteAlpha.300"
                  shadow="lg"
                >
                  <ChefHat size={40} />
                </Box>
                <VStack spacing={1} align="start">
                  <Heading
                    size="3xl"
                    fontFamily="heading"
                    letterSpacing="tight"
                    textShadow="0 2px 4px rgba(0,0,0,0.1)"
                  >
                    Recipe Generator
                  </Heading>
                  <Text
                    fontSize="lg"
                    color="whiteAlpha.800"
                    fontStyle="italic"
                    textShadow="0 1px 2px rgba(0,0,0,0.1)"
                  >
                    AI-powered culinary creativity
                  </Text>
                </VStack>
              </HStack>
            </VStack>

            {/* Cooking icons accent bar */}
            <HStack spacing={8} opacity={0.7}>
              <Box color="whiteAlpha.600">
                <Utensils size={20} />
              </Box>
              <Box color="whiteAlpha.600">
                <Cookie size={20} />
              </Box>
              <Box color="whiteAlpha.600">
                <Flame size={20} />
              </Box>
              <Box color="whiteAlpha.600">
                <Leaf size={20} />
              </Box>
              <Box color="whiteAlpha.600">
                <Coffee size={20} />
              </Box>
            </HStack>

            {/* Integrated Breadcrumb */}
            {appState !== APP_STATES.BUILDER && (
              <Box
                bg="whiteAlpha.200"
                borderRadius="lg"
                p={3}
                backdropFilter="blur(10px)"
                border="1px solid"
                borderColor="whiteAlpha.300"
                mt={2}
              >
                <AppBreadcrumb
                  currentStep={appState === APP_STATES.FULL_RECIPE ? 'recipe' : appState}
                  onNavigateToBuilder={handleGenerateNew}
                  onNavigateToSuggestions={handleTryDifferent}
                  recipeName={fullRecipe?.title}
                  headerStyle={true}
                />
              </Box>
            )}
          </VStack>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxW={{ base: "full", sm: "6xl" }} py={4} px={{ base: 4, md: 0 }} flex={1} display="flex" flexDirection="column">
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

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(var(--rotation, 0deg));
          }
          50% {
            transform: translateY(-8px) rotate(var(--rotation, 0deg));
          }
        }

        @keyframes flicker {
          0%, 100% {
            opacity: 1;
            transform: scale(1) rotate(var(--rotation, 0deg));
          }
          25% {
            opacity: 0.8;
            transform: scale(1.05) rotate(var(--rotation, 0deg));
          }
          50% {
            opacity: 0.9;
            transform: scale(0.95) rotate(var(--rotation, 0deg));
          }
          75% {
            opacity: 1.1;
            transform: scale(1.02) rotate(var(--rotation, 0deg));
          }
        }
      `}</style>
    </Box>
  )
}

export default App