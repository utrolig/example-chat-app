import female_1 from "../assets/avatars/female_1.png";
import female_2 from "../assets/avatars/female_2.png";
import female_3 from "../assets/avatars/female_3.png";
import female_4 from "../assets/avatars/female_4.png";
import male_1 from "../assets/avatars/male_1.png";
import male_2 from "../assets/avatars/male_2.png";
import male_3 from "../assets/avatars/male_3.png";
import male_4 from "../assets/avatars/male_4.png";
import faker from "faker";
import { Friend } from "../types/friend";

const femaleAvatars = [female_1, female_2, female_3, female_4];
const maleAvatars = [male_1, male_2, male_3, male_4];

const createFriends = (amount: number) => {
  const friends = Array.from(new Array(amount)).map(createFriend);
  return friends.sort((a, b) => (a.name > b.name ? 1 : -1));
};

const createFriend = (seed: number): Friend => {
  const isMale = 3 % seed;

  const id = faker.random.uuid();
  const firstName = faker.name.firstName(isMale);
  const lastName = faker.name.lastName(isMale);
  const name = `${firstName} ${lastName}`;
  const avatarUrl = isMale
    ? maleAvatars[Math.floor(Math.random() * maleAvatars.length)]
    : femaleAvatars[Math.floor(Math.random() * femaleAvatars.length)];

  return {
    id,
    name,
    avatarUrl,
  };
};

const friends = createFriends(50);

export default friends;
