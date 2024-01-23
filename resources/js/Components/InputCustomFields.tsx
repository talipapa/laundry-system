import { useField, useFormikContext } from "formik";
import React from "react";
import { Input } from "@/shadcn/ui/input";

export const InputTextField = (props: any) => {
  const {
    labelName,
    formikFieldName,
    propError,
    propTouched,
    className,
    ...rest
  } = props;
  return (
    <div className={className}>
      <label htmlFor={formikFieldName} className="form-label">
        {labelName}
      </label>
      <div className="flex flex-col md:flex-col md:space-y-1 ">
        <Input
          type="text"
          value={rest.values}
          id={formikFieldName}
          {...rest}
          className={
            propError && propTouched ? "p-1 px-3 rounded-lg border-2 border-red-400 is-invalid" : "p-1 px-3 rounded-lg border-2 border-slate-700 is-invalid"
          }
        />
        {propError && propTouched ? (
          <div className="text-red-500 mt-2">{propError}</div>
        ) : null}
      </div>
    </div>
  );
};

export const InputNumberField = (props: any) => {
  const {
    labelName,
    formikFieldName,
    propError,
    propTouched,
    className,
    max,
    min,
    ...rest
  } = props;
  return (
    <div className={className}>
      <label htmlFor={formikFieldName} className="form-label">
        {labelName}
      </label>
      <div className="flex flex-col md:flex-row md:space-x-3 items-center">
        <Input
          type="number"
          value={rest.values}
          id={formikFieldName}
          max={max}
          min={min}
          disabled={true}
          {...rest}
          className={
            propError && propTouched ? "p-1 px-3 w-[300px] rounded-lg border-2 border-red-400 is-invalid" : "p-1 px-3 w-[300px] rounded-lg border-2 border-slate-700 is-invalid"
          }
        />
        {propError && propTouched ? (
          <div className="text-red-500">{propError}</div>
        ) : null}

      </div>
    </div>
  );
};

export const TextAreaField = (props: any) => {
  const {
    labelName,
    formikFieldName,
    propError,
    propTouched,
    propValue,
    ...rest
  } = props;
  return (
    <div className="mb-3">
      <label htmlFor={formikFieldName} className="form-label">
        {labelName}
      </label>
      <textarea
        id={formikFieldName}
        name={formikFieldName}
        value={rest.values}
        className={
          propError && propTouched ? "form-control is-invalid" : "form-control"
        }
        type="text"
        rows={8}
        {...rest}
      />
      {propError && propTouched ? (
        <div className="feedback-invalid mt-2">{propError}</div>
      ) : null}
    </div>
  );
};

export const FormikImageField = (props: any) => {
  const {
    labelName,
    formikFieldName,
    propError,
    propTouched,
    propValue,
    ...rest
  } = props;
  return (
    <div className="mb-3">
      <label htmlFor={formikFieldName} className="form-label">
        {labelName}
      </label>
      <Input
        type="file"
        name={formikFieldName}
        id={formikFieldName}
        className={
          propError && propTouched ? "form-control is-invalid" : "form-control"
        }
        accept="image/jpeg, image/png"
        {...rest}
      />
      {propError && propTouched ? (
        <div className="feedback-invalid mt-2">{propError}</div>
      ) : null}
    </div>
  );
};
