import "../Styles/style.css";

function Loading() {
  return (
    // <Spinner animation='border' role='status'>
    //   {/* <span className="visually-hidden">Loading...</span> */}
    // </Spinner>
    <div id='preloader'>
      <div id='loader'></div>
    </div>
  );
}

export default Loading;
