import { Card, Box, Text, VStack } from "@chakra-ui/react"
import { Utensils, Wheat, Coffee, Beef, Zap, ChefHat } from "lucide-react"

const styleOptions = [
  {
    id: 'italian',
    name: 'Italian',
    icon: Utensils,
    gradient: 'linear(135deg, red.500, green.500)',
    selectedBg: 'linear-gradient(135deg, #dc2626, #16a34a)',
    color: 'red',
    description: 'Classic pasta & tomato'
  },
  {
    id: 'mediterranean',
    name: 'Mediterranean',
    icon: Wheat,
    gradient: 'linear(135deg, blue.500, blue.100)',
    selectedBg: 'linear-gradient(135deg, #2563eb, #f8fafc)',
    color: 'blue',
    description: 'Healthy olive oil & herbs'
  },
  {
    id: 'asian',
    name: 'Asian',
    icon: Coffee,
    gradient: 'linear(135deg, red.600, yellow.500)',
    selectedBg: 'linear-gradient(135deg, #dc2626, #f59e0b)',
    color: 'red',
    description: 'Bold spices & soy'
  },
  {
    id: 'mexican',
    name: 'Mexican',
    icon: Beef,
    gradient: 'linear(135deg, green.500, red.500, white)',
    selectedBg: 'linear-gradient(135deg, #16a34a, #dc2626)',
    color: 'green',
    description: 'Spicy & vibrant'
  },
  {
    id: 'american',
    name: 'American',
    icon: Zap,
    gradient: 'linear(135deg, blue.600, red.600)',
    selectedBg: 'linear-gradient(135deg, #2563eb, #dc2626)',
    color: 'blue',
    description: 'Hearty & comfort'
  },
  {
    id: 'other',
    name: 'Other',
    icon: ChefHat,
    gradient: 'linear(135deg, neutral.400, neutral.600)',
    selectedBg: 'linear-gradient(135deg, #4a5568, #2d3748)',
    color: 'neutral',
    description: 'Your choice'
  }
]

export function StyleCards({ selectedStyle, onStyleChange }) {
  return (
    <VStack spacing={4} align="stretch">
      <VStack spacing={2} align="start">
        <Text fontSize="xl" fontWeight="semibold" color="neutral.700">
          Cooking Style
        </Text>
        <Text fontSize="sm" color="neutral.600">
          Choose a culinary style to influence your recipe's flavors
        </Text>
      </VStack>

      <Box
        display="grid"
        gridTemplateColumns={{ base: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }}
        gap={4}
        p={2}
      >
        {styleOptions.map((style) => {
          const IconComponent = style.icon
          const isSelected = selectedStyle === style.id

          return (
            <Card.Root
              key={style.id}
              onClick={() => onStyleChange(style.id)}
              cursor="pointer"
              h="120px"
              bg={isSelected ? style.selectedBg : 'linear-gradient(135deg, #fffaf7, #f7f5f3)'}
              borderWidth="2px"
              borderColor={isSelected ? `${style.color}.500` : "neutral.200"}
              position="relative"
              transition="all 0.2s ease"
              _hover={{
                transform: "scale(1.05)",
                borderColor: `${style.color}.400`
              }}
            >
              <Box
                h="full"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                p={4}
              >
                <VStack spacing={2}>
                  <IconComponent
                    size={28}
                    color={isSelected ? "white" : "var(--chakra-colors-neutral-600)"}
                  />
                  <Text
                    fontSize="md"
                    fontWeight="bold"
                    color={isSelected ? "white" : "neutral.700"}
                    textAlign="center"
                  >
                    {style.name}
                  </Text>
                  <Text
                    fontSize="xs"
                    color={isSelected ? "whiteAlpha.900" : "neutral.600"}
                    textAlign="center"
                    lineHeight={1.2}
                  >
                    {style.description}
                  </Text>
                </VStack>

                {isSelected && (
                  <Box
                    position="absolute"
                    top={3}
                    right={3}
                    bg="whiteAlpha.300"
                    borderRadius="full"
                    p={1}
                    backdropFilter="blur(4px)"
                  >
                    <Box w={2} h={2} bg="white" borderRadius="full" />
                  </Box>
                )}
              </Box>
            </Card.Root>
          )
        })}
      </Box>
    </VStack>
  )
}