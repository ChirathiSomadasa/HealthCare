const { z } = require("zod");
//
const userSignupSchema = z.object({
  full_name: z.string(),
  mobile_number: z.string(),
  address: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  birthdate: z.string(),
  profile_pic: z.string().url(),
});
//
module.exports = userSignupSchema;
