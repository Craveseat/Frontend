import axios from "axios";
import Cookies from "js-cookie";
import { SignUpDetails, LoginDetails } from "./types";

const API = axios.create({
  baseURL: "https://craveseat-api-rebh.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use(
  (config) => {
    const token = authServices.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

const ACCESSTOKEN = "accessToken";

export const authServices = {
  setTokens: (accessToken: string) => {
    Cookies.set(ACCESSTOKEN, accessToken, {
      expires: 4, // 4 days
      secure: true,
      sameSite: "strict",
    });
  },

  // Get tokens
  getAccessToken: () => {
    return Cookies.get(ACCESSTOKEN);
  },

  // Remove tokens
  clearTokens: () => {
    Cookies.remove(ACCESSTOKEN);
  },

  loginUser: async (data: LoginDetails) => {
    try {
      const response = await API.post("/auth/login", data);
      if (response.data.data.access_token) {
        const { access_token } = response.data.data;
        authServices.setTokens(access_token);
      }
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || "An unknown error occurred",
        );
      }
      throw new Error("An unknown error occurred");
    }
  },

  signUp: async (data: SignUpDetails) => {
    try {
      const response = await API.post("/auth/signup", data);
      if (response.data.data.access_token) {
        const { access_token } = response.data.data;
        authServices.setTokens(access_token);
      }
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || "An unknown error occurred",
        );
      }
      throw new Error("An unknown error occurred");
    }
  },

  // Handle logout
  logout: (
    auth0Logout?: (options?: { logoutParams?: { returnTo: string } }) => void,
  ) => {
    authServices.clearTokens();
    localStorage.clear();
    if (auth0Logout) {
      auth0Logout({
        logoutParams: {
          returnTo: window.location.origin + "/signin",
        },
      });
    } else {
      window.location.href = "/signin";
    }
  },

  // Set Authorization header automatically
  setAuthHeader: () => {
    const token = authServices.getAccessToken();
    if (token) {
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  },
};

export const userProfile = async () => {
  try {
    const res = await API.get("/profile");
    console.log(res.data);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "An unknown error occurred",
      );
    }
    throw new Error("An unknown error occurred");
  }
};

export const updateProfile = async (data: any) => {
  try {
    console.log(data);
    const res = await API.patch("/profile", data);
    console.log(res.data);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "An unknown error occurred",
      );
    }
    throw new Error("An unknown error occurred");
  }
};

export const updateProfilePicture = async (data: any) => {
  try {
    console.log(data);
    const res = await API.post("/profile/upload-image", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(res.data);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "An unknown error occurred",
      );
    }
    throw new Error("An unknown error occurred");
  }
};

export const cravingCategories = async () => {
  try {
    const res = await API.get("/cravings/categories");
    console.log(res.data);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "An unknown error occurred",
      );
    }
    throw new Error("An unknown error occurred");
  }
};

export const uploadCravings = async (data: any) => {
  try {
    console.log(data);
    const res = await API.post("/cravings", data);
    console.log(res.data);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "An unknown error occurred",
      );
    }
    throw new Error("An unknown error occurred");
  }
};

// export default api;
