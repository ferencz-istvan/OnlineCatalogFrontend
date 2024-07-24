interface LoginProps {
  setIsLogin: (isLogin: boolean) => void;
  isLogin: boolean;
}

export default function LoginImage(props: LoginProps) {
  return (
    <div className="img-container">
      <img src="/icons/controller.svg" alt="login page image" />
      {props.isLogin && (
        <div className="button-and-text">
          <div>If you dont have already account, then use:</div>
          <button onClick={() => props.setIsLogin(false)}>Registration</button>
        </div>
      )}
      {!props.isLogin && (
        <div className="button-and-text">
          <div>If you already have an account, then use:</div>
          <button onClick={() => props.setIsLogin(true)}>Log in</button>
        </div>
      )}

      <style jsx>
        {`
          .img-container {
            margin-top: 50px;
            height: 70vh;
            display: flex;
            justify-content: center;
            align-items: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }
          .button-and-text {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            margin: 10px;
            padding: 5px;
          }
          img {
            object-fit: contain;
            height: 80%;
          }
          button {
            padding: 15px;
            margin: 15px;
            border-radius: 25px;
            font-size: 18px;
            font-weight: 600;
            cursor: pointer;
          }
        `}
      </style>
    </div>
  );
}
