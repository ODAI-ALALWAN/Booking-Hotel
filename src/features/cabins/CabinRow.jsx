
import styled from 'styled-components';

import { formatCurrency } from '../../utils/helpers';
import CreateCabinForm from './CreateCabinForm';
import { useCabinDelete } from './useCabinDelete';
import {MdOutlineDeleteForever, MdOutlineEditNote} from 'react-icons/md'
import {TbDiscount2Off} from 'react-icons/tb'
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Table from '../../ui/Table';






const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  /* transform: scale(1.66666) translateX(-2px); */
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`;

const Price = styled.div`
  font-family: 'Sono';
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {


  const {
    id : CabinID ,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
  } = cabin;

  const {IsDeletingCabin , deleteCabin } = useCabinDelete()

  return (
    <>
    
    <Table.Row  colums='0.6fr 1.8fr 2.2fr 1fr 1fr 1f'>
      <Img src={image} alt={image}  />
      <Cabin>{name}</Cabin>
      <div>Fits up to {maxCapacity} guests </div>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount ? <Discount>{formatCurrency(discount)}</Discount> : <span><TbDiscount2Off/></span>}
      <div>
      <Modal>
        <Modal.Open opens='edit'>
          <button><MdOutlineEditNote/></button>
        </Modal.Open>
        <Modal.Window name='edit'>
          <CreateCabinForm cabinToEdit={cabin}  />
        </Modal.Window>

        <Modal.Open opens='delete' >
          <button ><MdOutlineDeleteForever/></button>
        </Modal.Open>
        <Modal.Window  name='delete' >
          <ConfirmDelete resourceName='cabins' disabled={IsDeletingCabin} 
          onConfirm={ () => deleteCabin(CabinID)} />
        </Modal.Window>

      </Modal>
      </div>
    </Table.Row>

   

    
    </>
    
  );
}

export default CabinRow;




















