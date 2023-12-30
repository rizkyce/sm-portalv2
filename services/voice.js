import { useState } from "react";
import client from "@/services/mqttClient";
import devicesData from "@/utils/devices.json";
import Swal from "sweetalert2";

export function useVoiceControl() {
  const [recognizedCommand, setRecognizedCommand] = useState("");

  function sendMqttMessage(topic, message) {
    client.publish(topic, message);
  }

  function getVoiceCommand() {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "id-ID";
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
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Tidak Ada Perintah!",
        });
        reject(event.error);
      };
    });
  }

  function findDeviceByName(name) {
    return devicesData.find(
      (device) => device.name.toLowerCase() === name.toLowerCase()
    );
  }

  async function handleVoiceControl() {
    const voiceCommand = await getVoiceCommand();

    if (voiceCommand) {
      const commandName = voiceCommand;

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
        sendMqttMessage(
          selectedDevice.mqtt_topic,
          selectedDevice.command.find(
            (cmd) => cmd.voice.toLowerCase() === commandName.toLowerCase()
          ).message
        );
        console.log(
          `Perintah ${commandName} telah dikirim untuk ${selectedDevice.name}.`
        );
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: `Successfully gave commands to the ${selectedDevice.name} device.`,
        });
      } else {
        console.log("Perangkat tidak ditemukan berdasarkan perintah suara.");
      }
    }
  }

  return { recognizedCommand, handleVoiceControl };
}
