import Router from "./shared/Router";
import { ToastContainer } from "react-toastify";
const App = () => {
  return (
    <>
      <ToastContainer position="top-right" autoClose={1000} closeOnClick draggable transition:Bounce />
      <Router />
    </>
  );
};

export default App;
