import express from "express";
import { dbConection } from "./db/databaseconfig";
import { PORT } from "./util/config";
import { logInfo } from "./util/logs";
import idiomaRouter from "./routes/idioma";
import AutorRouter from "./routes/autor";

const app = express();
app.use(express.json());

dbConection().then(()=>{
    app.listen(PORT, () => {
        logInfo(`Server is running on port ${PORT}`);
    })

    app.use('/api/idiomas', idiomaRouter)
    app.use('/api/autor', AutorRouter)
})