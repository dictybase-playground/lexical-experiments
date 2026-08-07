import { useEffect } from "react"
import { COMMAND_PRIORITY_EDITOR, $getRoot } from "lexical"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { pipe } from "fp-ts/function"
import {
  fromNullable as OfromNullable,
  getOrElse as OgetOrElse,
  orElse as OorElse,
  map as Omap,
} from "fp-ts/Option"
import { match } from "ts-pattern"
import { BasicImageNode } from "./BasicImageNode"
import { INSERT_IMAGE_COMMAND, InsertImagePayload } from "./InsertImageCommand"
import {
  getTopLevelElementFromSelection,
  getFlexLayoutNodeFromSelection,
} from "./InsertImageHelpers"

const BasicImagePlugin = () => {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    if (!editor.hasNodes([BasicImageNode])) {
      throw new Error("ImagesPlugin: BasicImageNode not registered on editor")
    }
    console.log("BasicImagePlugin registered")
    const unregisterInsertImage = editor.registerCommand(
      INSERT_IMAGE_COMMAND,
      (payload: InsertImagePayload) => {
        const imageNode = new BasicImageNode(payload)
        const topLevelNode = getTopLevelElementFromSelection()
        return pipe(
          topLevelNode,
          OfromNullable,
          Omap((someNode) => {
            someNode.insertAfter(imageNode)
            return true
          }),
          OgetOrElse(() => {
            $getRoot().append(imageNode)
            return true
          }),
        )
      },
      COMMAND_PRIORITY_EDITOR,
    )

    return () => {
      unregisterInsertImage()
    }
  })

  return <></>
}

export { BasicImagePlugin }
