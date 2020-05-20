import React, { useState, useEffect } from "react";
import Amplify, { Auth } from "aws-amplify";
import awsconfig from "./aws-exports";
import "./App.css";
import "@aws-amplify/ui/dist/style.css"; // Styles for login component

import { withAuthenticator } from "aws-amplify-react";

import Map from "./Map";
var awsIot = require("aws-iot-device-sdk");

Amplify.configure(awsconfig);
function App() {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const getCreds = async () => {
      const res = await Auth.currentCredentials();

      var params = {
        region: "eu-west-1",
        protocol: "wss",
        host: "aaf06f4knyeat-ats.iot.eu-west-1.amazonaws.com",
      };

      params.accessKeyId = res.accessKeyId;
      params.secretKey = res.secretAccessKey;
      params.clientId = res.identityId;
      params.sessionToken = res.sessionToken;

      const client = awsIot.device(params);

      client.on("connect", function () {
        client.subscribe("coordinates");
      });

      client.on("message", function (topic, payload) {
        if (topic === "coordinates") {
          handleGeoReceive(payload.toString());
        }
      });
    };
    getCreds();
  }, []);

  const handleGeoReceive = (cat) => {
    cat = JSON.parse(cat);

    setCats((prevState) => {
      return {
        ...prevState,
        ...{
          [cat.CatID]: { lng: cat.long, lat: cat.lat },
        },
      };
    });
  };

  return (
    <div className="App">
      <Map cats={cats} />
    </div>
  );
}

export default withAuthenticator(App, {
  usernameAttributes: "email",
  includeGreetings: true, // This adds the header, letting you sign out.
  signUpConfig: {
    hiddenDefaults: ["phone_number"],
  },
});
