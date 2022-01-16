import { useQuery } from "react-query";
import { useAppServices } from "../components/AppServicesContext";

export const useGetCampaignContent = (idCampaign: string | undefined) => {
  const { htmlEditorApiClient } = useAppServices();

  return useQuery({
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
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};
