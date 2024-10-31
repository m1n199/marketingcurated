import { eventHandler, readBody, useNodeMailer, useStorage } from "#imports";

interface Body {
  email: string;
  username: string;
  password: string;
}

const otpString = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

function generateOTP() {
  return Array.from({ length: 6 }, () => otpString[Math.floor(Math.random() * otpString.length)]).join("");
}

export default eventHandler(async (event) => {
  const body = await readBody<Body>(event);
  if (!body.email || !body.username || !body.password) {
    return { message: "Missing required fields", success: false };
  }
  const otp = generateOTP();
  useStorage("user").set(body.email, {
    ...body,
    otp,
  });
  const { sendMail } = useNodeMailer()
  await sendMail({
    to: body.email,
    subject: "OTP for registration",
    text: `Your OTP is ${otp}`,
  });
  return { message: "User registered", success: true };
})