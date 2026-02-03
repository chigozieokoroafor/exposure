import express from "express";
import { createServer } from "http";
import { base_router } from "./controllers";

const app = express()
app.use(express.json())


app.use("/api",base_router)


const httpServer = createServer(app)

httpServer.listen(4000, ()=>{
    console.log("running")
})

