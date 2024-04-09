"use server";

import { revalidateTag } from "next/cache";

export const validatedTag = (tag: string) => {
  revalidateTag(tag);
};
