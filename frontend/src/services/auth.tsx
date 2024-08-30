import * as authApi from "../apis/auth";
import {
  hashData,
  storeToken,
  removeToken,
  getToken,
  hashDataWithSaltRounds,
} from "../utils/security";

export async function login(credentials: { email: string; password: string }) {
  try {
    // get the salt and iterations
    const userData = await authApi.fetchSaltAndIterations(credentials.email);
    console.log("userData:", userData);
    const { salt, iterations } = userData;

    const hashedPassword = hashDataWithSaltRounds(
      credentials.password,
      salt,
      iterations
    );
    console.log("hashedPassword", hashedPassword);

    const loginCredentials = {
      email: credentials.email,
      password: hashedPassword,
    };

    console.log(`login credentials for logging in: ${loginCredentials}`);
    const response = await authApi.login(loginCredentials);
    console.log(`response from backend for login: ${JSON.stringify(response)}`);

    if (response.token) {
      storeToken(response.token);
    }

    return response;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}

export async function register(userData: {
  name: string;
  company: string;
  email: string;
  password: string;
}) {
  try {
    const { hash, salt, iterations } = hashData(userData.password);
    const response = await authApi.register({
      ...userData,
      password: hash,
      salt: salt,
      iterations: iterations,
    });

    if (response.token) {
      storeToken(response.token);
    }

    return response;
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
}

export async function logout(user) {
  try {
    const response = await authApi.logout(user);
    removeToken();

    return response;
  } catch (error) {
    console.error("Lougout error:", error);
    throw error;
  }
}

export function isAuthenticated() {
  return getToken() !== null;
}

export function getCurrentUser() {
  const token = getToken();
  if (!token) return null;

  // Decode the token to get user information
  const payload = JSON.parse(atob(token.split(".")[1]));
  return payload;
}
