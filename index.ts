
import dotenv from "dotenv"

import serverHttp from "./src/server"

dotenv.config()
const PORT=process.env.PORT || 81
serverHttp.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})
