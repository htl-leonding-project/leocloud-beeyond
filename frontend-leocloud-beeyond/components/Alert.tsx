import AlertError from "@components/AlertError";
import AlertInfo from "@components/AlertInfo";

function Alert({ type, message }: { type: string; message: string }) {
  switch (type) {
    case "error":
      return <AlertError message={message} />;
    case "info":
      return <AlertInfo message={message} />;
    default:
      return null;
  }
}

export default Alert;
