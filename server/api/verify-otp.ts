import { eventHandler, readBody, useStorage } from "#imports";

interface Body {
  email: string;
  otp: string;
}

export default eventHandler(async (event) => {
  const body = await readBody<Body>(event);
  if (!body.email || !body.otp) {
    return { message: "Missing required fields", success: false };
  }
  // const otp = await useStorage("otp").get(body.email);
  const user = await useStorage("user").get(body.email) as { otp: string };
  const otp = user.otp;
  if (body.otp !== otp) {
    return { message: "Invalid OTP", success: false };
  }
  user.otp = "";
  useStorage("user").set(body.email, user); 
  return { message: "OTP verified", success: true };
})