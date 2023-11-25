import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEditCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';


export function useCreateCabin() {

    const queryClient = useQueryClient()

    const {mutate : creatCabin , isLoading : isCreating } = useMutation({
    mutationFn: createEditCabin ,
    onSuccess: () => {
      toast.success('Create New Cabins Successfuly ✅')

      queryClient.invalidateQueries({ // Used to refresh temporary memory
        queryKey:['cabins'], // 
      })
      
    },
    onError:(err) => toast.error(err.message)
    
    })




  return {creatCabin , isCreating }

}