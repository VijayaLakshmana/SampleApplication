// import { createContext, useState } from "react";
// import React from "react";
// export const AppContext = createContext();
// export default function AppProvider({ children }) {
//   const [from, setFrom] = useState("");
//   const [to, setTo] = useState("");
//   const [date, setDate] = useState("");
//   const [busDetails, setBusDetails] = useState([]);
//   const [selectedSeats, setSelectedSeats] = useState({});
//   const [selectedBus, setSelectedBus] = useState(null);
//   const [showBoardingPoint, setShowBoardingPoint] = useState([]);
//   const [showDropingPoint, setShowDropingPoint] = useState([]);
//   return (
//     <div>
//       <AppContext.Provider
//         value={{
//           from,
//           setFrom,
//           to,
//           setTo,
//           date,
//           setDate,
//           busDetails,
//           setBusDetails,
//           selectedBus,
//           setSelectedBus,
//           selectedSeats,
//           setSelectedSeats,
//           showBoardingPoint,
//           setShowBoardingPoint,
//           showDropingPoint,
//           setShowDropingPoint,
//         }}
//       >
//         {children}
//       </AppContext.Provider>
//     </div>
//   );
// }
