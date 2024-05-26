import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
  idPassport: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    default: "",
  },
  surname: {
    type: String,
    default: "",
  },
  phoneNumber: {
    type: String,
    default: "",
  },
  phoneAllocated: {
    type: Boolean,
    default: false,
  },
  organisationID: {
    // type: mongoose.Schema.Types.ObjectId,
    type: Number,
    default: 0,
    ref: "Organisations",
  },
});

const User = mongoose.model("Users", usersSchema);

export { User };
