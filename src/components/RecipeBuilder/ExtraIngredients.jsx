import { useState } from 'react'
import { Box, VStack, HStack, Tag, Text, Button, Input } from "@chakra-ui/react"
import { X, Plus } from "lucide-react"

const tagColors = ['orange', 'red', 'yellow', 'green']

export function ExtraIngredients({ ingredients = [], onIngredientsChange }) {
  const [inputValue, setInputValue] = useState('')

  const addIngredient = () => {
    if (inputValue.trim()) {
      const newIngredient = inputValue.trim()

      if (!ingredients.includes(newIngredient)) {
        onIngredientsChange([...ingredients, newIngredient])
      }

      setInputValue('')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addIngredient()
    }
  }

  const removeIngredient = (indexToRemove) => {
    onIngredientsChange(ingredients.filter((_, index) => index !== indexToRemove))
  }

  return (
    <VStack spacing={4} align="stretch">
      <VStack spacing={2} align="start">
        <Text fontSize="xl" fontWeight="semibold" color="neutral.700">
          Extra Ingredients
        </Text>
        <Text fontSize="sm" color="neutral.600">
          Add any additional ingredients you'd like to include. Type an ingredient and click "Add" or press Enter.
        </Text>
      </VStack>

      <Box position="relative" maxW="300px">
        <Input
          placeholder="e.g., garlic, herbs, cheese..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          _focus={{ borderColor: "primary.500" }}
          _placeholder={{ color: 'neutral.400' }}
          pr="3rem"
        />
        <Button
          onClick={addIngredient}
          position="absolute"
          right="4px"
          top="50%"
          transform="translateY(-50%)"
          size="sm"
          colorPalette="orange"
          variant="solid"
          disabled={!inputValue.trim()}
          borderRadius="md"
          minW="auto"
          h="calc(100% - 8px)"
          px={2}
        >
          <Plus size={16} />
        </Button>
      </Box>

      {ingredients.length > 0 && (
        <Box>
          <Text fontSize="sm" fontWeight="medium" color="neutral.700" mb={2}>
            Added ingredients:
          </Text>
          <HStack spacing={2} wrap="wrap">
            {ingredients.map((ingredient, index) => {
              const colorScheme = tagColors[index % tagColors.length]

              return (
                <Tag.Root
                  key={index}
                  size="lg"
                  colorScheme={colorScheme}
                  variant="solid"
                  style={{
                    animation: `slideIn 0.3s ease ${index * 0.1}s both`
                  }}
                >
                  <Tag.Label>{ingredient}</Tag.Label>
                  <Tag.CloseTrigger
                    onClick={() => removeIngredient(index)}
                    _hover={{ bg: 'blackAlpha.200' }}
                    transition="all 0.2s"
                  >
                    <X size={14} />
                  </Tag.CloseTrigger>
                </Tag.Root>
              )
            })}
          </HStack>
        </Box>
      )}
    </VStack>
  )
}