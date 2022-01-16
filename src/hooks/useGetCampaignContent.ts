// import { useEffect } from 'react';
import { useQuery } from "react-query";
import { useAppServices } from "../components/AppServicesContext";

export const useGetCampaignContent = (idCampaign: string | undefined) => {
  const { htmlEditorApiClient } = useAppServices();

  const query = useQuery({
    queryKey: [
      {
        scope: "campaign-contents",
        idCampaign,
      },
    ],
    queryFn: async (context) => {
      const [{ idCampaign }] = context.queryKey;
      if (!idCampaign) {
        throw new Error("Missing idCampaign");
      }
      const result = await htmlEditorApiClient.getCampaignContent(idCampaign);
      return result.value;
    },
    //enabled: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  // useEffect(() => {
  //   query.refetch();
  // }, [idCampaign])

  return query;
};
