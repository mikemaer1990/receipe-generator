import { Text, VStack, HStack, Box } from "@chakra-ui/react"
import { Check } from "lucide-react"

const preferenceOptions = [
  { value: 'healthy', label: 'Healthy', description: 'Low calories, nutritious' },
  { value: 'quick', label: 'Quick', description: 'Ready in 30 minutes' },
  { value: 'indulgent', label: 'Indulgent', description: 'Rich and flavorful' },
  { value: 'comfort', label: 'Comfort Food', description: 'Hearty and satisfying' },
  { value: 'light', label: 'Light', description: 'Fresh and simple' },
  { value: 'none', label: 'No Preference', description: 'Surprise me!' }
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

      <VStack spacing={3} align="stretch">
        {preferenceOptions.map((option) => {
          const isSelected = selectedPreference === option.value

          return (
            <Box
              key={option.value}
              onClick={() => onPreferenceChange(option.value)}
              p={3}
              borderRadius="md"
              borderWidth="1px"
              borderColor={isSelected ? "primary.500" : "neutral.200"}
              bg={isSelected ? "primary.50" : "white"}
              cursor="pointer"
              transition="all 0.2s"
              _hover={{
                borderColor: "primary.300",
                bg: "primary.50"
              }}
            >
              <HStack spacing={3} align="start">
                <Box
                  w={5}
                  h={5}
                  borderRadius="full"
                  borderWidth="2px"
                  borderColor={isSelected ? "primary.500" : "neutral.300"}
                  bg={isSelected ? "primary.500" : "white"}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  mt={1}
                  flexShrink={0}
                >
                  {isSelected && (
                    <Check size={12} color="white" />
                  )}
                </Box>
                <VStack spacing={1} align="start" flex={1}>
                  <Text
                    fontWeight="medium"
                    color={isSelected ? "primary.700" : "neutral.700"}
                  >
                    {option.label}
                  </Text>
                  <Text
                    fontSize="sm"
                    color={isSelected ? "primary.600" : "neutral.600"}
                  >
                    {option.description}
                  </Text>
                </VStack>
              </HStack>
            </Box>
          )
        })}
      </VStack>
    </VStack>
  )
}