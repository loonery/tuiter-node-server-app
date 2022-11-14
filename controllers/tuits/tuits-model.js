import mongoose from "mongoose";
import tuitsSchema from "./tuits-schema.js";

// create a mongoose model using the schema we defined earlier
const tuitsModel = mongoose.model('TuitModel', tuitsSchema);
export default tuitsModel;