import Notice from "./Notice"
import User from "./User"

let schemas = {
    Notice,
    User
}

//

import mongoose from 'mongoose'

export const Schema = schemas;
export const Model = Object.fromEntries(Object.entries(schemas).map(([name, schema]) => [name, mongoose.model(name, schema)]))