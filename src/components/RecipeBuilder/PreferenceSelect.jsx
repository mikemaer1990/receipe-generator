import { SimpleGrid, Card, Box, Text, VStack } from "@chakra-ui/react"
import { Heart, Clock, Cookie, Home, Feather, Sparkles } from "lucide-react"

const preferenceOptions = [
  {
    value: 'healthy',
    label: 'Healthy',
    description: 'Low calories, nutritious',
    icon: Heart,
    gradient: 'linear(135deg, green.400, green.600)',
    selectedBg: 'linear-gradient(135deg, #16a34a, #15803d)',
    color: 'green'
  },
  {
    value: 'quick',
    label: 'Quick',
    description: 'Ready in 30 minutes',
    icon: Clock,
    gradient: 'linear(135deg, blue.400, blue.600)',
    selectedBg: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
    color: 'blue'
  },
  {
    value: 'indulgent',
    label: 'Indulgent',
    description: 'Rich and flavorful',
    icon: Cookie,
    gradient: 'linear(135deg, purple.400, purple.600)',
    selectedBg: 'linear-gradient(135deg, #9333ea, #7c3aed)',
    color: 'purple'
  },
  {
    value: 'comfort',
    label: 'Comfort Food',
    description: 'Hearty and satisfying',
    icon: Home,
    gradient: 'linear(135deg, orange.400, orange.600)',
    selectedBg: 'linear-gradient(135deg, #ea580c, #dc2626)',
    color: 'orange'
  },
  {
    value: 'light',
    label: 'Light',
    description: 'Fresh and simple',
    icon: Feather,
    gradient: 'linear(135deg, yellow.400, yellow.600)',
    selectedBg: 'linear-gradient(135deg, #eab308, #ca8a04)',
    color: 'yellow'
  },
  {
    value: 'none',
    label: 'No Preference',
    description: 'Surprise me!',
    icon: Sparkles,
    gradient: 'linear(135deg, neutral.400, neutral.600)',
    selectedBg: 'linear-gradient(135deg, #4a5568, #2d3748)',
    color: 'neutral'
  }
]

export function PreferenceSelect({ selectedPreference, onPreferenceChange }) {
  return (
    <VStack spacing={4} align="stretch">
      <VStack spacing={2} align="start">
        <Text fontSize="xl" fontWeight="semibold" color="neutral.700">
          Recipe Preference
        </Text>
        <Text fontSize="sm" color="neutral.600">
          What kind of recipe are you in the mood for?
        </Text>
      </VStack>

      <SimpleGrid
        columns={{ base: 2, sm: 3, md: 3, lg: 3 }}
        gap={{ base: 4, md: 5 }}
        py={2}
      >
        {preferenceOptions.map((option) => {
          const IconComponent = option.icon
          const isSelected = selectedPreference === option.value

          return (
            <Card.Root
              key={option.value}
              onClick={() => onPreferenceChange(option.value)}
              cursor="pointer"
              h={{ base: "120px", md: "120px" }}
              bg={isSelected ? option.selectedBg : 'linear-gradient(135deg, #fffaf7, #f7f5f3)'}
              borderWidth="2px"
              borderColor={isSelected ? `${option.color}.500` : "neutral.200"}
              position="relative"
              transition="all 0.2s ease"
              _hover={{
                transform: "scale(1.05)",
                borderColor: `${option.color}.400`
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
                    size={24}
                    color={isSelected ? "white" : "var(--chakra-colors-neutral-600)"}
                  />
                  <Text
                    fontSize="md"
                    fontWeight="bold"
                    color={isSelected ? "white" : "neutral.700"}
                    textAlign="center"
                  >
                    {option.label}
                  </Text>
                  <Text
                    fontSize="xs"
                    color={isSelected ? "whiteAlpha.900" : "neutral.600"}
                    textAlign="center"
                    lineHeight={1.2}
                  >
                    {option.description}
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
      </SimpleGrid>
    </VStack>
  )
}