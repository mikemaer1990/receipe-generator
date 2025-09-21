import { Card, Text, List, Box } from "@chakra-ui/react"
import { ChefHat } from "lucide-react"

export function IngredientsList({ ingredients = [] }) {
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
        <Box display="flex" alignItems="center" gap={3}>
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
        </Box>
      </Card.Header>

      <Card.Body pt={0}>
        {ingredients.length > 0 ? (
          <List.Root
            spacing={3}
            styleType="none"
            ml={0}
          >
            {ingredients.map((ingredient, index) => (
              <List.Item
                key={index}
                position="relative"
                pl={8}
                py={2}
                bg="neutral.25"
                borderRadius="md"
                borderLeft="4px solid"
                borderLeftColor="primary.300"
                transition="all 0.2s"
                _hover={{
                  bg: "primary.25",
                  borderLeftColor: "primary.500"
                }}
              >
                {/* Custom bullet point */}
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

                <Text
                  fontSize="md"
                  color="neutral.700"
                  lineHeight="1.6"
                >
                  {highlightMeasurements(ingredient)}
                </Text>
              </List.Item>
            ))}
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

        <Box mt={6} p={3} bg="accent.50" borderRadius="md" borderWidth="1px" borderColor="accent.200">
          <Text fontSize="sm" color="accent.700" fontWeight="medium">
            💡 Tip: All measurements are in metric units for precision. Check that you have all ingredients before starting.
          </Text>
        </Box>
      </Card.Body>
    </Card.Root>
  )
}