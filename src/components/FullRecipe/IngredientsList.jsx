import { Card, Text, List, Box, Checkbox, VStack, HStack, Button } from "@chakra-ui/react"
import { ChefHat, ToggleLeft, ToggleRight } from "lucide-react"
import { useState } from "react"

export function IngredientsList({ ingredients = [] }) {
  const [cookingMode, setCookingMode] = useState(false)
  const [checkedItems, setCheckedItems] = useState(new Set())

  const toggleIngredient = (index) => {
    const newChecked = new Set(checkedItems)
    if (newChecked.has(index)) {
      newChecked.delete(index)
    } else {
      newChecked.add(index)
    }
    setCheckedItems(newChecked)
  }
  const highlightMeasurements = (text) => {
    // Regex to match measurements (numbers followed by units or standalone numbers)
    const measurementRegex = /(\d+(?:\.\d+)?)\s*(g|kg|ml|l|cups?|tbsp|tsp|oz|lbs?|pieces?|cloves?|slices?)?/gi

    return text.split(measurementRegex).map((part, index) => {
      // Check if this part matches a number (measurement)
      if (/^\d+(?:\.\d+)?$/.test(part)) {
        return (
          <Text
            key={index}
            as="span"
            color="primary.600"
            fontWeight="semibold"
            bg="primary.50"
            px={1}
            borderRadius="sm"
          >
            {part}
          </Text>
        )
      }
      return part
    })
  }

  return (
    <Card.Root>
      <Card.Header pb={4}>
        <VStack spacing={3} align="stretch">
          <HStack justify="space-between" align="center">
            <HStack spacing={3}>
              <Box
                p={2}
                borderRadius="md"
                bg="primary.100"
                color="primary.600"
                display="flex"
                alignItems="center"
              >
                <ChefHat size={20} />
              </Box>
              <Text fontSize="xl" fontWeight="bold" color="neutral.700">
                Ingredients
              </Text>
            </HStack>

            {/* Cooking Mode Toggle */}
            <Button
              size="sm"
              variant={cookingMode ? "solid" : "outline"}
              colorScheme={cookingMode ? "green" : "neutral"}
              onClick={() => setCookingMode(!cookingMode)}
              leftIcon={cookingMode ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
              minH="40px"
            >
              {cookingMode ? "Cooking Mode" : "Cooking Mode"}
            </Button>
          </HStack>

          {cookingMode && (
            <Box p={3} bg="green.50" borderRadius="md" borderWidth="1px" borderColor="green.200">
              <Text fontSize="sm" color="green.700" fontWeight="medium">
                ✅ Cooking Mode: Check off ingredients as you add them to your dish!
              </Text>
            </Box>
          )}
        </VStack>
      </Card.Header>

      <Card.Body pt={0}>
        {ingredients.length > 0 ? (
          <List.Root
            spacing={3}
            styleType="none"
            ml={0}
          >
            {ingredients.map((ingredient, index) => {
              const isChecked = checkedItems.has(index)
              return (
                <List.Item
                  key={index}
                  position="relative"
                  pl={cookingMode ? 12 : 8}
                  py={3}
                  bg={isChecked ? "green.50" : "neutral.25"}
                  borderRadius="md"
                  borderLeft="4px solid"
                  borderLeftColor={isChecked ? "green.400" : "primary.300"}
                  transition="all 0.2s"
                  _hover={{
                    bg: isChecked ? "green.100" : "primary.25",
                    borderLeftColor: isChecked ? "green.500" : "primary.500"
                  }}
                  cursor={cookingMode ? "pointer" : "default"}
                  onClick={cookingMode ? () => toggleIngredient(index) : undefined}
                >
                  {cookingMode ? (
                    /* Checkbox for cooking mode */
                    <Checkbox
                      position="absolute"
                      left={3}
                      top="50%"
                      transform="translateY(-50%)"
                      isChecked={isChecked}
                      onChange={() => toggleIngredient(index)}
                      colorScheme="green"
                      size="lg"
                    />
                  ) : (
                    /* Custom bullet point for viewing mode */
                    <Box
                      position="absolute"
                      left={3}
                      top="50%"
                      transform="translateY(-50%)"
                      w={2}
                      h={2}
                      bg="primary.500"
                      borderRadius="full"
                    />
                  )}

                  <Text
                    fontSize="md"
                    color={isChecked ? "green.700" : "neutral.700"}
                    lineHeight="1.6"
                    textDecoration={isChecked ? "line-through" : "none"}
                    opacity={isChecked ? 0.7 : 1}
                  >
                    {highlightMeasurements(ingredient)}
                  </Text>
                </List.Item>
              )
            })}
          </List.Root>
        ) : (
          <Box
            textAlign="center"
            py={8}
            color="neutral.500"
          >
            <Text>No ingredients available</Text>
          </Box>
        )}

        {!cookingMode && (
          <Box mt={6} p={3} bg="accent.50" borderRadius="md" borderWidth="1px" borderColor="accent.200">
            <Text fontSize="sm" color="accent.700" fontWeight="medium">
              💡 Tip: All measurements are in metric units for precision. Toggle "Cooking Mode" to check off ingredients as you cook!
            </Text>
          </Box>
        )}

        {cookingMode && checkedItems.size > 0 && (
          <Box mt={4} p={3} bg="green.50" borderRadius="md" borderWidth="1px" borderColor="green.200">
            <Text fontSize="sm" color="green.700" fontWeight="medium">
              ✅ Progress: {checkedItems.size} of {ingredients.length} ingredients added
            </Text>
          </Box>
        )}
      </Card.Body>
    </Card.Root>
  )
}