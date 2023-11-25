import { getToday } from "../utils/helpers";
import supabase from "./supabase";
import { PAGE_SIZE } from "../utils/constants";

export async function getBooking({filter , sortBy , page }) { 
  
  let query =  supabase
  .from('Booking')
  .select('id , created_at , startDate , endDate , numNights , numGuests , status , totalPrice , Cabins(name) , guests(fullName , email)',
  {count : 'exact'})

  // Filter 
  if(filter !== null)  query = query[filter.method || 'eq'](filter.field , filter.value)


  // Sort 
  if(sortBy)
    query = query.order(sortBy.field , { ascending : sortBy.direction === "asc" })


  // Pagination
  if(page){
  const from = (page - 1) * PAGE_SIZE ;
  const to = from + PAGE_SIZE - 1
  query = query.range(from , to)
  }

  const { data, error , count } = await query

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }

  return {data , count };
}



export async function getBookingById(id) {
  const { data, error } = await supabase
    .from("Booking")
    .select(" * , Cabins(*), guests(*)")
    .eq("id", id)
    .single();


  if (error) {
    console.log(error)
    throw new Error("Booking not found");
  }

  return data;
}








export async function getBookingsAfterDate(date) {
  const { data, error } = await supabase
    .from("Booking")
    .select("created_at, totalPrice, extrasPrice")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from("Booking")
    .select("*, guests(fullName)")
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}


// Activity means that there is a check in or a check out today
// export async function getStaysTodayActivity() {
//   const { data, error } = await supabase
//     .from("Booking")
//     .select("*, guests(fullName, nationality, countryFlag)")
//     .order("created_at");

//   if (error) {
//     console.error(error);
//     throw new Error("Bookings could not get loaded");
//   }
  


//   return data;
// }

export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from("Booking")
    .select("*, guests(fullName, nationality, countryFlag)")
    .order("created_at")


  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}






export async function updateBooking(id, obj) {
  const { data, error } = await supabase
    .from("Booking")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
}

export async function deleteBooking(id) {
  const { data, error } = await supabase.from("Booking").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
}
