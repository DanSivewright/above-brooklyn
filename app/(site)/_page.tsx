import Image from "next/image"
import ImageOneLeft from "@/public/about-abstract.webp"
import ImageOneRight from "@/public/about-image.webp"
import ImageOne from "@/public/banner.webp"

import { cn } from "@/lib/utils"
import { badgeVariants } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Double } from "@/components/double"
import { gridVariants } from "@/components/grid"
import { Section } from "@/components/section"
import { Title, titleVariants } from "@/components/title"

type Props = {}
const Page: React.FC<Props> = ({}) => {
  return (
    <>
      <Title showAs={2} className="text-balance px-4 pt-[45dvh]">
        <span className="text-muted-foreground/50">Above Brooklyn</span> is a
        (ask bongani here) studio. We build experiences and craft influence.
      </Title>
      <Section side="b" className="flex flex-col gap-2 px-2">
        <Double
          imageOne={ImageOneLeft}
          imageTwo={ImageOneRight}
          titleOne="Lorem Test"
          titleTwo="Lorem Test"
          badgesOne={["Fashion", "Music", "Food", "Travel", "Art"]}
          badgesTwo={["Music", "Travel", "Art"]}
        />
        <div className="relative aspect-video w-full overflow-hidden md:aspect-[16/7]">
          <Image
            fill
            alt="Alt text for the image"
            src={ImageOne}
            className="object-cover"
          />
          <div className="absolute inset-0 z-10 flex h-full w-full flex-col justify-between p-3">
            <h2
              className={cn(
                titleVariants({ level: 6 }),
                "text-balance text-white"
              )}
              style={{ margin: 0 }}
            >
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            </h2>
            <ul className="flex items-center gap-3">
              <li className={badgeVariants({ variant: "blur", size: "lg" })}>
                Badge One
              </li>
              <li className={badgeVariants({ variant: "blur", size: "lg" })}>
                Badge One
              </li>
            </ul>
          </div>
        </div>
      </Section>
      <Section className={cn(gridVariants({ gap: "none" }), "gutter")} side="b">
        <div className="col-span-6 col-start-7">
          <Title level={3} showAs={1} className="text-balance">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
            illum laborum sequi cumque, odio, eius est, quod modi quis inventore
            blanditiis sint qui a repellat saepe.
          </Title>
          <Button rounded="full" variant="secondary" size="lg">
            Book an event
          </Button>
        </div>
      </Section>
      <div className="flex flex-col gap-2 px-2">
        <Double
          badgesOne={["Fashion", "Music", "Food", "Travel", "Art"]}
          badgesTwo={["Music", "Travel", "Art"]}
          imageOne={
            "https://dr.savee-cdn.com/things/6/5/92ecb84e915801f56eaa1e.webp"
          }
          imageTwo="https://dr.savee-cdn.com/things/6/5/94301e44893e4f4f3287e7.webp"
          titleOne="Lorem Test"
          titleTwo="Lorem Test"
        />
        <div
          className={cn(
            gridVariants({ gap: "xl" }),
            "relative w-full items-center justify-center overflow-hidden bg-[#419797] p-2"
          )}
        >
          <div className="relative col-span-5  aspect-square overflow-hidden">
            <Image
              fill
              alt="contact image"
              src="https://dr.savee-cdn.com/things/6/4/562baf32ca16c5ab1a0d62.png"
              className="object-cover"
            />
          </div>
          <div className="gutter col-span-7 flex flex-col text-white">
            <Title showAs={2} level={4} className="text-balance">
              <span className="opacity-50">Need Help?</span> A quick intro to
              our culture, values, and guiding principles.
            </Title>
            <Button size="jumbo" rounded="full" className="w-fit">
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
export default Page
