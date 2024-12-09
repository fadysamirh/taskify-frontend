import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AppNotifications = () => {
  return (
    <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      pauseOnFocusLoss
      draggable={false}
      pauseOnHover
      theme="light"
    />
  );
};
