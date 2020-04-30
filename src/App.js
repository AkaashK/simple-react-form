import React, { useState } from "react";
import { useForm, ErrorMessage } from "react-hook-form";

import "./App.css";

const pricePerBox = 20;
const emailPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

let editData = {};

const App = () => {
  const [user, setUser] = useState([]);
  const [received, setReceived] = useState(false);
  const [enableEdit, setEnableEdit] = useState();

  const { register, errors, handleSubmit } = useForm();

  const onSubmit = (data) => {
    const savedData = [...user, { ...data }];
    setUser(savedData);
    setReceived(true);

    editData = savedData[savedData.length - 1];
  };

  return (
    <div className="App">
      <h2>Cool Drink Order Form</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">Name: </label>
        <input
          name="name"
          defaultValue={enableEdit && editData.name}
          ref={register({ required: "Name is required" })}
        />
        <br />
        <ErrorMessage errors={errors} name="name">
          {({ message }) => (
            <p data-testid="nameError" className="form-error">
              {message}
            </p>
          )}
        </ErrorMessage>
        <br />
        <label htmlFor="address">Address: </label>
        <input
          type="text"
          name="address"
          defaultValue={enableEdit && editData.address}
          ref={register({
            required: {
              value: true,
              message: "Address is required",
            },
            maxLength: {
              value: 100,
              message: "Your address exceeds maximum limit",
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
        <label htmlFor="stock">Boxes Needed: </label>
        <input
          placeholder="please enter atleast 50"
          type="number"
          name="stock"
          defaultValue={enableEdit && editData.stock}
          ref={register({
            min: {
              value: 50,
              message:
                "please order minimum 50 boxes, otherwise order will not placed",
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
        <label htmlFor="email">Email: </label>
        <input
          name="email"
          defaultValue={enableEdit && editData.email}
          ref={register({
            required: {
              value: true,
              message: "Email is required",
            },
            pattern: {
              value: emailPattern,
              message: "Email does not match the pattern",
            },
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
        <br />
        <br />
        <input
          type="reset"
          onClick={() => {
            setReceived(false);
            setEnableEdit("");
          }}
        />
        <button
          type="button"
          onClick={() => {
            setEnableEdit(true);
            user.pop();
          }}
        >
          Edit
        </button>
      </form>
      {received && (
        <>
          <p>
            order received, stock will be sent to
            {user[user.length - 1].address}
          </p>
          <p>
            The total price of ordered boxes is
            {pricePerBox * user[user.length - 1].stock}(in dollars)
          </p>
        </>
      )}
    </div>
  );
};

export default App;
