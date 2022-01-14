import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { Editor } from "../components/Editor";
import { useGetCampaignContent } from "../hooks/useGetCampaignContent";
export const loadingMessageTestId = "loading-message";
export const errorMessageTestId = "error-message";

export const Campaign = () => {
  const { idCampaign } = useParams();

  const { isLoading, error, data } = useGetCampaignContent(idCampaign || null);

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
