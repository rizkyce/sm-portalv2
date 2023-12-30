import React from "react";
import { useState } from "react";
import client from "@/services/mqttClient";
import devicesData from "@/utils/devices.json";

const VoiceControl = () => {
  const [recognizedCommand, setRecognizedCommand] = useState("");

  // Fungsi untuk mengirim pesan MQTT
  function sendMqttMessage(topic, message) {
    client.publish(topic, message);
  }

  // Fungsi untuk mendapatkan perintah suara dari pengguna
  function getVoiceCommand() {
    const recognition = new window.webkitSpeechRecognition(); // Gunakan webkitSpeechRecognition di Chrome, SpeechRecognition di Firefox

    recognition.lang = "id-ID"; // Set bahasa ke bahasa Indonesia
    recognition.start();

    return new Promise((resolve, reject) => {
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        console.log("Anda berkata:", transcript);
        setRecognizedCommand(transcript.toLowerCase());
        resolve(transcript.toLowerCase());
      };

      recognition.onerror = (event) => {
        console.error("Error:", event.error);
        alert("Tidak Ada Perintah!");
        reject(event.error);
      };
    });
  }

  // Fungsi untuk mencari perangkat berdasarkan nama
  function findDeviceByName(name) {
    return devicesData.find(
      (device) => device.name.toLowerCase() === name.toLowerCase()
    );
  }

  // Fungsi utama untuk voice control
  async function handleVoiceControl() {
    // Mendapatkan perintah suara dari pengguna
    const voiceCommand = await getVoiceCommand();

    if (voiceCommand) {
      const commandName = voiceCommand; // Perintah suara yang diterima dari pengguna

      // Cari perangkat yang memiliki perintah suara yang cocok
      let selectedDevice;
      for (const device of devicesData) {
        const foundCommand = device.command.find(
          (cmd) => cmd.voice.toLowerCase() === commandName.toLowerCase()
        );
        if (foundCommand) {
          selectedDevice = device;
          break;
        }
      }

      if (selectedDevice) {
        // Kirim pesan MQTT untuk mengontrol perangkat
        sendMqttMessage(
          selectedDevice.mqtt_topic,
          selectedDevice.command.find(
            (cmd) => cmd.voice.toLowerCase() === commandName.toLowerCase()
          ).message
        );
        console.log(
          `Perintah ${commandName} telah dikirim untuk ${selectedDevice.name}.`
        );
        alert(
          `Sukses Mengirimkan Perintah ke Perangkat ${selectedDevice.name}.`
        );
      } else {
        console.log("Perangkat tidak ditemukan berdasarkan perintah suara.");
      }
    }
  }

  return (
    <div>
      {/* <button
        className="bg-black p-4 rounded-full text-white"
        onClick={handleVoiceControl}
      >
        Voice
      </button>
      {recognizedCommand && <p>Perintah: {recognizedCommand}</p>} */}
    </div>
  );
};

export default VoiceControl;
