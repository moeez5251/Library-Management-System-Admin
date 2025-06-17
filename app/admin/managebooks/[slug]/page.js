export default async function Page({ params }) {
  const { slug } = await params
  return <div>My Post: {slug}</div>
}