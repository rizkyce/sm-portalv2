"use client";
import VoiceControl from "@/components/Recognition/VoiceControl";

export default function Page() {
  return (
    <div className="text-center pt-10">
      <h1 className="pb-6">Tekan untuk berikan perintah...</h1>
      <VoiceControl />
    </div>
  );
}
