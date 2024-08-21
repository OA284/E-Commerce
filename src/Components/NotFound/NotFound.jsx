import NotFoundPic from "./../../../src/assets/images/error.svg"

const NotFound = () => {
    return (
        <div className="p-8">
            <div className="w-[49%] mx-auto">
                <img src={NotFoundPic} alt="404 Error" className="w-full"/>
            </div>
        </div>
    )
}

export default NotFound