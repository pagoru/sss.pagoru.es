import React, { useCallback, useState, useEffect, useMemo } from "react";
import { getCssColor, getHash, getPassword } from "super-secret-settings";
import styles from "./application.module.scss";

const HideIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 9C11.206 9.00524 10.4459 9.32299 9.88447 9.88447C9.32299 10.4459 9.00524 11.206 9 12C9 13.642 10.358 15 12 15C13.641 15 15 13.642 15 12C15 10.359 13.641 9 12 9Z"
      fill="white"
    />
    <path
      d="M12 5C4.36704 5 2.07304 11.617 2.05204 11.684L1.94604 12L2.05105 12.316C2.07305 12.383 4.36704 19 12 19C19.633 19 21.927 12.383 21.948 12.316L22.054 12L21.949 11.684C21.927 11.617 19.633 5 12 5ZM12 17C6.64904 17 4.57604 13.154 4.07404 12C4.57804 10.842 6.65204 7 12 7C17.351 7 19.424 10.846 19.926 12C19.422 13.158 17.348 17 12 17Z"
      fill="white"
    />
  </svg>
);

const ShowIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 19C12.946 19 13.81 18.897 14.598 18.719L12.841 16.962C12.568 16.983 12.291 17 12 17C6.64898 17 4.57598 13.154 4.07398 12C4.45093 11.1588 4.96003 10.3833 5.58198 9.70297L4.18398 8.30497C2.64598 9.97197 2.06298 11.651 2.05198 11.684C1.983 11.8893 1.983 12.1116 2.05198 12.317C2.07298 12.383 4.36698 19 12 19ZM12 4.99997C10.163 4.99997 8.65398 5.39597 7.39598 5.98097L3.70698 2.29297L2.29298 3.70697L20.293 21.707L21.707 20.293L18.388 16.974C21.002 15.023 21.935 12.359 21.949 12.317C22.018 12.1116 22.018 11.8893 21.949 11.684C21.927 11.617 19.633 4.99997 12 4.99997ZM16.972 15.558L14.692 13.278C14.882 12.888 15 12.459 15 12C15 10.359 13.641 8.99997 12 8.99997C11.541 8.99997 11.112 9.11797 10.723 9.30897L8.91498 7.50097C9.9075 7.16038 10.9507 6.99097 12 6.99997C17.351 6.99997 19.424 10.846 19.926 12C19.624 12.692 18.76 14.342 16.972 15.558Z"
      fill="white"
    />
  </svg>
);

const getRandomString = (length = 6) =>
  Math.random().toString(20).substr(2, length);

const getServicesVersionMap = () => {
  const serviceVersionMap = localStorage.getItem("serviceVersionMap");
  return JSON.parse(serviceVersionMap || "{}");
};

export const ApplicationComponent = () => {
  const [secret, setSecret] = useState<string>("");
  const [service, setService] = useState<string>("");
  const [version, setVersion] = useState<number>(
    getServicesVersionMap()[""] || 1,
  );

  const [showPassword, setShowPassword] = useState<boolean>(
    localStorage.getItem("showPassword") !== null
      ? localStorage.getItem("showPassword") === "true"
      : true,
  );

  useEffect(() => {
    document.body.style.backgroundColor = getCssColor(
      secret || getRandomString(),
    );
  }, [secret]);

  const password = useMemo(
    () => getPassword(secret, service, version),
    [secret, service, version],
  );

  const onChangeSecret = useCallback(
    (event: React.EventHandler<HTMLInputElement>) => {
      event.preventDefault();
      setSecret(event.target.value);
    },
    [setSecret],
  );
  const onChangeService = useCallback(
    (event: React.EventHandler<HTMLInputElement>) => {
      event.preventDefault();
      const _service = event.target.value;
      setService(_service);

      const versionMap = getServicesVersionMap();
      setVersion(versionMap[_service] || versionMap[""] || 1);
    },
    [setService, setVersion],
  );
  const onClickPassword = useCallback(async () => {
    await navigator.clipboard.writeText(password);
  }, [password]);

  const onChangeVersion = useCallback(
    (event: React.EventHandler<HTMLInputElement>) => {
      const _version = parseInt(event.target.value);
      setVersion(_version);
      localStorage.setItem(
        "serviceVersionMap",
        JSON.stringify({
          ...getServicesVersionMap(),
          [service]: _version,
        }),
      );
    },
    [service],
  );

  const visiblePassword = useMemo(
    () =>
      showPassword
        ? password
        : password
            .split("")
            .map(() => "*")
            .join(""),
    [password, showPassword],
  );

  const onTogglePasswordVisibility = useCallback(() => {
    setShowPassword((showPassword) => {
      localStorage.setItem("showPassword", !showPassword + "");
      return !showPassword;
    });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <input
          className={styles.secretInput + " " + styles.input}
          id="secret"
          type="password"
          onChange={onChangeSecret}
          autoFocus
        />
        <input
          id="service"
          className={styles.input}
          onChange={onChangeService}
        />
        <div className={styles.password} onClick={onClickPassword}>
          {visiblePassword}
        </div>
        <div className={styles.options}>
          <div
            className={styles.visibility}
            onClick={onTogglePasswordVisibility}
          >
            {showPassword ? <ShowIcon /> : <HideIcon />}
          </div>
          <div className={styles.version}>
            <input
              type="range"
              min="1"
              max="2"
              value={version}
              onChange={onChangeVersion}
              className={styles.slider}
              id="version"
            />
            <span>v{version}</span>
          </div>
        </div>
      </div>
      <span>
        Password Manager <i>#Classic</i> is an{" "}
        <a href="https://github.com/pagoru/sss.pagoru.es">
          open source project
        </a>{" "}
        created with ❤️ by <a href="https://github.com/pagoru">pagoru</a>
      </span>
    </div>
  );
};
