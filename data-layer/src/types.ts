import { DataBaseConnection } from "./connection";

export type TB_ORM =  ReturnType<typeof DataBaseConnection.getDataLayerProvider>;