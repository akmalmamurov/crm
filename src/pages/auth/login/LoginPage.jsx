import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { PatternFormat } from "react-number-format";
import { TOKEN } from "@/constants/api";
import { setAuth } from "@/Redux/slices/authSlices";
import { api } from "@/adapters/Api/apolloClientUrl";
import { logo2x } from "@/assets/images";

const LoginPage = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});

  const validateValues = (phoneNumber, password) => {
    let errors = {};
    if (phoneNumber.length < 9) {
      errors.phoneNumber = "Please, enter your correct phone number";
    }
    if (password.length < 4) {
      errors.password = "Your password must include at least 4 characters";
    }
    return errors;
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setErrors({});

    const validationErrors = validateValues(phoneNumber, password);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      let data = {
        userphone: `998${phoneNumber}`,
        password: password,
        subdomain: "soffit",
      };

      try {
        let response = await fetch(api + `/auth/login`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          setErrors({ userError: "Sorry, user not found" });
          throw new Error(`Could not fetch ${response.status}`);
        }

        let result = await response.json();

        if (result.data) {
          localStorage.setItem(TOKEN, result.data.token);
          dispatch(setAuth());
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-screen gap-[50px] p-[40px]">
      <div className="bg-white rounded-[16px] shadow-lg  px-[40px] py-[50px] w-[380px] h-[484px]">
        <div className="flex flex-col w-full">
          <h1 className="block text-[32px] font-semibold leading-[38.19px] mb-[20px]">
            Login
          </h1>
          <form noValidate onSubmit={handleClick}>
            <div className="mb-[18px]">
              <label
                className="block mb-[8px] text-[13px] font-semibold leading-[16px] tracking-[-0.08px]"
                htmlFor="phone number"
              >
                Phone number
              </label>
              <PatternFormat
                autoComplete="off"
                type="text"
                name="phoneNumber"
                id="phoneNumber"
                format="+998 (##) ###-##-##"
                allowEmptyFormatting
                mask="_"
                value={phoneNumber}
                onValueChange={(values) => setPhoneNumber(values.value)}
                className={`w-full bg-lightWhite text-[16px] border-[0.5px] ${
                  errors.phoneNumber || errors.userError
                    ? "border-red"
                    : "border-lightBlack "
                } rounded-[8px] px-[16px] py-[12px] focus-within:ring-2 focus-within:ring-inset focus:border-blueTifany focus:outline-none`}
                required
              />
              {errors.phoneNumber && (
                <p className="text-red">{errors.phoneNumber}</p>
              )}
            </div>

            <div className="mb-[28px]">
              <label
                className="block mb-[8px] text-[13px] font-semibold leading-[16px] tracking-[-0.08px]"
                htmlFor="phone number"
              >
                Password
              </label>
              <input
                autoComplete="off"
                type="text"
                name="password"
                id="password"
                value={password}
                className={`w-full bg-lightWhite text-[16px] border-[0.5px] ${
                  errors.password || errors.userError
                    ? "border-red "
                    : "border-lightBlack "
                } rounded-[8px] px-[16px] py-[12px] placeholder-black placeholder:font-medium placeholder:text-[16px] placeholder:leading-[19.09px]  focus-within:ring-2 focus-within:ring-inset focus:border-blueTifany focus:outline-none`}
                placeholder="Password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && <p className="text-red">{errors.password}</p>}

              {errors.userError && (
                <p className="block text-[16px] text-red font-normal leading-[38.19px]">
                  {errors.userError}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full mb-[36px] bg-blueTifany hover:bg-blue text-[16px] leading-[19.09px] font-medium text-white text-center rounded-[8px] duration-300 p-[16px] focus:ring-2 focus:outline-none"
            >
              Login
            </button>
            <Link className="block text-[10px] mb-[30px] leading-[12px] text-center tracking-[0.12px] font-normal text-black no-underline">
              Forgot password ?
            </Link>
          </form>
        </div>
      </div>
      <div className="bg-blue rounded-[68px] w-[592px] h-[650px] flex items-center justify-center">
        <picture>
          <img src={logo2x} alt="Login logo" width="267" height="235" />
        </picture>
      </div>
    </div>
  );
};

export default LoginPage;
