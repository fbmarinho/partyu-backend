import mongoose from "mongoose";

const url =
  "mongodb+srv://backend:backend@seagull-goppk.mongodb.net/db?retryWrites=true&w=majority";

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.Promise = global.Promise;

export default mongoose;
