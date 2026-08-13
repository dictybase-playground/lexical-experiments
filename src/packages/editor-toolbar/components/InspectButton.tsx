import { Button } from "@mui/material"
import { $getSelection } from "lexical"
import VisibilityIcon from "@mui/icons-material/Visibility"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"

const InspectButton = () => {
  const [editor] = useLexicalComposerContext()
  const onClick = () => {
    editor.read(() => {
      console.log($getSelection().getNodes())
    })
  }
  return (
    <>
      <Button
        title="Insert Image"
        color="inherit"
        variant="text"
        onClick={onClick}
        startIcon={<VisibilityIcon />}
      >
        Inspect
      </Button>
    </>
  )
}

export { InspectButton }
