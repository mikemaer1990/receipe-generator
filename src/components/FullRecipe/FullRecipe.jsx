import { VStack, HStack, Text, Heading, Box, Grid, Card } from "@chakra-ui/react"
import { Clock, Users, ChefHat, TrendingUp } from "lucide-react"

import { NutritionStats } from './NutritionStats'
import { IngredientsList } from './IngredientsList'
import { Instructions } from './Instructions'
import { LoadingState } from '../shared/LoadingState'
import { ErrorMessage } from '../shared/ErrorMessage'
import { normalizeCuisineDisplay } from '../../utils/cuisineUtils'

export function FullRecipe({
  recipe,
  isLoading,
  error,
  formData,
  onRetry
}) {
  // Get cuisine display from AI-generated metadata with fallback
  const cuisineDisplay = recipe?.metadata?.cuisine ?
    normalizeCuisineDisplay(recipe.metadata.cuisine) :
    (recipe?.metadata ? normalizeCuisineDisplay('American') : null)

  if (isLoading) {
    return (
      <VStack spacing={{ base: 6, md: 8 }} align="stretch" maxW="4xl" mx="auto" p={{ base: 4, md: 6 }}>
        <VStack spacing={4} textAlign="center">
          <Heading size="xl" color="neutral.700">
            Creating Your Recipe...
          </Heading>
          <Text fontSize="lg" color="neutral.600">
            Preparing detailed instructions and nutritional information
          </Text>
        </VStack>

        <LoadingState />
      </VStack>
    )
  }

  if (error) {
    return (
      <VStack spacing={{ base: 6, md: 8 }} align="stretch" maxW="4xl" mx="auto" p={{ base: 4, md: 6 }}>
        <ErrorMessage
          title="Failed to Load Recipe"
          message={error.message || "Something went wrong while loading your recipe."}
          onRetry={onRetry}
        />

      </VStack>
    )
  }

  if (!recipe) {
    return null
  }

  return (
    <Box maxW="7xl" mx="auto" p={{ base: 4, md: 6 }}>
      {/* Compact Functional Header */}
      <Card.Root mb={8}>
        <Card.Body p={6}>
          <VStack spacing={4} align="start">
            <Heading size="xl" color="neutral.800" lineHeight={1.2}>
              {recipe.title}
            </Heading>

            {/* Key Recipe Stats */}
            <HStack spacing={6} wrap="wrap" color="neutral.600">
              {formData?.portions && (
                <HStack spacing={2}>
                  <Users size={18} />
                  <Text fontWeight="medium">
                    {formData.portions} {formData.portions === 1 ? 'Serving' : 'Servings'}
                  </Text>
                </HStack>
              )}

              {recipe.metadata?.prepTime && (
                <HStack spacing={2}>
                  <Clock size={18} />
                  <Text fontWeight="medium">{recipe.metadata.prepTime}</Text>
                </HStack>
              )}

              {recipe.metadata?.difficulty && (
                <HStack spacing={2}>
                  <TrendingUp size={18} />
                  <Text fontWeight="medium">{recipe.metadata.difficulty}</Text>
                </HStack>
              )}

              {cuisineDisplay && (
                <HStack spacing={2}>
                  <ChefHat size={18} />
                  <Text fontWeight="medium">
                    {cuisineDisplay} Cuisine
                  </Text>
                </HStack>
              )}
            </HStack>
          </VStack>
        </Card.Body>
      </Card.Root>

      {/* Two-Column Layout (Desktop) / Single Column (Mobile) */}
      <Grid
        templateColumns={{ base: "1fr", lg: "350px 1fr" }}
        gap={8}
        align="start"
      >
        {/* Left Column: Ingredients (Sticky on Desktop) */}
        <VStack spacing={6} align="stretch">
          <Box position={{ base: "static", lg: "sticky" }} top="120px">
            <IngredientsList ingredients={recipe.ingredients} />
          </Box>
        </VStack>

        {/* Right Column: Instructions + Nutrition */}
        <VStack spacing={8} align="stretch">
          <Instructions instructions={recipe.instructions} />

          {/* Nutrition Stats - Always Visible */}
          <NutritionStats
            nutrition={recipe.nutrition}
            portions={formData?.portions || 1}
          />
        </VStack>
      </Grid>

    </Box>
  )
}