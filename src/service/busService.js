// import axios from "axios";

// export async function fetchBusData() {
//   try {
//     const response = await axios.get("http://localhost:3001/bus");
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching bus data:", error);
//     throw new Error("Failed to fetch bus data");
//   }
// }
// export async function updateBusData(busId, updatedData) {
//   try {
//     await axios.put(`http://localhost:3001/bus/${busId}`, updatedData);
//   } catch (error) {
//     console.error("Error updating bus data:", error);
//     throw new Error("Failed to update bus data");
//   }
// }
// export async function registerUser(regObj) {
//   try {
//     await axios.post("http://localhost:3000/user", regObj);
//     return "success";
//   } catch (error) {
//     throw new Error(error.message || "Failed to register user");
//   }
// }
// export async function loginUser(username, password) {
//   try {
//     const resp = await axios.get(`http://localhost:3000/user/${username}`);
//     if (resp.data.password === password) {
//       return "success";
//     } else {
//       throw new Error("Invalid password");
//     }
//   } catch (error) {
//     throw new Error("Invalid username");
//   }
// }

// export async function bookTicket(newBooking) {
//   try {
//     const response = await axios.post(
//       "http://localhost:3003/Bookings",
//       newBooking,
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching Booking data:", error);
//     throw new Error("Failed to post data");
//   }
// }
// export const fetchBookings = async () => {
//   try {
//     const response = await axios.get("http://localhost:3003/Bookings");
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching Booking data:", error);
//     throw new Error("Failed to fetch bus data");
//   }
// };
// export async function updateBusDetails(busId, updatedBusDetails) {
//   try {
//     await axios.put(`http://localhost:3001/bus/${busId}`, {
//       ...updatedBusDetails.find((bus) => bus.id === busId),
//     });
//   } catch (error) {
//     console.error("Error updating bus details:", error);
//     throw new Error("Failed to update bus details");
//   }
// }

// export async function updateBooking(bookingId, updatedTicketDetails) {
//   try {
//     await axios.put(`http://localhost:3003/Bookings/${bookingId}`, {
//       ...updatedTicketDetails.find((booking) => booking.id === bookingId),
//     });
//   } catch (error) {
//     console.error("Error updating booking details:", error);
//     throw new Error("Failed to update bus Booking");
//   }
// }
// import axios from "axios";

// class API {
//   constructor(baseURL) {
//     this.axiosInstance = axios.create({
//       baseURL: baseURL, // Set the base URL provided when creating the instance
//     });
//   }

//   async get(url) {
//     try {
//       const response = await this.axiosInstance.get(url);
//       return response.data;
//     } catch (error) {
//       throw new Error(`GET request to ${url} failed: ${error.message}`);
//     }
//   }

//   async post(url, payload) {
//     try {
//       const response = await this.axiosInstance.post(url, payload);
//       return response.data;
//     } catch (error) {
//       throw new Error(`POST request to ${url} failed: ${error.message}`);
//     }
//   }

//   async put(url, payload) {
//     try {
//       const response = await this.axiosInstance.put(url, payload);
//       return response.data;
//     } catch (error) {
//       throw new Error(`PUT request to ${url} failed: ${error.message}`);
//     }
//   }
// }
// export default API;

import axios from "axios";

class Api {
  constructor() {
    this.axiosInstance = axios.create();
  }

  get(url) {
    return this.axiosInstance.get(url);
  }

  post(url, payload) {
    return this.axiosInstance.post(url, payload);
  }

  put(url, payload) {
    return this.axiosInstance.put(url, payload);
  }
}
export default Api;