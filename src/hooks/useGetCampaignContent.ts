import { useQuery } from "react-query";
import { useAppServices } from "../components/AppServicesContext";

export const useGetCampaignContent = (idCampaign: string | undefined) => {
  const { htmlEditorApiClient } = useAppServices();

  return useQuery({
    queryKey: ["campaign-content", idCampaign],
    queryFn: async () => {
      if (!idCampaign) {
        throw new Error("Missing idCampaign");
      }
      const result = await htmlEditorApiClient.getCampaignContent(idCampaign);
      return result.value;
    },
  });
};
