type PageHeadingProps = {
  title: string
}

export default function PageHeading({ title }: PageHeadingProps) {
  return <h1 className="page-heading">{title}</h1>
}
