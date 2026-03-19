const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    accountId: {
      type: String,
      required: true,
    },
    providerId: {
      type: String,
      required: true,
      default: "credential",
    },
    password: {
      type: String,
      select: false,
      default: null,
    },
    accessToken: { type: String, default: null },
    refreshToken: { type: String, default: null },
    accessTokenExpiresAt: { type: Date, default: null },
    refreshTokenExpiresAt: { type: Date, default: null },
    scope: { type: String, default: null },
    idToken: { type: String, default: null },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_, ret) {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        delete ret.password;
        return ret;
      },
    },
  }
);

accountSchema.index({ user: 1, providerId: 1 }, { unique: true });

const Account = mongoose.model("Account", accountSchema);

module.exports = { Account };
