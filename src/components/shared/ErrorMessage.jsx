import { Alert, Button } from "@chakra-ui/react"
import { AlertTriangle } from "lucide-react"

export function ErrorMessage({
  title = "Something went wrong",
  message = "Please try again later.",
  onRetry = null
}) {
  return (
    <Alert.Root status="error" colorScheme="orange" p={6}>
      <Alert.Indicator asChild>
        <AlertTriangle size={20} />
      </Alert.Indicator>
      <Alert.Content>
        <Alert.Title>{title}</Alert.Title>
        <Alert.Description>
          {message}
          {onRetry && (
            <Button
              size="sm"
              colorScheme="orange"
              onClick={onRetry}
              mt={3}
            >
              Try Again
            </Button>
          )}
        </Alert.Description>
      </Alert.Content>
    </Alert.Root>
  )
}