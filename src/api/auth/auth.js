import axiosClient from "./axiosClient";

export const userSignup = async (formData) => {
  const response = await axiosClient.post("/user/signup", {
    ...formData,
  });
  return response.data;
};

export const userLogin = async (formData) => {
  const response = await axiosClient.post("/user/signin", {
    ...formData,
  });
  return response.data;
};

export const userSendOtp = async (formData) => {
  const response = await axiosClient.post("/user/sendOTP", {
    ...formData,
  });
  return response.data;
};

export const userVerifyOtp = async (formData) => {
  const response = await axiosClient.post("/user/verifyOTP", {
    ...formData,
  });
  return response.data;
};

export const userResetPassword = async (formData) => {
  const response = await axiosClient.post("/user/updatePassword", {
    ...formData,
  });
  return response.data;
};

export const userEditName = async (formData) => {
  const response = await axiosClient.put("/user/updateProfile", {
    ...formData,
  });
  return response.data;
};

export const userChangePassword = async (formData) => {
  const response = await axiosClient.put("/user/changePassword", {
    ...formData,
  });
  return response.data;
};

export const userDeleteAccount = async (formData) => {
  const response = await axiosClient.delete("/user/deleteAccount", {
    data: formData,
  });
  return response.data;
};

export const addQuote = async (formData) => {
  const response = await axiosClient.post("/quote/addQuote", {
    ...formData,
  });
  return response.data;
};

export const addInvoice = async (formData) => {
  const response = await axiosClient.post("/invoice/addInvoice", {
    ...formData,
  });
  return response.data;
};

export const Getchases = async (telegramId, type) => {
  const response = await axiosClient.get(
    `/invoice/getChases?telegramId=${telegramId}&type=${type}`
  );
  return response.data;
};

export const addJob = async (formData) => {
  const response = await axiosClient.post("/job/addJob", {
    ...formData,
  });
  return response.data;
};

export const Gethistory = async (telegramId) => {
  const response = await axiosClient.get(
    `/job/getHistory?telegramId=${telegramId}`
  );
  return response.data;
};

export const Getuser = async (telegramId) => {
  const response = await axiosClient.get(`/user/getUser/${telegramId}`);
  console.log(response, "here is response");

  return response.data;
};

export const uploadPdf = async (formData) => {
  try {
    const uploadRes = await axiosClient.post("/uploadpdf", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log("Upload Success:", uploadRes.data);
  } catch (err) {
    console.error("Upload Failed:", err);
  }
};

export const deleteChase = async (id, type, telegramId) => {
  const qs = new URLSearchParams({ type });
  if (telegramId) qs.append("telegramId", telegramId);

  const response = await axiosClient.delete(
    `/invoice/chases/${id}?${qs.toString()}`
  );
  return response.data;
};
