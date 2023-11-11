import { toast as Toast } from "react-hot-toast";

const toast: typeof Toast = (message, opts) => Toast(message, opts);

toast.success = (message, opts) =>
  Toast.success(message, {
    className: "dark:bg-black dark:text-white",
    ...opts,
  });

toast.error = (message, opts) =>
  Toast.error(message, {
    className: "dark:bg-black dark:text-white",
    ...opts,
  });

toast.loading = (message, opts) =>
  Toast.loading(message, {
    className: "dark:bg-black dark:text-white",
    ...opts,
  });

toast.custom = (message, opts) =>
  Toast.custom(message, {
    className: "dark:bg-black dark:text-white",
    ...opts,
  });

toast.promise = (promise, msgs, opts) =>
  Toast.promise(promise, msgs, {
    className: "dark:bg-black dark:text-white",
    ...opts,
  });

toast.dismiss = (toastId) => Toast.dismiss(toastId);

toast.remove = (toastId) => Toast.remove(toastId);

export { toast };
