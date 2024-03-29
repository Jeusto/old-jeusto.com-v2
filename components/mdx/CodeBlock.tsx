import { useRef, useState } from "react";
import { useColorMode, Box } from "@chakra-ui/react";
import { prismDarkTheme, prismLightTheme } from "@/styles/prism";
import { Global } from "@emotion/react";
import { Button } from "@chakra-ui/react";
import { FiCopy } from "react-icons/fi";

interface CodeBlockProps {
  children: React.ReactNode;
}

export default function CodeBlock({ children }: CodeBlockProps) {
  const preRef = useRef<HTMLPreElement>(null);
  const { colorMode } = useColorMode();
  const prismTheme = colorMode === "light" ? prismLightTheme : prismDarkTheme;

  const [isCopied, setIsCopied] = useState(false);

  function copy() {
    const content = preRef.current?.textContent ?? "";
    navigator.clipboard.writeText(content);
  }

  return (
    <Box marginX="-5" marginY="5" position="relative">
      <pre ref={preRef}>{children}</pre>
      <Button
        pos="absolute"
        top="2"
        right="2"
        onClick={() => {
          copy();
          setIsCopied(true);
        }}
        size="xs"
        variant="ghost"
        leftIcon={<FiCopy />}
      >
        {isCopied ? "Copied" : "Copy"}
      </Button>

      <Global styles={prismTheme} />
    </Box>
  );
}
