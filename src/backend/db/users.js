import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
  {
    _id: uuid(),
    firstName: "Balaji",
    lastName: "Harinath",
    email: "balaji@gmail.com",
    password: "balaji12345",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },

  {
    _id: uuid(),
    firstName: "John",
    lastName: "Doe",
    email: "john@gmail.com",
    password: "test123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];
