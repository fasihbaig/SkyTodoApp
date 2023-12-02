import { DataBaseConnection } from "./connection";

export type MONGOOSE_DB =  Awaited<ReturnType<typeof DataBaseConnection.getDataLayerProvider>>;