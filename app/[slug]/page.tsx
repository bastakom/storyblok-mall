import Image from 'next/image'

async function fetchPageData(slug: string) {
  const data = await fetch(
    `https://api.storyblok.com/v2/cdn/stories/${slug}?version=published&token=${process.env.STORYBLOCK_API_TOKEN}`
  )
  if (!data) {
    return null
  }
  return data.json()
}

export default async function page({
  params,
}: {
  params: { slug: string; lang: string }
}) {
  const pathname = params.slug
  const slugName = pathname === undefined ? `hem` : pathname
  const res = await fetchPageData(slugName)

  const {
    story: { content },
  } = res

  return (
    <div>
      <div className="h-[70vh] relative w-full">
        <Image
          className="object-cover"
          src={content.video.filename}
          fill
          alt={content.video.id}
        />
      </div>
      <div className="container m-auto">
        <div className="my-24 grid px-20 mx-auto grid-cols-2 items-center">
          <Image
            src={content.img_image.filename}
            alt={content.img_image.id}
            width={600}
            height={500}
          />
          <div className="grid gap-10">
            <h2 className="text-[57px] max-w-[70%] font-light leading-[68px]">
              {content.title_image}
            </h2>
            <p className="text-[20px] max-w-[80%] font-light">
              {content.content_image}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
