import { useParams } from "react-router"

const SingleBlogPost = () => {
    const {id} = useParams()
  return (
    <div>SingleBlogPost your {id} </div>
  )
}

export default SingleBlogPost