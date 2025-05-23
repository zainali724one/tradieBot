import React from 'react'

const UserProfile = () => {
  return (
    <div className="flex items-center gap-3 w-full max-w-[335px]">
    <div className="w-11 h-11 rounded-full overflow-hidden">
      <img
        className="w-full h-full object-cover"
        src="https://c.animaapp.com/maz6qvpnPrz5RU/img/ellipse-8.png"
        alt="User"
      />
    </div>
    <div>
      <div className="text-base font-semibold text-[#1B1C1E] font-poppins">
        Mr. Thomas John
      </div>
      <div className="text-sm font-medium text-[#1B1C1E] opacity-60 font-poppins">
        Welcome
      </div>
    </div>
  </div>





)
}

export default UserProfile