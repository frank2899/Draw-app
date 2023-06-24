import { Box } from "../../components"
import DrawingPad from "./components/canvas/DrawingPad"

const Room = () => {
    return (
        <Box maxWidth="1200px" margin="auto">
            <DrawingPad/>
        </Box>
    )
}

export default Room