import { Card, Text, List, Box, VStack, HStack, Button, Progress, Checkbox } from "@chakra-ui/react"
import { Clock, ToggleLeft, ToggleRight, CheckCircle } from "lucide-react"
import { useState } from "react"

export function Instructions({ instructions = [] }) {
  const [cookingMode, setCookingMode] = useState(false)
  const [completedSteps, setCompletedSteps] = useState(new Set())

  const toggleStep = (index) => {
    const newCompleted = new Set(completedSteps)
    if (newCompleted.has(index)) {
      newCompleted.delete(index)
    } else {
      newCompleted.add(index)
    }
    setCompletedSteps(newCompleted)
  }

  const progressPercentage = instructions.length > 0 ? (completedSteps.size / instructions.length) * 100 : 0
  return (
    <Card.Root>
      <Card.Header pb={4}>
        <VStack spacing={3} align="stretch">
          <HStack justify="space-between" align="center">
            <HStack spacing={3}>
              <Box
                p={2}
                borderRadius="md"
                bg="secondary.100"
                color="secondary.600"
                display="flex"
                alignItems="center"
              >
                <Clock size={20} />
              </Box>
              <Text fontSize="xl" fontWeight="bold" color="neutral.700">
                Cooking Instructions
              </Text>
            </HStack>

            {/* Cooking Mode Toggle */}
            <Button
              size="sm"
              variant={cookingMode ? "solid" : "outline"}
              colorScheme={cookingMode ? "blue" : "neutral"}
              onClick={() => setCookingMode(!cookingMode)}
              leftIcon={cookingMode ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
              minH="40px"
            >
              {cookingMode ? "Step Mode" : "Step Mode"}
            </Button>
          </HStack>

          {cookingMode && (
            <VStack spacing={3} align="stretch">
              <Box p={3} bg="blue.50" borderRadius="md" borderWidth="1px" borderColor="blue.200">
                <Text fontSize="sm" color="blue.700" fontWeight="medium">
                  👩‍🍳 Step Mode: Track your cooking progress step by step!
                </Text>
              </Box>

              {instructions.length > 0 && (
                <Box>
                  <HStack justify="space-between" align="center" mb={2}>
                    <Text fontSize="sm" fontWeight="medium" color="neutral.600">
                      Progress: {completedSteps.size} of {instructions.length} steps
                    </Text>
                    <Text fontSize="sm" fontWeight="bold" color="blue.600">
                      {Math.round(progressPercentage)}%
                    </Text>
                  </HStack>
                  <Progress
                    value={progressPercentage}
                    colorScheme="blue"
                    size="sm"
                    borderRadius="full"
                  />
                </Box>
              )}
            </VStack>
          )}
        </VStack>
      </Card.Header>

      <Card.Body pt={0}>
        {instructions.length > 0 ? (
          <VStack spacing={4} align="stretch">
            <List.Root
              spacing={4}
              styleType="none"
              ml={0}
              counter-reset="step-counter"
            >
              {instructions.map((instruction, index) => {
                // Remove step number if it already exists in the text
                const cleanInstruction = instruction.replace(/^\d+\.\s*/, '')
                const isCompleted = completedSteps.has(index)

                return (
                  <List.Item
                    key={index}
                    position="relative"
                    pl={cookingMode ? 20 : 16}
                    py={4}
                    bg={isCompleted ? "blue.50" : "white"}
                    borderRadius="lg"
                    borderWidth="1px"
                    borderColor={isCompleted ? "blue.300" : "neutral.200"}
                    boxShadow="sm"
                    transition="all 0.2s"
                    _hover={{
                      borderColor: isCompleted ? "blue.400" : "primary.300",
                      boxShadow: "md",
                      transform: "translateY(-1px)"
                    }}
                    cursor={cookingMode ? "pointer" : "default"}
                    onClick={cookingMode ? () => toggleStep(index) : undefined}
                  >
                    {cookingMode ? (
                      /* Checkbox for step mode */
                      <Checkbox
                        position="absolute"
                        left={4}
                        top={4}
                        isChecked={isCompleted}
                        onChange={() => toggleStep(index)}
                        colorScheme="blue"
                        size="lg"
                        icon={<CheckCircle size={16} />}
                      />
                    ) : (
                      /* Step number for viewing mode */
                      <Box
                        position="absolute"
                        left={4}
                        top={4}
                        width={8}
                        height={8}
                        bg="primary.500"
                        color="white"
                        borderRadius="full"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        fontSize="sm"
                        fontWeight="bold"
                      >
                        {index + 1}
                      </Box>
                    )}

                    <Text
                      fontSize="md"
                      color={isCompleted ? "blue.700" : "neutral.700"}
                      lineHeight="1.7"
                      textDecoration={isCompleted ? "line-through" : "none"}
                      opacity={isCompleted ? 0.8 : 1}
                    >
                      {cleanInstruction}
                    </Text>
                  </List.Item>
                )
              })}
            </List.Root>

            {(!cookingMode || completedSteps.size === instructions.length) && (
              <Box mt={4} p={4} bg="success.50" borderRadius="md" borderWidth="1px" borderColor="success.200">
                <HStack spacing={2} align="start">
                  <Text fontSize="lg">🎉</Text>
                  <VStack spacing={1} align="start">
                    <Text fontSize="sm" fontWeight="semibold" color="success.700">
                      {completedSteps.size === instructions.length && cookingMode ? "All Steps Complete!" : "Cooking Complete!"}
                    </Text>
                    <Text fontSize="sm" color="success.600">
                      Let your dish rest for a few minutes before serving. Enjoy your homemade creation!
                    </Text>
                  </VStack>
                </HStack>
              </Box>
            )}
          </VStack>
        ) : (
          <Box
            textAlign="center"
            py={8}
            color="neutral.500"
          >
            <Text>No instructions available</Text>
          </Box>
        )}
      </Card.Body>
    </Card.Root>
  )
}