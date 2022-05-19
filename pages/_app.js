import { ChakraProvider } from "@chakra-ui/react"

const Website = ({ Component, pageProps }) => {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
