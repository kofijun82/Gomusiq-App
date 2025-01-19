import React, { useState } from 'react';
import { PaystackButton } from 'react-paystack';

const Pay: React.FC = () => {
  const publicKey = "pk_test_f6b05f8187b360f763ac56859524b17f26189715";
  const [email, setEmail] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  const componentProps = {
    email,
    amount: parseFloat(amount) * 100,
    metadata: {
        custom_fields: [
            {
              display_name: "Name",
              variable_name: "name",
              value: name,
            },
            {
              display_name: "Phone Number",
              variable_name: "phone",
              value: phone,
            },
          ],
    },
    publicKey,
    text: "Pay Now",
    onSuccess: () =>
      alert("Thanks for purchasing from us! We do not take it for granted!!"),
    onClose: () => alert("Wait! You need to purchase, don't go!!!!"),
  };

  const style = {
    input: "block w-full px-4 py-2 mb-4 rounded-md border border-gray-300 focus:outline-none focus:border-primary-500",
    button: "block w-full px-4 py-2 bg-[#1369A1] text-white rounded-md",
  };

  return (
    <div className="px-4">
      <h1 className="text-center text-[25px] my-4 font-[600]">Make your payment here</h1>
      <div className="max-w-md mx-auto my-4">
        <input
          type="email"
          placeholder="Email"
          className={style.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          className={style.input}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          type="text"
          placeholder="Name"
          className={style.input}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Phone number"
          className={style.input}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <PaystackButton className={style.button} {...componentProps} />
      </div>
    </div>
  );
};

export default Pay;
