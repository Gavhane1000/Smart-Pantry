import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/sp/v1'

export const submitFormData = async (formData) => {
  const response = await axios.post(`${API_BASE_URL}/get_recipes`, formData);
  if(response.data.status == "success"){
    return response.data.data;
  }
  else{
    console.log("Error Fetching recipes", response.data.message);
    return null;
  }
};