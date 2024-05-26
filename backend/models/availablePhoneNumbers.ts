import mongoose from "mongoose";

const availablePhoneNumbers = new mongoose.Schema({
  phoneNumber: {
    type: String,
    default: "",
  },
  available: {
    type: Boolean,
    default: true,
  },
});

const PhoneNumber = mongoose.model(
  "AvailablePhoneNumbers",
  availablePhoneNumbers
);

export { PhoneNumber };
