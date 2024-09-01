import sunny_rain from "../../public/sunny_rain.png";
import cloud_rain from "../../public/cloud_rain.png";
import sun from "../../public/sun.png";
export function check_data(val: any) {
  const { temperature, rain_intensity } = val;

  if (temperature > 25 && rain_intensity > 2 && rain_intensity < 5) {
    return { imgSrc: sunny_rain.src, description: "sunny with rain" };
  } else if (temperature > 25 && rain_intensity >= 6) {
    // return { imgSrc: cloud_rain.src, description: "Rain" };
  } else if (temperature > 25) {
    return { imgSrc: sun.src, description: "sunny" };
  }
  return { imgSrc: "", description: "" };
}
