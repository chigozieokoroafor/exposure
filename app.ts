import express from "express";
import { createServer } from "http";
import { base_router } from "./src/controllers";
import { errorHandler } from "./src/util/errorHandler";

const app = express()
app.use(express.json())


app.use("/api",base_router)

app.use(errorHandler)

const httpServer = createServer(app)



httpServer.listen(3008, ()=>{
    console.log("running", 3008)
})

