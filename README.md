# Recipe Generator App 🍽️

A beautiful React web application that generates personalized recipes using OpenAI's API. Built with Chakra UI v3, featuring a modern food-themed design and intuitive user interactions.

## Features ✨

- **Interactive Recipe Builder**: Select proteins, starches, extra ingredients, cooking styles, and preferences
- **AI-Powered Recipe Generation**: Uses OpenAI GPT-3.5-turbo to create personalized recipes
- **Beautiful UI**: Modern design with warm, food-themed colors and smooth animations
- **Responsive Design**: Mobile-first approach that works on all devices
- **Smart Persistence**: Saves your preferences and form state in localStorage
- **Comprehensive Error Handling**: Graceful handling of API failures and network issues
- **Nutritional Information**: Displays calories, protein, carbs, and fat content
- **Metric Measurements**: All ingredients displayed in metric units for precision

## Tech Stack 🛠️

- **Frontend**: React 18 with hooks
- **UI Framework**: Chakra UI v3
- **Build Tool**: Vite
- **API Integration**: OpenAI GPT-3.5-turbo
- **HTTP Client**: Axios
- **Icons**: Lucide React + React Icons
- **Styling**: Custom theme with food-themed color palette

## Setup Instructions 🚀

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- OpenAI API key

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure OpenAI API key:**
   - The `.env` file contains your OpenAI API key
   - Make sure it's set correctly for the application to work

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   - Navigate to the URL shown in terminal (usually `http://localhost:5173`)

## How to Use 📖

### 1. Recipe Builder
- **Portions**: Select 1-6 portions using the circular progress selector
- **Protein**: Choose from turkey, salmon, chicken, or specify your own
- **Starch**: Select rice, potato, sweet potato, pasta, or no starch
- **Extra Ingredients**: Add any additional ingredients by typing and pressing Enter
- **Cooking Style**: Choose from Italian, Mediterranean, Asian, Mexican, American, or other
- **Preferences**: Select healthy, quick, indulgent, comfort food, light, or no preference

### 2. Recipe Suggestions
- View 3 AI-generated recipe options based on your selections
- Click "Select Recipe" to get the full detailed recipe

### 3. Full Recipe Display
- View complete ingredients list with measurements in metric units
- Follow step-by-step cooking instructions
- See nutritional information (calories, protein, carbs, fat)
- Generate new recipes or try different options

## Development Commands 💻

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Troubleshooting 🔧

### Common Issues

1. **API Key Error**: Make sure your OpenAI API key is correctly set in the `.env` file
2. **Rate Limiting**: If you hit rate limits, wait a moment and try again
3. **Network Issues**: Check your internet connection and try again
4. **Build Errors**: Make sure all dependencies are installed with `npm install`

**Enjoy creating delicious recipes! 🍳✨**
