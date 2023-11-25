import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteBooking as deleteBookingsById } from '../../services/apiBookings';
import toast from 'react-hot-toast';


export function useDeleteBooking(){

    const queryClient  = useQueryClient()

    const  {mutate : deleteBooking  , isLoading : isDeletingBooking} = useMutation({
        mutationFn: (id) => deleteBookingsById(id),
        onSuccess : () => {
            toast.success('Booking successfully deleted')
            queryClient.invalidateQueries({ // Used to refresh temporary memory
            queryKey:['Booking'], // 
            })
        },
        onError:(err) => toast.error(err.message)
    })

    return {deleteBooking , isDeletingBooking }
}