import { page } from "@/actions/page"

import { Blocks } from "@/components/blocks"
import { Hero } from "@/components/hero"
import { Section } from "@/components/section"

type Props = {
  params: {
    app: string[]
  }
}
const App: React.FC<Props> = async ({ params: { app } }) => {
  const pageQuery = await page({
    depth: 3,
    where: {
      name: {
        equals: app?.[0] ?? "home",
      },
    },
  })
  return (
    <>
      <Hero type="minimal" title={pageQuery?.docs?.[0].title!} />
      <Blocks layout={pageQuery?.docs[0].layout} />
    </>
  )
}
export default App
