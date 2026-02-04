import { useQuery } from "@tanstack/react-query";
import { Getchases, Gethistory } from "../../api/auth/auth";


export function useGetChases(telegramId,type) {


  const { isLoading, error, data } = useQuery({
    queryKey: ["Getchases"],
    queryFn: () => Getchases(telegramId,type),
  });

  return { isLoading, error, data };
}


export function useGethistory(telegramId) {
console.log("Fetching history for telegramId000000000000000000:", telegramId); // Debug log

    const { isLoading, error, data } = useQuery({
      queryKey: ["Gethistory"],
      queryFn: () => Gethistory(telegramId),
    });
  
    return { isLoading, error, data };
  }