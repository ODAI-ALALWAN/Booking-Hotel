
import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import CreateCabinForm from './CreateCabinForm';

function AddCabin() {

  return (
    <Modal>
      <Modal.Open opens='new-cabin'>
        <Button>Add new cabin</Button>
      </Modal.Open>
      <Modal.Window name='new-cabin'>
        <CreateCabinForm />
      </Modal.Window>
    </Modal>
  );
}

export default AddCabin;
