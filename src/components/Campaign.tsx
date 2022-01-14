import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { Editor } from "../components/Editor";
import { useAppServices } from "./AppServicesContext";

export const loadingMessageTestId = "loading-message";
export const errorMessageTestId = "error-message";

export const Campaign = () => {
  const { htmlEditorApiClient } = useAppServices();
  const { idCampaign } = useParams();

  const { isLoading, error, data } = useQuery(
    ["htmlEditorApiClient.getCampaignContent", idCampaign],
    async () => {
      if (!idCampaign) {
        throw new Error("Missing idCampaign");
      }
      const result = await htmlEditorApiClient.getCampaignContent(idCampaign);
      if (result.success) {
        return result.value;
      } else if (result.unexpectedError) {
        throw result.unexpectedError;
      }
    }
  );

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
