"use client";
import React, { useState } from "react";
import DeviceList from "../AddDevice/deviceList";
import client from "@/services/mqttClient";
import devicesData from "@/utils/devices.json";
import { useVoiceControl } from "@/services/voice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

export default function Devices() {
  const [devices, setDevices] = useState(devicesData);
  const { recognizedCommand, handleVoiceControl } = useVoiceControl();
  const [listening, setListening] = useState(false);

  const startListening = async () => {
    setListening(true);
    try {
      await handleVoiceControl();
    } catch (error) {
      console.error(error);
    } finally {
      setListening(false); // Reset status listening ke false setelah selesai
    }
  };

  const handleControlDevice = async (deviceId, message) => {
    try {
      console.log(`Mengirim pesan ke perangkat ${deviceId}: ${message}`);
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: `Kontrol perangkat ${deviceId}`,
      });

      const device = devices.find((d) => d.id === deviceId);
      const mqttTopic = device ? device.mqtt_topic : "";

      if (mqttTopic) {
        client.publish(mqttTopic, message, (err) => {
          if (err) {
            console.error(
              `Gagal mengirim pesan MQTT ke ${mqttTopic}: ${message}`
            );
            Swal.fire({
              icon: "error",
              title: "Error!",
              text: `Gagal mengirim pesan MQTT ke ${mqttTopic}: ${message}`,
            });
          } else {
            console.log(
              `Pesan MQTT berhasil dikirim ke ${mqttTopic}: ${message}`
            );
          }
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="flex-1 bg-white border-2 p-4 border-gray-200 rounded-[40px] ml-4 mr-4 flex justify-center items-center flex-col">
      <h1 className="text-center font-bold text-xl text-blue-800">
        My Devices
      </h1>
      <div className="text-center m-4 bg-white border border-gray-200 rounded-3xl w-96 p-4">
        <button
          className="text-3xl w-14 h-14 bg-white border hover:bg-blue-700 hover:text-white border-gray-300 rounded-full text-blue-900 m-2"
          onClick={startListening}
          disabled={listening}
        >
          <FontAwesomeIcon icon={faMicrophone} />
        </button>
        {listening
          ? "Mendengarkan Perintah..."
          : "Tekan Untuk Berikan Perintah!"}

        {recognizedCommand && !listening && (
          <p>
            Perintah:{" "}
            {recognizedCommand
              .toLowerCase()
              .replace(/\b\w/g, (c) => c.toUpperCase())}
          </p>
        )}
      </div>

      <DeviceList devices={devices} handleControlDevice={handleControlDevice} />
    </main>
  );
}
