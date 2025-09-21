import { SimpleGrid, Card, Text, VStack, HStack, Box } from "@chakra-ui/react"
import { Activity, Zap, Wheat, Droplet } from "lucide-react"

const nutritionIcons = {
  calories: { icon: Zap, color: 'orange.500', bg: 'orange.50' },
  protein: { icon: Activity, color: 'red.500', bg: 'red.50' },
  carbohydrates: { icon: Wheat, color: 'yellow.600', bg: 'yellow.50' },
  fat: { icon: Droplet, color: 'blue.500', bg: 'blue.50' }
}

export function NutritionStats({ nutrition, portions = 1 }) {
  const calculatePerServing = (total) => {
    return portions > 0 ? Math.round(total / portions) : total
  }

  const stats = [
    {
      key: 'calories',
      label: 'Calories',
      total: nutrition?.calories || 0,
      unit: 'kcal'
    },
    {
      key: 'protein',
      label: 'Protein',
      total: nutrition?.protein || 0,
      unit: 'g'
    },
    {
      key: 'carbohydrates',
      label: 'Carbs',
      total: nutrition?.carbohydrates || 0,
      unit: 'g'
    },
    {
      key: 'fat',
      label: 'Fat',
      total: nutrition?.fat || 0,
      unit: 'g'
    }
  ]

  return (
    <Card.Root>
      <Card.Header pb={4}>
        <Text fontSize="xl" fontWeight="bold" color="neutral.700">
          Nutritional Information
        </Text>
      </Card.Header>

      <Card.Body pt={0}>
        <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
          {stats.map((stat) => {
            const config = nutritionIcons[stat.key]
            const IconComponent = config.icon
            const perServing = calculatePerServing(stat.total)

            return (
              <Box
                key={stat.key}
                p={4}
                borderRadius="lg"
                bg={config.bg}
                borderWidth="1px"
                borderColor={`${config.color.split('.')[0]}.200`}
                transition="all 0.2s"
                _hover={{
                  transform: "translateY(-2px)",
                  boxShadow: "md"
                }}
              >
                <VStack spacing={3} align="center">
                  <Box
                    p={2}
                    borderRadius="full"
                    bg={config.color}
                    color="white"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <IconComponent size={20} />
                  </Box>

                  <VStack spacing={1} textAlign="center">
                    <Text
                      fontSize="xs"
                      fontWeight="medium"
                      color={`${config.color.split('.')[0]}.700`}
                      textTransform="uppercase"
                      letterSpacing="wide"
                    >
                      {stat.label}
                    </Text>

                    <VStack spacing={0}>
                      <HStack spacing={1} align="baseline">
                        <Text
                          fontSize="2xl"
                          fontWeight="bold"
                          color={config.color}
                        >
                          {stat.total}
                        </Text>
                        <Text
                          fontSize="sm"
                          color={`${config.color.split('.')[0]}.600`}
                          fontWeight="medium"
                        >
                          {stat.unit}
                        </Text>
                      </HStack>

                      <Text
                        fontSize="xs"
                        color={`${config.color.split('.')[0]}.600`}
                      >
                        {perServing} per serving
                      </Text>
                    </VStack>
                  </VStack>
                </VStack>
              </Box>
            )
          })}
        </SimpleGrid>

        <Box mt={4} p={3} bg="neutral.50" borderRadius="md">
          <Text fontSize="sm" color="neutral.600" textAlign="center">
            Nutritional values are estimates based on ingredients • Serving size: {portions} {portions === 1 ? 'portion' : 'portions'}
          </Text>
        </Box>
      </Card.Body>
    </Card.Root>
  )
}