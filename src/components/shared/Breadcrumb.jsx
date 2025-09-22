import { Breadcrumb, Box, useBreakpointValue } from "@chakra-ui/react"
import { Home, ChefHat, BookOpen } from "lucide-react"

export function AppBreadcrumb({ currentStep, onNavigateToBuilder, onNavigateToSuggestions, recipeName, headerStyle = false }) {
  const isMobile = useBreakpointValue({ base: true, md: false })
  const iconSize = useBreakpointValue({ base: 14, md: 16 })
  const breadcrumbSize = useBreakpointValue({ base: "xs", md: "sm" })
  const steps = [
    {
      key: 'builder',
      label: isMobile ? 'Builder' : 'Recipe Builder',
      icon: Home,
      onClick: onNavigateToBuilder
    },
    {
      key: 'suggestions',
      label: isMobile ? 'Recipes' : 'Choose Recipe',
      icon: ChefHat,
      onClick: onNavigateToSuggestions
    },
    {
      key: 'recipe',
      label: isMobile && recipeName?.length > 15 ? `${recipeName.slice(0, 15)}...` : (recipeName || 'Full Recipe'),
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
    : { bg: 'neutral.100', borderRadius: 'md', p: { base: 2, md: 3 }, mb: { base: 4, md: 6 } }

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
      <Breadcrumb.Root size={breadcrumbSize}>
        <Breadcrumb.List gap={{ base: 1, md: 2 }}>
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
                      gap={{ base: 1, md: 2 }}
                      color={textColors.current}
                      fontWeight="semibold"
                      fontSize={{ base: "xs", md: "sm" }}
                    >
                      <Icon size={iconSize} />
                      {step.label}
                    </Breadcrumb.CurrentLink>
                  ) : (
                    <Breadcrumb.Link
                      onClick={step.onClick}
                      display="flex"
                      alignItems="center"
                      gap={{ base: 1, md: 2 }}
                      color={textColors.link}
                      _hover={{ color: textColors.linkHover }}
                      cursor="pointer"
                      fontSize={{ base: "xs", md: "sm" }}
                      minH="44px"
                    >
                      <Icon size={iconSize} />
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