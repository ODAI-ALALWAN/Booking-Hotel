import { useQuery} from '@tanstack/react-query';
import { getSettings } from '../../services/apiSettings';


export function useSettings(){

    const { isLoading : isSetting , data : Setting } = useQuery({
        queryKey: ['Settings'],
        queryFn : getSettings
    })


    return {isSetting , Setting }

}