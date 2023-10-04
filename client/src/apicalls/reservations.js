import { axiosInstance } from "./axiosInstance";

// rezervisanje knjige
export const ReserveBook = async (payload) => {
    try {
      const response = await axiosInstance.post("/api/reservations/reserve-book", payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // dohvatanje zapisa o rezervacijama
export const GetReservations= async (payload) => {
    try {
      const response = await axiosInstance.post("/api/reservations/get-reservations" , payload);
      return response.data;
    } catch (error) {
      throw error;
    }
}

// potvrda da je knjiga pozajmljena nakon rezervacije
export const ConfirmReservation = async (payload) => {
    try {
      const response = await axiosInstance.post("/api/reservations/reservation-confirmed", payload);
      return response.data;
    } catch (error) {
      throw error;
    }
}