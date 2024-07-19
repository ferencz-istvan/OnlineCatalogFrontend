export default function LoginImage() {
  return (
    <div className="img-container">
      <img src="/icons/controller.svg" alt="login page image" />
      <style jsx>
        {`
          .img-container {
            height: 70vh;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          img {
            object-fit: contain;
            height: 80%;
          }
        `}
      </style>
    </div>
  );
}
