import { useParams } from "react-router-dom";
import { Editor } from "../components/Editor";
import { useGetCampaignContent } from "../hooks/useGetCampaignContent";
export const loadingMessageTestId = "loading-message";
export const errorMessageTestId = "error-message";

export const Campaign = () => {
  const { idCampaign } = useParams();

  const campaignContentQuery = useGetCampaignContent(idCampaign);

  if (campaignContentQuery.isError) {
    return (
      <div data-testid={errorMessageTestId}>
        Unexpected Error:{" "}
        <pre>{JSON.stringify(campaignContentQuery.error)}</pre>
      </div>
    );
  }

  return (
    <>
      {campaignContentQuery.isLoading ? (
        <div data-testid={loadingMessageTestId}>Loading...</div>
      ) : null}
      <Editor design={campaignContentQuery.data}></Editor>;
    </>
  );
};
