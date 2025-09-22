import { SimpleGrid, HStack, Card, Box, Text, VStack, Input, Button } from "@chakra-ui/react"
import { Wheat, Beef, Cookie, X, Plus } from "lucide-react"

const starchOptions = [
  {
    id: 'rice',
    name: 'Rice',
    icon: Wheat,
    gradient: 'linear(135deg, green.400, green.600)',
    color: 'green'
  },
  {
    id: 'potato',
    name: 'Potato',
    icon: Beef, // Using as potato placeholder
    gradient: 'linear(135deg, yellow.600, yellow.800)',
    color: 'yellow'
  },
  {
    id: 'sweet-potato',
    name: 'Sweet Potato',
    icon: Cookie, // Using as sweet potato placeholder
    gradient: 'linear(135deg, orange.400, orange.600)',
    color: 'orange'
  },
  {
    id: 'pasta',
    name: 'Pasta',
    icon: Wheat,
    gradient: 'linear(135deg, yellow.400, yellow.600)',
    color: 'yellow'
  },
  {
    id: 'none',
    name: 'No Starch',
    icon: X,
    gradient: 'linear(135deg, neutral.300, neutral.500)',
    color: 'neutral',
    isNone: true
  },
  {
    id: 'other',
    name: 'Other',
    icon: Plus,
    gradient: 'linear(135deg, neutral.300, neutral.500)',
    color: 'neutral',
    isCustom: true
  }
]

export function StarchCards({ selectedStarch, customStarchName = '', onStarchChange, onCustomStarchChange }) {
  return (
    <VStack spacing={4} align="stretch">
      <Text fontSize="xl" fontWeight="semibold" color="neutral.700">
        Choose Your Starch
      </Text>

      <SimpleGrid
        columns={{ base: 3, sm: 3, md: 4, lg: 6 }}
        gap={{ base: 4, md: 5 }}
        py={2}
      >
        {starchOptions.map((starch) => {
          const IconComponent = starch.icon
          const isSelected = selectedStarch === starch.id

          return (
            <Card.Root
              key={starch.id}
              onClick={() => onStarchChange(starch.id)}
              cursor="pointer"
              minW={{ base: "90px", md: "100px" }}
              h={{ base: "100px", md: "100px" }}
              bg={isSelected ?
                (starch.id === 'rice' ? 'linear-gradient(135deg, #38a169, #2f855a)' :
                 starch.id === 'potato' ? 'linear-gradient(135deg, #b7791f, #744210)' :
                 starch.id === 'sweet-potato' ? 'linear-gradient(135deg, #dd6b20, #c53030)' :
                 starch.id === 'pasta' ? 'linear-gradient(135deg, #d69e2e, #b7791f)' :
                 'linear-gradient(135deg, #4a5568, #2d3748)')
                : 'linear-gradient(135deg, #fffaf7, #f7f5f3)'
              }
              borderWidth="2px"
              borderColor={isSelected ? `${starch.color}.500` : "neutral.200"}
              position="relative"
              transition="all 0.2s ease"
              _hover={{
                transform: "scale(1.05)",
                borderColor: `${starch.color}.400`
              }}
              opacity={starch.isNone ? (isSelected ? 1 : 0.7) : 1}
            >
              <Box
                h="full"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                p={3}
              >
                <IconComponent
                  size={24}
                  color={isSelected ? "white" : "var(--chakra-colors-neutral-600)"}
                />
                <Text
                  fontSize="sm"
                  fontWeight="medium"
                  color={isSelected ? "white" : "neutral.700"}
                  textAlign="center"
                  mt={2}
                  lineHeight={1.2}
                >
                  {starch.name}
                </Text>
              </Box>

              {isSelected && !starch.isNone && !starch.isCustom && (
                <Box
                  position="absolute"
                  top={2}
                  right={2}
                  bg="whiteAlpha.300"
                  borderRadius="full"
                  p={1}
                  backdropFilter="blur(4px)"
                >
                  <Box w={2} h={2} bg="white" borderRadius="full" />
                </Box>
              )}
            </Card.Root>
          )
        })}
      </SimpleGrid>

      <Text fontSize="sm" color="neutral.600">
        Select a starch base for your recipe, choose no starch for low-carb, or specify your own
      </Text>

      {selectedStarch === 'other' && (
        <Box>
          <Text fontSize="md" fontWeight="medium" color="neutral.700" mb={2}>
            Starch Name
          </Text>
          <Box position="relative" maxW="300px">
            <Input
              placeholder="Enter starch name (e.g., quinoa, couscous, etc.)"
              value={customStarchName}
              onChange={(e) => onCustomStarchChange(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && customStarchName.trim()) {
                  // Could add any specific logic here if needed
                }
              }}
              _focus={{ borderColor: "primary.500" }}
              _placeholder={{ color: 'neutral.400' }}
              pr="3rem"
            />
            <Button
              position="absolute"
              right="4px"
              top="50%"
              transform="translateY(-50%)"
              size="sm"
              colorPalette="orange"
              variant="solid"
              disabled={!customStarchName.trim()}
              borderRadius="md"
              minW="auto"
              h="calc(100% - 8px)"
              px={2}
            >
              <Plus size={16} />
            </Button>
          </Box>
        </Box>
      )}
    </VStack>
  )
}