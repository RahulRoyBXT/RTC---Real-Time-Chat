
import './Zego.css';
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
const RoomPage = () => {
    const { roomID } = useParams();
    const myMeeting = async (element) => {
        const appID = 1155155914;
        const serverSecret = "71cfe2df910966c1825ee685ce77900a";
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, Date.now().toString(), "Shiv");
        const zc = ZegoUIKitPrebuilt.create(kitToken);
        zc.joinRoom({
            container: element,
            sharedLinks: [
                {
                    name: 'Copy Link',
                    url: `https://rtc-realtimechat.netlify.app/${roomID}`,
                },
            ],
            scenario: {
                mode: ZegoUIKitPrebuilt.GroupCall,
            },
            showScreenSharingButton: true,
        });
    };
    return <div className="vc">
        <div ref={myMeeting} className="meeting" />
    </div>;
};

export default RoomPage;