import { Button } from "@mui/material"
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { INSERT_IMAGE_COMMAND } from "@dictybase/image-plugin"

const InsertImageButton = () => {
  const [editor] = useLexicalComposerContext()
  const onClick = () => {
      console.log("click")
      editor.dispatchCommand(INSERT_IMAGE_COMMAND, { source: "https://upload.wikimedia.org/wikipedia/commons/9/9b/Hypercubeorder_binary.svg"}) 
  }
  return (
    <>
      <Button
        color="inherit"
        variant="text"
        onClick={onClick}
        startIcon={<ImageOutlinedIcon />}>
        Image
      </Button>
    </>
  )
}

export { InsertImageButton }
