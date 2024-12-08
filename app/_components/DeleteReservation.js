"use client";
// We are using "use client" because we have onClick in this component
// This was a server component before that

import { TrashIcon } from "@heroicons/react/24/solid";
import { useTransition } from "react"; // React 18
import { deleteBookingAction } from "../_lib/actions";

import SpinnerMini from "./SpinnerMini";

function DeleteReservation({ bookingId }) {
  // Different way of rendering a loading indicator while a server action is happening.
  // In the update profile form, we used the new hook called useFormStatus
  // In this case, it was just a button, we use the useFormStatus as we did here.
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (confirm("Are you sure you want to delete this reservation?"))
      startTransition(() => deleteBookingAction(bookingId));
  }

  return (
    <button
      onClick={handleDelete}
      className="group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900"
    >
      {!isPending ? (
        <>
          <TrashIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
          <span className="mt-1">Delete</span>
        </>
      ) : (
        <span className="mx-auto">
          <SpinnerMini />
        </span>
      )}
    </button>
  );
}

export default DeleteReservation;
