import supabase , { supabaseUrl } from "./supabase";

export async function getCabins () {

    let { data, error } = await supabase
    .from('Cabins')
    .select('*')


    if (error){
        console.error(error)
        throw new Error ('Cabins could not be loaded')
    }

    return data
        
}


export async function deleteCabinsById(id){
    const { error  , data } = await supabase
    .from('Cabins')
    .delete()
    .eq('id', id)

    if (error){
        console.error(error)
        throw new Error ('Cabins could not be Delete')
    }

    return data
        
}

export async function createEditCabin(newCabin , id){

    const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl)




    //1 Create cabin
    const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/","")

    const imagePath = hasImagePath ? newCabin.image :`${supabaseUrl}/storage/v1/object/public/Cabins-images/${imageName}`


    // Create / Edit cabin 
    let query = supabase.from('Cabins')


    //A ) CREATE

    if (!id){
      query =  query.insert([{...newCabin , image:imagePath}])
    }

     //B ) EDIT

    if (id) {
      query = query.update({...newCabin , image:imagePath})
        .eq('id', id)
        
    }

    const {data , error } = await query.select().single()

    if (error){
        console.error(error)
        throw new Error ('Cabins could not be Create!')
    }



    //2 upload image
    const { error : storageError } = await supabase.storage.from('Cabins-images')
    .upload(imageName, newCabin.image)


    // 3 delete the cabin If there was an error uplaoding image
    if(storageError){
        await supabase.from('Cabins').delete().eq('id', data.id)
        console.error(error)
        throw new Error ('image could not be Create!')
    }

    return data
        
}


