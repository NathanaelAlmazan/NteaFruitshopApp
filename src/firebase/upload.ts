import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { storage } from "./config"
 
const uploadFile = async (file: File, folder?: string): Promise<string> => {
    const folderName = folder ? folder : "products"
    const fileRef = ref(storage, `${folderName}/${file.name}`)

    const result = await uploadBytes(fileRef, file)
    const downloadURL = await getDownloadURL(result.ref)

    return downloadURL
}

export default uploadFile