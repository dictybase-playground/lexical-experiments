import {
  InitialEditorStateType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer"
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin"
import { ContentEditable } from "@lexical/react/LexicalContentEditable"
import { ListPlugin } from "@lexical/react/LexicalListPlugin"
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin"
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin"
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary"
import { Stack } from "@mui/material"
import { pipe } from "fp-ts/function"
import { match as Bmatch } from "fp-ts/boolean"
import {
  getOrElse as OgetOrElse,
  fromNullable as OfromNullable,
  map as Omap,
} from "fp-ts/Option"
import { ImagePlugin } from "@dictybase/image-plugin"
import { DictybaseToolbar } from "@dictybase/editor-toolbar"
import { FlexLayoutPlugin } from "@dictybase/flex-layout-plugin"
import { dictyEditorConfig } from "./editorConfig"
import { TreeViewPlugin } from "./TreeViewPlugin"
import {
  useEditorAreaStyles,
  useEditorPlaceholderStyles,
} from "./useEditorStyles"
import { initialStateString } from "./initialState"
import "./editor.css"

type EditorProperties = {
  content?: {
    storageKey: string | undefined
    editorState: InitialEditorStateType
  }
  plugins?: Array<JSX.Element>
  editable?: boolean
  toolbar?: JSX.Element
}

const Editor = ({
  content,
  editable = true,
  toolbar,
  plugins,
}: EditorProperties) => {
  const initialEditorState = pipe(
    content,
    OfromNullable,
    Omap(({ editorState }) => editorState),
    OgetOrElse(() => initialStateString as InitialEditorStateType),
  )
  const { classes: placeholderClasses } = useEditorPlaceholderStyles()
  const { classes: editorAreaClasses } = useEditorAreaStyles({ editable })

  return (
    <LexicalComposer
      initialConfig={{
        ...dictyEditorConfig,
        editorState: initialEditorState,
        editable,
      }}>
      <>{plugins}</>
      <ListPlugin />
      <LinkPlugin />
      <ImagePlugin />
      <HistoryPlugin />
      <FlexLayoutPlugin />
      {pipe(
        toolbar,
        OfromNullable,
        OgetOrElse(() => <></>),
      )}
      <Stack direction="row">
        <Stack spacing={1}>
          {pipe(
            editable,
            Bmatch(
              () => <></>,
              () => <DictybaseToolbar />,
            ),
          )}
          <div>
            <RichTextPlugin
              ErrorBoundary={LexicalErrorBoundary}
              contentEditable={
                <ContentEditable
                  id="content-editor"
                  className={editorAreaClasses.container}
                />
              }
              placeholder={
                <div className={placeholderClasses.root}>
                  Enter some text...
                </div>
              }
            />
          </div>
        </Stack>
        <TreeViewPlugin />
      </Stack>
    </LexicalComposer>
  )
}

export { Editor }
