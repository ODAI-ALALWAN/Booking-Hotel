import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import {useSettings} from './useSettings'
import  useUpdateSetting  from './useUpdateSetting'


import Spinner from '../../ui/Spinner'

function UpdateSettingsForm() {
  const { isSetting , Setting : { minBookingLength , maxBookingLength , maxGuestsPerBooking , BreakfastPrice } = {}} = useSettings()
  const { updateSetting , isLoadingSetting } = useUpdateSetting()

  if (isSetting) return <Spinner />

  function handelUpdateValue(e , field ){
    const {value} = e.target

    if(!value) return

    updateSetting({ [field] : value})
  }

  return (
    <Form>
      <FormRow label='Minimum nights/booking'>
        <Input type='number' id='min-nights' disabled={isLoadingSetting}  defaultValue={minBookingLength} onBlur={(e) => handelUpdateValue(e , 'minBookingLength')} />
      </FormRow>

      <FormRow label='Maximum nights/booking'>
        <Input type='number' id='max-nights' disabled={isLoadingSetting}  defaultValue={maxBookingLength}  onBlur={(e) => handelUpdateValue(e , 'maxBookingLength')} />
      </FormRow>

      <FormRow label='Maximum guests/booking'>
        <Input type='number' id='max-guests' disabled={isLoadingSetting}  defaultValue={maxGuestsPerBooking} onBlur={(e) => handelUpdateValue(e , 'maxGuestsPerBooking')} />
      </FormRow>

      <FormRow label='Breakfast price'>
        <Input type='number' id='breakfast-price' disabled={isLoadingSetting} defaultValue={BreakfastPrice} onBlur={(e) => handelUpdateValue(e , 'BreakfastPrice')} />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
