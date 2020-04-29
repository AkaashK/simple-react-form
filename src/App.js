import React, { useState } from "react";

import { useForm, ErrorMessage } from "react-hook-form";

const pricePerBox = 20;

const emailPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

export default function App() {
  const [user, setUser] = useState({
    name: "",
    address: "",
    stock: 0,
    email: "",
    received: false,
  });

  const { register, errors, handleSubmit } = useForm();

  const onSubmit = (data) => {
    const receivedUser = { ...data, received: true };
    const assignUser = Object.assign(user, receivedUser);
    setUser(assignUser);
  };

  return (
    <div>
      <h2>Cool Drink Order Form</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        Name:
        <input name="name" ref={register({ required: "This is required" })} />
        <br />
        <ErrorMessage errors={errors} name="name">
          {({ message }) => (
            <p data-testid="nameError" className="form-error">
              {message}
            </p>
          )}
        </ErrorMessage>
        <br />
        <label>Address:</label>
        <textarea
          type="TextArea"
          name="address"
          ref={register({
            required: {
              value: true,
              message: "This is required",
            },
            maxLength: {
              value: 100,
              message: "input exceeds maximum limit",
            },
          })}
        />
        <br />
        <ErrorMessage errors={errors} name="address">
          {({ message }) => (
            <p data-testid="addressError" className="form-error">
              {message}
            </p>
          )}
        </ErrorMessage>
        <br />
        Boxes needed:
        <input
          placeholder="minimum value should be 50"
          type="number"
          name="stock"
          ref={register({
            min: {
              value: 50,
              message: "value should be minimum 50",
            },
          })}
        />
        <br />
        <ErrorMessage errors={errors} name="stock">
          {({ message }) => (
            <p data-testid="stockError" className="form-error">
              {message}
            </p>
          )}
        </ErrorMessage>
        <br />
        email:
        <input
          name="email"
          ref={register({
            required: "This is required",
            pattern: emailPattern,
          })}
        />
        <br />
        <ErrorMessage errors={errors} name="email">
          {({ message }) => (
            <p data-testid="emailError" className="form-error">
              {message}
            </p>
          )}
        </ErrorMessage>
        <br />
        <input type="submit" />
      </form>
      {user.received && (
        <p>order received, stock will be sent to {user.address}</p>
      )}
      {user.received && (
        <p>
          The total price of ordered boxes is {pricePerBox * user.stock}(in
          dollars)
        </p>
      )}
    </div>
  );
}
