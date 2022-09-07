import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { storage } from "./config"
 
const uploadFile = async (file: File): Promise<string> => {
    const fileRef = ref(storage, "products/" + file.name)

    const result = await uploadBytes(fileRef, file)
    const downloadURL = await getDownloadURL(result.ref)

    return downloadURL
}

export default uploadFile