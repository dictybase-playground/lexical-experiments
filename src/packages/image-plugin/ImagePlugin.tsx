import { useEffect } from "react"
import {
  KEY_ENTER_COMMAND,
  $getRoot,
  $getSelection,
  $createParagraphNode,
  COMMAND_PRIORITY_EDITOR,
  DRAGSTART_COMMAND,
  COMMAND_PRIORITY_HIGH,
  DROP_COMMAND,
  LexicalEditor,
  $isNodeSelection,
  $setSelection,
} from "lexical"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { pipe } from "fp-ts/function"
import {
  fromNullable as OfromNullable,
  getOrElse as OgetOrElse,
  orElse as OorElse,
  map as Omap,
  flatMap as OflatMap,
  filter as Ofilter,
  match as Omatch,
} from "fp-ts/Option"
import { match } from "ts-pattern"
import { last as Alast } from "fp-ts/Array"
import { ImageNode, $isImageNode } from "./ImageNode"
import { INSERT_IMAGE_COMMAND, InsertImagePayload } from "./InsertImageCommand"
import { onDragStart, onDrop } from "./dragHandlers"
import { getTopLevelElementFromSelection } from "./InsertImageHelpers"
import { $isFlexLayoutNode } from "@dictybase/flex-layout-plugin"

// If the currentSelection is an ImageNode, insert a paragraph
const onEnter = () => {
  return pipe(
    $getSelection(),
    OfromNullable,
    Omap((selection) => selection.getNodes()),
    OflatMap(Alast),
    Ofilter($isImageNode),
    Omatch(
      () => false,
      (imageNode) => {
        const paragraph = $createParagraphNode()
        imageNode.insertAfter(paragraph)
        return true
      },
    ),
    // Ofilter($isNodeSelection),
    // Omap((nodeSelection) => {
    //   nodeSelection
    // }),
  )
}

const ImagePlugin = () => {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    if (!editor.hasNodes([ImageNode])) {
      throw new Error("ImagesPlugin: ImageNode not registered on editor")
    }

    const unregisterInsertImage = editor.registerCommand(
      INSERT_IMAGE_COMMAND,
      (payload: InsertImagePayload) => {
        const imageNode = new ImageNode(payload)
        const topLevelNode = getTopLevelElementFromSelection()
        return pipe(
          topLevelNode,
          OfromNullable,
          Omap((someNode) => {
            someNode.insertAfter(imageNode)
            return true
          }),
          OgetOrElse(() => {
            // get the flex layout node and append it, else do nothing.
            return pipe(
              $getRoot().getFirstChild(),
              OfromNullable,
              Ofilter($isFlexLayoutNode),
              Omatch(
                () => false,
                (flexLayoutNode) => {
                  flexLayoutNode.append(imageNode)
                  return true
                },
              ),
            )
          }),
        )
      },
      COMMAND_PRIORITY_EDITOR,
    )

    // const unregisterInsertParagraph = editor.registerCommand(
    //   KEY_ENTER_COMMAND,
    //   onEnter,
    //   COMMAND_PRIORITY_EDITOR,
    // )
    // const unregisterDragStart = editor.registerCommand(
    //   DRAGSTART_COMMAND,
    //   onDragStart,
    //   COMMAND_PRIORITY_HIGH,
    // )
    //
    // const unregisterDrop = editor.registerCommand(
    //   DROP_COMMAND,
    //   (event) => onDrop(event, editor),
    //   COMMAND_PRIORITY_HIGH,
    // )

    return () => {
      unregisterInsertImage()
      // unregisterInsertParagraph()
      // unregisterDragStart()
      // unregisterDrop()
    }
  })

  return <></>
}

export { ImagePlugin }
