import { Card, Text, List, Box, VStack, HStack } from "@chakra-ui/react"
import { Clock } from "lucide-react"

export function Instructions({ instructions = [] }) {
  return (
    <Card.Root>
      <Card.Header pb={4}>
        <Box display="flex" alignItems="center" gap={3}>
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
        </Box>
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

                return (
                  <List.Item
                    key={index}
                    position="relative"
                    pl={16}
                    py={4}
                    bg="white"
                    borderRadius="lg"
                    borderWidth="1px"
                    borderColor="neutral.200"
                    boxShadow="sm"
                    transition="all 0.2s"
                    _hover={{
                      borderColor: "primary.300",
                      boxShadow: "md",
                      transform: "translateY(-1px)"
                    }}
                    _before={{
                      content: `"${index + 1}"`,
                      position: "absolute",
                      left: 4,
                      top: 4,
                      width: 8,
                      height: 8,
                      bg: "primary.500",
                      color: "white",
                      borderRadius: "full",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "sm",
                      fontWeight: "bold"
                    }}
                  >
                    <Text
                      fontSize="md"
                      color="neutral.700"
                      lineHeight="1.7"
                    >
                      {cleanInstruction}
                    </Text>
                  </List.Item>
                )
              })}
            </List.Root>

            <Box mt={4} p={4} bg="success.50" borderRadius="md" borderWidth="1px" borderColor="success.200">
              <HStack spacing={2} align="start">
                <Text fontSize="lg">🎉</Text>
                <VStack spacing={1} align="start">
                  <Text fontSize="sm" fontWeight="semibold" color="success.700">
                    Cooking Complete!
                  </Text>
                  <Text fontSize="sm" color="success.600">
                    Let your dish rest for a few minutes before serving. Enjoy your homemade creation!
                  </Text>
                </VStack>
              </HStack>
            </Box>
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