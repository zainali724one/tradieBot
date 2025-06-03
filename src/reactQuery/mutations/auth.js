import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { toast } from "react-toastify";

import {
  userLogin,
  userResetPassword,
  userSendOtp,
  userSignup,
  userVerifyOtp,
} from "../../api/auth";
import { useNavigate } from "react-router-dom";

export function useSignup() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: signup, isPending: isLoading } = useMutation({
    mutationFn: (formData) => userSignup(formData),
    onSuccess: () => {
      navigate("/signin");
      toast.success("Signup Successfully");
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
  const navigate = useNavigate();

  const { mutate: login, isPending: isLoading } = useMutation({
    mutationFn: (formData) => userLogin(formData),
    onSuccess: () => {
      navigate("/quoteform");
      console.log("zulqarnain");
      toast.success("Login Successfully");
      queryClient.invalidateQueries({ queryKey: ["login"] });
    },
    onError: (error) => {
      message.error(error.message);
      toast.error(
        error.message
      )
    },
  });

  return { login, isLoading };
}

export function useSendOtp() {
  const queryClient = useQueryClient();

  const { mutate: sendotp, isPending: isLoading } = useMutation({
    mutationFn: (formData) => userSendOtp(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sendotp"] });
    },
    onError: (error) => {
      message.error(error.message);
    },
  });

  return { sendotp, isLoading };
}

export function useVerifyOtp() {
  const queryClient = useQueryClient();

  const { mutate: verifyOtp, isPending: isLoading } = useMutation({
    mutationFn: (formData) => userVerifyOtp(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["verifyOtp"] });
    },
    onError: (error) => {
      message.error(error.message);
    },
  });

  return { verifyOtp, isLoading };
}

export function useResetPassword() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: resetPassword, isPending: isLoading } = useMutation({
    mutationFn: (formData) => userResetPassword(formData),
    onSuccess: () => {
      navigate("/signin")
      toast.success("Reset Password Successfully");
      queryClient.invalidateQueries({ queryKey: ["resetPassword"] });
    },
    onError: (error) => {
      message.error(error.message);
    },
  });

  return { resetPassword, isLoading };
}
