import { Card1, Card2, Card3, Card4 } from "./Assets";

export interface Hotel {
  id: Number;
  name: String;
  location: String;
  price: Number;
  stars: Number;
  description: String;
  image: String;
}

export const hotels: Hotel[] = [
  {
    id: 0,
    name: "Harmony Hideaway Hotel",
    location: "Florence",
    price: 100,
    stars: 5,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dapibus quis felis a venenatis. Suspendisse accumsan aliquam lorem, sit amet ultricies justo tristique nec.",
    image: Card1,
  },
  {
    id: 1,
    name: "Serene Retreat",
    location: "Madrid",
    price: 70,
    stars: 4,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dapibus quis felis a venenatis. Suspendisse accumsan aliquam lorem, sit amet ultricies justo tristique nec.",
    image: Card2,
  },
  {
    id: 2,
    name: "Palm Springs",
    location: "Sintra",
    price: 65,
    stars: 4,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dapibus quis felis a venenatis. Suspendisse accumsan aliquam lorem, sit amet ultricies justo tristique nec.",
    image: Card3,
  },
  {
    id: 3,
    name: "Oasis Resort",
    location: "Sienna",
    price: 115,
    stars: 5,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dapibus quis felis a venenatis. Suspendisse accumsan aliquam lorem, sit amet ultricies justo tristique nec.",
    image: Card4,
  },
];
