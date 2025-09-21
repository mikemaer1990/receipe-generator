import { HStack, Card, Box, Text, VStack } from "@chakra-ui/react"
import { Users, User, UserPlus } from "lucide-react"

const portionOptions = [
  {
    id: 1,
    value: 1,
    label: "1",
    icon: User,
    description: "Solo meal",
    gradient: 'linear(135deg, orange.300, orange.500)',
    color: 'orange'
  },
  {
    id: 2,
    value: 2,
    label: "2",
    icon: Users,
    description: "Couple",
    gradient: 'linear(135deg, orange.400, orange.600)',
    color: 'orange'
  },
  {
    id: 3,
    value: 3,
    label: "3",
    icon: Users,
    description: "Small group",
    gradient: 'linear(135deg, orange.400, primary.500)',
    color: 'orange'
  },
  {
    id: 4,
    value: 4,
    label: "4",
    icon: Users,
    description: "Family",
    gradient: 'linear(135deg, primary.400, primary.600)',
    color: 'orange'
  },
  {
    id: 5,
    value: 5,
    label: "5",
    icon: UserPlus,
    description: "Group",
    gradient: 'linear(135deg, primary.500, secondary.500)',
    color: 'orange'
  },
  {
    id: 6,
    value: 6,
    label: "6",
    icon: UserPlus,
    description: "Large group",
    gradient: 'linear(135deg, primary.600, secondary.600)',
    color: 'orange'
  }
]

export function PortionSelector({ value = 2, onChange }) {
  return (
    <VStack spacing={4} align="stretch">
      <Text fontSize="xl" fontWeight="semibold" color="neutral.700">
        Choose Portion Size
      </Text>

      <HStack
        spacing={3}
        overflowX="auto"
        py={2}
        px={2}
        sx={{
          '&::-webkit-scrollbar': {
            height: '4px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'neutral.100',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'primary.300',
            borderRadius: '2px',
          },
        }}
      >
        {portionOptions.map((portion) => {
          const IconComponent = portion.icon
          const isSelected = value === portion.value

          return (
            <Card.Root
              key={portion.id}
              onClick={() => onChange(portion.value)}
              cursor="pointer"
              minW="100px"
              h="100px"
              bg={isSelected ?
                'linear-gradient(135deg, #dd6b20, #c05621)'
                : 'linear-gradient(135deg, #fffaf7, #f7f5f3)'
              }
              borderWidth="2px"
              borderColor={isSelected ? "orange.500" : "neutral.200"}
              position="relative"
              transition="all 0.2s ease"
              _hover={{
                transform: "scale(1.05)",
                borderColor: "orange.400"
              }}
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
                  fontSize="lg"
                  fontWeight="bold"
                  color={isSelected ? "white" : "neutral.700"}
                  mt={1}
                >
                  {portion.label}
                </Text>
                <Text
                  fontSize="xs"
                  color={isSelected ? "whiteAlpha.900" : "neutral.600"}
                  textAlign="center"
                  lineHeight={1.2}
                >
                  {portion.description}
                </Text>
              </Box>

              {isSelected && (
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
      </HStack>

      <Text fontSize="sm" color="neutral.600">
        Select the number of portions for your recipe (1-6 people)
      </Text>
    </VStack>
  )
}