import { useEffect } from "react"
import {
  COMMAND_PRIORITY_EDITOR,
} from "lexical"
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
  getParagraphNodeFromSelection,
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
        console.log("inserting")
        const imageNode = new BasicImageNode(payload)
        const paragraphNode = getParagraphNodeFromSelection()
        return pipe(
          paragraphNode,
          OfromNullable,
          Omap((someParagraphNode) => {
            match(payload.alignment)
              .with("left", () => someParagraphNode.insertBefore(imageNode))
              .with("right", () => someParagraphNode.insertAfter(imageNode))
              .otherwise(() => someParagraphNode.insertBefore(imageNode))
            return true
          }),
          OorElse(() => {
            const flexParagraph = getFlexLayoutNodeFromSelection()
            return pipe(
              flexParagraph,
              OfromNullable,
              Omap((someFlexParagraph) => {
                someFlexParagraph.append(imageNode)
                return true
              }),
            )
          }),
          OgetOrElse(() => false),
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
