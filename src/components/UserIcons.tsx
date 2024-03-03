import { Image, ImageSourcePropType } from "react-native";
import * as AnimalIcons from "../../assets/index";

const NAME_TO_PNGS: { [_: string]: ImageSourcePropType } = {
  all: AnimalIcons.All,
  allCircle: AnimalIcons.AllCircle,
  allSelected: AnimalIcons.AllSelected,
  allPlus: AnimalIcons.AllPlus,
  alligator: AnimalIcons.Alligator,
  alligatorCircle: AnimalIcons.AlligatorCircle,
  alligatorSelected: AnimalIcons.AlligatorSelected,
  alligatorPlus: AnimalIcons.AlligatorPlus,
  bear: AnimalIcons.Bear,
  bearCircle: AnimalIcons.BearCircle,
  bearSelected: AnimalIcons.BearSelected,
  bearPlus: AnimalIcons.BearPlus,
  cow: AnimalIcons.Cow,
  cowCircle: AnimalIcons.CowCircle,
  cowSelected: AnimalIcons.CowSelected,
  cowPlus: AnimalIcons.CowPlus,
  fox: AnimalIcons.Fox,
  foxCircle: AnimalIcons.FoxCircle,
  foxSelected: AnimalIcons.FoxSelected,
  foxPlus: AnimalIcons.FoxPlus,
  frog: AnimalIcons.Frog,
  frogCircle: AnimalIcons.FrogCircle,
  frogSelected: AnimalIcons.FrogSelected,
  frogPlus: AnimalIcons.FrogPlus,
  gorilla: AnimalIcons.Gorilla,
  gorillaCircle: AnimalIcons.GorillaCircle,
  gorillaSelected: AnimalIcons.GorillaSelected,
  gorillaPlus: AnimalIcons.GorillaPlus,
  koala: AnimalIcons.Koala,
  koalaCircle: AnimalIcons.KoalaCircle,
  koalaSelected: AnimalIcons.KoalaSelected,
  koalaPlus: AnimalIcons.KoalaPlus,
  lion: AnimalIcons.Lion,
  lionCircle: AnimalIcons.LionCircle,
  lionSelected: AnimalIcons.LionSelected,
  lionPlus: AnimalIcons.LionPlus,
  member: AnimalIcons.Member,
  memberCircle: AnimalIcons.MemberCircle,
  memberSelected: AnimalIcons.MemberSelected,
  memberPlus: AnimalIcons.MemberPlus,
  penguin: AnimalIcons.Penguin,
  penguinCircle: AnimalIcons.PenguinCircle,
  penguinSelected: AnimalIcons.PenguinSelected,
  penguinPlus: AnimalIcons.PenguinPlus,
  pig: AnimalIcons.Pig,
  pigCircle: AnimalIcons.PigCircle,
  pigSelected: AnimalIcons.PigSelected,
  pigPlus: AnimalIcons.PigPlus,
};

NAME_TO_PNGS.all;

interface UserIconProps {
  name: string;
  height?: number;
  width?: number;
}

export const UserIcon = ({ name, height, width }: UserIconProps) => {
  const imageHeight = height ? height : 24;
  const imageWidth = width ? width : 24;
  return (
    <Image
      source={NAME_TO_PNGS[name]}
      style={{ height: imageHeight, width: imageWidth }}
      resizeMode="contain"
    />
  );
};
