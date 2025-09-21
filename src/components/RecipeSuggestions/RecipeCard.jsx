import { Card, Text, Button, VStack } from "@chakra-ui/react"
import { ChefHat } from "lucide-react"

export function RecipeCard({ recipe, onSelect, isLoading }) {
  return (
    <Card.Root
      minH="200px"
      cursor="pointer"
      transition="all 0.2s ease"
      _hover={{
        transform: "translateY(-4px)",
        boxShadow: "cardHover"
      }}
      onClick={() => !isLoading && onSelect(recipe)}
      opacity={isLoading ? 0.7 : 1}
      pointerEvents={isLoading ? "none" : "auto"}
      display="flex"
      flexDirection="column"
    >
      <Card.Body p={6} display="flex" flexDirection="column" h="full">
        <VStack spacing={4} h="full" justify="space-between" align="stretch">
          <VStack spacing={3} align="start" flex={1}>
            <Text
              fontSize="xl"
              fontWeight="bold"
              color="neutral.800"
              lineHeight={1.3}
              noOfLines={2}
            >
              {recipe.title}
            </Text>

            <Text
              fontSize="md"
              color="neutral.600"
              lineHeight={1.5}
              flex={1}
              noOfLines={4}
            >
              {recipe.description}
            </Text>
          </VStack>

          <Button
            size="md"
            colorPalette="orange"
            w="full"
            leftIcon={<ChefHat size={18} />}
            onClick={(e) => {
              e.stopPropagation()
              onSelect(recipe)
            }}
            disabled={isLoading}
            _hover={{
              transform: "scale(0.98)"
            }}
            transition="all 0.1s"
            mt="auto"
          >
            Select Recipe
          </Button>
        </VStack>
      </Card.Body>
    </Card.Root>
  )
}