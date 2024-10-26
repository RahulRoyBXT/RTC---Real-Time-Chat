
import PropTypes from 'prop-types';

const Message = ({
  isOfUser = false,
  text = "initially empty",
  imageSource,
  userName,
  createdAt,
}) => {

  const formattedDate = new Date(createdAt);
  const dateString = formattedDate.toDateString();
  const timeString = formattedDate.toLocaleTimeString();
  return (
    <div
      className={`bg-transparent w-full flex text-white gap-2 text-sm mb-2 ${
        isOfUser ? "justify-end" : "justify-start"
      }`}
    >
      {!isOfUser && (
        <div className="rounded=[3rem] overflow-hidden w-[2.5rem] h-[2.5rem]">
          <img
            src={imageSource}
            alt="avatar"
            className="w-full h-full object-contain"
          />
          <span>Bro</span>
        </div>
      )}
      <div className="w-[15rem] p-4 text-start bg-blue-600 rounded-xl h-auto relative pb-8 bottom-5">
        {text}
        <div
          className={`bottom-2 text-xs font-light absolute ${
            !isOfUser ? "right-4" : "left-4"
          }`}
        >
          {dateString} {timeString}
        </div>
      </div>
      {isOfUser && (
        <div className="rounded=[3rem] overflow-hidden w-[2.5rem] h-[2.5rem]">
          <span className="text-xs text-black left-0"> <img
            src={imageSource}
            alt="User's Avatar"
            className="h-full w-full object-cover rounded-full"
          /></span>
        </div>
      )}
    </div>
  );
};

Message.propTypes = {
  isOfUser: PropTypes.bool,
  text: PropTypes.string,
  imageSource: PropTypes.string.isRequired,
  userName: PropTypes.string,
  createdAt: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,
};

export default Message;
