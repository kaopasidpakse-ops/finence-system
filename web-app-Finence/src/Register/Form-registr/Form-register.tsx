import "./Form-register.css";
import { useState } from "react";
import axios from "axios";

type UserDataType = {
  username: string;
  role: string;
  password: string | number;
};

function FormRegister() {
  const [userdata, setUserdata] = useState<UserDataType>({
    username: "",
    password: "",
    role: "user",
  });

  const RegisterUser = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userdata.username || !userdata.password) {
      alert("Please fill in all fields");
      return;
    }

    try {
      await axios.post("https://finence-system.onrender.com/api/register", userdata);

      alert("Registration Successful");

      setUserdata({
        username: "",
        password: "",
        role: "user",
      });
    } catch (err) {
      alert("Registration Failed");
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">

        <h1>Register</h1>

        <form onSubmit={RegisterUser}>

          <label>Username</label>
          <input
            type="text"
            placeholder="Enter username"
            value={userdata.username}
            onChange={(e) =>
              setUserdata({ ...userdata, username: e.target.value })
            }
          />

          <label>Role</label>
          <select
            value={userdata.role}
            onChange={(e) =>
              setUserdata({ ...userdata, role: e.target.value })
            }
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={userdata.password}
            onChange={(e) =>
              setUserdata({ ...userdata, password: e.target.value })
            }
          />

          <div className="btn-group">
            <button className="register-btn" type="submit">
              Register
            </button>

            <a href="/Income">
              <button type="button" className="back-btn">
                Back
              </button>
            </a>
          </div>

        </form>
      </div>
    </div>
  );
}

export default FormRegister;