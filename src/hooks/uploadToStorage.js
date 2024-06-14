import { storage } from "@/firebase/config";
import { uploadBytesResumable, getDownloadURL, ref } from "firebase/storage";
import imageCompression from 'browser-image-compression';

const uploadToStorage = async (file, path, fileName) => {
  // Verificar se o arquivo é uma imagem
  if (!file.type.startsWith('image/')) {
    throw new Error('O arquivo selecionado não é uma imagem.');
  }

  // Verificar o formato da imagem
  let uploadFile = file;
  if (file.type !== 'image/png' && file.type !== 'image/webp') {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
      fileType: 'image/webp',
    };
    uploadFile = await imageCompression(file, options);
  }

  const storageRef = ref(storage, `${path}/${fileName}.webp`);

  return new Promise((resolve, reject) => {
    const uploadTask = uploadBytesResumable(storageRef, uploadFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        console.log(snapshot);
        // Progress handling can go here
      },
      (error) => {
        // Handle errors here
        reject(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("Arquivo disponível na URL: ", downloadURL);
          resolve(downloadURL);
        });
      }
    );
  });
};

export default uploadToStorage;
