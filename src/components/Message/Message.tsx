import { FC } from 'react';

type MessageProps = {
  text: string;
}

export const Message: FC<MessageProps> = ({ text }) => (
  <div className='center-content'>
    <h3>{text}</h3>
  </div>
)
