import { useSelector } from "react-redux";
import useAccountData from "../../../hooks/swr/useAccountData";
import { NavLink } from "react-router-dom";
import LogoutButton from "../../account/logoutButton";
import {
  MdAccountCircle,
  MdOutlineLanguage,
  MdOutlineFlag,
  MdPersonOutline,
  MdDarkMode,
  MdLightMode,
} from "react-icons/md";
import { Button, Image, NavDropdown } from "react-bootstrap";
import useAvatarUrl from "../../../hooks/useAvatarUrl";

export default function AccountDropdown({ currentTheme, toggleTheme }) {
  const sessionId = useSelector((state) => state.sessionId);

  return (
    <>
      {sessionId ? (
        <AccountDataDropdown
          currentTheme={currentTheme}
          toggleTheme={toggleTheme}
        />
      ) : (
        <NavLink to="/login">
          <Button variant="outline-dark me-2 fw-semibold border-2">
            Login
          </Button>
        </NavLink>
      )}
    </>
  );
}

function AccountDataDropdown({ currentTheme, toggleTheme }) {
  const sessionId = useSelector((state) => state.sessionId);
  const accountData = useSelector((state) => state.accountData);
  const { isLoading } = useAccountData(sessionId);
  const { smallAvatarUrl } = useAvatarUrl(accountData);

  return (
    <NavDropdown
      title={
        isLoading ? (
          <span className="text-dark">Loading...</span>
        ) : (
          <>
            {smallAvatarUrl ? (
              <Image
                src={smallAvatarUrl}
                roundedCircle
                width={30}
                height={30}
                className="me-2"
              />
            ) : (
              <MdAccountCircle size={30} className="text-dark me-1" />
            )}
            {accountData?.username || "Account"}
          </>
        )
      }
      id="user-account-dropdown"
      align="end"
      className="fw-semibold"
    >
      {!isLoading && accountData && (
        <div className="p-3" style={{ minWidth: "280px" }}>
          <div className="d-flex align-items-center mb-3">
            {smallAvatarUrl ? (
              <Image
                src={smallAvatarUrl}
                roundedCircle
                width={50}
                height={50}
                className="me-3 shadow-sm border"
              />
            ) : (
              <MdAccountCircle size={50} className="text-secondary me-3" />
            )}
            <div>
              <h6 className="mb-0 text-dark">{accountData.username}</h6>
              {accountData.name && (
                <small className="text-muted">{accountData.name}</small>
              )}
            </div>
          </div>

          <ul className="list-unstyled mb-0 mt-2 pt-2 small">
            {accountData.id && (
              <li className="mb-2 d-flex align-items-center text-muted">
                <MdPersonOutline
                  size={18}
                  className="me-2 text-primary flex-shrink-0"
                />
                <span>ID: {accountData.id}</span>
              </li>
            )}
            {accountData.iso_3166_1 && (
              <li className="mb-2 d-flex align-items-center text-muted">
                <MdOutlineFlag
                  size={18}
                  className="me-2 text-success flex-shrink-0"
                />
                <span>Country: {accountData.iso_3166_1}</span>
              </li>
            )}
            {accountData.iso_639_1 && (
              <li className="mb-2 d-flex align-items-center text-muted">
                <MdOutlineLanguage
                  size={18}
                  className="me-2 text-info flex-shrink-0"
                />
                <span>Language: {accountData.iso_639_1.toUpperCase()}</span>
              </li>
            )}
            <li className="d-flex justify-content-between align-items-center mt-3">
              <div className="d-flex align-items-center text-muted">
                {currentTheme === "dark" ? (
                  <MdDarkMode
                    size={18}
                    className="me-2 text-warning flex-shrink-0"
                  />
                ) : (
                  <MdLightMode
                    size={18}
                    className="me-2 text-primary flex-shrink-0"
                  />
                )}
                <span className="theme-label">
                  Theme:{" "}
                  {currentTheme.charAt(0).toUpperCase() + currentTheme.slice(1)}{" "}
                </span>
              </div>
              <div className="form-check form-switch m-0">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckTheme"
                  checked={currentTheme === "dark"}
                  onChange={toggleTheme}
                  style={{ width: "2.5rem", height: "1.2rem" }}
                />

                <label
                  className="visually-hidden"
                  htmlFor="flexSwitchCheckTheme"
                >
                  Toggle Theme
                </label>
              </div>
            </li>
          </ul>
        </div>
      )}
      <NavDropdown.Divider />
      <div className="d-grid px-3 py-2">
        <LogoutButton />
      </div>
    </NavDropdown>
  );
}
