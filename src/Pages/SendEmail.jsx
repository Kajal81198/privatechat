import React, { useEffect } from "react";
import emailjs from "@emailjs/browser";
import { useState } from "react";
import validator from "email-validator";

function SendEmail() {
  const [loading, setLoading] = useState(false);
  useEffect(() =>
    // emailjs.init("ORRRasy_JA9oc1Sc9")
    {
      if (validator.validate("p@email.com")) {
        console.log("true")
      }else{
        console.log("false")
      }
    }, []);
  // Add these
  // const handleSubmit = async () => {
  //   const serviceId = "service_ncq3w4n";
  //   const templateId = "template_wmgbm0o";
  //   try {
  //     setLoading(true);
  //     await emailjs.send(serviceId, templateId, {
  //       to_name: "Payansh",
  //       from_name: "Kajal",
  //       action_url: "http://localhost:3000/login",
  //       to_mail: "onsneha.bhosale@yorshr.com",
  //       email_from: "kajalchhipa9@gmail.com"
  //    } );
  //     alert("email successfully sent check inbox");
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  return (
    // <div className="text-light" onClick={() => handleSubmit()}>
      <p>SendEmail</p>
    // </div>
  );
}

export default SendEmail;
