import { ChakraProvider } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import theme from "../theme";
import { createUrqlClient } from "../utils/createURQLclient";

function MyApp({ Component, pageProps }: any) {
	return (
		<ChakraProvider resetCSS theme={theme}>
			<Component {...pageProps} />
		</ChakraProvider>
	);
}

export default withUrqlClient(createUrqlClient, { ssr: false })(MyApp);
