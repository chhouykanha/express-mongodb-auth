const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    token: {
      type: String,
      required: true,
      unique: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    ipAddress: {
      type: String,
      default: null,
    },
    userAgent: {
      type: String,
      default: null,
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

sessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const Session = mongoose.model("Session", sessionSchema);

module.exports = { Session };
