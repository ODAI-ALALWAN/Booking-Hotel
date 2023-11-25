import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import {  getBookingById } from "../../services/apiBookings";

export function useBookingId() {
  const { bookingId } = useParams();

  const {
    isLoading,
    data: Booking,
    error,
  } = useQuery({
    queryKey: ["Booking", bookingId],
    queryFn: () => getBookingById(bookingId),
    retry: false,
  });

  return { isLoading, error, Booking };
}