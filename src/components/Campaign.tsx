import { useParams } from "react-router-dom";
import { Editor } from "../components/Editor";
import { useGetCampaignContent } from "../hooks/useGetCampaignContent";
import { useQueryClient } from "react-query";

export const loadingMessageTestId = "loading-message";
export const errorMessageTestId = "error-message";

export const Campaign = () => {
  const { idCampaign } = useParams();
  const queryClient = useQueryClient();

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
      ) : (
        <div>
          <button
            onClick={() =>
              ((
                campaignContentQuery.data as any
              ).body.rows[0].columns[0].contents[0].values.text += `*`)
            }
          >
            Modify!
          </button>
          <button
            onClick={() =>
              queryClient.invalidateQueries([{
                scope: "campaign-contents"
               }])
            }
          >
            INVALIDATE
          </button>
        </div>
      )}
      <Editor design={campaignContentQuery.data}></Editor>;
    </>
  );
};
