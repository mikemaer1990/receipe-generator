import { Breadcrumb, Box } from "@chakra-ui/react"
import { Home, ChefHat, BookOpen } from "lucide-react"

export function AppBreadcrumb({ currentStep, onNavigateToBuilder, onNavigateToSuggestions, recipeName }) {
  const steps = [
    {
      key: 'builder',
      label: 'Recipe Builder',
      icon: Home,
      onClick: onNavigateToBuilder
    },
    {
      key: 'suggestions',
      label: 'Choose Recipe',
      icon: ChefHat,
      onClick: onNavigateToSuggestions
    },
    {
      key: 'recipe',
      label: recipeName || 'Full Recipe',
      icon: BookOpen,
      onClick: null
    }
  ]

  const getVisibleSteps = () => {
    switch (currentStep) {
      case 'builder':
        return steps.slice(0, 1)
      case 'suggestions':
        return steps.slice(0, 2)
      case 'recipe':
        return steps
      default:
        return []
    }
  }

  const visibleSteps = getVisibleSteps()

  if (visibleSteps.length === 0) {
    return null
  }

  return (
    <Box bg="neutral.100" borderRadius="md" p={3} mb={6}>
      <Breadcrumb.Root size="sm">
        <Breadcrumb.List gap={2}>
          {visibleSteps.map((step, index) => {
            const Icon = step.icon
            const isLast = index === visibleSteps.length - 1
            const isCurrent = step.key === currentStep

            return (
              <div key={step.key} style={{ display: 'contents' }}>
                <Breadcrumb.Item>
                  {isCurrent ? (
                    <Breadcrumb.CurrentLink
                      display="flex"
                      alignItems="center"
                      gap={2}
                      color="orange.600"
                      fontWeight="semibold"
                    >
                      <Icon size={16} />
                      {step.label}
                    </Breadcrumb.CurrentLink>
                  ) : (
                    <Breadcrumb.Link
                      onClick={step.onClick}
                      display="flex"
                      alignItems="center"
                      gap={2}
                      color="neutral.600"
                      _hover={{ color: "orange.600" }}
                      cursor="pointer"
                    >
                      <Icon size={16} />
                      {step.label}
                    </Breadcrumb.Link>
                  )}
                </Breadcrumb.Item>
                {!isLast && <Breadcrumb.Separator color="neutral.400" />}
              </div>
            )
          })}
        </Breadcrumb.List>
      </Breadcrumb.Root>
    </Box>
  )
}