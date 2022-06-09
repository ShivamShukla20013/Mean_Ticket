const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    usrname: {
      type: String,
      unique: true
    },
    password: {
      type: String,
    },
    id: {
      type: String,
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: false
    },
  }
);

const UserModel = model("User", userSchema);

module.exports = UserModel;
