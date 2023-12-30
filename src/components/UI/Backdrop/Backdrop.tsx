const Backdrop = () => {
  return (
    <div
      className="bg-black bg-opacity-50 p-3 border border-1 rounded-3 position-absolute top-50 start-50 translate-middle z-1"
      style={{ width: '100%', height: '100%' }}
    ></div>
  );
};

export default Backdrop;
