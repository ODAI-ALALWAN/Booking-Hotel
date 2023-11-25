import { useEffect, useState } from 'react';
import { formatCurrency } from '../../utils/helpers';
import styled from 'styled-components';
import Spinner from '../../ui/Spinner';
import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import ButtonText from '../../ui/ButtonText';
import BookingDataBox from '../../features/bookings/BookingDataBox';
import { useMoveBack } from '../../hooks/useMoveBack';
import { useBookingId } from '../bookings/useBookingId';
import Checkbox from '../../ui/Checkbox';
import { useCheckin } from '../bookings/useCheckin';
import { useSettings } from '../settings/useSettings';


const Box = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;





function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);

  const { Booking , isLoading } = useBookingId();

  useEffect(() => setConfirmPaid(Booking?.isPaid ?? false), [Booking]);
  const moveBack = useMoveBack();

  const { checkin , isCheckingIn  } = useCheckin()

  const { Setting , isSetting } = useSettings()

  if (isLoading || isSetting ) return <Spinner />;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = Booking;

  const optionalBreakfastPrice = Setting.BreakfastPrice * numNights * numGuests

  function handleCheckin() {
    if(!confirmPaid) return
    if(addBreakfast){
      checkin({
        bookingId,
        breakfast : {
          hasBreakfast : true,
          extrasPrice : optionalBreakfastPrice ,
          totalPrice : totalPrice + optionalBreakfastPrice
        }
      })
    }else {
      checkin({bookingId , breakfast : {}})
    }
  }

  return (
    <>
      <Row type='horizontal'>
        <Heading type='h1'>Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={Booking} />

      {!hasBreakfast && (
      <Box>
        <Checkbox 
        checked={addBreakfast}
        onChange={() => { 
          setAddBreakfast((add) => !add);
          setConfirmPaid(false)
         }}
         id='breakfast'
        >
          Want add breakfast for {optionalBreakfastPrice}
          </Checkbox>
      </Box>
        )}
      <Box>
        <Checkbox 
        checked={confirmPaid}
        onChange={() => setConfirmPaid((confirm) => !confirm)}
        id='confirm'
        disabled={confirmPaid || isCheckingIn}
        >
          I Confirm that {guests.fullName} has paid the total amount of {!addBreakfast ?  formatCurrency(totalPrice) :
          `${formatCurrency(totalPrice + optionalBreakfastPrice)} (${formatCurrency(totalPrice)} + ${formatCurrency(optionalBreakfastPrice)} )` }
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingIn} >
          Check in booking #{bookingId}
        </Button>
        <Button variation='secondary' onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
