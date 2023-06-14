import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import {
  useConnect,
  useDisconnect,
  useConnectionStatus,
  metamaskWallet,
} from "@thirdweb-dev/react";

import React from "react";

function Header() {
  const metamask = metamaskWallet();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const connect = useConnect();
  const disconnect = useDisconnect();
  const connectionStatus = useConnectionStatus();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  if (
    connectionStatus === "unknown" ||
    connectionStatus === "connecting" ||
    connectionStatus === "disconnected"
  )
    return (
      <nav className="bg-slate-100 text-white">
        <div className="container mx-auto flex items-center justify-between py-4 px-6">
          <div className="flex items-center">
            <span className="font-extrabold text-black">
              Project Management Panel
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <ul className="flex space-x-4">
              <li>
                <NavLink
                  to="/createcertificate"
                  activeClassName="text-white"
                  className="text-black font-bold hover:text-gray-600"
                >
                  Create Certificate
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/mycertificates"
                  activeClassName="text-white"
                  className="text-black font-bold hover:text-gray-600"
                >
                  My Certificates
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/profile"
                  activeClassName="text-white"
                  className="text-black font-bold hover:text-gray-600"
                >
                  Profile
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="flex items-center">
            {!isMenuOpen && (
              <button
                onClick={() => connect(metamask)}
                className="mr-4 hidden md:block bg-black font-bold hover:bg-gray-600 text-white rounded-lg py-2 px-4 transition duration-300 ease-in-out"
              >
                Connect Wallet
              </button>
            )}
            <button
              className="text-black md:hidden"
              onClick={toggleMenu}
              aria-label="Toggle Menu"
            >
              <FontAwesomeIcon icon={faBars} />
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-slate-100 py-2 px-4">
            <ul>
              <li>
                <Link
                  to="/createcertificate"
                  className="block text-black mb-2 hover:text-gray-600"
                >
                  Create Certificate
                </Link>
              </li>
              <li>
                <Link
                  to="/mycertificates"
                  className="block text-black mb-2 hover:text-gray-600"
                >
                  My Certificates
                </Link>
              </li>

              <li>
                <Link
                  to="/profile"
                  className="block text-black hover:text-gray-600"
                >
                  Profile
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>
    );
  else {
    return (
      <nav className="bg-slate-100 text-white">
        <div className="container mx-auto flex items-center justify-between py-4 px-6">
          <div className="flex items-center">
            <span className="font-extrabold text-black">
              Project Management Panel
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <ul className="flex space-x-4">
              <li>
                <NavLink
                  to="/createcertificate"
                  activeClassName="text-white"
                  className="text-black font-bold hover:text-gray-600"
                >
                  Create Certificate
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/mycertificates"
                  activeClassName="text-white"
                  className="text-black font-bold hover:text-gray-600"
                >
                  My Certificates
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/profile"
                  activeClassName="text-white"
                  className="text-black font-bold hover:text-gray-600"
                >
                  Profile
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="flex items-center">
            {!isMenuOpen && (
              <button
                onClick={disconnect}
                className="mr-4 hidden md:block bg-black font-bold hover:bg-gray-600 text-white rounded-r-lg py-2 px-4 transition duration-300 ease-in-out"
              >
                Disconnect
              </button>
            )}

            <button
              className="text-white md:hidden"
              onClick={toggleMenu}
              aria-label="Toggle Menu"
            >
              <FontAwesomeIcon icon={faBars} />
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-yellow-500 py-2 px-4">
            <ul>
              <li>
                <Link
                  to="/createcertificate"
                  className="block text-black mb-2 hover:text-gray-600"
                >
                  Create Certificate
                </Link>
              </li>
              <li>
                <Link
                  to="/mycertificates"
                  className="block text-black mb-2 hover:text-gray-600"
                >
                  My Certificates
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  className="block text-black hover:text-gray-600"
                >
                  Profile
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>
    );
  }
}

export default Header;
