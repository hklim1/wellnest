import dog from "../../assets/dog.png";
import fox from "../../assets/Fox.png";
import frog from "../../assets/frog.png";
import hamster from "../../assets/hamster.png";
import monkey from "../../assets/Monkey.png";
import panda from "../../assets/Panda.png";
import swine from "../../assets/Swine.png";
import user from "../../assets/User.png";

type UserIcon = {
    id: number;
    img:
        | typeof dog
        | typeof fox
        | typeof frog
        | typeof monkey
        | typeof panda
        | typeof swine
        | typeof user;
    color: string;
};
const Dog = {
    id: 0,
    img: dog,
    color: "#779FE5",
};

const Fox = {
    id: 2,
    img: fox,
    color: "#D16D6A",
};

const Frog = {
    id: 3,
    img: frog,
    color: "#9DC284",
};
const Hamster = {
    id: 4,
    img: hamster,
    color: "#ECB476i",
};

const Monkey = {
    id: 5,
    img: monkey,
    color: "#BE4A31",
};

const Panda = {
    id: 6,
    img: panda,
    color: "#141414",
};

const Swine = {
    id: 7,
    img: swine,
    color: "#B87F9E",
};

const Bear = {
    id: 1,
    img: user,
    color: "#8A7EBE",
};

export { Dog, Fox, Frog, Hamster, Monkey, Panda, Swine, Bear, UserIcon };
