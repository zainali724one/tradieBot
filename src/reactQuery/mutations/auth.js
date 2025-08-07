import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { message } from "antd";

import { setUserId } from "../../store/sessionSlice";

import {
  addInvoice,
  addJob,
  addQuote,
  userChangePassword,
  userDeleteAccount,
  userEditName,
  userLogin,
  userResetPassword,
  userSendOtp,
  userSignup,
  userVerifyOtp,
} from "../../api/auth/auth";

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
      // message.error(error.message);
      toast.error(error?.response?.data?.message);
    },
  });

  return { signup, isLoading };
}

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { mutate: login, isPending: isLoading } = useMutation({
    mutationFn: (formData) => userLogin(formData),
    onSuccess: (response) => {
      if (response?.user) {
        dispatch(setUserId(response.user)); // ✅ Store userId in Redux
      }
      localStorage.setItem("telegramid", response.user?.telegramId);
      navigate("/quoteform");
      toast.success("Login Successfully");
      queryClient.invalidateQueries({ queryKey: ["login"] });
    },
    onError: (error) => {
      message.error(error.response.data?.message);
      toast.error(error.response.data?.message || "Login failed");
      console.log(error, "error in login mutation");
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
      navigate("/signin");
      toast.success("Reset Password Successfully");
      queryClient.invalidateQueries({ queryKey: ["resetPassword"] });
    },
    onError: (error) => {
      message.error(error.message);
    },
  });

  return { resetPassword, isLoading };
}

export function useEditProfile() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: editProfile, isPending: isLoading } = useMutation({
    mutationFn: (formData) => userEditName(formData),
    onSuccess: () => {
      navigate("/editProfile");
      toast.success("Update Successfully");
      queryClient.invalidateQueries({ queryKey: ["editName"] });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message);
    },
  });

  return { editProfile, isLoading };
}

export function useChangePassword() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: editChangePass, isPending: isLoading } = useMutation({
    mutationFn: (formData) => userChangePassword(formData),
    onSuccess: () => {
      navigate("/profile");
      toast.success("Update Successfully");
      queryClient.invalidateQueries({ queryKey: ["editChangePass"] });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message);
    },
  });

  return { editChangePass, isLoading };
}

export function useDelete() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: deleteUser, isPending: isLoading } = useMutation({
    mutationFn: (formData) => userDeleteAccount(formData),
    onSuccess: () => {
      navigate("/profile");
      toast.success("Delete Successfully");
      queryClient.invalidateQueries({ queryKey: ["useDel"] });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message);
    },
  });

  return { deleteUser, isLoading };
}

export function useAddQuote() {
  // const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: Addquote, isPending: isLoading } = useMutation({
    mutationFn: (formData) => addQuote(formData),
    onSuccess: () => {
      // navigate("/profile");
      toast.success("Data added successfully!");
      // toast.success("Delete Successfully");
      queryClient.invalidateQueries({ queryKey: ["Addquote"] });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message);
    },
  });

  return { Addquote, isLoading };
}

export function useAddInvoice() {
  // const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: AddInvoice, isPending: isLoading } = useMutation({
    mutationFn: (formData) => addInvoice(formData),
    onSuccess: () => {
      // navigate("/profile");
      toast.success("Data added successfully!");
      // toast.success("Delete Successfully");
      queryClient.invalidateQueries({ queryKey: ["AddInvoice"] });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message);

    },
  });

  return { AddInvoice, isLoading };
}

export function useAddJob() {
  // const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: usAddJob, isPending: isLoading } = useMutation({
    mutationFn: (formData) => addJob(formData),
    onSuccess: () => {
      toast.success("Data added successfully!");

      queryClient.invalidateQueries({ queryKey: ["usAddJob"] });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message);
    },
  });

  return { usAddJob, isLoading };
}
