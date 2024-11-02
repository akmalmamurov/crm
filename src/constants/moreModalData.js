export const moreBtnDataConfig = {
  base: (t, setDeleteModal) => [
    {
      imgUrl: {
        light: "/src/assets/icons/edit.svg",
        dark: "/src/assets/icons/edit-white.svg",
      },
      alt: "Edit",
      title: t.edit,
    },
    {
      imgUrl: {
        light: "/src/assets/icons/trash.svg",
        dark: "/src/assets/icons/trash.svg",
      },
      alt: "Trash",
      title: t.delete,
      handler: () => setDeleteModal(true),
    },
  ],

  lead: (setUpdateForm, setCashForm, setDeleteModal,t) => [
    {
      imgUrl: {
        light: "/src/assets/icons/edit.svg",
        dark: "/src/assets/icons/edit-white.svg",
      },
      alt: "Edit",
      title: t.edit,
      handler: () => setUpdateForm(true),
    },
    {
      imgUrl: {
        light: "/src/assets/icons/payment.svg",
        dark: "/src/assets/icons/payment-white.svg",
      },
      alt: "Payment",
      title: t.payment,
      handler: () => setCashForm(true),
    },
    {
      imgUrl: {
        light: "/src/assets/icons/SMS.svg",
        dark: "/src/assets/icons/SMS-white.svg",
      },
      alt: "SMS send",
      title: t.sendMessage,
    },
    {
      imgUrl: {
        light: "/src/assets/icons/trash.svg",
        dark: "/src/assets/icons/trash.svg",
      },
      alt: "Trash",
      title: t.delete,
      handler: () => setDeleteModal(true),
    },
  ],
};
