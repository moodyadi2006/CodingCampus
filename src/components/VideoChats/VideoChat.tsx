import React, { useEffect, useRef, useState } from 'react';
import { firestore } from '@/firebase/firebase';
import { doc, updateDoc, onSnapshot, arrayUnion } from 'firebase/firestore';

type VideoChatProps = {
  chatId: string;
  isCaller: boolean;
};

const VideoChat: React.FC<VideoChatProps> = ({ chatId, isCaller }) => {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const pc = useRef<RTCPeerConnection | null>(null);

  useEffect(() => {
    startLocalStream();
    const pcInstance = new RTCPeerConnection();

    pcInstance.onicecandidate = event => {
      if (event.candidate) {
        updateDoc(doc(firestore, 'videoChats', chatId), {
          candidates: arrayUnion(event.candidate.toJSON())
        });
      }
    };

    pcInstance.ontrack = event => {
      setRemoteStream(event.streams[0]);
    };

    pc.current = pcInstance;

    if (isCaller) {
      createOffer();
    } else {
      onSnapshot(doc(firestore, 'videoChats', chatId), snapshot => {
        const data = snapshot.data();
        if (data && data.offer && !pc.current?.remoteDescription) {
          pc.current.setRemoteDescription(new RTCSessionDescription(data.offer)).then(createAnswer);
        }
        if (data && data.answer && !pc.current?.localDescription) {
          pc.current.setRemoteDescription(new RTCSessionDescription(data.answer));
        }
        if (data && data.candidates) {
          data.candidates.forEach((candidate: RTCIceCandidateInit) => {
            pc.current?.addIceCandidate(new RTCIceCandidate(candidate));
          });
        }
      });
    }

    return () => {
      pcInstance.close();
    };
  }, [chatId, isCaller]);

  const startLocalStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setLocalStream(stream);
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
      stream.getTracks().forEach(track => {
        pc.current?.addTrack(track, stream);
      });
    } catch (error) {
      console.error('Error accessing media devices.', error);
    }
  };

  const createOffer = async () => {
    if (pc.current) {
      const offer = await pc.current.createOffer();
      await pc.current.setLocalDescription(offer);
      await updateDoc(doc(firestore, 'videoChats', chatId), { offer: offer.toJSON() });
    }
  };

  const createAnswer = async () => {
    if (pc.current) {
      const answer = await pc.current.createAnswer();
      await pc.current.setLocalDescription(answer);
      await updateDoc(doc(firestore, 'videoChats', chatId), { answer: answer.toJSON() });
    }
  };

  useEffect(() => {
    if (localStream && localVideoRef.current) {
      localVideoRef.current.srcObject = localStream;
    }
  }, [localStream]);

  useEffect(() => {
    if (remoteStream && remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);

  return (
    <div className="video-chat-container">
      <video ref={localVideoRef} autoPlay muted className="local-video" />
      <video ref={remoteVideoRef} autoPlay className="remote-video" />
    </div>
  );
};

export default VideoChat;
