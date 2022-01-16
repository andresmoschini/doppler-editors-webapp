import { Link, Outlet } from "react-router-dom";
import logo from "./logo.svg";
import "./Main.css";

export function Main() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="flex-row-center h-full">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Bookkeeper</h1>
        </div>
        <nav className="flex-row-center">
          <div>
            {/* Links to this own app (using history API) */}
            <Link to="/campaigns/123">campaigns/123</Link> |{" "}
            <Link to="/campaigns/456">campaigns/456</Link> |{" "}
            <Link to="/campaigns/789">campaigns/789</Link> |{" "}
            <Link to="/templates/1">/templates/1</Link> |{" "}
          </div>
          <div>
            {/* links to Doppler WebApp app (assuming that domain is shared) */}
            <a href="/login">Login</a> | <a href="/signup">Sign Up</a> |{" "}
            <a href="/dashboard">Dashboard</a> | <a href="/wrong">Wrong</a>
          </div>
        </nav>
      </header>
      <Outlet />
    </div>
  );
}
