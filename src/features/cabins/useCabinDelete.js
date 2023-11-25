import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCabinsById } from '../../services/apiCabins';
import toast from 'react-hot-toast';

export function useCabinDelete(){

    const queryClient = useQueryClient()

    // for delete the cabin 
    const {isLoading : IsDeletingCabin , mutate : deleteCabin} = useMutation({
    mutationFn: (id) => deleteCabinsById(id),
    onSuccess:() => { // <= If any operation you perform is successful
        toast.success('Cabin successfully deleted')
        queryClient.invalidateQueries({ // Used to refresh temporary memory
        queryKey:['cabins'], // 
        })
    },
    onError:(err) => toast.error(err.message)
    })


    return {IsDeletingCabin , deleteCabin}

}
