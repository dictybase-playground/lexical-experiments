import {
  $isTextNode,
  $isElementNode,
  $getSelection,
  $isRangeSelection,
  $isParagraphNode,
  ParagraphNode,
} from "lexical"
import { $isListItemNode } from "@lexical/list"
import { $isFlexLayoutNode, $createFlexLayoutNode } from "./FlexLayoutNode"
import {
  getTopLevelElementFromSelection,
  getPointAtCaret,
  handleTextContent,
} from "./helpers"

const insertAroundParagraphNode = (
  paragraphNode: ParagraphNode,
  selectedPoint: ReturnType<typeof getPointAtCaret>,
) => {
  if (!selectedPoint) return
  const newFlexLayoutNode = $createFlexLayoutNode()
  const newParagraphNode = newFlexLayoutNode.getParagraphNodeOrThrow()

  if ($isTextNode(selectedPoint.getNode()) && selectedPoint.offset === 0) {
    paragraphNode.insertBefore(newFlexLayoutNode)
  } else if (
    $isTextNode(selectedPoint.getNode()) &&
    selectedPoint.offset !== 0
  ) {
    paragraphNode.insertAfter(newFlexLayoutNode)
    handleTextContent(selectedPoint, newParagraphNode)
    newParagraphNode.select(0, 0)
  } else if ($isElementNode(selectedPoint.getNode())) {
    paragraphNode.insertAfter(newFlexLayoutNode)
    newParagraphNode.select(0, 0)
  }
}

const InsertFlexLayoutNode = () => {
  const selection = $getSelection()
  if (!selection || !$isRangeSelection(selection)) return true

  if (!selection.isCollapsed()) {
    selection.removeText()
    return true
  }
  const selectedPoint = getPointAtCaret(selection)
  if (!selectedPoint) return true

  const textParent = selectedPoint.getNode().getParent()
  if ($isListItemNode(textParent)) return false

  const topLevelElement = getTopLevelElementFromSelection(selection)
  if (!topLevelElement) return true

  if ($isParagraphNode(topLevelElement)) {
    insertAroundParagraphNode(topLevelElement, selectedPoint)
    return true
  }

  if ($isFlexLayoutNode(topLevelElement)) {
    const newFlexLayoutNode = $createFlexLayoutNode()
    const newParagraphNode = newFlexLayoutNode.getParagraphNodeOrThrow()

    if ($isTextNode(selectedPoint.getNode()) && selectedPoint.offset === 0) {
      topLevelElement.insertBefore(newFlexLayoutNode)
    } else if ($isTextNode(selectedPoint.getNode())) {
      topLevelElement.insertAfter(newFlexLayoutNode)
      handleTextContent(selectedPoint, newParagraphNode)
      newParagraphNode.select(0, 0)
    } else if ($isElementNode(selectedPoint.getNode())) {
      topLevelElement.insertAfter(newFlexLayoutNode)
      newParagraphNode.select(0, 0)
    }
    return true
  }

  return true
}

export { InsertFlexLayoutNode }
