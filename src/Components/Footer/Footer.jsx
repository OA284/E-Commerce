const Footer = () => {
    return (
        <div className="bg-slate-300 pt-10 pb-20">
            <div className="w-[95%] mx-auto ">
                <h1 className="font-semibold text-2xl">Get the freshCart app</h1>
                <h3 className="text-gray-500 pb-3">We will send you a link, open it on your phone to download the app.</h3>
                <div className="input w-[95%] flex justify-center items-center mx-auto gap-4 mb-5">
                    <input type="text" placeholder="Email .." className="w-4/6 md:w-5/6 h-[35px] rounded-md"/>

                    <button 
                        type="submet"
                        className="w-2/6 md:w-1/6 h-[35px] focus:outline-none text-white bg-green-500 hover:bg-green-500 focus:ring-4 focus:ring-green-500 font-medium rounded-lg text-sm dark:bg-green-500 dark:hover:bg-green-500 dark:focus:ring-green-500">
                            Share App Link
                    </button>
                </div>

                <div className="icons mt-4 lg:mt-0">
                    <h1 className="font-semibold text-xl">Follow us on: </h1>
                    <div>
                        <a href="#"><i className="fa-brands ml-3 text-xl fa-instagram"></i></a>
                        <a href="#"><i className="fa-brands ml-3 text-xl fa-facebook"></i></a>
                        <a href="#"><i className="fa-brands ml-3 text-xl fa-tiktok"></i></a>
                        <a href="#"><i className="fa-brands ml-3 text-xl fa-twitter"></i></a>
                        <a href="#"><i className="fa-brands ml-3 text-xl fa-linkedin"></i></a>
                        <a href="#"><i className="fa-brands ml-3 text-xl fa-youtube"></i></a>
                    </div>
                    </div>
            </div>

        </div>
    )
}

export default Footer