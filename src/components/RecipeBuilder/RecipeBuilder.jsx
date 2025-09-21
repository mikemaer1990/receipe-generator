import { useState, useEffect } from 'react'
import { VStack, Button, HStack, Separator, Box, Text } from "@chakra-ui/react"
import { RefreshCw, Sparkles } from "lucide-react"

import { PortionSelector } from './PortionSelector'
import { ProteinCards } from './ProteinCards'
import { StarchCards } from './StarchCards'
import { ExtraIngredients } from './ExtraIngredients'
import { StyleCards } from './StyleCards'
import { PreferenceSelect } from './PreferenceSelect'
import { storage } from '../../utils/localStorage'

export function RecipeBuilder({ onGenerateRecipes, isLoading }) {
  const [formData, setFormData] = useState({
    portions: 2,
    protein: null,
    proteinAmount: 300,
    customProteinName: '',
    starch: null,
    customStarchName: '',
    extraIngredients: [],
    cookingStyle: null,
    preference: 'none'
  })

  // Load saved preferences on mount
  useEffect(() => {
    const savedPreferences = storage.getPreferences()
    const savedFormState = storage.getFormState()

    if (savedFormState) {
      setFormData(savedFormState)
    } else if (Object.keys(savedPreferences).length > 0) {
      setFormData(prev => ({ ...prev, ...savedPreferences }))
    }
  }, [])

  // Save form state to localStorage on changes
  useEffect(() => {
    storage.saveFormState(formData)
  }, [formData])

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleReset = () => {
    const initialState = {
      portions: 2,
      protein: null,
      proteinAmount: 300,
      customProteinName: '',
      starch: null,
      customStarchName: '',
      extraIngredients: [],
      cookingStyle: null,
      preference: 'none'
    }
    setFormData(initialState)
    storage.clearFormState()
  }

  const handleGenerate = () => {
    // Save preferences for future use
    const preferences = {
      proteinAmount: formData.proteinAmount,
      cookingStyle: formData.cookingStyle,
      preference: formData.preference
    }
    storage.savePreferences(preferences)

    onGenerateRecipes(formData)
  }

  const isFormValid = formData.protein && formData.portions >= 1 &&
    (formData.protein !== 'other' || (formData.protein === 'other' && formData.customProteinName.trim()))

  return (
    <VStack spacing={8} align="stretch" maxW="4xl" mx="auto" pt={0} px={6} pb={6}>
      {/* Features Bar */}
      <Box bg="white" borderWidth="1px" borderColor="neutral.200" borderRadius="lg" p={4}>
        <HStack spacing={8} justify="center" wrap="wrap">
          <HStack spacing={2}>
            <Box w={2} h={2} bg="success.500" borderRadius="full" />
            <Text fontSize="sm" color="neutral.600">AI-Powered Recipes</Text>
          </HStack>
          <HStack spacing={2}>
            <Box w={2} h={2} bg="primary.500" borderRadius="full" />
            <Text fontSize="sm" color="neutral.600">Custom Ingredients</Text>
          </HStack>
          <HStack spacing={2}>
            <Box w={2} h={2} bg="secondary.500" borderRadius="full" />
            <Text fontSize="sm" color="neutral.600">Nutrition Info</Text>
          </HStack>
          <HStack spacing={2}>
            <Box w={2} h={2} bg="accent.500" borderRadius="full" />
            <Text fontSize="sm" color="neutral.600">Multiple Styles</Text>
          </HStack>
        </HStack>
      </Box>

      {/* Reset Button */}
      <HStack justify="end">
        <Button
          variant="ghost"
          colorScheme="orange"
          size="sm"
          onClick={handleReset}
          leftIcon={<RefreshCw size={16} />}
        >
          Reset All
        </Button>
      </HStack>

      {/* Form Sections */}
      <VStack spacing={8} align="stretch">
        <PortionSelector
          value={formData.portions}
          onChange={(value) => updateFormData('portions', value)}
        />

        <Separator />

        <ProteinCards
          selectedProtein={formData.protein}
          proteinAmount={formData.proteinAmount}
          customProteinName={formData.customProteinName}
          onProteinChange={(value) => updateFormData('protein', value)}
          onAmountChange={(value) => updateFormData('proteinAmount', value)}
          onCustomProteinChange={(value) => updateFormData('customProteinName', value)}
        />

        <Separator />

        <StarchCards
          selectedStarch={formData.starch}
          customStarchName={formData.customStarchName}
          onStarchChange={(value) => updateFormData('starch', value)}
          onCustomStarchChange={(value) => updateFormData('customStarchName', value)}
        />

        <Separator />

        <ExtraIngredients
          ingredients={formData.extraIngredients}
          onIngredientsChange={(value) => updateFormData('extraIngredients', value)}
        />

        <Separator />

        <StyleCards
          selectedStyle={formData.cookingStyle}
          onStyleChange={(value) => updateFormData('cookingStyle', value)}
        />

        <Separator />

        <PreferenceSelect
          selectedPreference={formData.preference}
          onPreferenceChange={(value) => updateFormData('preference', value)}
        />
      </VStack>

      {/* Action Button */}
      <Box pt={4}>
        <Button
          size="lg"
          colorPalette="orange"
          w={{ base: "full", md: "auto" }}
          minW={{ md: "300px" }}
          mx="auto"
          display="block"
          onClick={handleGenerate}
          disabled={!isFormValid || isLoading}
          isLoading={isLoading}
          loadingText="Generating Recipes..."
          leftIcon={!isLoading ? <Sparkles size={20} /> : undefined}
          _hover={{
            transform: isFormValid && !isLoading ? "translateY(-2px)" : "none",
            boxShadow: "lg"
          }}
          transition="all 0.2s"
          animation={isFormValid && !isLoading ? "pulse 2s infinite" : "none"}
        >
          Generate Recipes
        </Button>
      </Box>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }
      `}</style>
    </VStack>
  )
}