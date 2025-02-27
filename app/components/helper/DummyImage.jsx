import { Image } from "react-native";
import images from "../../../assets/imagePaths";

export default function DummyImage({ name, style }) {
  return <Image source={images[name] || images.logo} style={style} resizeMode="contain" />;
}
