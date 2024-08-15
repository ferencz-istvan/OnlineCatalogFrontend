function LoaderComponent() {
  return (
    <div className="loader">
      <style jsx>
        {`
          .loader {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 100px;
            height: 100px;
            border-radius: 50%;
            border: 10px solid #3498db;
            border-top-color: transparent;
            animation: spin 1s linear infinite;
          }

          @keyframes spin {
            0% {
              transform: translate(-50%, -50%) rotate(0deg);
            }
            100% {
              transform: translate(-50%, -50%) rotate(360deg);
            }
          }
        `}
      </style>
    </div>
  );
}
export default LoaderComponent;
