import axios from "axios";
import Image from "next/image";
import { Post, User, Comment } from "@/types";
import StarComponent from "@/components/StarComponent";

interface Params {
  params: { id: string };
}
interface GetPostResponse extends Post {}
interface GetUserResponse extends User {}
interface GetCommentResponse extends Comment {}

const randomComment = () => Math.floor(Math.random() * (300 - 1)) + 1;
export default async function Blog({ params }: Params) {
  async function getPost(): Promise<Post> {
    const { data } = await axios.get<GetPostResponse>(
      `https://dummyjson.com/posts/${params.id}`
    );
    return data;
  }
  const post = await getPost();

  async function getUser(num: string = params.id): Promise<User> {
    const { data } = await axios.get<GetUserResponse>(
      `https://dummyjson.com/users/${num}`
    );
    return data;
  }
  const user = await getUser();

  const userOne = await getUser(String(Number(params.id) + 1));
  const userThree = await getUser(String(Number(params.id) + 3));
  const userTwo = await getUser(String(Number(params.id) + 2));

  async function getComment(num: number): Promise<Comment> {
    const { data } = await axios.get<GetCommentResponse>(
      `https://dummyjson.com/comments/${num}`
    );
    return data;
  }
  const commentIdArray = Array.from({ length: 3 }, () =>
    Math.floor(Math.random() * 330)
  );
  const commentOne = await getComment(commentIdArray[0]);
  const commentTwo = await getComment(commentIdArray[1]);
  const commentThree = await getComment(commentIdArray[2]);

  return (
    <div className="w-screen">
      <div className=" flex h-[449px]">
        <Image
          src="https://picsum.photos/2000/449"
          alt="image"
          height={449}
          width={2000}
        ></Image>
      </div>
      <div className="flex flex-col h-screen w-[959px] m-auto gap-8">
        <div className=" flex-row h-56 bg-white pt-24"></div>
        <div className="flex-row h-14 pb-6">
          <p className="text-5xl">{post.title}</p>
        </div>
        <div className="flex pt-4 pb-8">
          <div className=" w-20 h-20 rounded-full pr-2 border-2 border-gray-400">
            <Image src={user.image} alt="avatar" width={80} height={80}></Image>
          </div>
          <div className="w-56 h-20 pt-6 pl-4">
            <p>{"Author: " + user.firstName + " " + user.lastName}</p>
          </div>
        </div>
        <div className="flex-row h-[652px] text-2xl">{post.body}</div>
        <div className=" flex-row h-[600px] bg-white">
          <div className="flex mb-4">
            <div className="w-1/2 flex-col h-[149px] mt-24">
              <p className="text-3xl pb-4">Comments</p>
              <input
                type="text"
                className="h-[120px] w-11/12 border-gray-300 border-4 "
                placeholder="Your comments...."
              />
              <div className="pt-4">
                <button className="bg-blue-400 w-16 h-9 text-white">
                  Post
                </button>
              </div>
            </div>
            <div className="w-1/2 h-[393px] mt-24">
              <div className="flex flex-col gap-4">
                <p className="text-3xl text-gray-700">Recent Comments</p>
                <div className="w-11/12 h-[119px] border-2 border-gray-200">
                  <div className="flex w-3/4 pl-1">
                    <div className=" w-20 h-20 rounded-full pr-2">
                      <Image
                        src={userOne.image}
                        alt="avatar 1"
                        width={60}
                        height={60}
                      ></Image>
                    </div>
                    <div className="flex-col">
                      <div className="w-3/4 h-12">
                        <p>{commentOne.user.username}</p>
                      </div>
                      <div>
                        <StarComponent />
                      </div>
                      <div>
                        <p>{commentOne.body}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="  w-11/12 h-[119px] border-2 border-gray-200 ">
                  <div className="flex w-3/4 pl-1">
                    <div className=" w-20 h-20 rounded-full pr-2">
                      <Image
                        src={userTwo.image}
                        alt="avatar 1"
                        width={60}
                        height={60}
                        style={{ objectFit: "contain" }}
                      ></Image>
                    </div>
                    <div className="flex-col">
                      <div className="w-3/4 h-12">
                        <p>{commentTwo.user.username}</p>
                      </div>
                      <div>
                        <StarComponent />
                      </div>
                      <div>
                        <p>{commentTwo.body}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-11/12 h-[119px] border-2 border-gray-200 ">
                  <div className="flex w-3/4 pl-1">
                    <div className=" w-20 h-20 rounded-full pr-2">
                      <Image
                        src={userThree.image}
                        alt="avatar 1"
                        width={60}
                        height={60}
                        style={{ objectFit: "contain" }}
                      ></Image>
                    </div>
                    <div className="flex-col text-justify">
                      <div className="w-3/4 h-12">
                        <p>{commentThree.user.username}</p>
                      </div>
                      <div>
                        <StarComponent />
                      </div>
                      <div>
                        <p>{commentThree.body}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
