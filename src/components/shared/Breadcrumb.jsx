import { Breadcrumb, Box } from "@chakra-ui/react"
import { Home, ChefHat, BookOpen } from "lucide-react"

export function AppBreadcrumb({ currentStep, onNavigateToBuilder, onNavigateToSuggestions, recipeName, headerStyle = false }) {
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

  const containerStyle = headerStyle
    ? { bg: 'transparent', borderRadius: 'md', p: 0, mb: 0 }
    : { bg: 'neutral.100', borderRadius: 'md', p: 3, mb: 6 }

  const textColors = headerStyle
    ? {
        current: 'white',
        link: 'whiteAlpha.800',
        linkHover: 'white',
        separator: 'whiteAlpha.600'
      }
    : {
        current: 'orange.600',
        link: 'neutral.600',
        linkHover: 'orange.600',
        separator: 'neutral.400'
      }

  return (
    <Box {...containerStyle}>
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
                      color={textColors.current}
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
                      color={textColors.link}
                      _hover={{ color: textColors.linkHover }}
                      cursor="pointer"
                    >
                      <Icon size={16} />
                      {step.label}
                    </Breadcrumb.Link>
                  )}
                </Breadcrumb.Item>
                {!isLast && <Breadcrumb.Separator color={textColors.separator} />}
              </div>
            )
          })}
        </Breadcrumb.List>
      </Breadcrumb.Root>
    </Box>
  )
}