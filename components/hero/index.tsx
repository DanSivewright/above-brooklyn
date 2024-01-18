import { pageSchema } from "@/schemas/payload"
import * as z from "zod"

import { MinimalHero } from "./minimal"

type Props = {
  type: z.infer<typeof pageSchema>["heroType"]
  title: string
}
export const Hero: React.FC<Props> = ({ type, title }) => {
  if (type === "minimal") {
    return <MinimalHero text={title} />
  }
}
