import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateSetting as updateSettings } from "../../services/apiSettings"
import toast from "react-hot-toast"


export default function useUpdateSetting() {
    const queryClient = useQueryClient()

    const {mutate : updateSetting , isLoading : isLoadingSetting } = useMutation({
        mutationFn: updateSettings ,
        onSuccess: () => {
          toast.success(' Setting Successfuly Update  ✅')
    
          queryClient.invalidateQueries({ // Used to refresh temporary memory
            queryKey:['Settings'], // 
          })
    
        },
        onError:(err) => toast.error(err.message)
        
      })


    return {updateSetting , isLoadingSetting}
  
}
