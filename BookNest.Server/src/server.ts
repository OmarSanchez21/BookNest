import express from "express";
import { dbConection } from "./db/databaseconfig";
import { PORT } from "./util/config";
import { logInfo } from "./util/logs";
import idiomaRouter from "./routes/idioma";
import AutorRouter from "./routes/autor";
import EditorialRouter from "./routes/editorial";
import EmpleadoRouter from "./routes/empleado";
import UsuarioRouter from "./routes/usuario";

const app = express();
app.use(express.json());

dbConection().then(()=>{
    app.listen(PORT, () => {
        logInfo(`Server is running on port ${PORT}`);
    })

    app.use('/api/idiomas', idiomaRouter)
    app.use('/api/autor', AutorRouter)
    app.use('/api/editorial', EditorialRouter)
    app.use('/api/empleado', EmpleadoRouter)
    app.use('/api/usuario', UsuarioRouter)
})