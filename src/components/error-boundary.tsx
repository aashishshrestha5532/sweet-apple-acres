import { useRouteError } from "react-router-dom";

export default function ErrorBoundary() {
  let error = useRouteError();
  console.error("error", error);
  // Uncaught ReferenceError: path is not defined
  return <div>Dang!</div>;
}
