export const TypingIndicator = ({ owner, isTyping }) => {
  let typersDisplay = "";
  let countTypers = 0;
  /* for each user writing messages in chatroom */
  for (var key in isTyping) {
    /* retrieve the name if it isn't the owner of the chatbox */
    if (key != owner && isTyping[key]) {
      typersDisplay += ", " + key;
      countTypers++;
    }
  }
  /* formatting text */
  typersDisplay = typersDisplay.substr(1);
  typersDisplay += countTypers > 1 ? " are " : " is ";
  /* if at least one other person writes */
  if (countTypers > 0) {
    return (
      <div className="absolute top-0 font-bold">
        {typersDisplay} writing
        <span className="relative inline-block h-0 w-0 bg-gray-700"></span>
      </div>
    );
  }
  return <div className="absolute top-0 font-bold"></div>;
};
