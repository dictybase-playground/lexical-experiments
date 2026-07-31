import { useEffect } from "react"
import { INSERT_PARAGRAPH_COMMAND, COMMAND_PRIORITY_HIGH } from "lexical"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"

const FlexLayoutPlugin = () => {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    // const unregisterInsertParagraph = editor.registerCommand(
    //   INSERT_PARAGRAPH_COMMAND,
    //   InsertFlexLayoutNode,
    //   COMMAND_PRIORITY_HIGH,
    // )
    //
    // return () => {
    //   unregisterInsertParagraph()
    // }
  })

  return <></>
}

export { FlexLayoutPlugin }
