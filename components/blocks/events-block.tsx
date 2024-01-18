import { events } from "@/actions/events"
import { ArrowRightIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Grid } from "@/components/grid"
import { Paragraph } from "@/components/paragraph"
import { sectionVariants } from "@/components/section"
import { Title } from "@/components/title"

type Props = {}
export const EventsBlock: React.FC<Props> = async ({}) => {
  const eventsQuery = await events({})
  const colors = [
    "bg-[#EDEDED]",
    "bg-[#C9DAF0]",
    "bg-[#E08C5B]",
    "bg-[#41BD62]",
    "bg-[#FFF9D7]",
  ]

  const getRandomColor = (): string => {
    const randomIndex = Math.floor(Math.random() * colors.length)
    return colors[randomIndex]
  }
  return (
    <Grid gap="none" className="gap-2 p-2">
      {eventsQuery?.docs.map((event) => {
        return (
          <div
            key={event.id}
            className={cn(
              sectionVariants({ spacer: "p", size: "sm" }),
              `${getRandomColor()} col-span-3 flex aspect-[9/16] cursor-pointer flex-col items-center justify-between overflow-hidden text-center transition-all hover:rounded-xl`
            )}
          >
            <Badge size="lg" variant="secondary">
              {new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              }).format(new Date(event.date))}
            </Badge>
            <div className="px-6">
              <Title level={2} showAs={5} className="text-balance">
                {event.title}
              </Title>
              <Paragraph size="sm" className="text-balance">
                {event.summary}
              </Paragraph>
            </div>
            <div className="group flex items-center gap-2">
              <Button variant="secondary" size="sm" rounded="full">
                {event.location}
              </Button>
              <Button
                className="transition-all group-hover:-rotate-45"
                variant="secondary"
                size="sm"
                rounded="full"
              >
                <ArrowRightIcon size={12} />
              </Button>
            </div>
          </div>
        )
      })}
    </Grid>
  )
}
