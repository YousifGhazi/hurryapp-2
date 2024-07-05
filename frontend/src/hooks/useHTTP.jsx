import axios from "axios";
import { useState } from "react";
import client from "../api/axios";
import useErrorHandling from "./useErrorHandling";

function useHTTP() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  const { errorHandler } = useErrorHandling();

  const sendHTTP = async (path, method, body = {}, isMultiPart = false) => {
    setLoading(true);
    setError(false);

    let options = {
      url: path,
      method: method,
      data: body,
    };

    if (isMultiPart) {
      const bodyFormData = new FormData();
      Object.keys(body).forEach((key) => {
        bodyFormData.append(key, body[key]);
      });
      delete options["body"];
      options = {
        ...options,
        content: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
      };
    }

    console.log(
      "🥽🥽🥽 Request 🥽🥽🥽",
      path,
      method,
      isMultiPart
        ? {
            ...options,
            content: () =>
              options.content.map((item) => ({ [item.key]: item.value })),
          }
        : options
    );

    try {
      const response = await client(options);
      const res = response?.data;
      setData(res?.result);
      setLoading(false);
      setError(false);
      res?.result &&
        console.log("📩📩📩 Response 📩📩📩", {
          data: res?.result,
          loading: false,
          error: false,
        });
      return { data: res?.result, loading: false, error: false };
    } catch (err) {
      if (axios.isCancel(err)) {
        console.log("Request canceled", err.message);
      } else {
        setError(err);
      }
      console.log("❌ useHTTP err ❌", err);
      const errorDetails = errorHandler(err);
      console.log("❌ errorDetails", errorDetails);
      setError(errorDetails);
      setLoading(false);
      return { data: null, error: errorDetails, loading: false };
    }
  };

  return [sendHTTP, { data, error, loading }];
}

export default useHTTP;
