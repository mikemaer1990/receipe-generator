import { Card, Text, Button, VStack, HStack, Badge, Box, Tooltip } from "@chakra-ui/react"
import { ChefHat, Clock, Star, Utensils, ChevronDown, ChevronUp, Leaf, Sprout, Shield, Milk, Zap } from "lucide-react"
import { useState, useRef, useEffect } from "react"

export function RecipeCard({ recipe, onSelect, isLoading }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isTruncated, setIsTruncated] = useState(false)
  const textRef = useRef(null)

  // Check if text is actually truncated by comparing scroll height to client height
  useEffect(() => {
    if (textRef.current) {
      const element = textRef.current
      const isTextTruncated = element.scrollHeight > element.clientHeight
      setIsTruncated(isTextTruncated)
    }
  }, [recipe.title])

  // Use real metadata from recipe object with fallbacks
  const metadata = recipe.metadata || {
    prepTime: "25 mins",
    difficulty: "Medium",
    cuisine: "American",
    dietary: []
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'green'
      case 'medium': return 'yellow'
      case 'hard': return 'red'
      default: return 'gray'
    }
  }

  const getCuisineColor = (cuisine) => {
    const colors = {
      'italian': 'red',
      'mediterranean': 'blue',
      'asian': 'purple',
      'mexican': 'orange',
      'american': 'gray',
      'french': 'pink',
      'indian': 'yellow'
    }
    return colors[cuisine.toLowerCase()] || 'gray'
  }

  const getDietaryInfo = (dietaryType) => {
    const dietaryMap = {
      'vegetarian': { icon: Leaf, letter: 'V', color: 'green', label: 'Vegetarian' },
      'vegan': { icon: Sprout, letter: 'VG', color: 'green', label: 'Vegan' },
      'gluten-free': { icon: Shield, letter: 'GF', color: 'blue', label: 'Gluten-Free' },
      'dairy-free': { icon: Milk, letter: 'DF', color: 'orange', label: 'Dairy-Free' },
      'keto': { icon: Zap, letter: 'K', color: 'purple', label: 'Keto' },
      'low-carb': { icon: Zap, letter: 'LC', color: 'yellow', label: 'Low-Carb' }
    }
    return dietaryMap[dietaryType.toLowerCase()] || { icon: Star, letter: 'D', color: 'gray', label: dietaryType }
  }

  return (
    <Card.Root
      minH="240px"
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
      {/* Card Header */}
      <Box
        bg={`${getCuisineColor(metadata.cuisine)}.50`}
        borderTopRadius="lg"
        h="60px"
        p={4}
        borderBottomWidth="1px"
        borderBottomColor="neutral.200"
        display="flex"
        alignItems="center"
      >
        <HStack justify="space-between" align="center" w="full" h="full">
          {isTruncated ? (
            <Tooltip.Root positioning={{ placement: "top" }}>
              <Tooltip.Trigger asChild>
                <Text
                  ref={textRef}
                  fontSize="md"
                  fontWeight="bold"
                  color="neutral.800"
                  lineHeight={1.3}
                  noOfLines={2}
                  flex={1}
                  mr={2}
                  overflow="hidden"
                  textOverflow="ellipsis"
                  wordBreak="break-word"
                  display="-webkit-box"
                  cursor="help"
                  css={{
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical"
                  }}
                >
                  {recipe.title}
                </Text>
              </Tooltip.Trigger>
              <Tooltip.Positioner>
                <Tooltip.Content
                  bg="neutral.800"
                  color="white"
                  borderRadius="md"
                  px={3}
                  py={2}
                  fontSize="sm"
                  maxW="300px"
                >
                  {recipe.title}
                </Tooltip.Content>
              </Tooltip.Positioner>
            </Tooltip.Root>
          ) : (
            <Text
              ref={textRef}
              fontSize="md"
              fontWeight="bold"
              color="neutral.800"
              lineHeight={1.3}
              noOfLines={2}
              flex={1}
              mr={2}
              overflow="hidden"
              textOverflow="ellipsis"
              wordBreak="break-word"
              display="-webkit-box"
              css={{
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical"
              }}
            >
              {recipe.title}
            </Text>
          )}
          <Badge
            variant="solid"
            colorPalette={getCuisineColor(metadata.cuisine)}
            size="sm"
            flexShrink={0}
            alignSelf="center"
          >
            {metadata.cuisine}
          </Badge>
        </HStack>
      </Box>

      {/* Card Body */}
      <Card.Body p={4} display="flex" flexDirection="column" flex={1}>
        <VStack spacing={3} h="full" align="stretch">
          {/* Metadata row - three columns */}
          <HStack spacing={4} fontSize="sm" color="neutral.600" justify="space-between">
            {/* Left: Prep time */}
            <HStack spacing={1}>
              <Clock size={14} />
              <Text fontWeight="medium">{metadata.prepTime}</Text>
            </HStack>

            {/* Center: Dietary badges */}
            <HStack spacing={1} justify="center">
              {metadata.dietary.map((diet) => {
                const dietInfo = getDietaryInfo(diet)
                const IconComponent = dietInfo.icon
                return (
                  <Tooltip.Root key={diet} positioning={{ placement: "top" }}>
                    <Tooltip.Trigger asChild>
                      <Badge
                        variant="solid"
                        colorPalette={dietInfo.color}
                        size="xs"
                        borderRadius="full"
                        px={1.5}
                        py={0.5}
                        cursor="help"
                        display="flex"
                        alignItems="center"
                        gap={0.5}
                      >
                        <IconComponent size={10} />
                        <Text fontSize="xs" fontWeight="bold">
                          {dietInfo.letter}
                        </Text>
                      </Badge>
                    </Tooltip.Trigger>
                    <Tooltip.Positioner>
                      <Tooltip.Content
                        bg="neutral.800"
                        color="white"
                        borderRadius="md"
                        px={2}
                        py={1}
                        fontSize="xs"
                      >
                        {dietInfo.label}
                      </Tooltip.Content>
                    </Tooltip.Positioner>
                  </Tooltip.Root>
                )
              })}
            </HStack>

            {/* Right: Difficulty */}
            <Badge
              variant="outline"
              colorPalette={getDifficultyColor(metadata.difficulty)}
              size="sm"
            >
              <Star size={12} />
              {metadata.difficulty}
            </Badge>
          </HStack>

          {/* Description */}
          <Box flex={1}>
            <Text
              fontSize="sm"
              color="neutral.600"
              lineHeight={1.4}
              noOfLines={isExpanded ? undefined : 4}
            >
              {recipe.description}
            </Text>
            {recipe.description && recipe.description.length > 100 && (
              <Button
                variant="ghost"
                size="xs"
                colorPalette="orange"
                onClick={(e) => {
                  e.stopPropagation()
                  setIsExpanded(!isExpanded)
                }}
                leftIcon={isExpanded ? <ChevronUp size={10} /> : <ChevronDown size={10} />}
                mt={1}
                p={1}
                h="auto"
                minH="auto"
                fontSize="xs"
              >
                {isExpanded ? "Less" : "More"}
              </Button>
            )}
          </Box>
        </VStack>
      </Card.Body>

      {/* Card Footer */}
      <Box
        borderTopWidth="1px"
        borderTopColor="neutral.200"
        p={4}
        bg="neutral.25"
      >
        <Button
          size="md"
          colorPalette="orange"
          w="full"
          onClick={(e) => {
            e.stopPropagation()
            onSelect(recipe)
          }}
          disabled={isLoading}
          _hover={{
            "& svg": {
              animation: "hatToss"
            }
          }}
          transition="all 0.2s ease"
        >
          <ChefHat size={16} />
          Select Recipe
        </Button>
      </Box>
    </Card.Root>
  )
}