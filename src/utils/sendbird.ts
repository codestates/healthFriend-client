const app = () => {
  return null;
};

export default app;

// import * as SendBird from 'sendbird';
// import { APP_ID, USER_ID } from '../config/sendbirdCongifg';

// const sb = new SendBird({ appId: APP_ID });

// sb.connect(USER_ID, function(user, error) {
//   if (error) {
//     return;
//     console.log('user', user);
//   }
//   sb.OpenChannel.createChannel(function(openChannel, error4) {
//     if (error4) {
//       return;
//     }
//     sb.OpenChannel.getChannel(
//       'sendbird_open_channel_62045_a99dae46b4902a5911f664fa9bb3080e4c34bb8c',

//       function(openChannel, error1) {
//         if (error1) {
//           return;
//         }

//         openChannel.enter(function(response, error2) {
//           if (error2) {
//             return;
//           }
//           openChannel.sendUserMessage('hello', DATA, CUSTOM_TYPE, function(
//             message,
//             error3,
//           ) {
//             if (error3) {
//             }
//           });
//         });
//       },
//     );
//   });
// });
