const mongoose = require("mongoose");
const Verifications = require("../../constants/Verifications");

const verificationSchema = new mongoose.Schema(
  {
    identifier: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: Object.values(Verifications),
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_, ret) {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

verificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
verificationSchema.index({ identifier: 1, type: 1 });

const Verification = mongoose.model("Verification", verificationSchema);

module.exports = { Verification };
