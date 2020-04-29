import React, { useState } from "react";
import { useForm } from "react-hook-form";

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
    const receivedUser = {
      name: data.name,
      address: data.address,
      stock: data.stock,
      email: data.email,
      received: true,
    };

    const assignUser = Object.assign(user, receivedUser);
    setUser(assignUser);
    console.log(user);
  };

  const calculatePrice = () => {
    const pricePerBox = 20;
    return pricePerBox * user.stock;
  };

  return (
    <div>
      <h2>Cool Drink Order Form</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        Name: <input name="name" ref={register({ required: true })} /> <br />
        {errors.name && "Your input is required"} <br />
        <label>Address:</label>
        <textarea
          type="TextArea"
          name="address"
          ref={register({ required: true, maxLength: 100 })}
        />
        <br />
        {errors.address?.type === "required" && "Your input is required"}
        {errors.address?.type === "maxLength" && "Your input exceed maxLength"}
        <br />
        Boxes needed:
        <input
          placeholder="min value should be 50"
          type="number"
          name="stock"
          ref={register({ min: 50 })}
        />
        <br />
        {errors.stock && "Your input required to be more than 50"}
        <br />
        email:
        <input
          name="email"
          ref={register({
            required: "This is required",
            pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
          })}
        />
        <br />
        {errors.email?.message}
        {errors.email?.type === "pattern" &&
          "Your email does not match the pattern"}
        <br />
        <input type="submit" />
      </form>
      {user.received && (
        <p>order received, stock will be sent to {user.address}</p>
      )}
      {user.received && (
        <p>
          The total price of ordered boxes is {calculatePrice()}(in dollars)
        </p>
      )}
    </div>
  );
}
