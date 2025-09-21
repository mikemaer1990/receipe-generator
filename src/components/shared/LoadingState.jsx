import { Skeleton, SimpleGrid, Card, VStack } from "@chakra-ui/react"

export function LoadingState() {
  return (
    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} w="full">
      {[1, 2, 3].map((index) => (
        <Card.Root key={index} p={6} h="200px">
          <VStack align="stretch" h="full" spacing={4}>
            <Skeleton height="24px" width="80%" />
            <Skeleton height="16px" width="100%" />
            <Skeleton height="16px" width="90%" />
            <Skeleton height="16px" width="70%" />
            <Skeleton height="40px" width="60%" mt="auto" />
          </VStack>
        </Card.Root>
      ))}
    </SimpleGrid>
  )
}