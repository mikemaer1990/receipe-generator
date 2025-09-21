import { VStack, HStack, Button, Text, SimpleGrid, Heading, Box } from "@chakra-ui/react"
import { ArrowLeft, RotateCcw } from "lucide-react"

import { RecipeCard } from './RecipeCard'
import { LoadingState } from '../shared/LoadingState'
import { ErrorMessage } from '../shared/ErrorMessage'

export function RecipeSuggestions({
  recipes = [],
  isLoading,
  error,
  formData,
  onRecipeSelect,
  onStartOver,
  onTryAgain,
  onRetry
}) {
  if (isLoading) {
    return (
      <VStack spacing={8} align="stretch" maxW="6xl" mx="auto" p={6}>
        <VStack spacing={4} textAlign="center">
          <Heading size="xl" color="neutral.700">
            Cooking Up Something Special...
          </Heading>
          <Text fontSize="lg" color="neutral.600">
            Creating personalized recipes based on your ingredients
          </Text>
        </VStack>

        <LoadingState />
      </VStack>
    )
  }

  if (error) {
    return (
      <VStack spacing={8} align="stretch" maxW="4xl" mx="auto" p={6}>
        <ErrorMessage
          title="Failed to Generate Recipes"
          message={error.message || "Something went wrong while generating your recipes."}
          onRetry={onRetry}
        />

        <HStack justify="center" spacing={4}>
          <Button
            variant="ghost"
            colorScheme="orange"
            leftIcon={<ArrowLeft size={16} />}
            onClick={onStartOver}
          >
            Start Over
          </Button>
          <Button
            variant="outline"
            colorScheme="orange"
            leftIcon={<RotateCcw size={16} />}
            onClick={onTryAgain}
          >
            Try Again
          </Button>
        </HStack>
      </VStack>
    )
  }

  const getIngredientsString = () => {
    const parts = []
    if (formData?.protein) parts.push(formData.protein)
    if (formData?.starch && formData.starch !== 'none') parts.push(formData.starch)
    if (formData?.extraIngredients?.length > 0) {
      parts.push(...formData.extraIngredients.slice(0, 2))
    }
    return parts.length > 0 ? parts.join(', ') : 'your ingredients'
  }

  return (
    <VStack spacing={8} align="stretch" maxW="6xl" mx="auto" p={6}>
      {/* Navigation */}
      <HStack justify="space-between" align="center">
        <Button
          variant="ghost"
          colorScheme="orange"
          size="sm"
          leftIcon={<ArrowLeft size={16} />}
          onClick={onStartOver}
        >
          Start Over
        </Button>

        <Button
          variant="ghost"
          colorScheme="orange"
          size="sm"
          leftIcon={<RotateCcw size={16} />}
          onClick={onTryAgain}
        >
          Try Again
        </Button>
      </HStack>

      {/* Header */}
      <VStack spacing={4} textAlign="center">
        <Heading size="xl" color="neutral.700">
          Choose Your Recipe
        </Heading>
        <Text fontSize="lg" color="neutral.600">
          Here are 3 delicious recipes featuring {getIngredientsString()}
          {formData?.portions && ` for ${formData.portions} ${formData.portions === 1 ? 'person' : 'people'}`}
        </Text>
      </VStack>

      {/* Recipe Cards */}
      <Box>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
          {recipes.map((recipe, index) => (
            <RecipeCard
              key={index}
              recipe={recipe}
              onSelect={onRecipeSelect}
              isLoading={false}
            />
          ))}
        </SimpleGrid>
      </Box>

      {/* Additional Actions */}
      {recipes.length === 0 && !isLoading && !error && (
        <VStack spacing={4} py={8}>
          <Text color="neutral.600" textAlign="center">
            No recipes generated. Please try again.
          </Text>
          <HStack spacing={4}>
            <Button
              colorScheme="orange"
              onClick={onTryAgain}
              leftIcon={<RotateCcw size={16} />}
            >
              Try Again
            </Button>
            <Button
              variant="outline"
              colorScheme="orange"
              onClick={onStartOver}
              leftIcon={<ArrowLeft size={16} />}
            >
              Start Over
            </Button>
          </HStack>
        </VStack>
      )}
    </VStack>
  )
}