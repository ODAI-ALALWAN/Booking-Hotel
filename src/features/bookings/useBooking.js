import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getBooking } from "../../services/apiBookings";
import { PAGE_SIZE } from "../../utils/constants";

export function useBooking() {
  const QueryClient = useQueryClient()
  const [searchParams] = useSearchParams()



// Filter 
  const filterValue = searchParams.get("status")
  const filter = !filterValue || filterValue === 'all'
    ? null
    : {field : 'status' , value : filterValue }

// Sort

  const sortByRow = searchParams.get('sortBy') || 'startDate-desc' ;
  const [field , direction ] = sortByRow.split('-')
  const sortBy = { field , direction   }
 


// Pagination 
const page = ! searchParams.get("page") ? 1 : Number(searchParams.get('page'))

  const {
    isLoading,
    data: { data : Booking  , count} = {} , 
    error,
  } = useQuery({
    queryKey: ["Booking" , filter , sortBy , page],
    queryFn: () => getBooking({filter , sortBy , page}),
  });

  // Pre - Fetching Next Page
  const pageCount = Math.ceil( count / PAGE_SIZE  )

  if ( page < pageCount )
  QueryClient.prefetchQuery({
    queryKey: ["Booking" , filter , sortBy , page +1],
    queryFn: () => getBooking({filter , sortBy , page : page +1}),
  })

   // Pre - Fetching prev Page
  if ( page > 1 )
  QueryClient.prefetchQuery({
    queryKey: ["Booking" , filter , sortBy , page -1],
    queryFn: () => getBooking({filter , sortBy , page : page -1}),
  })


  return { isLoading, error, Booking  , count};
}