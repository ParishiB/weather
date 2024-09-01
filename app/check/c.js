// function convertData(input) {
//   const lines = input.trim().split("\n");
//   const result = lines.map((line) => {
//     const [region, location, code, lat, long, system] =
//       line.split(/\s(?=\S+\s\S+$)/);
//     return {
//       region,
//       location,
//       code,
//       latitude: parseFloat(lat),
//       longitude: parseFloat(long),
//       system: system.split(" - ")[1].trim(),
//     };
//   });
//   return result;
// }

// const data = `
// Delhi NCR Sarita Vihar ZWL005764 28.531759 77.293973 1 - Automated weather system
// Delhi NCR Faridabad Sector 41-50 ZWL008752 28.460895 77.304764 1 - Automated weather system
// Delhi NCR New Friends Colony ZWL005996 28.565268 77.274971 1 - Automated weather system
// Delhi NCR Sector 26 (Noida) ZWL005243 28.574404 77.334178 1 - Automated weather system
// Delhi NCR New Industrial Town ZWL009032 28.375702 77.299442 1 - Automated weather system
// `;

// const structuredData = convertData(data);
// console.log(structuredData);
function convertData(data) {
  return data.map((item) => {
    // Split the entry into parts by spaces
    const parts = item.split(" ");

    // Extract the `system` part, which is always after the last "1 - "
    const systemIndex = parts.lastIndexOf("1") + 2; // Assuming "1 - " is always present
    const system = parts.slice(systemIndex).join(" ");

    // Extract the latitude and longitude from the known positions
    const latitude = parseFloat(parts[parts.length - 4]);
    const longitude = parseFloat(parts[parts.length - 3]);

    return {
      address: parts.slice(0, systemIndex - 2).join(" "), // Join all parts except the `system` part
      id: parts[systemIndex - 2], // Extracting ID
      latitude,
      longitude,
      system: system.includes(" - ") ? system.split(" - ")[1].trim() : system,
    };
  });
}

// Sample usage:
const inputData = [
  "Delhi NCR Sarita Vihar ZWL005764 28.531759 77.293973 1 - Automated weather system",
  "Delhi NCR Faridabad Sector 41-50 ZWL008752 28.460895 77.304764 1 - Automated weather system",
  "Delhi NCR New Friends Colony ZWL005996 28.565268 77.274971 1 - Automated weather system",
  "Delhi NCR Sector 26 (Noida) ZWL005243 28.574404 77.334178 1 - Automated weather system",
  "Delhi NCR New Industrial Town ZWL009032 28.375702 77.299442 1 - Automated weather system",
];

const convertedData = convertData(inputData);
console.log(convertedData);
