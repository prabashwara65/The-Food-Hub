import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { clearUser } from "../../ReduxToolKit/userSlice";

const Home = () => {
  const user = useSelector((state) => state.user.user);
  return (
    <div className="h-screen bg-[#F6F6FF]">
      <div className="h-full mx-auto">
        <div className="container flex mx-auto py-8 justify-between items-end ">
          {/* Search bar */}
          <div className="relative">
            <input
              type="text"
              className="w-3xl focus:outline-none py-4 bg-[#EFEEFE] focus:shadow-amber-600 focus:shadow-sm rounded-full px-4"
              placeholder="Search By food name/Resturant"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-8 absolute right-6 top-4 text-gray-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </div>

          {/* +Add order Button */}
          <button className="border-2 ml-8 rounded-3xl p-4 text-white bg-[#B97A9E]">
            + Add Order{" "}
          </button>
        </div>

        <div className="container mx-auto bg-[#F3B734] py-9 pl-3 h-[250px] rounded-3xl">
          <div className="block w-md pl-5">
            <span className="font-bold uppercase">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus
              tempore aspernatur
            </span>
            <p className="block py-5">
              explicabo illum quidem, repellat fugiat accusamus! Vero quia
              nostrum consectetur aspernatur deleniti!
            </p>
            <button className="rounded-4xl p-4 uppercase bg-[#745200] text-white w-[200px]">
              Read More
            </button>
          </div>
        </div>

        <div className="container mx-auto flex flex-row mt-25 gap-7">
        <div className="relative flex flex-1/4 h-50 bg-[#FFFFFF] rounded-3xl">
            <div className="absolute top-[-50px] left-23 w-30 h-30 rounded-full bg-red-200"></div>
              <div className="absolute w-30 h-38 bottom-0 p-4 pt-8">
                {/* Rating */}
                <div className="flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5 pt-1 fill-[#AE859B] text-[#AE859B]"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                    />
                  </svg>
                  <p className="text-md pl-1 text-[#AE859B]">4.7</p>
                </div>

                <p className="w-2xs pt-4 pl-1">
                  Special <span className="block">Chiken rice Bowl</span>{" "}
                </p>
                {/* Price */}
              </div>
              <div className="absolute flex justify-center items-center w-11 h-11 bottom-8 right-5 bg-[#AE859B] rounded-full text-sm text-white font-medium">
                250
              </div>
          </div>
          <div className="relative flex flex-1/4 h-50 bg-[#FFFFFF] rounded-3xl">
            <div className="absolute top-[-50px] left-23 w-30 h-30 rounded-full bg-red-200"></div>
              <div className="absolute w-30 h-38 bottom-0 p-4 pt-8">
                {/* Rating */}
                <div className="flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5 pt-1 fill-[#AE859B] text-[#AE859B]"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                    />
                  </svg>
                  <p className="text-md pl-1 text-[#AE859B]">4.7</p>
                </div>

                <p className="w-2xs pt-4 pl-1">
                  Special <span className="block">Chiken rice Bowl</span>{" "}
                </p>
                {/* Price */}
              </div>
              <div className="absolute flex justify-center items-center w-11 h-11 bottom-8 right-5 bg-[#AE859B] rounded-full text-sm text-white font-medium">
                250
              </div>
          </div>
          <div className="relative flex flex-1/4 h-50 bg-[#FFFFFF] rounded-3xl">
            <div className="absolute top-[-50px] left-23 w-30 h-30 rounded-full bg-red-200"></div>
              <div className="absolute w-30 h-38 bottom-0 p-4 pt-8">
                {/* Rating */}
                <div className="flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5 pt-1 fill-[#AE859B] text-[#AE859B]"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                    />
                  </svg>
                  <p className="text-md pl-1 text-[#AE859B]">4.7</p>
                </div>

                <p className="w-2xs pt-4 pl-1">
                  Special <span className="block">Chiken rice Bowl</span>{" "}
                </p>
                {/* Price */}
              </div>
              <div className="absolute flex justify-center items-center w-11 h-11 bottom-8 right-5 bg-[#AE859B] rounded-full text-sm text-white font-medium">
                250
              </div>
          </div>
          <div className="relative flex flex-1/4 h-50 bg-[#FFFFFF] rounded-3xl">
            <div className="absolute top-[-50px] left-23 w-30 h-30 rounded-full bg-red-200"></div>
              <div className="absolute w-30 h-38 bottom-0 p-4 pt-8">
                {/* Rating */}
                <div className="flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5 pt-1 fill-[#AE859B] text-[#AE859B]"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                    />
                  </svg>
                  <p className="text-md pl-1 text-[#AE859B]">4.7</p>
                </div>

                <p className="w-2xs pt-4 pl-1">
                  Special <span className="block">Chiken rice Bowl</span>{" "}
                </p>
                {/* Price */}
              </div>
              <div className="absolute flex justify-center items-center w-11 h-11 bottom-8 right-5 bg-[#AE859B] rounded-full text-sm text-white font-medium">
                250
              </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Home;
