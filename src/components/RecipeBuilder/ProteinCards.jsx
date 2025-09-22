import { useState } from 'react'
import { SimpleGrid, HStack, Card, Box, Text, NumberInput, VStack, Input, Button } from "@chakra-ui/react"
import { Bird, Fish, Egg, Plus, Beef, Ham, Leaf, CircleDot, Drumstick, Shield } from "lucide-react"

const proteinOptions = [
  {
    id: 'turkey',
    name: 'Turkey',
    icon: Bird,
    gradient: 'linear(135deg, yellow.700, yellow.900)',
    color: 'yellow'
  },
  {
    id: 'salmon',
    name: 'Salmon',
    icon: Fish,
    gradient: 'linear(135deg, pink.400, orange.500)',
    color: 'pink'
  },
  {
    id: 'chicken',
    name: 'Chicken',
    icon: Bird,
    gradient: 'linear(135deg, yellow.400, orange.500)',
    color: 'yellow'
  },
  {
    id: 'beef',
    name: 'Beef',
    icon: Beef,
    gradient: 'linear(135deg, red.500, red.700)',
    color: 'red'
  },
  {
    id: 'pork',
    name: 'Pork',
    icon: Ham,
    gradient: 'linear(135deg, pink.400, pink.600)',
    color: 'pink'
  },
  {
    id: 'tofu',
    name: 'Tofu',
    icon: Leaf,
    gradient: 'linear(135deg, green.400, green.600)',
    color: 'green'
  },
  {
    id: 'beans',
    name: 'Beans',
    icon: CircleDot,
    gradient: 'linear(135deg, orange.600, yellow.700)',
    color: 'orange'
  },
  {
    id: 'eggs',
    name: 'Eggs',
    icon: Egg,
    gradient: 'linear(135deg, yellow.300, yellow.500)',
    color: 'yellow'
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

const chickenSubOptions = [
  {
    id: 'chicken-thighs',
    name: 'Chicken Thighs',
    icon: Drumstick,
    color: 'yellow'
  },
  {
    id: 'chicken-breasts',
    name: 'Chicken Breasts',
    icon: Shield,
    color: 'yellow'
  }
]

// Component for the default chicken view (single card)
const ChickenDefaultView = ({ isSelected, onClick, selectedProtein }) => {
  // Determine which chicken type is selected, if any
  const selectedChickenType = chickenSubOptions.find(option => option.id === selectedProtein)
  const IconComponent = selectedChickenType ? selectedChickenType.icon : Bird
  const displayText = selectedChickenType ? selectedChickenType.name : "Chicken"

  return (
    <Box
      h="full"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      p={3}
      onClick={onClick}
      cursor="pointer"
      transition="all 0.3s ease-in-out"
      opacity={1}
      transform="scale(1)"
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
        {displayText}
      </Text>
    </Box>
  )
}

// Component for the split chicken view (two halves)
const ChickenSplitView = ({ selectedProtein, onSubOptionClick }) => (
  <HStack
    spacing={0}
    h="full"
    transition="all 0.3s ease-in-out"
    opacity={1}
    transform="scale(1)"
  >
    {chickenSubOptions.map((subOption, index) => {
      const SubIconComponent = subOption.icon
      const isSubSelected = selectedProtein === subOption.id
      const isLeft = index === 0

      return (
        <Box
          key={subOption.id}
          flex={1}
          h="full"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          p={2}
          cursor="pointer"
          onClick={(e) => {
            e.stopPropagation()
            onSubOptionClick(subOption.id)
          }}
          borderRightWidth={isLeft ? "1px" : "0"}
          borderColor="whiteAlpha.300"
          bg={isSubSelected ?
            'linear-gradient(135deg, #dd6b20, #c05621)'
            : 'transparent'
          }
          _hover={{
            bg: isSubSelected ?
              'linear-gradient(135deg, #dd6b20, #c05621)'
              : 'whiteAlpha.200'
          }}
          transition="all 0.2s ease"
        >
          <SubIconComponent
            size={18}
            color={isSubSelected ? "white" : "var(--chakra-colors-neutral-600)"}
          />
          <Text
            fontSize="xs"
            fontWeight="medium"
            color={isSubSelected ? "white" : "neutral.700"}
            textAlign="center"
            mt={1}
            lineHeight={1.1}
          >
            {subOption.name.replace('Chicken ', '')}
          </Text>
        </Box>
      )
    })}
  </HStack>
)

export function ProteinCards({ selectedProtein, proteinAmount = 300, customProteinName = '', onProteinChange, onAmountChange, onCustomProteinChange }) {
  const [chickenSplitState, setChickenSplitState] = useState('default') // 'default' | 'split'

  const handleProteinClick = (proteinId) => {
    if (proteinId === 'chicken') {
      setChickenSplitState(chickenSplitState === 'default' ? 'split' : 'default')
    } else {
      setChickenSplitState('default')
      onProteinChange(proteinId)
    }
  }

  const handleChickenSubOptionClick = (subOptionId) => {
    onProteinChange(subOptionId)
    setChickenSplitState('default')
  }
  return (
    <VStack spacing={4} align="stretch">
      <Text fontSize="xl" fontWeight="semibold" color="neutral.700">
        Choose Your Protein
      </Text>

      <SimpleGrid
        columns={{ base: 3, sm: 3, md: 4, lg: 6 }}
        gap={{ base: 4, md: 5 }}
        py={2}
      >
        {proteinOptions.map((protein) => {
          const IconComponent = protein.icon
          const isSelected = protein.id === 'chicken'
            ? (selectedProtein === 'chicken-thighs' || selectedProtein === 'chicken-breasts')
            : selectedProtein === protein.id

          return (
            <Card.Root
              key={protein.id}
              onClick={protein.id === 'chicken' && chickenSplitState === 'split' ? undefined : () => handleProteinClick(protein.id)}
              cursor={protein.id === 'chicken' && chickenSplitState === 'split' ? "default" : "pointer"}
              minW={{ base: "90px", md: "100px" }}
              h={{ base: "100px", md: "100px" }}
              bg={isSelected ?
                (protein.id === 'turkey' ? 'linear-gradient(135deg, #b7791f, #744210)' :
                 protein.id === 'salmon' ? 'linear-gradient(135deg, #e53e3e, #c53030)' :
                 protein.id === 'chicken' ? 'linear-gradient(135deg, #dd6b20, #c05621)' :
                 protein.id === 'beef' ? 'linear-gradient(135deg, #dc2626, #b91c1c)' :
                 protein.id === 'pork' ? 'linear-gradient(135deg, #ec4899, #db2777)' :
                 protein.id === 'tofu' ? 'linear-gradient(135deg, #16a34a, #15803d)' :
                 protein.id === 'beans' ? 'linear-gradient(135deg, #ea580c, #b45309)' :
                 protein.id === 'eggs' ? 'linear-gradient(135deg, #eab308, #ca8a04)' :
                 'linear-gradient(135deg, #4a5568, #2d3748)')
                : 'linear-gradient(135deg, #fffaf7, #f7f5f3)'
              }
              borderWidth="2px"
              borderColor={isSelected ? `${protein.color}.500` : "neutral.200"}
              position="relative"
              transition="all 0.2s ease"
              _hover={{
                transform: "scale(1.05)",
                borderColor: `${protein.color}.400`
              }}
            >
              {protein.id === 'chicken' ? (
                chickenSplitState === 'default' ? (
                  <ChickenDefaultView
                    isSelected={isSelected}
                    onClick={() => handleProteinClick('chicken')}
                    selectedProtein={selectedProtein}
                  />
                ) : (
                  <ChickenSplitView
                    selectedProtein={selectedProtein}
                    onSubOptionClick={handleChickenSubOptionClick}
                  />
                )
              ) : (
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
                    {protein.name}
                  </Text>
                </Box>
              )}

              {isSelected && !protein.isCustom && (
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
        Select a protein for your recipe, or choose "Other" to specify your own
      </Text>

      {selectedProtein === 'other' && (
        <Box>
          <Text fontSize="md" fontWeight="medium" color="neutral.700" mb={2}>
            Protein Name
          </Text>
          <Box position="relative" maxW="300px">
            <Input
              placeholder="Enter protein name (e.g., tofu, beef, etc.)"
              value={customProteinName}
              onChange={(e) => onCustomProteinChange(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && customProteinName.trim()) {
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
              disabled={!customProteinName.trim()}
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

      <Box>
        <Text fontSize="md" fontWeight="medium" color="neutral.700" mb={2}>
          Amount (grams)
        </Text>
        <NumberInput.Root
          value={proteinAmount}
          onValueChange={({ value }) => onAmountChange(parseInt(value) || 300)}
          min={100}
          max={1000}
          step={25}
          w="200px"
        >
          <NumberInput.Input
            placeholder="300"
            _focus={{ borderColor: "primary.500" }}
          />
          <NumberInput.Control>
            <NumberInput.IncrementTrigger />
            <NumberInput.DecrementTrigger />
          </NumberInput.Control>
        </NumberInput.Root>
      </Box>
    </VStack>
  )
}