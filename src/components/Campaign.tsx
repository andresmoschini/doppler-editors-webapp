import { useParams } from "react-router-dom";
import { Editor } from "../components/Editor";
import { useAppServices } from "./AppServicesContext";

export const loadingMessageTestId = "loading-message";
export const errorMessageTestId = "error-message";

export const Campaign = () => {
  const { getCampaignContentQueryClient } = useAppServices();
  const { idCampaign } = useParams();

  const { isLoading, error, data } =
    getCampaignContentQueryClient.useQuery(idCampaign);

  console.log({ isLoading, error, idCampaign, data });

  if (error) {
    return (
      <div data-testid={errorMessageTestId}>
        Unexpected Error: <pre>{JSON.stringify(error)}</pre>
      </div>
    );
  }

  return (
    <>
      {isLoading ? (
        <div data-testid={loadingMessageTestId}>Loading...</div>
      ) : null}
      <Editor design={data || null}></Editor>;
    </>
  );
};
