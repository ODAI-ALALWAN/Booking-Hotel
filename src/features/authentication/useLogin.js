import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { login as loginUser  } from '../../services/apiAuth'
import toast from 'react-hot-toast'


export function useLogin(){
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const {mutate : login , isLoading : isLogin }=useMutation({
        mutationFn: ({email , password}) => loginUser({
            email , password
        }),
        onSuccess : (user) => {
            queryClient.setQueryData(['user'] , user.user)
            navigate('/dashboard' , {replace : true} )
        },
        onError:() => toast.error(' Email or Password is Wrong ')
    })


    return {login , isLogin }
    
}