import React, { useState, useEffect } from "react";
import "./signin.css";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Signin = ({
  username,
  password,
  setUsername,
  setPassword,
  handleLogin,
  message,
  setMessage,
}) => {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (message.length > 0) {
      toast(message, {
        onClose: () => setMessage([]),
      });
    }
  }, [message]);

  return (
    <div className="outerLayout">
      <div className="auth_card">
        <svg
          width="52"
          height="48"
          viewBox="0 0 52 48"
          fill="none"
          className="sub_logo"
        >
          <rect
            width="11.0477"
            height="27.8427"
            rx="5.52383"
            transform="matrix(0.854439 -0.519552 0.510535 0.859857 0.499878 24.0586)"
            fill="#3766E8"
          ></rect>
          <rect
            width="11.0477"
            height="42.3694"
            rx="5.52383"
            transform="matrix(0.854439 -0.519552 0.510535 0.859857 12.3904 8.65234)"
            fill="#3766E8"
          ></rect>
          <rect
            width="11.0477"
            height="21.5479"
            rx="5.52383"
            transform="matrix(0.854439 -0.519552 0.510535 0.859857 31.0594 5.73828)"
            fill="#3766E8"
          ></rect>
        </svg>
        <div className="content">
          <h3 className="title">Sign in to your account</h3>
          <form className="form-t">
            <div>
              <label className="form-label">Email/username</label>
              <input
                type="text"
                name="username"
                className="form-input"
                placeholder="e.g. john@example.com"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              ></input>
            </div>
            <div className="pdsec">
              <label className="form-label">Password</label>
              <input
                type={open ? "password" : "text"}
                name="password"
                className="form-input"
                placeholder="e.g. **********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></input>
              <span className="pwd">
                {open ? (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    onClick={() => setOpen(!open)}
                  >
                    <path
                      d="M17.882 19.2971C16.1232 20.4126 14.0828 21.0034 12 21.0001C6.60803 21.0001 2.12203 17.1201 1.18103 12.0001C1.61106 9.67078 2.78266 7.54296 4.52103 5.93407L1.39203 2.80807L2.80703 1.39307L22.606 21.1931L21.191 22.6071L17.881 19.2971H17.882ZM5.93503 7.35007C4.57604 8.58566 3.62935 10.2088 3.22303 12.0001C3.53532 13.3665 4.16229 14.6412 5.05403 15.7227C5.94577 16.8041 7.07766 17.6625 8.35958 18.2294C9.64151 18.7963 11.0381 19.0561 12.4381 18.9882C13.8382 18.9203 15.203 18.5264 16.424 17.8381L14.396 15.8101C13.5327 16.3539 12.5102 16.5882 11.4963 16.4745C10.4823 16.3608 9.53707 15.906 8.8156 15.1845C8.09413 14.463 7.63926 13.5178 7.52559 12.5038C7.41193 11.4899 7.64621 10.4674 8.19003 9.60407L5.93503 7.35007ZM12.914 14.3281L9.67203 11.0861C9.49409 11.539 9.45222 12.034 9.55154 12.5104C9.65085 12.9868 9.88705 13.4238 10.2311 13.7679C10.5752 14.1121 11.0123 14.3482 11.4887 14.4476C11.9651 14.5469 12.4601 14.505 12.913 14.3271L12.914 14.3281ZM20.807 16.5921L19.376 15.1621C20.0445 14.2094 20.5204 13.1353 20.777 12.0001C20.5053 10.8098 19.9943 9.68721 19.2752 8.70056C18.5561 7.71391 17.6438 6.88379 16.5939 6.26067C15.544 5.63755 14.3783 5.23443 13.1678 5.07583C11.9572 4.91723 10.727 5.00645 9.55203 5.33807L7.97403 3.76007C9.22103 3.27007 10.58 3.00007 12 3.00007C17.392 3.00007 21.878 6.88007 22.819 12.0001C22.5126 13.6658 21.8239 15.2376 20.807 16.5921ZM11.723 7.50807C12.3595 7.46873 12.9971 7.56513 13.5936 7.79088C14.19 8.01663 14.7316 8.36658 15.1826 8.81752C15.6335 9.26846 15.9835 9.81009 16.2092 10.4065C16.435 11.003 16.5314 11.6406 16.492 12.2771L11.722 7.50807H11.723Z"
                      fill="#545454"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    onClick={() => setOpen(!open)}
                  >
                    <path
                      d="M12 3C17.392 3 21.878 6.88 22.819 12C21.879 17.12 17.392 21 12 21C6.60803 21 2.12203 17.12 1.18103 12C2.12103 6.88 6.60803 3 12 3ZM12 19C14.0395 18.9996 16.0184 18.3068 17.6129 17.0352C19.2074 15.7635 20.3229 13.9883 20.777 12C20.3213 10.0133 19.205 8.24 17.6107 6.97003C16.0163 5.70005 14.0383 5.00853 12 5.00853C9.96173 5.00853 7.98372 5.70005 6.38941 6.97003C4.79509 8.24 3.6788 10.0133 3.22303 12C3.67713 13.9883 4.7927 15.7635 6.38717 17.0352C7.98164 18.3068 9.96056 18.9996 12 19ZM12 16.5C10.8066 16.5 9.66196 16.0259 8.81805 15.182C7.97414 14.3381 7.50003 13.1935 7.50003 12C7.50003 10.8065 7.97414 9.66193 8.81805 8.81802C9.66196 7.97411 10.8066 7.5 12 7.5C13.1935 7.5 14.3381 7.97411 15.182 8.81802C16.0259 9.66193 16.5 10.8065 16.5 12C16.5 13.1935 16.0259 14.3381 15.182 15.182C14.3381 16.0259 13.1935 16.5 12 16.5ZM12 14.5C12.6631 14.5 13.299 14.2366 13.7678 13.7678C14.2366 13.2989 14.5 12.663 14.5 12C14.5 11.337 14.2366 10.7011 13.7678 10.2322C13.299 9.76339 12.6631 9.5 12 9.5C11.337 9.5 10.7011 9.76339 10.2323 10.2322C9.76342 10.7011 9.50003 11.337 9.50003 12C9.50003 12.663 9.76342 13.2989 10.2323 13.7678C10.7011 14.2366 11.337 14.5 12 14.5Z"
                      fill="#545454"
                    ></path>
                  </svg>
                )}
              </span>
            </div>
            <button type="submit" className="btn" onClick={handleLogin}>
              Log In
            </button>
          </form>
          <div className="footer-text">
            <p>
              New here?{" "}
              <span>
                {" "}
                <Link to="/signup">Create an account</Link>
              </span>
            </p>
            <p>Terms of use | Privacy policy</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
