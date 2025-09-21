import { Card, Text, Button, VStack, HStack, Badge, Box, Tooltip } from "@chakra-ui/react"
import { ChefHat, Clock, Star, Utensils, ChevronDown, ChevronUp } from "lucide-react"
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
        h="100px"
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
                  noOfLines={3}
                  flex={1}
                  mr={2}
                  overflow="hidden"
                  textOverflow="ellipsis"
                  wordBreak="break-word"
                  display="-webkit-box"
                  cursor="help"
                  css={{
                    WebkitLineClamp: 3,
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
              noOfLines={3}
              flex={1}
              mr={2}
              overflow="hidden"
              textOverflow="ellipsis"
              wordBreak="break-word"
              display="-webkit-box"
              css={{
                WebkitLineClamp: 3,
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
            alignSelf="flex-start"
            mt={1}
          >
            {metadata.cuisine}
          </Badge>
        </HStack>
      </Box>

      {/* Card Body */}
      <Card.Body p={4} display="flex" flexDirection="column" flex={1}>
        <VStack spacing={3} h="full" align="stretch">
          {/* Metadata row - more compact */}
          <HStack spacing={4} fontSize="sm" color="neutral.600" justify="space-between">
            <HStack spacing={1}>
              <Clock size={14} />
              <Text fontWeight="medium">{metadata.prepTime}</Text>
            </HStack>
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
        <VStack spacing={3}>
          {/* Dietary badges in footer */}
          {metadata.dietary.length > 0 && (
            <HStack spacing={1} justify="center" wrap="wrap">
              {metadata.dietary.map((diet) => (
                <Badge
                  key={diet}
                  variant="subtle"
                  colorPalette="green"
                  size="xs"
                >
                  {diet}
                </Badge>
              ))}
            </HStack>
          )}

          <Button
            size="md"
            colorPalette="orange"
            w="full"
            leftIcon={<ChefHat size={16} />}
            onClick={(e) => {
              e.stopPropagation()
              onSelect(recipe)
            }}
            disabled={isLoading}
            _hover={{
              transform: "scale(0.98)"
            }}
            transition="all 0.1s"
          >
            Select Recipe
          </Button>
        </VStack>
      </Box>
    </Card.Root>
  )
}