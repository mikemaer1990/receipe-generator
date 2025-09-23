import { useState, useEffect } from 'react'
import { SimpleGrid, HStack, Card, Box, Text, NumberInput, VStack, Input, Button } from "@chakra-ui/react"
import { Bird, Fish, Egg, Plus, Beef, Ham, Leaf, CircleDot, Drumstick, Shield } from "lucide-react"

const toTitleCase = (str) => {
  return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
}

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
    name: 'Chicken Thigh',
    icon: Drumstick,
    color: 'yellow'
  },
  {
    id: 'chicken-breasts',
    name: 'Chicken Breast',
    icon: Shield,
    color: 'yellow'
  }
]

// Component for the default chicken view (single card)
const ChickenDefaultView = ({ isSelected, onClick, selectedProtein }) => {
  // Determine which chicken type is selected, if any
  const selectedChickenType = chickenSubOptions.find(option => option.id === selectedProtein)
  const IconComponent = Bird
  const displayText = selectedChickenType ? selectedChickenType.name.replace('Chicken ', '') : "Chicken"

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
const ChickenSplitView = ({ selectedProtein, onSubOptionClick }) => {
  const [hoveredHalf, setHoveredHalf] = useState(null)

  return (
  <HStack
    spacing={0}
    h="full"
    transition="all 0.3s ease-in-out"
    opacity={1}
    transform="scale(1)"
    px={1}
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
          px={1}
          py={2}
          cursor="pointer"
          onClick={(e) => {
            e.stopPropagation()
            onSubOptionClick(subOption.id)
          }}
          bg="transparent"
          _hover={{
            bg: 'whiteAlpha.200'
          }}
          transition="all 0.2s ease"
          onMouseEnter={() => setHoveredHalf(subOption.id)}
          onMouseLeave={() => setHoveredHalf(null)}
        >
          <SubIconComponent
            size={18}
            color={hoveredHalf === subOption.id ? "var(--chakra-colors-orange-600)" : "var(--chakra-colors-neutral-600)"}
          />
          <Text
            fontSize="xs"
            fontWeight="medium"
            color={hoveredHalf === subOption.id ? "orange.600" : "neutral.700"}
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
}

export function ProteinCards({ selectedProtein, proteinAmount = 300, customProteinName = '', onProteinChange, onAmountChange, onCustomProteinChange }) {
  const [chickenSplitState, setChickenSplitState] = useState('default') // 'default' | 'split'

  // Auto-submit custom protein after user stops typing
  useEffect(() => {
    if (selectedProtein === 'other' && customProteinName.trim()) {
      const timeoutId = setTimeout(() => {
        onProteinChange('other')
      }, 1500) // 1.5 second delay

      return () => clearTimeout(timeoutId)
    }
  }, [customProteinName, selectedProtein, onProteinChange])

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
            ? (selectedProtein === 'chicken-thighs' || selectedProtein === 'chicken-breasts') && chickenSplitState === 'default'
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
                    {protein.id === 'other' && customProteinName.trim() ? toTitleCase(customProteinName) : protein.name}
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
          <Box maxW="300px">
            <Input
              placeholder="Enter protein name (e.g., tofu, beef, etc.)"
              value={customProteinName}
              onChange={(e) => onCustomProteinChange(e.target.value)}
              onBlur={() => {
                if (customProteinName.trim()) {
                  onProteinChange('other')
                }
              }}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && customProteinName.trim()) {
                  onProteinChange('other')
                }
              }}
              _focus={{ borderColor: "primary.500" }}
              _placeholder={{ color: 'neutral.400' }}
            />
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