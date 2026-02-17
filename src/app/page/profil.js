const ProfilePage = () => {
  return (
    <div className="w-full h-lvh">
      <div className="w-full flex flex-col items-center justify-center mt-5">
        <img src="https://i.ibb.co/0yftxyHT/PP-kosong.jpg" className="w-[100px] h-[100px] rounded-full bg-gray-300 object-cover" />
        <div className="text-center">
          <h1 className="text-sm ml-2 font-bold text-pink-500">Sheyzo</h1>
          <p className="text-sm ml-2 text-gray-500">dimas yoga</p>
        </div>
      </div>
      <div className="flex gap-2 mt-9">
        <div className="w-[98%] h-[100px]">
          <div className=" flex justify-between items-center">
            <h1 className="text-sm ml-2 font-bold text-gray-500">Blog Terbaru:</h1>
            <button className="text-sm ml-2 text-gray-500 bg-pink-500 text-white px-3 py-1 rounded-md mr-2">Buat Blog</button>
          </div>
          <div className="flex gap-2 mt-2">
            <div className="">
              <h1 className="text-sm ml-2 font-bold text-pink-500"> title blog</h1>
              <p className="text-sm ml-2 text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, voluptate.</p>
            </div>
            <div className="">
              <h1 className="text-sm ml-2 font-bold text-pink-500"> title blog</h1>
              <p className="text-sm ml-2 text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, voluptate.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ProfilePage
