import {createGlobalStyle} from 'styled-components';

const Wrapper = createGlobalStyle`
  .chat-bubble {
	display: flex;
	& > :first-child {
	  margin-right: 8px;
	}
    padding-top: 6px;
	align-items: center;
  }

  .typing {
    align-items: center;
    display: flex;
    height: 17px;
  }

  .typing .dot {
    animation: mercuryTypingAnimation 1.8s infinite ease-in-out;
    background-color: #000000B3; //rgba(20,105,69,.7);
    border-radius: 50%;
    height: 7px;
    margin-right: 4px;
    vertical-align: middle;
    width: 7px;
    display: inline-block;
  }

  .typing .dot:nth-child(1) {
    animation-delay: 200ms;
  }

  .typing .dot:nth-child(2) {
    animation-delay: 300ms;
  }

  .typing .dot:nth-child(3) {
    animation-delay: 400ms;
  }

  .typing .dot:last-child {
    margin-right: 0;
  }

  @keyframes mercuryTypingAnimation {
    0% {
      transform: translateY(0px);
      background-color: #000000B3; // rgba(20,105,69,.7);
    }
    28% {
      transform: translateY(-7px);
      background-color: #00000071; //rgba(20,105,69,.4);
    }
    44% {
      transform: translateY(0px);
      background-color: #0000003C; //rgba(20,105,69,.2);
    }
  }
`;

const TypingLoader = ({suffix}) => {
	return (
		<>
			<Wrapper/>
			<div className="chat-bubble">
				<p>typing</p>
				<div className="typing">
					<div className="dot"/>
					<div className="dot"/>
					<div className="dot"/>
				</div>
			</div>
		</>
	);
};

export default TypingLoader;
