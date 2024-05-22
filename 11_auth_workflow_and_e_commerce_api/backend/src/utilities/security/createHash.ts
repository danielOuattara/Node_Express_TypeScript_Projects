import crypto from "crypto";

export const createHash = (string: string) =>
  crypto.createHash("md5").update(string).digest("hex");
