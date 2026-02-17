const Blogpage = () => {
  return (
    <>
      <div className="flex gap-2 mt-9 w-full h-lvh">
        <div className="w-[98%] h-[100px]">
          <div className=" flex justify-between items-center">
            <h1 className="text-sm ml-2 font-bold text-gray-500">Blog Terbaru:</h1>
            <div className="flex gap-1 items-center">
              <input type="text" placeholder="search blog" className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-transparent focus:border-transparent" />
              <button className="text-sm ml-2 text-gray-500 bg-pink-500 text-white px-3 py-1 rounded-md mr-2">search</button>
            </div>
          </div>
          <div className="flex gap-2 mt-2 flex-wrap mx-auto justify-center">
            <div className="h-[100px] lg:w-[200px] w-[85%] flex justify-items-center items-center  border border-gray-300 rounded-md p-2">
              <div className="">
                <div className="flex justify-between items-center">
                  <h1 className="text-sm ml-2 font-bold text-pink-500"> title blog</h1>
                  <p className="text-sm text-gray-400">by Sheyzo</p>
                </div>
                <p className="text-sm ml-2 text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, voluptate.</p>
              </div>
            </div>

            <div className="h-[100px] lg:w-[200px] w-[85%]  flex justify-items-center items-center  border border-gray-300 rounded-md p-2">
              <div className="">
                <div className="flex justify-between items-center">
                  <h1 className="text-sm ml-2 font-bold text-pink-500"> title blog</h1>
                  <p className="text-sm text-gray-400">by Sheyzo</p>
                </div>
                <p className="text-sm ml-2 text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, voluptate.</p>
              </div>
            </div>

            <div className="h-[100px] lg:w-[200px] w-[85%] flex justify-items-center items-center  border border-gray-300 rounded-md p-2">
              <div className="">
                <div className="flex justify-between items-center">
                  <h1 className="text-sm ml-2 font-bold text-pink-500"> title blog</h1>
                  <p className="text-sm text-gray-400">by Sheyzo</p>
                </div>
                <p className="text-sm ml-2 text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, voluptate.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Blogpage
