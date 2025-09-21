import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"

const customConfig = defineConfig({
  theme: {
    keyframes: {
      hatToss: {
        "0%": { transform: "translateY(0px) rotateZ(0deg)" },
        "25%": { transform: "translateY(-10px) rotateZ(90deg)" },
        "50%": { transform: "translateY(-12px) rotateZ(180deg)" },
        "75%": { transform: "translateY(-10px) rotateZ(270deg)" },
        "100%": { transform: "translateY(0px) rotateZ(360deg)" }
      }
    },
    tokens: {
      animations: {
        hatToss: { value: "hatToss 0.8s ease-in-out" }
      },
      colors: {
        // Food-themed color palette from spec
        primary: {
          50: { value: "#FFF4ED" },
          100: { value: "#FFE6D5" },
          200: { value: "#FFCDAA" },
          300: { value: "#FFAB74" },
          400: { value: "#FF8C42" }, // Main primary - warm orange
          500: { value: "#FF8C42" },
          600: { value: "#E6792A" },
          700: { value: "#CC6815" },
          800: { value: "#B35700" },
          900: { value: "#994800" }
        },
        secondary: {
          50: { value: "#FDF2F8" },
          100: { value: "#FCE7F3" },
          200: { value: "#FBCFE8" },
          300: { value: "#F9A8D4" },
          400: { value: "#F472B6" },
          500: { value: "#D2001F" }, // Deep red
          600: { value: "#BE185D" },
          700: { value: "#A21CAF" },
          800: { value: "#86198F" },
          900: { value: "#701A75" }
        },
        accent: {
          50: { value: "#FFFBEB" },
          100: { value: "#FEF3C7" },
          200: { value: "#FDE68A" },
          300: { value: "#FCD34D" },
          400: { value: "#FFD23F" }, // Golden yellow
          500: { value: "#FFD23F" },
          600: { value: "#D97706" },
          700: { value: "#B45309" },
          800: { value: "#92400E" },
          900: { value: "#78350F" }
        },
        neutral: {
          50: { value: "#FFFAF7" }, // Cream white background
          100: { value: "#F7F5F3" }, // Warm gray
          200: { value: "#E5E1DC" },
          300: { value: "#D3CFC7" },
          400: { value: "#C1BDB2" },
          500: { value: "#8B7D6B" }, // Warm gray
          600: { value: "#6F5F4D" },
          700: { value: "#534439" },
          800: { value: "#372925" },
          900: { value: "#1B0E11" }
        },
        success: {
          400: { value: "#68D391" }, // Fresh green
          500: { value: "#68D391" }
        }
      },
      fonts: {
        heading: { value: "Inter, -apple-system, BlinkMacSystemFont, sans-serif" },
        body: { value: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }
      },
      shadows: {
        card: { value: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)" },
        cardHover: { value: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }
      },
      gradients: {
        primary: { value: "linear-gradient(135deg, #FF8C42 0%, #D2001F 100%)" },
        orange: { value: "linear-gradient(135deg, #FF8C42 0%, #FFD23F 100%)" },
        italian: { value: "linear-gradient(135deg, #DC2626 0%, #16A34A 100%)" },
        mediterranean: { value: "linear-gradient(135deg, #2563EB 0%, #F8FAFC 100%)" },
        asian: { value: "linear-gradient(135deg, #DC2626 0%, #F59E0B 100%)" },
        mexican: { value: "linear-gradient(135deg, #16A34A 0%, #DC2626 50%, #F8FAFC 100%)" },
        american: { value: "linear-gradient(135deg, #2563EB 0%, #DC2626 100%)" }
      }
    },
    semanticTokens: {
      colors: {
        bg: {
          canvas: { value: "{colors.neutral.50}" },
          subtle: { value: "{colors.neutral.100}" }
        },
        border: {
          emphasized: { value: "{colors.primary.500}" }
        },
        orange: {
          solid: { value: "{colors.primary.500}" },
          contrast: { value: "{colors.primary.50}" },
          fg: { value: "{colors.primary.700}" },
          muted: { value: "{colors.primary.100}" },
          subtle: { value: "{colors.primary.200}" },
          emphasized: { value: "{colors.primary.300}" },
          focusRing: { value: "{colors.primary.500}" }
        }
      }
    }
  }
})

export const system = createSystem(defaultConfig, customConfig)