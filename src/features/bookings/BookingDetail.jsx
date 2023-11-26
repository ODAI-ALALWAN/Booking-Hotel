import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';


import BookingDataBox from './BookingDataBox';
import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import Tag from '../../ui/Tag';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import ButtonText from '../../ui/ButtonText';
import Spinner from '../../ui/Spinner';
import Empty from '../../ui/Empty'
import { useBookingId } from './useBookingId';
import { useMoveBack } from '../../hooks/useMoveBack';
import { HiArrowUpOnSquare } from 'react-icons/hi2';
import { useCheckout } from './useCheckout';
import { useDeleteBooking } from './useDeleteBooking';



const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;


function BookingDetail() {
  const { Booking , isLoading } = useBookingId();
  const { checkOut ,isCheckingOut } = useCheckout()
  const { deleteBooking  } = useDeleteBooking()

  const moveBack = useMoveBack();
  const navigate = useNavigate();

  if (isLoading) return <Spinner />;
  if (!Booking) return <Empty resource='booking' />;

  const statusToTagName = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  };

  const { status , id : bookingId } = Booking;


  return (
    <>
      <Row type='horizontal'>
        <HeadingGroup>
          <Heading type='h1'>Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace('-', ' ')}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={Booking} />


      <ButtonGroup>
        {status === 'unconfirmed' && (
          <>
          <Button onClick={() => navigate(`/checkin/${bookingId}`)} >
            Check in
          </Button>
            <Modal>
            <Modal.Open opens='delete'>
              <Button variation='danger'>Delete booking</Button>
            </Modal.Open>
            <Modal.Window name='delete'>
              <ConfirmDelete
                resource='booking'
                onConfirm={(options) => deleteBooking(bookingId, options)}
                // disabled={isDeletingBooking}
                disabled
              />
            </Modal.Window>
          </Modal>
          </>        
        )} 

        {status === 'checked-in' && (
          <Button
          icon={<HiArrowUpOnSquare />}
          onClick={() => checkOut(bookingId)}
          disabled={isCheckingOut}
          >
            Check out
          </Button>
        )}


        
       

        <Button variation='secondary' onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
