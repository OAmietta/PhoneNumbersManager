import mongoose from "mongoose";

const organisations = new mongoose.Schema({
  id: {
    type: Number,
    default: 0,
  },
  name: {
    type: String,
    default: "",
  },
});

const Organisation = mongoose.model("Organisations", organisations);

export { Organisation };
