import { createContext } from "react";
import React, { useEffect, useMemo } from "react";
import { useState } from "react";
import store from "./useContext";
import axios from "axios";
const APIUrl = process.env.REACT_APP_API_URL;
function ApiCustomHook({ children }) {
  async function fetchPost(url, body) {
    try {
      const responseData = await axios.request({
        method: "post",
        url: `${APIUrl}${url}`,
        headers: {
          "Content-Type": "application/json"
        },
        data: JSON.stringify(body)
      });
      return responseData.data;
    } catch (error) {
      console.log("error", error.response.data);

      return { error: error.message };
    }
  }

  async function fetchWithPostCredential(url, body) {
    try {
      const responseData = await axios.post(`${APIUrl}${url}`, body, {
        withCredentials: true
      });

      return responseData.data;
    } catch (error) {
      if (
        error?.response?.data?.error === "Invalid_Token" ||
        error?.response?.data?.error === "Invalid_user"
      ) {
        const data = await axios.post(
          `${APIUrl}token`,
          {},
          {
            withCredentials: true
          }
        );

        if (data.status) {
          const responseData = await axios.post(`${APIUrl}${url}`, body, {
            withCredentials: true
          });

          return responseData.data;
        }
      }
      return {
        error: error?.response?.data ? error.response.data.error : error.message
      };
    }
  }

  async function fetchGet(url) {
    try {
      const responseData = await axios.request({
        method: "get",
        url: `${APIUrl}${url}`,
        headers: {
          "Content-Type": "application/json"
        }
      });
      return responseData.data;
    } catch (error) {
      console.log(error);
      return { error: error.message };
    }
  }

  async function fetchExternalGet(url) {
    try {
      const responseData = await axios.request({
        method: "get",
        url: `${url}`,
        headers: {
          "Content-Type": "application/json"
        }
      });
      return responseData.data;
    } catch (error) {
      console.log(error);
      return { error: error.message };
    }
  }

  async function fetchGoogleContacts() {
    const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
    let getAccessToken = localStorage.getItem("user");
    getAccessToken = JSON.parse(getAccessToken);
    try {
      const responseData = await axios.request({
        method: "get",
        url: `https://people.googleapis.com/v1/people/me/connections?personFields=names,emailAddresses,phoneNumbers,photos&key=${apiKey}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAccessToken.access_token}`
        }
      });

      return responseData.data;
    } catch (error) {
      console.log("error", error);
      return { error: error.message };
    }
  }

  return (
    <store.apistore.Provider
      value={{
        fetchPost,
        fetchWithPostCredential,
        fetchGet,
        fetchGoogleContacts,
        fetchExternalGet
      }}
    >
      {children}
    </store.apistore.Provider>
  );
}

export default ApiCustomHook;
