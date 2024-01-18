import { Page } from "@/types/payload-types"

import { BentoBlock } from "./bento-block"
import { CTATextBlock } from "./cta-text-block"
import { EventsBlock } from "./events-block"

type Props = {
  layout: Page["layout"]
}
export const Blocks: React.FC<Props> = ({ layout }) => {
  return (
    <>
      {layout?.map((block, i) => {
        if (block.blockType === "events-block") {
          return <EventsBlock key={block.id} />
        }
        if (block.blockType === "bento-block") {
          /* @ts-ignore */
          return <BentoBlock items={block.items} />
        }
        if (block.blockType === "cta-text-block") {
          return (
            <CTATextBlock
              text={block.text}
              href={block.link.url!}
              label={block.link.label}
            />
          )
        }
      })}
    </>
  )
}
