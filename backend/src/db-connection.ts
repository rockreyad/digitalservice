import mongoose from "mongoose";
import { config } from "./config";


async function connect() {
    try {
        const dbUrl = config.database.server as string;
        const port = config.database.port;

        await mongoose.connect(`mongodb://${dbUrl}:${port}`).then(() =>
            console.log("Database Connected!")).catch((error: any) =>
                console.log(error)
            )
    } catch (error) {
        console.log(error);
    }
}

export default connect;