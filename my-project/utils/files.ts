import { File, Directory, Paths } from 'expo-file-system';

export const fileToBase64 = async (uri: string): Promise<String> => {
    try {

        const file = new File(uri)

        const base64String = await file.base64()
        return base64String

    } catch (error) {
        console.error("Error Reading File:", error);
        throw error;
    }
}