export default () => {
    return (
        <>
        <div className="AddToHomeScreen">
            <h1>Add To Home Screen</h1>
            <img src={`${process.env.PUBLIC_URL}/icon.jpg`} alt="Spiritify Icon" />
            <p>
                <i className="fa-regular fa-arrow-up-from-square"></i>
                &nbsp;&nbsp;Tap on the share button
            </p>
            <p>
                <i className="fa-regular fa-square-plus"></i>
                &nbsp;&nbsp;Tap on Add To Homescreen
            </p>
        </div>
        </>
    )
}