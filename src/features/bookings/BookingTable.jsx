import Menus from '../../ui/Menus';
import Table from '../../ui/Table';
import { useBooking } from './useBooking';
import Spinner from '../../ui/Spinner'
import Empty from '../../ui/Empty'
import BookingRow from './BookingRow';
import Pagination from '../../ui/Pagination';




function BookingTable() {

  const {Booking , isLoading  , count } = useBooking();


  if (isLoading) return <Spinner />

  if(!Booking?.length) return <Empty   resourceName='bookings'  />

  return (
    <Menus>
       
       <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem"  >
        <Table.Header>
          <div>Cabin</div>
          <div>GUEST</div>
          <div>DATES</div>
          <div>STATUS</div>
          <div>AMOUNT</div>
        </Table.Header>

        <Table.Body
          data={Booking}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        /> 


        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>

        </Table>
    </Menus>

  )
}

export default BookingTable