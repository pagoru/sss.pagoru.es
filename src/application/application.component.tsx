import React, { useCallback, useState, useEffect, useMemo } from "react";
import { getCssColor, getHash, getPassword } from "super-secret-settings";
import styles from "./application.module.scss";

const getRandomString = (length = 6) =>
  Math.random().toString(20).substr(2, length);

export const ApplicationComponent = () => {
  const [secret, setSecret] = useState<string>("");
  const [service, setService] = useState<string>("");

  useEffect(() => {
    document.body.style.backgroundColor = getCssColor(
      secret || getRandomString(),
    );
  }, [secret]);

  const password = useMemo(
    () => getPassword(secret, service),
    [secret, service],
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
      setService(event.target.value);
    },
    [setService],
  );
  const onClickPassword = useCallback(async () => {
    await navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <input
          className={styles.secretInput}
          id="secret"
          type="password"
          onChange={onChangeSecret}
          autoFocus
        />
        <input id="service" onChange={onChangeService} />
        <div className={styles.password} onClick={onClickPassword}>
          {password}
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
