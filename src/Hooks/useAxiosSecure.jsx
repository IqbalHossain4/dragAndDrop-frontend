import { useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider";

const axiosSecure = axios.create({
  baseURL: "https://tech-charms-seven.vercel.app",
});

const useAxiosSecure = () => {
  const { signOuts } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    axiosSecure.interceptors.request.use((config) => {
      const token = localStorage.getItem("access-token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          await signOuts();
          navigate("/signIns");
        }
        return Promise.reject(error);
      }
    );
  }, [signOuts, navigate]);

  return [axiosSecure];
};

export default useAxiosSecure;
