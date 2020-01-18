import { useQuery } from '@apollo/react-hooks';
import { StreamChat } from 'stream-chat';
import Cookies from 'js-cookie';
import 'stream-chat-react/dist/css/index.css';

import { API_KEY } from '../../config/streamConfig';
import { GET_USERINFO } from '../../graphql/queries';

const useMakeChatRoom = /* async */ (hf) => {
  const { data: dataMe } = useQuery(GET_USERINFO);
  const token = Cookies.get('stream-chat-token');
  const chatClient = new StreamChat(API_KEY);

  // async, await로 만드는 법 모르겠음.
  // setUser하는 부분이 로그인하자마자 set을 해야 할까?? 그래야 친구들 목록에 등록이 되고, 바로 말 걸수 있나? 새로 아이디 하나 더 만들어서 시험해봐야 할듯. 근데 채팅 목록에는 안 들어가서 setUser하는 과정 없이도 리스트에 등록이 되나 확인. 안 되면 setUser하는 부분 header나 첫 화면 등으로 옮겨야 함.
  // if (dataMe && dataMe.me) {
  const user = /* await */ chatClient.setUser(
    {
      id: dataMe.me.id,
      name: dataMe.me.nickname,
      image: 'https://getstream.io/random_svg/?name=John', // data.me.image? 있는것: antd
    },
    token as any,
  );

  console.log('user in useMakeChatRoom', user);
  console.log('hf in useMakeChatRoom', hf.id);

  let newChannel;

  if (hf.id.length !== 0) {
    newChannel = chatClient.channel(
      'messaging',
      (dataMe.me.id + hf.id).slice(0, 20),
      {
        members: [dataMe.me.id, hf.id],
        // invites: [hf.id],
      },
    );
    newChannel.create();
    // const state = newChannel.watch();
    newChannel.on('message.new', (event) => {
      console.log('메세지 왔어');
    });
  }

  // as any말고 typescript error처리 안되네

  chatClient.on(((event) => {
    if (event.total_unread_count != null) {
      console.log(`unread messages count is now: ${event.total_unread_count}`);
    }
    if (event.unread_channels != null) {
      console.log(`unread channels count is now: ${event.unread_channels}`);
    }
  }) as any);

  const filters = { type: 'messaging' };
  const sort = { last_message_at: -1 };

  const channels = /* await */ chatClient.queryChannels(
    filters,
    { last_message_at: -1 },
    {
      state: true,
      watch: true,
    },
  );
  // .then((chans) => chans.push(newChannel));

  console.log('newChannel in chat', newChannel);
  console.log('channels in chnnels,', channels);

  return { chatClient, filters, sort, newChannel };
  // }

  // 여기 아래 IF 문에 ErrorLoginFirst를 줄지? 아니면 저기 항목들 받아가니까 저기 항목에 '' 빈 값이라도 넣어줄지?
};

export default useMakeChatRoom;
