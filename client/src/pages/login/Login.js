import React from "react";
import { Form, Input } from "antd";
import { Link } from "react-router-dom";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { useMutation } from "@tanstack/react-query";
import AuthAPI from "../../api/AuthAPI";
import { errorMessage, successMessage } from "../../utils/Alert";

function Login() {
  const navigate = useNavigate();

  const login = useAuthStore((state) => state.login);

  const { mutate, isLoading } = useMutation({
    mutationFn: AuthAPI.login,
    onSuccess: (res) => {
      // Set user data to global state
      login(res.data.user, res.data.token);
      successMessage("Success", res.data.message, () => {
        navigate("/");
      });
    },
    onError: (err) => {
      errorMessage("Error", err.response.data.message);
    },
  });

  const handleSubmit = (values) => {
    mutate(values, {
      onSuccess: (res) => {
        login(res.data.user, res.data.token);
      },
    });
  };

  return (
    <div className="bg-image-login">
      <div className="authentication-login">
        <div className="authentication-form-login card p-2">
          <h1 className="card-title">LOGIN</h1>

          <Form layout="vertical" onFinish={handleSubmit}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your Email!",
                },
              ]}
            >
              <Input className="login_input" placeholder="Email" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input.Password
                className="login_input"
                placeholder="Password"
                type="password"
              />
            </Form.Item>

            <button
              className="primary-button-login"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "LOGIN"}
            </button>

            <p className="para">
              Don't have an account?{" "}
              <Link to="/signup" className="anchor">
                SIGN UP
              </Link>
            </p>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;
