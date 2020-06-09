import React, { useState } from "react";
import logo from "../logo.svg";
import { useAuthContext } from "../context/AuthContext";
import { useHistory, Redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Spinner = () => <FontAwesomeIcon spin icon={faSpinner} className="h-3" />;

const SignIn = () => {
  const [userName, setUserName] = useState("cbschuld@gmail.com");
  const [password, setPassword] = useState("password1234");
  const [error, setError] = useState("");
  const [validFields, setValidFields] = useState<{
    [key: string]: boolean | null;
  }>({
    userName: null,
    password: null,
  });
  const history = useHistory();
  const { authenticating, authenticated, signIn } = useAuthContext();

  const doSignIn = async (): Promise<boolean> => {
    let res = false;
    if (userName !== "" && password !== "") {
      try {
        res = await signIn(userName, password);
        if (res) {
          history.push("/");
        } else {
          setError(
            "Please correct your email address and check your password then try again"
          );
        }
      } catch (e) {
        setError(e.message);
      }
    }
    return res;
  };

  const validateField = (field: string): boolean => {
    const fields = { ...validFields };
    let valid = false;
    switch (field) {
      case "userName":
        valid = userName !== "";
        fields.userName = valid;
        break;
      case "password":
        valid = password !== "";
        fields.password = valid;
        break;
      default:
        break;
    }
    setValidFields(fields);
    return valid;
  };
  return (
    <>
      {authenticated && <Redirect to="/" />}
      {!authenticated && (
        <div className="w-full">
          <div className="flex justify-center items-center mt-5">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div className="container mx-auto h-full flex justify-center items-center">
                <img src={logo} alt="logo" className="h-24" />
              </div>
              {error && (
                <div
                  className="my-5 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                  role="alert"
                >
                  <strong className="font-bold">Cannot Login!</strong>
                  <span className="block">{error}</span>
                </div>
              )}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Username
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  placeholder="Username"
                  onChange={(e): void => setUserName(e.target.value)}
                  onBlur={(): boolean => validateField("userName")}
                  value={userName}
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="******************"
                  onChange={(e): void => setPassword(e.target.value)}
                  onBlur={(): boolean => validateField("password")}
                  value={password}
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={doSignIn}
                >
                  {(authenticating && <Spinner />) || "Sign in"}
                </button>
              </div>
            </form>
          </div>
          <div className="flex justify-center items-center">
            <p className="text-center text-gray-500 text-xs">
              &copy;2020 Acme Corp. All rights reserved.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default SignIn;
