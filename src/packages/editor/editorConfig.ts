import { ListItemNode, ListNode } from "@lexical/list"
import { HeadingNode, QuoteNode } from "@lexical/rich-text"
import { LinkNode } from "@lexical/link"
import { ImageNode } from "@dictybase/image-plugin"
import { FlexLayoutNode } from "@dictybase/flex-layout-plugin"
import { DownloadLinkNode } from "@dictybase/editor-toolbar"

const editorTheme = {
  paragraph: "editor-paragraph",
  text: {
    bold: "editor-text-bold",
    italic: "editor-text-italic",
    underline: "editor-text-underline",
  },
}

const onError = (error: Error) => {
  // eslint-disable-next-line no-console
  console.error(error)
}

const dictyEditorConfig = {
  namespace: "DictyEditor",
  theme: { ...editorTheme },
  nodes: [
    HeadingNode,
    QuoteNode,
    LinkNode,
    DownloadLinkNode,
    ListItemNode,
    ListNode,
    ImageNode,
    FlexLayoutNode,
  ],
  onError,
}

export { dictyEditorConfig }
