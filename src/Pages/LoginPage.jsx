import { useGoogleLogin } from "@react-oauth/google";
import React, { useContext, useEffect, useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import store from "../custumHooks/useContext";
import CustomeForm from "../modals/CustomeForm";
import emailjs from "@emailjs/browser";

function LoginPage() {
  const { setIsAuthenticated, setUser } = useContext(store.store);
  const { fetchPost, fetchWithPostCredential } = useContext(store.apistore);

  const [details, setDetails] = useState({
    email: "",
    password: ""
  });
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();
  function handleChanges(e) {
    setDetails(pre => ({ ...pre, [e.target.name]: e.target.value }));
  }
  const inputs = [
    { name: "email", icon: "fa-envelope" },
    { name: "password", icon: "fa-lock" }
  ];

  const sendEmail = async (email, name, otp) => {
    emailjs.init("ORRRasy_JA9oc1Sc9");
    const serviceId = "service_ncq3w4n";
    const templateId = "template_4cr5ghq";
    try {
      await emailjs.send(serviceId, templateId, {
        to_name: name,
        from_name: "Private Chat",
        otp: otp,
        to_mail: email,
        email_from: "privatec1608@gmail.com"
      });
      return { msg: "successfully send" };
    } catch (error) {
      return { error: error };
    }
  };
  async function handleLogin() {
    setLoader(true);

    if (details.email === "" || details.password === "") {
      toast.warning("Please Fill All the details");
      setLoader(false);
    }

    const data = await fetchWithPostCredential("login", details);
    console.log("data", data);
    if (data.status && data.msg.username) {
      const response = await sendEmail(
        details.email,
        data.msg.username,
        data.msg.otp
      );
      console.log(response);
      if (response.msg) {
        toast.success(response.msg);
        navigate("/otp", { state: { email: details.email } });
        setDetails({
          email: "",
          password: ""
        });
      } else {
        toast.warning("somthing wrong please login again");
        setLoader(false);
      }
    } else if (data.status) {
      const userName = data.msg.name;
      document.cookie = `userData=${userName}; path=/; expires=`;
      setUser({ name: userName });
      navigate("/");
    } else {
      setDetails({
        email: "",
        password: ""
      });
      toast.error(data.msg);
      setLoader(false);
    }
  }
  // useEffect(() => {
  //   if (localStorage.getItem("user") && localStorage.getItem("userDetails")) {
  //     navigate("/");
  //   }
  // }, []);

  return (
    <CustomeForm
      heading="Login"
      inputs={inputs}
      buttonName="Login"
      handleButton={handleLogin}
      details={details}
      handleChanges={handleChanges}
      loader={loader}
    />
  );
}

export default LoginPage;
