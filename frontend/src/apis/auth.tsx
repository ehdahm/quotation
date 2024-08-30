import sendRequest from "../utils/sendRequest";

export function login(credentials) {
  console.log("credentials", credentials);
  return sendRequest(`/auth/login`, "POST", credentials);
}

export function register(userData: {
  name: string;
  company: string;
  email: string;
  password: string;
  salt: string;
  iterations: number;
}) {
  console.log("userData is in authApiFE", userData);
  return sendRequest(`/auth/register`, "POST", userData);
}

export function fetchSaltAndIterations(userEmail) {
  console.log(`fetching s*i with email: ${userEmail}`);
  return sendRequest(`/auth?email=${encodeURIComponent(userEmail)}`);
}

export function logout(user) {
  console.log("credentials", user);
  return sendRequest(`/auth/logout`, "POST", user);
}
