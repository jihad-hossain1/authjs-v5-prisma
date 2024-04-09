import { User } from "./../../../../helpers/types/types";

export async function getUser(id: string | undefined | null) {
  try {
    const response = await fetch(
      `${process.env.URL}/api/backend/users/${id}`,
      {
        next: { tags: ["user"] },
      }
    );

    if (!response.ok) {
      throw new Error("user data are not fetch");
    }

    const result: User | null = await response.json();

    if (!result) {
      return null;
    }
    return result;
  } catch (error: any) {
    console.log(error.message);
  }
}
