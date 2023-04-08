import AlertError from "~/components/alert/AlertError";
import AlertInfo from "~/components/alert/AlertInfo";

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
