import { useAppServices } from "./AppServicesContext";
import { useAppSessionStateStatus } from "./AppSessionStateContext";
import { NavigateToExternalUrl } from "./NavigateToExternalUrl";

const RedirectToLogin = () => {
  const {
    appConfiguration: { loginPageUrl },
    window: { location },
  } = useAppServices();

  return (
    <NavigateToExternalUrl to={`${loginPageUrl}?redirect=${location.href}`} />
  );
};

export const RequireAuth = ({
  children,
  fallback = null,
}: {
  children: JSX.Element;
  fallback?: JSX.Element | null;
}) => {
  const appSessionStateStatus = useAppSessionStateStatus();

  return appSessionStateStatus === "unknown" ? (
    <div>Loading...</div>
  ) : appSessionStateStatus !== "authenticated" ? (
    // Important: redirect value should not be encoded
    fallback ?? <RedirectToLogin />
  ) : (
    children
  );
};
