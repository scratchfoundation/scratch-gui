
import React, { useEffect, useState } from "react";
import styles from "./notification.css"
import error from './error.svg';
import pending from './pending.svg';
import saving from './saving.svg';
import success from './success.svg';
import warning from './warning.svg';


export default function NotificationStack({ notifications }) {
  const [active, setActive] = useState(null);

  const iconMap = {
    error: error,
    success: success,
    warning: warning,
    saving: saving,
    pending: pending,
  };

  const iconSrc = iconMap[active?.icon] 

  useEffect(() => {
    if (notifications.length === 0) {
      setActive(null);
      return;
    }
  
    const latestNotification = notifications[notifications.length - 1];
    setActive(latestNotification);
  
    let timer;
    if (latestNotification.duration && latestNotification.duration > 0) {
      timer = setTimeout(() => {
        setActive(null);
      }, latestNotification.duration);
    }
  
    return () => clearTimeout(timer);
  }, [notifications]);

  if (!active) return null;

  return (
    <div className={styles.notificationContainer}>
      <div className={`${styles.notificationBar} ${styles[active.type] || styles.info}`} >
        <div className={styles.notificationIcon}>
          <img src={iconSrc} alt={active?.icon } />
        </div>
        <div className={styles.notificationMessage}>
          {active.message}
        </div>
      </div>
    </div>
  );
}
