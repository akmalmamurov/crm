import React from "react";
import { PatternFormat } from "react-number-format";

const AddingQuickLeadsForm = (props) => {
  const { addLeads, inputValues, handleChange, setInputValues, errors } = props;
  return (
    <form>
      <div className="mb-3 px-4 py-6 bg-white rounded-lg">
        <div className="mb-[15px]">
          <label htmlFor="username" className="sr-only">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={inputValues.username}
            className={`${
              errors.username ? "border-red border" : ""
            } rounded-md bg-graySecond text-[14px] leading-[18px] tracking-[-0.23px] focus-within:ring-2 focus-within:ring-inset focus:border-blueTifany focus:outline-none w-full px-4 py-2.5`}
            placeholder="Username"
            onChange={handleChange}
            autoComplete="off"
            required
          />
          {errors.username ? <p className="text-red">{errors.username}</p> : ""}
        </div>
        <div className="mb-[15px]">
          <label htmlFor="subject" className="sr-only">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={inputValues.subject}
            className={`${
              errors.subject ? "border border-red" : ""
            } rounded-md bg-graySecond text-[14px] leading-[18px] tracking-[-0.23px] focus-within:ring-2 focus-within:ring-inset focus:border-blueTifany focus:outline-none block w-full px-4 py-2.5`}
            placeholder="Subject"
            onChange={handleChange}
            autoComplete="off"
            required
          />
          {errors.subject ? <p className="text-red">{errors.subject}</p> : ""}
        </div>
        <div className="mb-4">
          <label htmlFor="phoneNumber" className="sr-only">
            Phone number
          </label>
          <PatternFormat
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={inputValues.phoneNumber}
            className={`${
              errors.phoneNumber ? "border border-red" : ""
            } rounded-md bg-graySecond text-[14px] leading-[18px] tracking-[-0.23px] focus-within:ring-2 focus-within:ring-inset focus:border-blueTifany focus:outline-none w-full px-4 py-2.5`}
            format="+998 ## ### ## ##"
            allowEmptyFormatting
            onValueChange={(values) =>
              setInputValues({ ...inputValues, phoneNumber: values.value })
            }
            autoComplete="off"
            required
          />
          {errors.phoneNumber ? (
            <p className="text-red">{errors.phoneNumber}</p>
          ) : (
            ""
          )}
        </div>
        <div className="text-right">
          <button
            type="button"
            className="text-white bg-blueTifany hover:bg-blue duration-300 focus:ring-4 font-normal rounded-lg text-md px-5 py-2.5 focus:outline-none"
            onClick={addLeads}
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddingQuickLeadsForm;
