const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  uid: {
    type: String,
    required: true,
  },
  dateLastLogin: {
    type: Date,
    default: Date.now(),
  },
  secret: {
    type: String,
  },
  activated: {
    type: Boolean,
    default: false,
  },
});


UserSchema.methods.createToken = function() {
  const resetToken = crypto.randomBytes(2).toString('hex');

  this.secret = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.secretExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};
const User = mongoose.model("User", UserSchema);

module.exports = User;