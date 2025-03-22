import { Button } from "./button";

const SingleBlog = ({ name }: any) => {
  return (
    <>
      <div className="flex flex-col gap-4 align-items-center my-4 p-2">
        <div className="flex align-items-center gap-4">
          <div>
            <img
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="profile"
              className="size-8 rounded-full ring-2 shadow-sm"
            />
          </div>
          <div>
            <h1 className="font-bold capitalize">{name}</h1>
          </div>
        </div>
        <div className="flex">
          <div className="flex flex-col align-start justify-between">
            <h2 className="text-left text-2xl font-extrabold break-words">
              Claude with MCPs Replaced Cursor & Windsurf — How Did That Happen?
            </h2>
            <p className="text-left text-sm text-muted-background">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Vestibulum at dui vel arcu cursus euismod. Sed in dolor vel justo
              tincidunt suscipit. Integer vel velit vel neque tincidunt tempor.
            </p>
            <div className="flex flex-wrap justify-between mt-4 sm:m-0">
              <div className="flex flex-wrap align-cennter gap-8">
                <div className="like flex align-center gap-2">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                      />
                    </svg>
                  </span>
                  <span className="text-muted-foreground hidden md:block">Like</span>
                </div>
                <div className="share flex align-center gap-2">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
                      />
                    </svg>
                  </span>
                  <span className="text-muted-foreground hidden md:block">Share</span>
                </div>
                <div className="comment flex align-center gap-2">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                      />
                    </svg>
                  </span>
                  <span className="text-muted-foreground hidden md:block">Comment</span>
                </div>
                <div className="save flex align-center gap-2">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                      />
                    </svg>
                  </span>
                  <span className="text-muted-foreground hidden md:block">
                    Save
                  </span>
                </div>
              </div>
              <div>
                <Button type="button" variant="default">
                  Read More
                </Button>
              </div>
            </div>
          </div>
          <div className="hidden w-100 md:flex justify-center items-center">
            <img
              src="https://images.unsplash.com/photo-1736049621371-4507004ac8b1?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="profile"
              className="h-40 w-40 shadow-xl"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleBlog;
