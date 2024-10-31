interface User {
  email: string;
  username: string;
  password: string;
}
async function sendOTP(user: User) {
  const data = await $fetch("/api/otp-send", {
    method: "POST",
    body: user,
  });
}
async function verifyOTP(otp: string) {
  const data = await $fetch("/api/otp-verify", {
    method: "POST",
    body: { otp },
  });
}
export function useVerificationOTP() {
  return {
    sendOTP,
    verifyOTP,
  };
}
