const Notification = ({ notification }) => {
  if (notification.message === null || notification.type === null) {
    return null;
  }

  return <div className={notification.type}>{notification.message}</div>;
};

export default Notification;
