



// const AppConfig = APP_ENVIRONMENT == 'LIVE' ? ConfigProduction : ConfigStaging
export const base_url = "http://127.0.0.1:8000/";
export const openstreetmap = "https://nominatim.openstreetmap.org";

const convertToBase64 = (imageFile) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result;
        resolve(base64Image);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(imageFile);
    });
  };
  
  export { convertToBase64 };