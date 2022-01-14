import { useQuery } from "react-query";
import { useAppServices } from "../components/AppServicesContext";

export const useGetCampaignContent = (idCampaign: string | null) => {
  const { htmlEditorApiClient } = useAppServices();

  return useQuery({
    queryKey: ["campaign-content", idCampaign],
    queryFn: async () => {
      if (!idCampaign) {
        throw new Error("Missing idCampaign");
      }
      const result = await htmlEditorApiClient.getCampaignContent(idCampaign);

      if (result.success) {
        return result.value;
      }

      if (result.unexpectedError) {
        throw result.unexpectedError;
      }

      throw new Error("Unknown error");
    },
  });
};
