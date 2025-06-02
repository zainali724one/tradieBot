import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { userLogin, userSignup } from "../../api/auth";

export function useSignup() {
  const queryClient = useQueryClient();

  const { mutate: signup, isPending: isLoading } = useMutation({
    mutationFn: (formData) => userSignup(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["signup"] });
    },
    onError: (error) => {
      message.error(error.message);
    },
  });

  return { signup, isLoading };
}
export function useLogin() {
  const queryClient = useQueryClient();

  const { mutate: login, isPending: isLoading } = useMutation({
    mutationFn: (formData) => userLogin(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["login"] });
    },
    onError: (error) => {
      message.error(error.message);
    },
  });

  return { login, isLoading };
}
