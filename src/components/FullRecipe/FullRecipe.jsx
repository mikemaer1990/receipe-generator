import { VStack, HStack, Button, Text, Heading, Box, Badge } from "@chakra-ui/react"
import { ArrowLeft, RotateCcw, Sparkles } from "lucide-react"

import { NutritionStats } from './NutritionStats'
import { IngredientsList } from './IngredientsList'
import { Instructions } from './Instructions'
import { LoadingState } from '../shared/LoadingState'
import { ErrorMessage } from '../shared/ErrorMessage'

export function FullRecipe({
  recipe,
  isLoading,
  error,
  formData,
  onGenerateNew,
  onTryDifferent,
  onRetry
}) {
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

        <HStack justify="center" spacing={4}>
          <Button
            colorScheme="orange"
            leftIcon={<Sparkles size={16} />}
            onClick={onGenerateNew}
          >
            Generate New Recipes
          </Button>
          <Button
            variant="outline"
            colorScheme="orange"
            leftIcon={<RotateCcw size={16} />}
            onClick={onTryDifferent}
          >
            Try Different Options
          </Button>
        </HStack>
      </VStack>
    )
  }

  if (!recipe) {
    return null
  }

  return (
    <VStack spacing={{ base: 6, md: 8 }} align="stretch" maxW="4xl" mx="auto" p={{ base: 4, md: 6 }}>

      {/* Recipe Header */}
      <Box
        bg="linear-gradient(135deg, #FF8C42 0%, #D2001F 100%)"
        color="white"
        p={{ base: 4, sm: 6, md: 8 }}
        borderRadius="xl"
        textAlign="center"
        position="relative"
        overflow="hidden"
      >
        {/* Background decoration */}
        <Box
          position="absolute"
          top={-10}
          right={-10}
          w={40}
          h={40}
          bg="whiteAlpha.100"
          borderRadius="full"
          transform="rotate(45deg)"
        />
        <Box
          position="absolute"
          bottom={-5}
          left={-5}
          w={20}
          h={20}
          bg="whiteAlpha.100"
          borderRadius="full"
        />

        <VStack spacing={4} position="relative" zIndex={1}>
          <Heading size={{ base: "xl", md: "2xl" }} textAlign="center" lineHeight={1.2}>
            {recipe.title}
          </Heading>

          <HStack spacing={4} justify="center" wrap="wrap">
            {formData?.portions && (
              <Badge
                colorScheme="orange"
                variant="solid"
                fontSize="md"
                px={3}
                py={1}
                borderRadius="full"
              >
                {formData.portions} {formData.portions === 1 ? 'Serving' : 'Servings'}
              </Badge>
            )}
            {formData?.cookingStyle && (
              <Badge
                colorScheme="orange"
                variant="outline"
                fontSize="md"
                px={3}
                py={1}
                borderRadius="full"
                borderColor="whiteAlpha.400"
                color="white"
              >
                {formData.cookingStyle} Style
              </Badge>
            )}
          </HStack>
        </VStack>
      </Box>

      {/* Nutrition Stats */}
      <NutritionStats
        nutrition={recipe.nutrition}
        portions={formData?.portions || 1}
      />

      {/* Ingredients */}
      <IngredientsList ingredients={recipe.ingredients} />

      {/* Instructions */}
      <Instructions instructions={recipe.instructions} />

      {/* Action Buttons */}
      <VStack spacing={4} pt={4}>
        <VStack spacing={{ base: 3, md: 0 }} w="full">
          <HStack spacing={{ base: 2, md: 4 }} justify="center" wrap="wrap" w="full">
          <Button
            size="lg"
            colorScheme="orange"
            leftIcon={<Sparkles size={20} />}
            onClick={onGenerateNew}
            minH="48px"
            w={{ base: "full", md: "auto" }}
            _hover={{
              transform: "translateY(-2px)",
              boxShadow: "lg"
            }}
            transition="all 0.2s"
          >
            Generate New Recipes
          </Button>

          <Button
            size="lg"
            variant="outline"
            colorScheme="orange"
            leftIcon={<RotateCcw size={20} />}
            onClick={onTryDifferent}
            minH="48px"
            w={{ base: "full", md: "auto" }}
            _hover={{
              transform: "translateY(-2px)",
              boxShadow: "lg"
            }}
            transition="all 0.2s"
          >
            Try Different Options
          </Button>
          </HStack>

          <Button
            variant="ghost"
            colorScheme="orange"
            size="sm"
            leftIcon={<ArrowLeft size={16} />}
            onClick={onTryDifferent}
            minH="44px"
            w={{ base: "full", md: "auto" }}
          >
            Back to Recipe Builder
          </Button>
        </VStack>
      </VStack>
    </VStack>
  )
}